import type { Metadata } from "next";
import Link from "next/link";
import { adminClient } from "@/lib/radar/supabase";

export const metadata: Metadata = { title: "Admin – RückbauRadar" };
export const dynamic = "force-dynamic";

async function getStats() {
  try {
    const db = adminClient();
    const [sigs, sources, companies] = await Promise.all([
      db.from("signals").select("status", { count: "exact", head: false }),
      db.from("sources").select("id, last_status, last_run_at", { count: "exact", head: false }),
      db.from("companies").select("verification_status", { count: "exact", head: false }),
    ]);

    const signalsByStatus = (sigs.data ?? []).reduce<Record<string, number>>((acc, s) => {
      acc[s.status] = (acc[s.status] ?? 0) + 1;
      return acc;
    }, {});

    const pendingCompanies = (companies.data ?? []).filter(
      (c) => c.verification_status === "docs_pending"
    ).length;

    const lastSource = (sources.data ?? []).sort((a, b) =>
      (b.last_run_at ?? "").localeCompare(a.last_run_at ?? "")
    )[0];

    return {
      signalsByStatus,
      totalSignals: sigs.count ?? 0,
      totalSources: sources.count ?? 0,
      pendingCompanies,
      lastRun: lastSource?.last_run_at,
    };
  } catch {
    return null;
  }
}

export default async function AdminPage() {
  const stats = await getStats();

  const cards = [
    {
      label: "Zur Review",
      value: stats?.signalsByStatus["auto_flagged"] ?? "—",
      href: "/radar/admin/queue",
      color: "#DC2626",
    },
    {
      label: "Signale gesamt",
      value: stats?.totalSignals ?? "—",
      href: "/radar/admin/queue",
      color: "#1A3A2A",
    },
    {
      label: "Quellen aktiv",
      value: stats?.totalSources ?? "—",
      href: "/radar/admin/sources",
      color: "#2E6B4D",
    },
    {
      label: "Betriebe (pending)",
      value: stats?.pendingCompanies ?? "—",
      href: "/radar/admin/companies",
      color: "#92400E",
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold" style={{ color: "#1A3A2A" }}>
          Dashboard
        </h1>
        {stats?.lastRun && (
          <p className="text-sm text-gray-500 mt-1">
            Letzter Pipeline-Lauf:{" "}
            {new Date(stats.lastRun).toLocaleString("de-DE", { timeZone: "Europe/Berlin" })}
          </p>
        )}
      </div>

      {!stats && (
        <div className="mb-6 p-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-sm">
          Supabase-Verbindung nicht konfiguriert. Bitte{" "}
          <code className="font-mono">SUPABASE_URL</code> und{" "}
          <code className="font-mono">SUPABASE_SERVICE_ROLE_KEY</code> als Umgebungsvariablen setzen.
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="p-5 rounded-xl bg-white border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="text-3xl font-bold mb-1" style={{ color: c.color }}>
              {c.value}
            </div>
            <div className="text-xs text-gray-500 font-medium">{c.label}</div>
          </Link>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-800 mb-4">Schnellzugriff</h2>
          <div className="space-y-2">
            {[
              { href: "/radar/admin/queue", label: "Signal-Queue öffnen →" },
              { href: "/radar/admin/sources", label: "Quellen-Monitor →" },
              { href: "/radar/admin/companies", label: "Betriebe prüfen →" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-sm text-green-800 hover:text-green-600 font-medium py-1"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-800 mb-4">Signal-Status</h2>
          {stats ? (
            <div className="space-y-2">
              {Object.entries(stats.signalsByStatus).map(([status, count]) => (
                <div key={status} className="flex justify-between text-sm">
                  <span className="text-gray-600">{status}</span>
                  <span className="font-semibold text-gray-800">{count}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">Keine Daten verfügbar</p>
          )}
        </div>
      </div>
    </div>
  );
}
