"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { addCapacity } from "./actions";
import { messages } from "@/lib/radar/messages";

const m = messages.portal;

export function CapacityForm() {
  const router = useRouter();
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await addCapacity({
      from_date: fromDate,
      to_date: toDate,
      team_size: teamSize ? Number(teamSize) : undefined,
      note: note || undefined,
    });

    if (result.error) {
      setError(result.error);
    } else {
      setFromDate("");
      setToDate("");
      setTeamSize("");
      setNote("");
      router.refresh();
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <label className="text-xs text-gray-500">
          {m.capacityFrom}
          <input
            type="date"
            required
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="mt-1 w-full h-10 px-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
          />
        </label>
        <label className="text-xs text-gray-500">
          {m.capacityTo}
          <input
            type="date"
            required
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="mt-1 w-full h-10 px-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
          />
        </label>
        <label className="text-xs text-gray-500">
          {m.capacityTeam}
          <input
            type="number"
            min={1}
            max={500}
            value={teamSize}
            onChange={(e) => setTeamSize(e.target.value)}
            className="mt-1 w-full h-10 px-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
          />
        </label>
      </div>
      <input
        placeholder={m.capacityNote}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        maxLength={500}
        className="w-full h-10 px-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="px-5 h-10 rounded-lg font-semibold text-sm text-white disabled:opacity-50"
        style={{ background: "#1A3A2A" }}
      >
        {loading ? messages.common.loading : m.capacityAdd}
      </button>
    </form>
  );
}
