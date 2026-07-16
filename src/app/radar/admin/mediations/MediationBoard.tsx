"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Trophy, XCircle } from "lucide-react";
import { updateMediationStatus } from "./actions";

export type BoardMediation = {
  id: string;
  status: string;
  notes: string | null;
  created_at: string;
  signal: { title: string; municipality: string | null } | null;
  demandContact: { name: string; org_type: string } | null;
  leads: { id: string; status: string; fee_cents: number | null; company_name: string }[];
};

const COLUMNS: { key: string; label: string; color: string }[] = [
  { key: "proposed",         label: "Vorgeschlagen",     color: "#6B7280" },
  { key: "owner_interested", label: "Bauherr interessiert", color: "#D97706" },
  { key: "matching",         label: "Matching",          color: "#2563EB" },
  { key: "contact_made",     label: "Kontakt hergestellt", color: "#7C3AED" },
  { key: "closed_won",       label: "Gewonnen",          color: "#16A34A" },
  { key: "closed_lost",      label: "Verloren",          color: "#DC2626" },
];

// Allowed forward transitions per status
const NEXT: Record<string, string[]> = {
  proposed: ["owner_interested", "closed_lost"],
  owner_interested: ["matching", "closed_lost"],
  matching: ["contact_made", "closed_lost"],
  contact_made: ["closed_won", "closed_lost"],
  closed_won: [],
  closed_lost: [],
};

const NEXT_LABELS: Record<string, string> = {
  owner_interested: "Interessiert",
  matching: "Matching",
  contact_made: "Kontakt",
  closed_won: "Gewonnen",
  closed_lost: "Verloren",
};

export function MediationBoard({ mediations }: { mediations: BoardMediation[] }) {
  return (
    <div className="grid gap-4 mt-8" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
      {COLUMNS.map((col) => {
        const items = mediations.filter((med) => med.status === col.key);
        return (
          <div key={col.key} className="min-w-0">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: col.color }} />
              <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 truncate">
                {col.label}
              </h2>
              <span className="text-xs text-gray-400">{items.length}</span>
            </div>
            <div className="space-y-3">
              {items.map((med) => (
                <MediationCard key={med.id} mediation={med} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function MediationCard({ mediation }: { mediation: BoardMediation }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const nextOptions = NEXT[mediation.status] ?? [];

  function move(status: string) {
    startTransition(async () => {
      await updateMediationStatus(mediation.id, status);
      router.refresh();
    });
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3">
      <p className="text-xs font-semibold text-gray-900 leading-snug mb-1">
        {mediation.signal?.title ?? "–"}
      </p>
      <p className="text-[10px] text-gray-400 mb-2">
        {mediation.signal?.municipality}
        {mediation.demandContact && ` · ${mediation.demandContact.name}`}
      </p>

      {mediation.leads.length > 0 && (
        <div className="mb-2 space-y-1">
          {mediation.leads.map((lead) => (
            <div key={lead.id} className="text-[10px] px-2 py-1 rounded bg-gray-50 text-gray-600 flex justify-between">
              <span className="truncate">{lead.company_name}</span>
              <span className="font-semibold flex-shrink-0 ml-1">{lead.status}</span>
            </div>
          ))}
        </div>
      )}

      {nextOptions.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {nextOptions.map((next) => (
            <button
              key={next}
              onClick={() => move(next)}
              disabled={pending}
              className="flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded disabled:opacity-50 transition-colors"
              style={
                next === "closed_won"
                  ? { background: "#DCFCE7", color: "#16A34A" }
                  : next === "closed_lost"
                    ? { background: "#FEE2E2", color: "#DC2626" }
                    : { background: "#EFF6FF", color: "#1D4ED8" }
              }
            >
              {next === "closed_won" ? (
                <Trophy className="h-2.5 w-2.5" />
              ) : next === "closed_lost" ? (
                <XCircle className="h-2.5 w-2.5" />
              ) : (
                <ArrowRight className="h-2.5 w-2.5" />
              )}
              {NEXT_LABELS[next]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
