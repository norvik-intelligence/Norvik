import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { adminClient } from "@/lib/radar/supabase";
import { getAuthContext } from "@/lib/radar/supabase-server";
import { messages } from "@/lib/radar/messages";
import { LeadCard, type PortalLead } from "./LeadCard";

export const metadata: Metadata = { title: messages.portal.leadsTitle };
export const dynamic = "force-dynamic";

const m = messages.portal;

export default async function LeadsInboxPage() {
  const auth = await getAuthContext();
  if (!auth?.companyId) redirect("/radar/registrieren");

  const db = adminClient();
  const resp = await db
    .from("leads")
    .select(
      `id, fee_cents, fee_band, status, created_at,
       mediations(
         id, status,
         signals(id, title, summary, municipality, postcode, project_phase, volume_estimate_band, source_url),
         demand_contacts(name, org_type, email, phone)
       )`
    )
    .eq("company_id", auth.companyId)
    .order("created_at", { ascending: false });

  const leads: PortalLead[] = (resp.data ?? []).map((l) => {
    const mediation = l.mediations as unknown as {
      signals: {
        title: string;
        summary: string | null;
        municipality: string | null;
        postcode: string | null;
        project_phase: string | null;
        volume_estimate_band: string | null;
        source_url: string;
      } | null;
      demand_contacts: {
        name: string;
        org_type: string;
        email: string | null;
        phone: string | null;
      } | null;
    } | null;

    const accepted = ["accepted", "invoiced", "paid"].includes(l.status);

    return {
      id: l.id,
      status: l.status,
      fee_cents: l.fee_cents,
      created_at: l.created_at,
      signal: mediation?.signals ?? null,
      // Contact data only visible AFTER acceptance (spec)
      contact: accepted ? (mediation?.demand_contacts ?? null) : null,
    };
  });

  const open = leads.filter((l) => l.status === "offered");
  const past = leads.filter((l) => l.status !== "offered");

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-8" style={{ color: "#1A3A2A" }}>
        {m.leadsTitle}
      </h1>

      {leads.length === 0 && (
        <div className="text-center py-16 text-gray-400 bg-white rounded-xl border border-gray-200">
          <p className="text-3xl mb-3">📥</p>
          <p className="font-medium text-gray-600">{m.leadsEmpty}</p>
        </div>
      )}

      {open.length > 0 && (
        <div className="space-y-4 mb-10">
          {open.map((lead) => (
            <LeadCard key={lead.id} lead={lead} />
          ))}
        </div>
      )}

      {past.length > 0 && (
        <>
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Verlauf
          </h2>
          <div className="space-y-4">
            {past.map((lead) => (
              <LeadCard key={lead.id} lead={lead} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
