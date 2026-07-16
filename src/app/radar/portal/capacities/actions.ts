"use server";

import { revalidatePath } from "next/cache";
import { CapacitySchema, type CapacityInput } from "@rueckbauradar/shared";
import { adminClient } from "@/lib/radar/supabase";
import { getAuthContext } from "@/lib/radar/supabase-server";

type Result = { error?: string };

export async function addCapacity(input: CapacityInput): Promise<Result> {
  const auth = await getAuthContext();
  if (!auth?.companyId) return { error: "Nicht angemeldet." };

  const parsed = CapacitySchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Ungültige Eingabe." };
  }
  if (parsed.data.to_date < parsed.data.from_date) {
    return { error: "„Bis“ muss nach „Von“ liegen." };
  }

  const db = adminClient();
  const { error } = await db.from("capacities").insert({
    company_id: auth.companyId,
    from_date: parsed.data.from_date,
    to_date: parsed.data.to_date,
    team_size: parsed.data.team_size ?? null,
    note: parsed.data.note ?? null,
  });
  if (error) return { error: "Speichern fehlgeschlagen." };

  revalidatePath("/radar/portal/capacities");
  return {};
}

export async function deleteCapacity(capacityId: string): Promise<Result> {
  const auth = await getAuthContext();
  if (!auth?.companyId) return { error: "Nicht angemeldet." };

  const db = adminClient();
  // Scope delete to the caller's own company
  const { error } = await db
    .from("capacities")
    .delete()
    .eq("id", capacityId)
    .eq("company_id", auth.companyId);
  if (error) return { error: "Löschen fehlgeschlagen." };

  revalidatePath("/radar/portal/capacities");
  return {};
}
