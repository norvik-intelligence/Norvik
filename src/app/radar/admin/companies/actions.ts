"use server";

import { revalidatePath } from "next/cache";
import { adminClient } from "@/lib/radar/supabase";
import { getAuthContext } from "@/lib/radar/supabase-server";

export async function verifyCompany(companyId: string): Promise<void> {
  const auth = await getAuthContext();
  if (!auth?.isAdmin) throw new Error("Forbidden");

  const db = adminClient();

  await db
    .from("companies")
    .update({ verification_status: "verified" })
    .eq("id", companyId);

  await db.from("audit_log").insert({
    actor: auth.userId,
    action: "company.verify",
    entity: "companies",
    entity_id: companyId,
    payload: { verification_status: "verified" },
  });

  revalidatePath("/radar/admin/companies");
}
