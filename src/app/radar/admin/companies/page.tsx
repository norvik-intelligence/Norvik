import type { Metadata } from "next";
import { adminClient } from "@/lib/radar/supabase";
import { VerifyCompanyButton } from "./VerifyCompanyButton";

export const metadata: Metadata = { title: "Betriebe – Admin" };
export const dynamic = "force-dynamic";

async function getCompanies() {
  try {
    const db = adminClient();
    const resp = await db
      .from("companies")
      .select(
        `id, name, legal_form, address, verification_status, created_at,
         company_trades(trades(slug, name)),
         certifications(id, type, valid_until, verified_by_admin_at),
         contacts(name, email, phone, is_primary)`
      )
      .order("created_at", { ascending: false })
      .limit(100);
    return resp.data ?? [];
  } catch {
    return [];
  }
}

const STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  unverified:  { bg: "#F3F4F6", text: "#6B7280",  label: "Nicht geprüft" },
  docs_pending:{ bg: "#FEF3C7", text: "#92400E",  label: "Docs ausstehend" },
  verified:    { bg: "#DCFCE7", text: "#16A34A",  label: "Verifiziert" },
  suspended:   { bg: "#FEE2E2", text: "#DC2626",  label: "Gesperrt" },
};

export default async function CompaniesPage() {
  const companies = await getCompanies();
  const pendingCount = companies.filter((c) => c.verification_status === "docs_pending").length;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "#1A3A2A" }}>
            Betriebe
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {companies.length} gesamt · {pendingCount} zur Prüfung
          </p>
        </div>
        {pendingCount > 0 && (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
            {pendingCount} Docs ausstehend
          </span>
        )}
      </div>

      {companies.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <p className="text-3xl mb-3">🏗️</p>
          <p className="font-medium">Noch keine Betriebe registriert</p>
        </div>
      )}

      <div className="space-y-4">
        {companies.map((company) => {
          const style = STATUS_STYLES[company.verification_status] ?? STATUS_STYLES.unverified;
          const primaryContact = company.contacts?.find((c: { is_primary: boolean }) => c.is_primary) ??
            company.contacts?.[0];
          const trades = company.company_trades?.map((ct: { trades: { slug: string; name: string } }) => ct.trades) ?? [];
          const certs = company.certifications ?? [];

          return (
            <div
              key={company.id}
              className="bg-white rounded-xl border border-gray-200 p-5"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                      style={{ background: style.bg, color: style.text }}
                    >
                      {style.label}
                    </span>
                  </div>
                  <h3 className="font-semibold text-sm text-gray-900">
                    {company.name}
                    {company.legal_form && (
                      <span className="font-normal text-gray-400 ml-1">{company.legal_form}</span>
                    )}
                  </h3>
                  {company.address && (
                    <p className="text-xs text-gray-500 mt-0.5">{company.address}</p>
                  )}
                  {primaryContact && (
                    <p className="text-xs text-gray-400 mt-0.5">
                      {primaryContact.name}
                      {primaryContact.email && ` · ${primaryContact.email}`}
                    </p>
                  )}
                </div>

                <div className="flex gap-2 flex-shrink-0">
                  {company.verification_status !== "verified" && (
                    <VerifyCompanyButton companyId={company.id} />
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-3">
                {trades.map((t: { slug: string; name: string }) => (
                  <span
                    key={t.slug}
                    className="text-[10px] px-2 py-0.5 rounded-full bg-green-50 text-green-800 font-medium"
                  >
                    {t.name}
                  </span>
                ))}
              </div>

              {certs.length > 0 && (
                <div className="pt-3 border-t border-gray-100">
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Zertifikate ({certs.length})
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {certs.map((cert: { id: string; type: string; valid_until: string | null; verified_by_admin_at: string | null }) => (
                      <span
                        key={cert.id}
                        className="text-[10px] px-2 py-0.5 rounded"
                        style={{
                          background: cert.verified_by_admin_at ? "#DCFCE7" : "#FEF3C7",
                          color: cert.verified_by_admin_at ? "#16A34A" : "#92400E",
                        }}
                      >
                        {cert.type}
                        {cert.valid_until && ` bis ${cert.valid_until}`}
                        {cert.verified_by_admin_at ? " ✓" : " (ausstehend)"}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
