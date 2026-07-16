"use server";

import { revalidatePath } from "next/cache";
import { adminClient } from "@/lib/radar/supabase";
import { getAuthContext } from "@/lib/radar/supabase-server";

type Result = { error?: string };

const VALID_TYPES = ["trgs519", "freistellung_48b", "entsorgungsfachbetrieb", "sonstige"];

export async function registerCertificate(input: {
  type: string;
  file_path: string;
  valid_until: string | null;
}): Promise<Result> {
  const auth = await getAuthContext();
  if (!auth?.companyId) return { error: "Nicht angemeldet." };
  if (!VALID_TYPES.includes(input.type)) return { error: "Ungültiger Zertifikatstyp." };
  // The file must live under the caller's own storage prefix
  if (!input.file_path.startsWith(`${auth.companyId}/`)) {
    return { error: "Ungültiger Dateipfad." };
  }

  const db = adminClient();
  const { error } = await db.from("certifications").insert({
    company_id: auth.companyId,
    type: input.type,
    file_path: input.file_path,
    valid_until: input.valid_until,
  });
  if (error) return { error: "Speichern fehlgeschlagen." };

  // Move company into the review queue for verification
  await db
    .from("companies")
    .update({ verification_status: "docs_pending" })
    .eq("id", auth.companyId)
    .eq("verification_status", "unverified");

  revalidatePath("/radar/portal/profile");
  return {};
}
