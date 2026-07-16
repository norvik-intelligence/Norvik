import type { Metadata } from "next";
import { adminClient } from "@/lib/radar/supabase";
import { CheckCircle, AlertCircle, Clock, RefreshCw } from "lucide-react";

export const metadata: Metadata = { title: "Quellen-Monitor – Admin" };
export const dynamic = "force-dynamic";

async function getSources() {
  try {
    const db = adminClient();
    const resp = await db
      .from("sources")
      .select("*, regions(name, slug)")
      .order("last_run_at", { ascending: false, nullsFirst: false });
    return resp.data ?? [];
  } catch {
    return [];
  }
}

function StatusBadge({ status }: { status: string | null }) {
  if (!status) {
    return (
      <span className="flex items-center gap-1 text-xs text-gray-400">
        <Clock className="h-3 w-3" />
        Noch nie gelaufen
      </span>
    );
  }
  if (status.startsWith("ok")) {
    return (
      <span className="flex items-center gap-1 text-xs text-green-700 font-medium">
        <CheckCircle className="h-3 w-3" />
        {status}
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1 text-xs text-red-700 font-medium">
      <AlertCircle className="h-3 w-3" />
      {status}
    </span>
  );
}

export default async function SourcesPage() {
  const sources = await getSources();

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "#1A3A2A" }}>
            Quellen-Monitor
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {sources.filter((s) => s.is_active).length} aktive /{" "}
            {sources.length} gesamt
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <RefreshCw className="h-3 w-3" />
          Täglich 05:30 UTC
        </div>
      </div>

      {sources.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <p className="text-3xl mb-3">📡</p>
          <p className="font-medium">Keine Quellen konfiguriert</p>
          <p className="text-sm mt-1">Führe zuerst das Seed-SQL in Supabase aus.</p>
        </div>
      )}

      <div className="space-y-3">
        {sources.map((src) => (
          <div
            key={src.id}
            className="bg-white rounded-xl border border-gray-200 p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span
                    className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded"
                    style={{
                      background: src.is_active ? "#DCFCE7" : "#F3F4F6",
                      color: src.is_active ? "#16A34A" : "#6B7280",
                    }}
                  >
                    {src.is_active ? "Aktiv" : "Inaktiv"}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-600 font-mono">
                    {src.type}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-600 font-mono">
                    {src.adapter_key}
                  </span>
                </div>
                <h3 className="font-semibold text-sm text-gray-900">{src.name}</h3>
                <p className="text-xs text-gray-400 font-mono mt-0.5 truncate max-w-md">
                  {src.base_url}
                </p>
              </div>

              <div className="text-right flex-shrink-0">
                <StatusBadge status={src.last_status} />
                {src.last_run_at && (
                  <p className="text-[10px] text-gray-400 mt-1">
                    {new Date(src.last_run_at).toLocaleString("de-DE", {
                      timeZone: "Europe/Berlin",
                      dateStyle: "short",
                      timeStyle: "short",
                    })}
                  </p>
                )}
              </div>
            </div>

            {src.config && Object.keys(src.config).length > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <pre className="text-[10px] text-gray-400 font-mono bg-gray-50 rounded p-2 overflow-x-auto">
                  {JSON.stringify(src.config, null, 2)}
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
