import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: "Datenschutzerklärung – Norvik Intelligence",
  robots: { index: false, follow: false },
};

const sections = [
  {
    num: "1",
    title: "Verantwortlicher",
    content: "Norvik Intelligence, [Name, Anschrift, E-Mail]. Kontakt: [E-Mail-Adresse]",
  },
  {
    num: "2",
    title: "Allgemeine Hinweise zur Datenverarbeitung",
    content:
      "Wir verarbeiten personenbezogene Daten nur, soweit dies zur Bereitstellung unserer Website sowie unserer Leistungen erforderlich ist. Die Verarbeitung erfolgt auf Grundlage der DSGVO sowie des BDSG.",
  },
  {
    num: "3",
    title: "Hosting",
    content:
      "Diese Website wird bei Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA gehostet. Vercel ist Empfänger Ihrer personenbezogenen Daten und fungiert als Auftragsverarbeiter. Ein Auftragsverarbeitungsvertrag (DPA) ist mit Vercel abgeschlossen.",
  },
  {
    num: "4",
    title: "Server-Logfiles",
    content:
      "Beim Aufruf der Website werden technisch erforderliche Daten (IP-Adresse, Zeitstempel, aufgerufene URL, Browsertyp) automatisch erfasst. Diese Daten dienen ausschließlich der Sicherstellung des technischen Betriebs und werden nach spätestens 30 Tagen gelöscht. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.",
  },
  {
    num: "5",
    title: "Kontaktformular und Kontaktaufnahme per E-Mail",
    content:
      "Wenn Sie uns über das Kontaktformular oder per E-Mail kontaktieren, verarbeiten wir Ihre Angaben (Name, E-Mail-Adresse, Unternehmen, Nachricht) zur Bearbeitung Ihrer Anfrage. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Anbahnung eines Vertragsverhältnisses) bzw. lit. f DSGVO (berechtigtes Interesse an der Beantwortung von Anfragen). Speicherdauer: bis zu 6 Monate nach Abschluss der Anfrage, sofern keine gesetzliche Aufbewahrungspflicht besteht.",
  },
  {
    num: "6",
    title: "Eingesetzte Drittanbieter-Tools",
    content:
      "[Bitte ergänzen: z. B. Analytics (Plausible/PostHog), Kalendertools (Calendly), eingebettete Inhalte, Google Fonts, LinkedIn-Pixel, Consent-Management-Tool etc. — soweit eingesetzt.]",
  },
  {
    num: "7",
    title: "Ihre Rechte",
    content:
      "Sie haben das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16 DSGVO), Löschung (Art. 17 DSGVO), Einschränkung der Verarbeitung (Art. 18 DSGVO), Datenübertragbarkeit (Art. 20 DSGVO) sowie Widerspruch (Art. 21 DSGVO). Sie können sich jederzeit bei einer Datenschutz-Aufsichtsbehörde beschweren.",
  },
  {
    num: "8",
    title: "SSL-/TLS-Verschlüsselung",
    content:
      `Diese Website nutzt aus Sicherheitsgründen eine SSL-/TLS-verschlüsselte Verbindung. Eine verschlüsselte Verbindung erkennen Sie an der "https://"-Adresse und dem Schloss-Symbol in Ihrer Browserzeile.`,
  },
];

export default function DatenschutzPage() {
  return (
    <div className="min-h-screen bg-[#060E1D] text-slate-300">
      <header className="border-b border-white/6 py-4 px-6">
        <Link href="/" className="inline-flex items-center">
          <Image src="/norvik-logo-white.png" alt="Norvik Intelligence" width={100} height={34} className="h-6 w-auto opacity-80 hover:opacity-100 transition-opacity" />
        </Link>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-20">
        <h1 className="text-3xl font-bold text-white mb-2">Datenschutzerklärung</h1>
        <p className="text-sm text-slate-600 mb-12">Stand: [Datum einfügen]</p>

        <div className="space-y-10 text-sm leading-relaxed">
          {sections.map((s) => (
            <section key={s.num}>
              <h2 className="text-base font-semibold text-white mb-3">
                {s.num}. {s.title}
              </h2>
              <p className="text-slate-400">{s.content}</p>
            </section>
          ))}

          <section className="border-t border-white/6 pt-8">
            <p className="text-slate-600 text-xs">
              Hinweis: Diese Datenschutzerklärung wurde auf Basis einer Vorlage erstellt und muss
              mit Ihren konkreten Verarbeitungsprozessen und eingesetzten Tools vor der Veröffentlichung
              vervollständigt und rechtlich geprüft werden.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
