import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Impressum – RückbauRadar" };

export default function ImpressumPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <Link href="/radar" className="text-sm text-green-800 hover:underline mb-8 block">
        ← Zurück
      </Link>
      <h1 className="text-2xl font-bold mb-8" style={{ color: "#1A3A2A" }}>
        Impressum
      </h1>
      <div className="prose prose-sm text-gray-600 space-y-4">
        <p className="text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm">
          Bitte vervollständige diese Seite mit deinen Angaben nach § 5 TMG vor dem Launch.
        </p>
        <p>
          <strong>Angaben gemäß § 5 TMG:</strong>
        </p>
        <p>
          [Name / Firma]<br />
          [Straße, PLZ, Ort]<br />
          Deutschland
        </p>
        <p>
          <strong>Kontakt:</strong><br />
          E-Mail: hallo@rueckbauradar.de
        </p>
        <p>
          <strong>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:</strong><br />
          [Name, Adresse wie oben]
        </p>
      </div>
    </div>
  );
}
