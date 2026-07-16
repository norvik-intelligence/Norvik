"use client";

import { useState, useTransition } from "react";
import { Check, X, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { reviewSignal } from "./actions";

type Trade = { slug: string; name: string };
type BuyerCat = { slug: string; name: string };

type Signal = {
  id: string;
  title: string;
  summary: string | null;
  address_text: string | null;
  postcode: string | null;
  municipality: string | null;
  project_phase: string | null;
  volume_estimate_band: string | null;
  hazmat_probability: number | null;
  hazmat_indicators: string[] | null;
  score: number | null;
  status: string;
  source_url: string;
  created_at: string;
  building_year_hint: number | null;
  signal_trades: { trades: Trade }[];
  signal_buyers: { buyer_categories: BuyerCat }[];
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

const SCORE_COLOR = (s: number | null) => {
  if (!s) return "#6B7280";
  if (s >= 75) return "#16A34A";
  if (s >= 50) return "#D97706";
  return "#DC2626";
};

export function SignalReviewCard({ signal }: { signal: Signal }) {
  const [expanded, setExpanded] = useState(false);
  const [done, setDone] = useState(false);
  const [pending, startTransition] = useTransition();

  const trades = signal.signal_trades?.map((st) => st.trades).filter(Boolean) ?? [];
  const buyers = signal.signal_buyers?.map((sb) => sb.buyer_categories).filter(Boolean) ?? [];

  function handleReview(action: "approve" | "reject") {
    startTransition(async () => {
      await reviewSignal(signal.id, action);
      setDone(true);
    });
  }

  if (done) {
    return (
      <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-400 flex items-center gap-2">
        <Check className="h-4 w-4" /> Erledigt
      </div>
    );
  }

  return (
    <div
      className="bg-white rounded-xl border border-gray-200 overflow-hidden"
      style={signal.status === "auto_flagged" ? { borderColor: "#16A34A" } : {}}
    >
      <div className="p-5">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              {signal.status === "auto_flagged" && (
                <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-green-100 text-green-700">
                  Empfohlen
                </span>
              )}
              <span
                className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded"
                style={{
                  background: `${SCORE_COLOR(signal.score)}18`,
                  color: SCORE_COLOR(signal.score),
                }}
              >
                Score: {signal.score ?? "?"}
              </span>
              {signal.project_phase && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-600">
                  {PHASE_LABELS[signal.project_phase] ?? signal.project_phase}
                </span>
              )}
              {signal.volume_estimate_band && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-50 text-blue-700">
                  {VOLUME_LABELS[signal.volume_estimate_band]}
                </span>
              )}
            </div>
            <h3 className="font-semibold text-sm text-gray-900 leading-snug">
              {signal.title}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              {[signal.municipality, signal.postcode].filter(Boolean).join(" · ")}
              {signal.building_year_hint && ` · Bj. ${signal.building_year_hint}`}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-2 flex-shrink-0">
            <button
              onClick={() => handleReview("approve")}
              disabled={pending}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 transition-colors"
            >
              <Check className="h-3 w-3" />
              Freigeben
            </button>
            <button
              onClick={() => handleReview("reject")}
              disabled={pending}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-100 text-red-700 hover:bg-red-200 disabled:opacity-50 transition-colors"
            >
              <X className="h-3 w-3" />
              Ablehnen
            </button>
          </div>
        </div>

        {/* Summary */}
        {signal.summary && (
          <p className="text-xs text-gray-600 leading-relaxed line-clamp-2 mb-3">
            {signal.summary}
          </p>
        )}

        {/* Trades + Buyers */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {trades.map((t) => (
            <span key={t.slug} className="text-[10px] px-2 py-0.5 rounded-full bg-green-50 text-green-800 font-medium">
              {t.name}
            </span>
          ))}
          {buyers.map((b) => (
            <span key={b.slug} className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-medium">
              {b.name}
            </span>
          ))}
          {(signal.hazmat_indicators ?? []).map((h) => (
            <span key={h} className="text-[10px] px-2 py-0.5 rounded-full bg-orange-50 text-orange-700 font-medium">
              ⚠️ {h}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <a
            href={signal.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-blue-600 hover:underline"
          >
            <ExternalLink className="h-3 w-3" />
            Quelldokument
          </a>
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600"
          >
            {expanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            {expanded ? "Weniger" : "Details"}
          </button>
        </div>
      </div>

      {/* Expanded details */}
      {expanded && (
        <div className="px-5 pb-5 pt-0 border-t border-gray-100">
          <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
            {signal.address_text && (
              <div>
                <span className="text-gray-400 block">Adresse</span>
                <span className="text-gray-700">{signal.address_text}</span>
              </div>
            )}
            {signal.hazmat_probability !== null && (
              <div>
                <span className="text-gray-400 block">Schadstoff-Wkt.</span>
                <span className="text-gray-700">
                  {Math.round((signal.hazmat_probability ?? 0) * 100)}%
                </span>
              </div>
            )}
            <div>
              <span className="text-gray-400 block">Erfasst</span>
              <span className="text-gray-700">
                {new Date(signal.created_at).toLocaleString("de-DE")}
              </span>
            </div>
            <div>
              <span className="text-gray-400 block">Signal-ID</span>
              <span className="font-mono text-gray-500 text-[10px]">{signal.id.slice(0, 8)}…</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
