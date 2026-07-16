"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { createMediation, createDemandContact } from "./actions";

type SignalOption = { id: string; title: string; municipality: string | null };
type DemandOption = { id: string; name: string; org_type: string };

const ORG_TYPES = [
  { value: "kommune", label: "Kommune" },
  { value: "wohnungswirtschaft", label: "Wohnungswirtschaft" },
  { value: "gu", label: "Generalunternehmer" },
  { value: "privat_gewerblich", label: "Privat / Gewerblich" },
];

export function NewMediationForm({
  signals,
  demandContacts,
}: {
  signals: SignalOption[];
  demandContacts: DemandOption[];
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [signalId, setSignalId] = useState("");
  const [demandId, setDemandId] = useState("");
  const [newContact, setNewContact] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactOrgType, setContactOrgType] = useState("kommune");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    let targetDemandId = demandId;
    if (newContact) {
      const created = await createDemandContact({
        name: contactName,
        org_type: contactOrgType,
        email: contactEmail || null,
        phone: contactPhone || null,
      });
      if (created.error || !created.id) {
        setError(created.error ?? "Kontakt konnte nicht angelegt werden.");
        setLoading(false);
        return;
      }
      targetDemandId = created.id;
    }

    const result = await createMediation(signalId, targetDemandId);
    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }
    setOpen(false);
    setSignalId("");
    setDemandId("");
    setContactName("");
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
        Neue Vermittlung
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-5 space-y-3 max-w-xl">
      <h2 className="font-semibold text-sm text-gray-800">Neue Vermittlung starten</h2>

      <select
        required
        value={signalId}
        onChange={(e) => setSignalId(e.target.value)}
        className="w-full h-10 px-3 rounded-lg border border-gray-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-700"
      >
        <option value="">Signal wählen …</option>
        {signals.map((s) => (
          <option key={s.id} value={s.id}>
            {s.title.slice(0, 80)} {s.municipality ? `(${s.municipality})` : ""}
          </option>
        ))}
      </select>

      <label className="flex items-center gap-2 text-xs text-gray-600">
        <input
          type="checkbox"
          checked={newContact}
          onChange={(e) => setNewContact(e.target.checked)}
          className="accent-green-800"
        />
        Neuen Bauherren-Kontakt anlegen
      </label>

      {newContact ? (
        <div className="grid grid-cols-2 gap-3">
          <input
            required
            placeholder="Name / Organisation"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            className="h-10 px-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
          />
          <select
            value={contactOrgType}
            onChange={(e) => setContactOrgType(e.target.value)}
            className="h-10 px-3 rounded-lg border border-gray-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-700"
          >
            {ORG_TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
          <input
            type="email"
            placeholder="E-Mail (optional)"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            className="h-10 px-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
          />
          <input
            placeholder="Telefon (optional)"
            value={contactPhone}
            onChange={(e) => setContactPhone(e.target.value)}
            className="h-10 px-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
          />
        </div>
      ) : (
        <select
          required
          value={demandId}
          onChange={(e) => setDemandId(e.target.value)}
          className="w-full h-10 px-3 rounded-lg border border-gray-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-700"
        >
          <option value="">Bauherren-Kontakt wählen …</option>
          {demandContacts.map((d) => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </select>
      )}

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
          Anlegen
        </button>
      </div>
    </form>
  );
}
