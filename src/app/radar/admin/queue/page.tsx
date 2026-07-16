import type { Metadata } from "next";
import { adminClient } from "@/lib/radar/supabase";
import { SignalReviewCard } from "./SignalReviewCard";

export const metadata: Metadata = { title: "Review-Queue – Admin" };
export const dynamic = "force-dynamic";

async function getQueue() {
  try {
    const db = adminClient();
    const resp = await db
      .from("signals")
      .select(
        `id, title, summary, address_text, postcode, municipality, project_phase,
         volume_estimate_band, hazmat_probability, hazmat_indicators, score, status,
         source_url, created_at, building_year_hint,
         raw_documents!inner(url, source_id),
         signal_trades(trades(slug, name)),
         signal_buyers(buyer_categories(slug, name))`
      )
      .in("status", ["auto_flagged", "new"])
      .order("score", { ascending: false })
      .limit(50);

    return resp.data ?? [];
  } catch {
    return [];
  }
}

export default async function QueuePage() {
  const signals = await getQueue();

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "#1A3A2A" }}>
            Review-Queue
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {signals.length} Signal{signals.length !== 1 ? "e" : ""} zur Prüfung
          </p>
        </div>
        <div className="flex gap-2 text-xs">
          <span className="px-2 py-1 rounded bg-red-100 text-red-700 font-medium">
            {signals.filter((s) => s.status === "auto_flagged").length} auto_flagged
          </span>
          <span className="px-2 py-1 rounded bg-gray-100 text-gray-700 font-medium">
            {signals.filter((s) => s.status === "new").length} new
          </span>
        </div>
      </div>

      {signals.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <p className="text-4xl mb-3">✓</p>
          <p className="font-medium">Queue ist leer</p>
          <p className="text-sm mt-1">Alle Signale wurden bearbeitet.</p>
        </div>
      )}

      <div className="space-y-4">
        {signals.map((signal) => (
          // @ts-expect-error Supabase nested select types
          <SignalReviewCard key={signal.id} signal={signal} />
        ))}
      </div>
    </div>
  );
}
