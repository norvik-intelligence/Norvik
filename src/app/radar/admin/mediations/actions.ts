"use server";

import { revalidatePath } from "next/cache";
import { adminClient } from "@/lib/radar/supabase";
import { getAuthContext } from "@/lib/radar/supabase-server";

type Result = { error?: string };

const VALID_STATUSES = [
  "proposed",
  "owner_interested",
  "matching",
  "contact_made",
  "closed_won",
  "closed_lost",
];

const VALID_ORG_TYPES = ["kommune", "wohnungswirtschaft", "gu", "privat_gewerblich"];

async function requireAdmin() {
  const auth = await getAuthContext();
  if (!auth?.isAdmin) throw new Error("Forbidden");
  return auth;
}

export async function createDemandContact(input: {
  name: string;
  org_type: string;
  email: string | null;
  phone: string | null;
}): Promise<Result & { id?: string }> {
  const auth = await requireAdmin();
  if (!input.name.trim()) return { error: "Name fehlt." };
  if (!VALID_ORG_TYPES.includes(input.org_type)) return { error: "Ungültiger Typ." };

  const db = adminClient();
  const resp = await db
    .from("demand_contacts")
    .insert({
      name: input.name.trim(),
      org_type: input.org_type,
      email: input.email,
      phone: input.phone,
    })
    .select("id")
    .single();

  if (resp.error || !resp.data) return { error: "Anlegen fehlgeschlagen." };

  await db.from("audit_log").insert({
    actor: auth.userId,
    action: "demand_contact.create",
    entity: "demand_contacts",
    entity_id: resp.data.id,
    payload: { name: input.name },
  });

  return { id: resp.data.id };
}

export async function createMediation(
  signalId: string,
  demandContactId: string
): Promise<Result> {
  const auth = await requireAdmin();
  if (!signalId || !demandContactId) return { error: "Signal und Kontakt wählen." };

  const db = adminClient();
  const resp = await db
    .from("mediations")
    .insert({ signal_id: signalId, demand_contact_id: demandContactId, status: "proposed" })
    .select("id")
    .single();

  if (resp.error || !resp.data) return { error: "Anlegen fehlgeschlagen." };

  await db.from("audit_log").insert({
    actor: auth.userId,
    action: "mediation.create",
    entity: "mediations",
    entity_id: resp.data.id,
    payload: { signal_id: signalId, demand_contact_id: demandContactId },
  });

  revalidatePath("/radar/admin/mediations");
  return {};
}

export async function updateMediationStatus(
  mediationId: string,
  status: string
): Promise<Result> {
  const auth = await requireAdmin();
  if (!VALID_STATUSES.includes(status)) return { error: "Ungültiger Status." };

  const db = adminClient();
  const { error } = await db
    .from("mediations")
    .update({ status })
    .eq("id", mediationId);
  if (error) return { error: "Update fehlgeschlagen." };

  await db.from("audit_log").insert({
    actor: auth.userId,
    action: "mediation.status_change",
    entity: "mediations",
    entity_id: mediationId,
    payload: { status },
  });

  revalidatePath("/radar/admin/mediations");
  return {};
}

// ── Lead offers from a mediation ─────────────────────────────────────────────

export async function offerLead(input: {
  mediationId: string;
  companyId: string;
  feeCents: number;
  feeBand: string;
}): Promise<Result> {
  const auth = await requireAdmin();
  if (input.feeCents < 0 || input.feeCents > 10_000_00 * 10) {
    return { error: "Ungültige Gebühr." };
  }

  const db = adminClient();
  const resp = await db
    .from("leads")
    .insert({
      mediation_id: input.mediationId,
      company_id: input.companyId,
      fee_cents: input.feeCents,
      fee_band: input.feeBand,
      status: "offered",
    })
    .select("id")
    .single();

  if (resp.error || !resp.data) return { error: "Lead konnte nicht angeboten werden." };

  await db.from("audit_log").insert({
    actor: auth.userId,
    action: "lead.offer",
    entity: "leads",
    entity_id: resp.data.id,
    payload: input,
  });

  revalidatePath("/radar/admin/mediations");
  revalidatePath("/radar/admin/leads");
  return {};
}
