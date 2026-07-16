"use server";

import { revalidatePath } from "next/cache";
import { adminClient } from "@/lib/radar/supabase";
import { getAuthContext } from "@/lib/radar/supabase-server";

type Result = { error?: string };

export async function respondToLead(
  leadId: string,
  action: "accept" | "decline"
): Promise<Result> {
  const auth = await getAuthContext();
  if (!auth?.companyId) return { error: "Nicht angemeldet." };

  const db = adminClient();

  // Only the offered lead of the caller's own company can be answered
  const leadResp = await db
    .from("leads")
    .select("id, status, mediation_id")
    .eq("id", leadId)
    .eq("company_id", auth.companyId)
    .single();

  if (leadResp.error || !leadResp.data) return { error: "Lead nicht gefunden." };
  if (leadResp.data.status !== "offered") {
    return { error: "Lead wurde bereits beantwortet." };
  }

  const newStatus = action === "accept" ? "accepted" : "declined";
  const update: Record<string, unknown> = { status: newStatus };
  if (action === "accept") {
    update["qualified_at"] = new Date().toISOString();
  }

  const { error } = await db.from("leads").update(update).eq("id", leadId);
  if (error) return { error: "Aktion fehlgeschlagen." };

  // Lead acceptance moves the mediation forward
  if (action === "accept") {
    await db
      .from("mediations")
      .update({ status: "contact_made" })
      .eq("id", leadResp.data.mediation_id)
      .eq("status", "matching");
  }

  await db.from("audit_log").insert({
    actor: auth.userId,
    action: `lead.${action}`,
    entity: "leads",
    entity_id: leadId,
    payload: { company_id: auth.companyId, status: newStatus },
  });

  revalidatePath("/radar/portal/leads");
  return {};
}
