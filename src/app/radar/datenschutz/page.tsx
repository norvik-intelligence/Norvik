import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Datenschutz – RückbauRadar" };

export default function DatenschutzPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <Link href="/radar" className="text-sm text-green-800 hover:underline mb-8 block">
        ← Zurück
      </Link>
      <h1 className="text-2xl font-bold mb-8" style={{ color: "#1A3A2A" }}>
        Datenschutzerklärung
      </h1>
      <div className="prose prose-sm text-gray-600 space-y-6">
        <p className="text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm">
          Diese Seite muss vor dem Launch durch eine vollständige Datenschutzerklärung ersetzt werden.
          Ein Rechtsanwalt oder Datenschutzbeauftragter sollte diese erstellen.
        </p>

        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Datenverarbeitung</h2>
          <p>
            RückbauRadar verarbeitet personenbezogene Daten von Nutzern (Firmenname, Kontaktdaten)
            zum Zweck der Plattform-Nutzung und E-Mail-Kommunikation.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Auftragsverarbeiter</h2>
          <ul className="list-disc pl-4 space-y-1">
            <li>
              <strong>Supabase Inc.</strong> (Datenbank, Auth, Storage) –
              AV-Vertrag abgeschlossen; Daten in EU-Rechenzentren (Frankfurt).
            </li>
            <li>
              <strong>Vercel Inc.</strong> (Hosting) –
              AV-Vertrag abgeschlossen; EU-Regionen verfügbar.
            </li>
            <li>
              <strong>Resend Inc.</strong> (E-Mail-Versand) –
              nur für Transaktions-E-Mails; keine Weitergabe an Dritte.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Löschfristen</h2>
          <p>
            Rohdokumente (öffentliche Quelldokumente) werden nach 24 Monaten automatisch gelöscht.
            Nutzerdaten auf Anfrage jederzeit.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Kontakt Datenschutz</h2>
          <p>datenschutz@rueckbauradar.de</p>
        </section>
      </div>
    </div>
  );
}
