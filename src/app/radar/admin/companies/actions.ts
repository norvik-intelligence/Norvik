"use server";

import { revalidatePath } from "next/cache";
import { adminClient } from "@/lib/radar/supabase";

export async function verifyCompany(companyId: string): Promise<void> {
  const db = adminClient();

  await db
    .from("companies")
    .update({ verification_status: "verified" })
    .eq("id", companyId);

  await db.from("audit_log").insert({
    actor: "admin",
    action: "company.verify",
    entity: "companies",
    entity_id: companyId,
    payload: { verification_status: "verified" },
  });

  revalidatePath("/radar/admin/companies");
}
