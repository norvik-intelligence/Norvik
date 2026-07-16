import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "AGB",
  description: "Allgemeine Geschäftsbedingungen – Norvik Intelligence",
  robots: { index: false, follow: false },
};

const clauses = [
  {
    num: "1",
    title: "Geltungsbereich",
    text: `Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge zwischen Norvik Intelligence (nachfolgend "Norvik") und Unternehmern im Sinne des § 14 BGB (nachfolgend "Auftraggeber"). Abweichende AGB des Auftraggebers finden keine Anwendung.`,
  },
  {
    num: "2",
    title: "Leistungen",
    text: `Norvik Intelligence erbringt Research-, Marktanalyse-, Wettbewerbsanalyse-, Narrative-Intelligence- und Due-Diligence-nahe Beratungsleistungen in schriftlicher Form. Die Leistungen stellen keine Rechts-, Steuer- oder Abschlussprüfungsberatung dar.`,
  },
  {
    num: "3",
    title: "Vertragsschluss",
    text: `Ein Vertrag kommt durch schriftliche Bestätigung eines Angebots oder einer Beauftragung zustande. E-Mail gilt als schriftliche Form. Norvik ist an ein Angebot 14 Tage gebunden.`,
  },
  {
    num: "4",
    title: "Mitwirkungspflichten des Auftraggebers",
    text: `Der Auftraggeber stellt alle für das Projekt erforderlichen Informationen, Unterlagen und Zugänge rechtzeitig und vollständig zur Verfügung. Verzögerungen, die durch unzureichende Mitwirkung entstehen, gehen nicht zu Lasten von Norvik.`,
  },
  {
    num: "5",
    title: "Vergütung und Zahlungsbedingungen",
    text: `Es gelten die im Angebot vereinbarten Preise, zuzüglich der gesetzlichen Umsatzsteuer. Sofern nicht anders vereinbart, sind 50 % bei Auftragserteilung und 50 % bei Lieferung fällig. Rechnungen sind innerhalb von 14 Tagen nach Rechnungsdatum ohne Abzug zahlbar.`,
  },
  {
    num: "6",
    title: "Lieferzeiten",
    text: `Lieferzeiten sind projektabhängig und werden im Angebot vereinbart. Standardprojekte werden in der Regel innerhalb von 5–7 Werktagen geliefert; Express-Leistungen nach gesonderter Vereinbarung. Fristen gelten ab vollständiger Informationslieferung durch den Auftraggeber.`,
  },
  {
    num: "7",
    title: "Nutzungsrechte",
    text: `Norvik räumt dem Auftraggeber nach vollständiger Zahlung ein nicht-exklusives, nicht übertragbares Nutzungsrecht an den gelieferten Inhalten ein. Sämtliche gelieferten Inhalte sind ausschließlich zur internen Nutzung des Auftraggebers bestimmt, sofern nicht ausdrücklich etwas anderes vereinbart wurde. Eine Weitergabe an Dritte bedarf der schriftlichen Zustimmung von Norvik.`,
  },
  {
    num: "8",
    title: "Haftung",
    text: `Norvik haftet bei Vorsatz und grober Fahrlässigkeit unbeschränkt. Bei leichter Fahrlässigkeit ist die Haftung auf den vertragstypischen, vorhersehbaren Schaden beschränkt. Norvik haftet nicht für unternehmerische Entscheidungen, die auf Basis der gelieferten Analysen getroffen werden.`,
  },
  {
    num: "9",
    title: "Vertraulichkeit",
    text: `Beide Parteien verpflichten sich zur vertraulichen Behandlung aller im Rahmen des Mandats erhaltenen Informationen. Diese Verpflichtung gilt für die Dauer des Projekts sowie für 3 Jahre nach dessen Beendigung.`,
  },
  {
    num: "10",
    title: "Schlussbestimmungen",
    text: `Es gilt deutsches Recht unter Ausschluss des UN-Kaufrechts. Gerichtsstand für alle Streitigkeiten aus oder im Zusammenhang mit diesem Vertrag ist, soweit gesetzlich zulässig, [Ort einfügen]. Sollten einzelne Bestimmungen dieser AGB unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.`,
  },
];

export default function AGBPage() {
  return (
    <div className="min-h-screen bg-[#060E1D] text-slate-300">
      <header className="border-b border-white/6 py-4 px-6">
        <Link href="/" className="inline-flex items-center">
          <Image
            src="/norvik-logo-white.png"
            alt="Norvik Intelligence"
            width={100}
            height={34}
            className="h-6 w-auto opacity-80 hover:opacity-100 transition-opacity"
          />
        </Link>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-20">
        <h1 className="text-3xl font-bold text-white mb-2">
          Allgemeine Geschäftsbedingungen (B2B)
        </h1>
        <p className="text-sm text-slate-600 mb-12">
          Norvik Intelligence · Stand: [Datum einfügen]
        </p>

        <div className="space-y-10 text-sm leading-relaxed">
          {clauses.map((c) => (
            <section key={c.num}>
              <h2 className="text-base font-semibold text-white mb-3">
                § {c.num} {c.title}
              </h2>
              <p className="text-slate-400">{c.text}</p>
            </section>
          ))}

          <section className="border-t border-white/6 pt-8">
            <p className="text-slate-600 text-xs">
              Diese AGB wurden auf Basis einer Vorlage erstellt. Vor Veröffentlichung sollten sie
              durch einen auf IT- und Dienstleistungsrecht spezialisierten Rechtsanwalt geprüft und
              an Ihre konkreten Verhältnisse angepasst werden.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
