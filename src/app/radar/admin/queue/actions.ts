"use server";

import { revalidatePath } from "next/cache";
import { adminClient } from "@/lib/radar/supabase";
import { getAuthContext } from "@/lib/radar/supabase-server";

export async function reviewSignal(
  signalId: string,
  action: "approve" | "reject"
): Promise<void> {
  const auth = await getAuthContext();
  if (!auth?.isAdmin) throw new Error("Forbidden");

  const db = adminClient();
  const newStatus = action === "approve" ? "approved" : "rejected";

  await db.from("signals").update({ status: newStatus }).eq("id", signalId);

  await db.from("audit_log").insert({
    actor: auth.userId,
    action: `signal.${action}`,
    entity: "signals",
    entity_id: signalId,
    payload: { action },
  });

  revalidatePath("/radar/admin/queue");
  revalidatePath("/radar/admin");
}
