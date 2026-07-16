"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { offerLead } from "../mediations/actions";

const FEE_BANDS = [
  { band: "s",  label: "S · 249 €",    cents: 24900 },
  { band: "m",  label: "M · 690 €",    cents: 69000 },
  { band: "l",  label: "L · 1.490 €",  cents: 149000 },
  { band: "xl", label: "XL · 2.490 €", cents: 249000 },
];

export function OfferLeadForm({
  mediations,
  companies,
}: {
  mediations: { id: string; label: string }[];
  companies: { id: string; name: string }[];
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [mediationId, setMediationId] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [feeBand, setFeeBand] = useState("m");
  const [customFee, setCustomFee] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const band = FEE_BANDS.find((f) => f.band === feeBand);
    const feeCents = customFee
      ? Math.round(parseFloat(customFee.replace(",", ".")) * 100)
      : (band?.cents ?? 0);

    const result = await offerLead({ mediationId, companyId, feeCents, feeBand });
    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }
    setOpen(false);
    setMediationId("");
    setCompanyId("");
    setCustomFee("");
    setLoading(false);
    router.refresh();
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white"
        style={{ background: "#1A3A2A" }}
      >
        <Plus className="h-4 w-4" />
        Lead anbieten
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-5 space-y-3 max-w-xl">
      <h2 className="font-semibold text-sm text-gray-800">Lead an Betrieb anbieten</h2>

      <select
        required
        value={mediationId}
        onChange={(e) => setMediationId(e.target.value)}
        className="w-full h-10 px-3 rounded-lg border border-gray-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-700"
      >
        <option value="">Vermittlung wählen …</option>
        {mediations.map((m) => (
          <option key={m.id} value={m.id}>{m.label}</option>
        ))}
      </select>

      <select
        required
        value={companyId}
        onChange={(e) => setCompanyId(e.target.value)}
        className="w-full h-10 px-3 rounded-lg border border-gray-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-700"
      >
        <option value="">Verifizierten Betrieb wählen …</option>
        {companies.map((c) => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>

      <div className="grid grid-cols-2 gap-3">
        <select
          value={feeBand}
          onChange={(e) => setFeeBand(e.target.value)}
          className="h-10 px-3 rounded-lg border border-gray-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-700"
        >
          {FEE_BANDS.map((f) => (
            <option key={f.band} value={f.band}>{f.label}</option>
          ))}
        </select>
        <input
          placeholder="Individuelle Gebühr € (optional)"
          value={customFee}
          onChange={(e) => setCustomFee(e.target.value)}
          className="h-10 px-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="px-4 h-10 rounded-lg text-sm font-semibold bg-gray-100 text-gray-600"
        >
          Abbrechen
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 h-10 rounded-lg text-sm font-semibold text-white disabled:opacity-50"
          style={{ background: "#1A3A2A" }}
        >
          Anbieten
        </button>
      </div>
    </form>
  );
}
