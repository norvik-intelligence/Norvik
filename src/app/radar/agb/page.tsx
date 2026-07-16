import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "AGB – RückbauRadar" };

export default function AgbPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <Link href="/radar" className="text-sm text-green-800 hover:underline mb-8 block">
        ← Zurück
      </Link>
      <h1 className="text-2xl font-bold mb-8" style={{ color: "#1A3A2A" }}>
        Allgemeine Geschäftsbedingungen
      </h1>
      <div className="text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm">
        Diese Seite muss vor dem Launch durch vollständige AGB ersetzt werden.
        Die AGB sollten insbesondere die Erfolgsvereinbarung für die Vermittlungs-Leads
        und die Kündigungsbedingungen für das Signal-Abo regeln.
      </div>
    </div>
  );
}
