"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { ExternalLink, Lock, List, Map as MapIcon } from "lucide-react";
import { messages } from "@/lib/radar/messages";

const m = messages.portal;

// MapLibre only loads client-side
const FeedMap = dynamic(() => import("./FeedMap"), {
  ssr: false,
  loading: () => (
    <div className="h-[480px] rounded-xl bg-gray-100 animate-pulse flex items-center justify-center text-sm text-gray-400">
      {messages.common.loading}
    </div>
  ),
});

export type FeedSignal = {
  id: string;
  title: string;
  summary: string | null;
  address_text: string | null;
  addressLocked: boolean;
  postcode: string | null;
  municipality: string | null;
  lat: number | null;
  lng: number | null;
  project_phase: string | null;
  volume_estimate_band: string | null;
  hazmat_indicators: string[] | null;
  score: number | null;
  source_url: string;
  published_at: string | null;
  trades: { slug: string; name: string }[];
};

const PHASE_LABELS: Record<string, string> = {
  idee: "Idee",
  beschluss: "Beschluss",
  planung: "Planung",
  vor_ausschreibung: "Vor Ausschreibung",
  ausgeschrieben: "Ausgeschrieben",
};

const VOLUME_LABELS: Record<string, string> = {
  s: "< 100k €",
  m: "100–500k €",
  l: "500k–2 Mio. €",
  xl: "> 2 Mio. €",
};

const TRADES = [
  { slug: "rueckbau",   name: "Rückbau" },
  { slug: "schadstoff", name: "Schadstoff" },
  { slug: "geruest",    name: "Gerüst" },
  { slug: "abdichtung", name: "Abdichtung" },
  { slug: "entsorgung", name: "Entsorgung" },
  { slug: "gutachten",  name: "Gutachten" },
];

export function FeedView({
  signals,
  activeTrade,
  activePhase,
}: {
  signals: FeedSignal[];
  activeTrade: string | null;
  activePhase: string | null;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [view, setView] = useState<"list" | "map">("list");

  function setFilter(key: "trade" | "phase", value: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`/radar/portal?${params.toString()}`);
  }

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <h1 className="text-2xl font-bold" style={{ color: "#1A3A2A" }}>
          {m.feedTitle}
        </h1>
        <div className="flex rounded-lg overflow-hidden border border-gray-300">
          <button
            onClick={() => setView("list")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold ${
              view === "list" ? "bg-green-900 text-white" : "bg-white text-gray-600"
            }`}
          >
            <List className="h-3.5 w-3.5" />
            {m.mapListToggleList}
          </button>
          <button
            onClick={() => setView("map")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold ${
              view === "map" ? "bg-green-900 text-white" : "bg-white text-gray-600"
            }`}
          >
            <MapIcon className="h-3.5 w-3.5" />
            {m.mapListToggleMap}
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold text-gray-500">{m.filterTrade}:</span>
          <button
            onClick={() => setFilter("trade", null)}
            className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
              !activeTrade ? "bg-green-900 text-white border-green-900" : "bg-white text-gray-600 border-gray-300"
            }`}
          >
            {m.filterAll}
          </button>
          {TRADES.map((t) => (
            <button
              key={t.slug}
              onClick={() => setFilter("trade", t.slug)}
              className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                activeTrade === t.slug
                  ? "bg-green-900 text-white border-green-900"
                  : "bg-white text-gray-600 border-gray-300"
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold text-gray-500">{m.filterPhase}:</span>
          <button
            onClick={() => setFilter("phase", null)}
            className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
              !activePhase ? "bg-green-900 text-white border-green-900" : "bg-white text-gray-600 border-gray-300"
            }`}
          >
            {m.filterAll}
          </button>
          {Object.entries(PHASE_LABELS).map(([slug, label]) => (
            <button
              key={slug}
              onClick={() => setFilter("phase", slug)}
              className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                activePhase === slug
                  ? "bg-green-900 text-white border-green-900"
                  : "bg-white text-gray-600 border-gray-300"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {signals.length === 0 && (
        <div className="text-center py-20 text-gray-400 bg-white rounded-xl border border-gray-200">
          <p className="text-3xl mb-3">📡</p>
          <p className="font-medium text-gray-600">{m.feedEmpty}</p>
          <p className="text-sm mt-1 max-w-md mx-auto">{m.feedEmptyHint}</p>
        </div>
      )}

      {view === "map" && signals.length > 0 && <FeedMap signals={signals} />}

      {view === "list" && (
        <div className="space-y-4">
          {signals.map((s) => (
            <SignalCard key={s.id} signal={s} />
          ))}
        </div>
      )}
    </div>
  );
}

function SignalCard({ signal }: { signal: FeedSignal }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center gap-2 flex-wrap mb-2">
        {signal.project_phase && (
          <span
            className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded text-white"
            style={{ background: "#1A3A2A" }}
          >
            {PHASE_LABELS[signal.project_phase]}
          </span>
        )}
        {signal.volume_estimate_band && (
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 font-medium">
            {VOLUME_LABELS[signal.volume_estimate_band]}
          </span>
        )}
        {signal.score !== null && (
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">
            Score {signal.score}
          </span>
        )}
        {signal.published_at && (
          <span className="text-[10px] text-gray-400 ml-auto">
            {new Date(signal.published_at).toLocaleDateString("de-DE")}
          </span>
        )}
      </div>

      <h3 className="font-semibold text-sm text-gray-900 mb-1">{signal.title}</h3>

      <p className="text-xs text-gray-500 mb-2 flex items-center gap-1.5">
        {signal.address_text ? (
          signal.address_text
        ) : (
          <>
            {[signal.municipality, signal.postcode].filter(Boolean).join(" · ")}
            {signal.addressLocked && (
              <span className="inline-flex items-center gap-1 text-amber-600" title={m.addressLocked}>
                <Lock className="h-3 w-3" />
              </span>
            )}
          </>
        )}
      </p>

      {signal.summary && (
        <p className="text-xs text-gray-600 leading-relaxed mb-3">{signal.summary}</p>
      )}

      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {signal.trades.map((t) => (
            <span key={t.slug} className="text-[10px] px-2 py-0.5 rounded-full bg-green-50 text-green-800 font-medium">
              {t.name}
            </span>
          ))}
          {(signal.hazmat_indicators ?? []).slice(0, 3).map((h) => (
            <span key={h} className="text-[10px] px-2 py-0.5 rounded-full bg-orange-50 text-orange-700 font-medium">
              ⚠️ {h}
            </span>
          ))}
        </div>
        <a
          href={signal.source_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs text-blue-600 hover:underline flex-shrink-0"
        >
          <ExternalLink className="h-3 w-3" />
          {m.sourceLink}
        </a>
      </div>
    </div>
  );
}
