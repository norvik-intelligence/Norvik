import type { Metadata } from "next";
import { adminClient } from "@/lib/radar/supabase";
import { messages } from "@/lib/radar/messages";
import { Download } from "lucide-react";
import { LeadRow, type AdminLead } from "./LeadRow";
import { OfferLeadForm } from "./OfferLeadForm";

export const metadata: Metadata = { title: messages.admin.leadsTitle };
export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  const db = adminClient();

  const [leadsResp, mediationsResp, companiesResp] = await Promise.all([
    db
      .from("leads")
      .select(
        `id, fee_cents, fee_band, status, qualified_at, created_at,
         companies(id, name),
         mediations(id, signals(title, municipality))`
      )
      .order("created_at", { ascending: false }),
    db
      .from("mediations")
      .select("id, status, signals(title)")
      .in("status", ["matching", "owner_interested", "contact_made"])
      .order("created_at", { ascending: false }),
    db
      .from("companies")
      .select("id, name")
      .eq("verification_status", "verified")
      .order("name"),
  ]);

  const leads: AdminLead[] = (leadsResp.data ?? []).map((l) => ({
    id: l.id,
    fee_cents: l.fee_cents,
    fee_band: l.fee_band,
    status: l.status,
    qualified_at: l.qualified_at,
    created_at: l.created_at,
    company_name:
      (l.companies as unknown as { name: string } | null)?.name ?? "?",
    signal_title:
      ((l.mediations as unknown as { signals: { title: string } | null } | null)
        ?.signals?.title) ?? "–",
  }));

  const totalPaid = leads
    .filter((l) => l.status === "paid")
    .reduce((sum, l) => sum + (l.fee_cents ?? 0), 0);
  const totalOutstanding = leads
    .filter((l) => ["accepted", "invoiced"].includes(l.status))
    .reduce((sum, l) => sum + (l.fee_cents ?? 0), 0);

  const mediationOptions = (mediationsResp.data ?? []).map((med) => ({
    id: med.id,
    label:
      ((med.signals as unknown as { title: string } | null)?.title ?? med.id).slice(0, 80),
  }));

  return (
    <div className="p-8">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-8">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "#1A3A2A" }}>
            {messages.admin.leadsTitle}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Bezahlt: {(totalPaid / 100).toLocaleString("de-DE")} € · Offen:{" "}
            {(totalOutstanding / 100).toLocaleString("de-DE")} €
          </p>
        </div>
        <a
          href="/radar/admin/leads/export"
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          <Download className="h-4 w-4" />
          {messages.admin.exportCsv}
        </a>
      </div>

      <OfferLeadForm
        mediations={mediationOptions}
        companies={companiesResp.data ?? []}
      />

      <div className="mt-8 bg-white rounded-xl border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left text-xs text-gray-400 uppercase tracking-wider">
              <th className="px-4 py-3">Signal</th>
              <th className="px-4 py-3">Betrieb</th>
              <th className="px-4 py-3">Gebühr</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Datum</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-gray-400">
                  Noch keine Leads.
                </td>
              </tr>
            )}
            {leads.map((lead) => (
              <LeadRow key={lead.id} lead={lead} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
