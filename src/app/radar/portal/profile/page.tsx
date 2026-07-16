import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { adminClient } from "@/lib/radar/supabase";
import { getAuthContext } from "@/lib/radar/supabase-server";
import { messages } from "@/lib/radar/messages";
import { CertUpload } from "./CertUpload";

export const metadata: Metadata = { title: messages.portal.profileTitle };
export const dynamic = "force-dynamic";

const STATUS_LABELS: Record<string, { label: string; bg: string; text: string }> = {
  unverified:   { label: "Nicht geprüft",    bg: "#F3F4F6", text: "#6B7280" },
  docs_pending: { label: "Prüfung läuft",    bg: "#FEF3C7", text: "#92400E" },
  verified:     { label: "Verifiziert ✓",    bg: "#DCFCE7", text: "#16A34A" },
  suspended:    { label: "Gesperrt",         bg: "#FEE2E2", text: "#DC2626" },
};

const CERT_LABELS: Record<string, string> = {
  trgs519: "TRGS 519 (Asbest)",
  freistellung_48b: "§48b-Freistellung",
  entsorgungsfachbetrieb: "Entsorgungsfachbetrieb",
  sonstige: "Sonstiges Zertifikat",
};

export default async function ProfilePage() {
  const auth = await getAuthContext();
  if (!auth?.companyId) redirect("/radar/registrieren");

  const db = adminClient();
  const [companyResp, certsResp, subsResp] = await Promise.all([
    db
      .from("companies")
      .select("name, legal_form, address, radius_km, website, phone, verification_status, company_trades(trades(name))")
      .eq("id", auth.companyId)
      .single(),
    db
      .from("certifications")
      .select("id, type, valid_until, verified_by_admin_at, created_at")
      .eq("company_id", auth.companyId)
      .order("created_at", { ascending: false }),
    db
      .from("subscriptions")
      .select("plan, status, ends_at, buyer_categories(name)")
      .eq("company_id", auth.companyId),
  ]);

  const company = companyResp.data;
  if (!company) redirect("/radar/registrieren");

  const certs = certsResp.data ?? [];
  const subs = subsResp.data ?? [];
  const status = STATUS_LABELS[company.verification_status] ?? STATUS_LABELS["unverified"]!;
  const trades = (company.company_trades ?? [])
    .map((ct) => (ct.trades as unknown as { name: string } | null)?.name)
    .filter(Boolean);

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-8" style={{ color: "#1A3A2A" }}>
        {messages.portal.profileTitle}
      </h1>

      {/* Company data */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h2 className="font-semibold text-gray-900">
              {company.name}
              {company.legal_form && (
                <span className="font-normal text-gray-400 ml-1">{company.legal_form}</span>
              )}
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">{company.address}</p>
          </div>
          <span
            className="text-xs font-bold px-2 py-1 rounded flex-shrink-0"
            style={{ background: status.bg, color: status.text }}
          >
            {status.label}
          </span>
        </div>
        <dl className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <dt className="text-xs text-gray-400">Einsatzradius</dt>
            <dd className="text-gray-700">{company.radius_km} km</dd>
          </div>
          {company.phone && (
            <div>
              <dt className="text-xs text-gray-400">Telefon</dt>
              <dd className="text-gray-700">{company.phone}</dd>
            </div>
          )}
          <div className="col-span-2">
            <dt className="text-xs text-gray-400">Gewerke</dt>
            <dd className="flex flex-wrap gap-1.5 mt-1">
              {trades.map((t) => (
                <span key={t as string} className="text-[10px] px-2 py-0.5 rounded-full bg-green-50 text-green-800 font-medium">
                  {t}
                </span>
              ))}
            </dd>
          </div>
        </dl>
      </div>

      {/* Subscriptions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="font-semibold text-gray-900 mb-3">Abonnements</h2>
        {subs.length === 0 && <p className="text-sm text-gray-400">Kein aktives Abo.</p>}
        <div className="space-y-2">
          {subs.map((s, i) => (
            <div key={i} className="flex items-center justify-between text-sm">
              <span className="text-gray-700">
                {(s.buyer_categories as unknown as { name: string } | null)?.name ?? "Alle Kategorien"}
                <span className="text-gray-400 ml-2 text-xs uppercase">{s.plan}</span>
              </span>
              <span className="text-xs text-gray-500">
                {s.status === "active"
                  ? s.ends_at
                    ? `bis ${new Date(s.ends_at).toLocaleDateString("de-DE")}`
                    : "aktiv"
                  : s.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Certificates */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-semibold text-gray-900 mb-1">Zertifikate</h2>
        <p className="text-xs text-gray-500 mb-4">
          TRGS 519, §48b-Freistellung oder Efb-Zertifikat hochladen – wir prüfen und
          schalten Ihr Verifiziert-Badge frei.
        </p>

        <CertUpload companyId={auth.companyId} />

        <div className="mt-4 space-y-2">
          {certs.map((cert) => (
            <div key={cert.id} className="flex items-center justify-between text-sm py-2 border-t border-gray-100">
              <span className="text-gray-700">{CERT_LABELS[cert.type] ?? cert.type}</span>
              <span
                className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                style={
                  cert.verified_by_admin_at
                    ? { background: "#DCFCE7", color: "#16A34A" }
                    : { background: "#FEF3C7", color: "#92400E" }
                }
              >
                {cert.verified_by_admin_at ? "Geprüft ✓" : "In Prüfung"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
