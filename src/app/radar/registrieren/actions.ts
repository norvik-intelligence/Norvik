"use server";

import { CompanyOnboardingSchema, type CompanyOnboarding } from "@rueckbauradar/shared";
import { adminClient } from "@/lib/radar/supabase";
import { getAuthContext } from "@/lib/radar/supabase-server";

type Result = { error?: string };

export async function completeOnboarding(input: CompanyOnboarding): Promise<Result> {
  const auth = await getAuthContext();
  if (!auth) return { error: "Nicht angemeldet." };
  if (auth.companyId) return { error: "Firmenprofil existiert bereits." };

  const parsed = CompanyOnboardingSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Ungültige Eingabe." };
  }
  const data = parsed.data;

  const db = adminClient();

  // 1. Create company
  const companyResp = await db
    .from("companies")
    .insert({
      auth_user_id: auth.userId,
      name: data.name,
      legal_form: data.legal_form ?? null,
      address: data.address,
      website: data.website || null,
      phone: data.phone ?? null,
      radius_km: data.radius_km,
      verification_status: "unverified",
    })
    .select("id")
    .single();

  if (companyResp.error || !companyResp.data) {
    return { error: "Firma konnte nicht angelegt werden." };
  }
  const companyId = companyResp.data.id as string;

  // 2. Link trades
  const tradeRows = await db.from("trades").select("id, slug").in("slug", data.trade_slugs);
  if (tradeRows.data?.length) {
    await db
      .from("company_trades")
      .insert(tradeRows.data.map((t) => ({ company_id: companyId, trade_id: t.id })));
  }

  // 3. Free-trial subscription per buyer category (nationwide, 14 days)
  const catRows = await db
    .from("buyer_categories")
    .select("id, slug")
    .in("slug", data.buyer_category_slugs);
  if (catRows.data?.length) {
    const endsAt = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString();
    await db.from("subscriptions").insert(
      catRows.data.map((c) => ({
        company_id: companyId,
        buyer_category_id: c.id,
        radius_km: data.radius_km,
        plan: "free_trial",
        status: "active",
        ends_at: endsAt,
      }))
    );
  }

  // 4. Erfolgsvereinbarung: checkbox + timestamp into audit_log (spec requirement)
  await db.from("audit_log").insert({
    actor: auth.userId,
    action: "company.accept_lead_terms",
    entity: "companies",
    entity_id: companyId,
    payload: {
      accepts_lead_terms: true,
      accepted_at: new Date().toISOString(),
      email: auth.email,
    },
  });

  return {};
}
