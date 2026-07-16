"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateLeadStatus } from "./actions";

export type AdminLead = {
  id: string;
  fee_cents: number | null;
  fee_band: string | null;
  status: string;
  qualified_at: string | null;
  created_at: string;
  company_name: string;
  signal_title: string;
};

const STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  offered:  { bg: "#FEF3C7", text: "#92400E", label: "Angeboten" },
  accepted: { bg: "#DCFCE7", text: "#16A34A", label: "Angenommen" },
  declined: { bg: "#F3F4F6", text: "#6B7280", label: "Abgelehnt" },
  invoiced: { bg: "#DBEAFE", text: "#1D4ED8", label: "In Rechnung" },
  paid:     { bg: "#DCFCE7", text: "#16A34A", label: "Bezahlt" },
  refunded: { bg: "#FEE2E2", text: "#DC2626", label: "Erstattet" },
};

// Admin-side transitions (companies handle accept/decline themselves)
const NEXT: Record<string, { status: string; label: string }[]> = {
  accepted: [{ status: "invoiced", label: "Rechnung gestellt" }],
  invoiced: [
    { status: "paid", label: "Bezahlt" },
    { status: "refunded", label: "Erstattet" },
  ],
  paid: [{ status: "refunded", label: "Erstattet" }],
};

export function LeadRow({ lead }: { lead: AdminLead }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const style = STATUS_STYLES[lead.status] ?? STATUS_STYLES["offered"]!;
  const nextOptions = NEXT[lead.status] ?? [];

  return (
    <tr className="border-b border-gray-100 last:border-0">
      <td className="px-4 py-3 max-w-[280px]">
        <span className="text-gray-800 line-clamp-1">{lead.signal_title}</span>
      </td>
      <td className="px-4 py-3 text-gray-600">{lead.company_name}</td>
      <td className="px-4 py-3 font-semibold text-gray-800 whitespace-nowrap">
        {lead.fee_cents != null ? `${(lead.fee_cents / 100).toLocaleString("de-DE")} €` : "–"}
      </td>
      <td className="px-4 py-3">
        <span
          className="text-[10px] font-bold px-1.5 py-0.5 rounded whitespace-nowrap"
          style={{ background: style.bg, color: style.text }}
        >
          {style.label}
        </span>
      </td>
      <td className="px-4 py-3 text-xs text-gray-400 whitespace-nowrap">
        {new Date(lead.created_at).toLocaleDateString("de-DE")}
      </td>
      <td className="px-4 py-3">
        <div className="flex gap-1 justify-end">
          {nextOptions.map((opt) => (
            <button
              key={opt.status}
              onClick={() =>
                startTransition(async () => {
                  await updateLeadStatus(lead.id, opt.status);
                  router.refresh();
                })
              }
              disabled={pending}
              className="text-[10px] font-semibold px-2 py-1 rounded bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 whitespace-nowrap"
            >
              {opt.label}
            </button>
          ))}
        </div>
      </td>
    </tr>
  );
}
