"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Check, X, ExternalLink, Mail, Phone } from "lucide-react";
import { respondToLead } from "./actions";
import { messages } from "@/lib/radar/messages";

const m = messages.portal;

export type PortalLead = {
  id: string;
  status: string;
  fee_cents: number | null;
  created_at: string;
  signal: {
    title: string;
    summary: string | null;
    municipality: string | null;
    postcode: string | null;
    project_phase: string | null;
    volume_estimate_band: string | null;
    source_url: string;
  } | null;
  contact: {
    name: string;
    org_type: string;
    email: string | null;
    phone: string | null;
  } | null;
};

const STATUS_LABELS: Record<string, { label: string; bg: string; text: string }> = {
  offered:  { label: "Angeboten",   bg: "#FEF3C7", text: "#92400E" },
  accepted: { label: "Angenommen",  bg: "#DCFCE7", text: "#16A34A" },
  declined: { label: "Abgelehnt",   bg: "#F3F4F6", text: "#6B7280" },
  invoiced: { label: "In Rechnung", bg: "#DBEAFE", text: "#1D4ED8" },
  paid:     { label: "Bezahlt",     bg: "#DCFCE7", text: "#16A34A" },
  refunded: { label: "Erstattet",   bg: "#FEE2E2", text: "#DC2626" },
};

const ORG_LABELS: Record<string, string> = {
  kommune: "Kommune",
  wohnungswirtschaft: "Wohnungswirtschaft",
  gu: "Generalunternehmer",
  privat_gewerblich: "Privat / Gewerblich",
};

function formatFee(cents: number | null): string {
  if (cents == null) return "–";
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(cents / 100);
}

export function LeadCard({ lead }: { lead: PortalLead }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const style = STATUS_LABELS[lead.status] ?? STATUS_LABELS["offered"]!;

  function respond(action: "accept" | "decline") {
    if (action === "accept" && !window.confirm(m.leadAcceptConfirm)) return;
    startTransition(async () => {
      const result = await respondToLead(lead.id, action);
      if (result.error) setError(result.error);
      router.refresh();
    });
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center gap-2 flex-wrap mb-2">
        <span
          className="text-[10px] font-bold px-1.5 py-0.5 rounded"
          style={{ background: style.bg, color: style.text }}
        >
          {style.label}
        </span>
        <span className="text-xs text-gray-500">
          {m.leadFee}: <strong>{formatFee(lead.fee_cents)}</strong>
        </span>
        <span className="text-[10px] text-gray-400 ml-auto">
          {new Date(lead.created_at).toLocaleDateString("de-DE")}
        </span>
      </div>

      {lead.signal && (
        <>
          <h3 className="font-semibold text-sm text-gray-900 mb-1">{lead.signal.title}</h3>
          <p className="text-xs text-gray-500 mb-2">
            {[lead.signal.municipality, lead.signal.postcode].filter(Boolean).join(" · ")}
          </p>
          {lead.signal.summary && (
            <p className="text-xs text-gray-600 leading-relaxed mb-3">{lead.signal.summary}</p>
          )}
        </>
      )}

      {/* Contact data – only present after acceptance */}
      {lead.contact && (
        <div className="mb-3 p-3 rounded-lg bg-green-50 border border-green-200">
          <p className="text-xs font-semibold text-green-900 mb-1">
            {lead.contact.name}
            <span className="font-normal text-green-700 ml-1">
              · {ORG_LABELS[lead.contact.org_type] ?? lead.contact.org_type}
            </span>
          </p>
          <div className="flex flex-wrap gap-3 text-xs text-green-800">
            {lead.contact.email && (
              <a href={`mailto:${lead.contact.email}`} className="flex items-center gap-1 hover:underline">
                <Mail className="h-3 w-3" />
                {lead.contact.email}
              </a>
            )}
            {lead.contact.phone && (
              <a href={`tel:${lead.contact.phone}`} className="flex items-center gap-1 hover:underline">
                <Phone className="h-3 w-3" />
                {lead.contact.phone}
              </a>
            )}
          </div>
        </div>
      )}

      {lead.status === "accepted" && (
        <p className="text-xs text-green-700 mb-3">{m.leadAcceptedInfo}</p>
      )}

      {error && <p className="text-xs text-red-600 mb-2">{error}</p>}

      <div className="flex items-center justify-between">
        {lead.signal && (
          <a
            href={lead.signal.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-blue-600 hover:underline"
          >
            <ExternalLink className="h-3 w-3" />
            {m.sourceLink}
          </a>
        )}
        {lead.status === "offered" && (
          <div className="flex gap-2">
            <button
              onClick={() => respond("decline")}
              disabled={pending}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
            >
              <X className="h-3 w-3" />
              {m.leadDecline}
            </button>
            <button
              onClick={() => respond("accept")}
              disabled={pending}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white disabled:opacity-50"
              style={{ background: "#1A3A2A" }}
            >
              <Check className="h-3 w-3" />
              {m.leadAccept}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
