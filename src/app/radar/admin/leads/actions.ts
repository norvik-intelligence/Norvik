"use server";

import { revalidatePath } from "next/cache";
import { adminClient } from "@/lib/radar/supabase";
import { getAuthContext } from "@/lib/radar/supabase-server";

type Result = { error?: string };

const ADMIN_TRANSITIONS: Record<string, string[]> = {
  accepted: ["invoiced"],
  invoiced: ["paid", "refunded"],
  paid: ["refunded"],
};

export async function updateLeadStatus(leadId: string, status: string): Promise<Result> {
  const auth = await getAuthContext();
  if (!auth?.isAdmin) return { error: "Forbidden" };

  const db = adminClient();
  const current = await db.from("leads").select("status").eq("id", leadId).single();
  if (current.error || !current.data) return { error: "Lead nicht gefunden." };

  const allowed = ADMIN_TRANSITIONS[current.data.status] ?? [];
  if (!allowed.includes(status)) return { error: "Ungültiger Statuswechsel." };

  const { error } = await db.from("leads").update({ status }).eq("id", leadId);
  if (error) return { error: "Update fehlgeschlagen." };

  await db.from("audit_log").insert({
    actor: auth.userId,
    action: "lead.status_change",
    entity: "leads",
    entity_id: leadId,
    payload: { from: current.data.status, to: status },
  });

  revalidatePath("/radar/admin/leads");
  return {};
}
