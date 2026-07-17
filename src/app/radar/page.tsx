import type { Metadata } from "next";
import Link from "next/link";
import {
  Radar,
  FileSearch,
  BrainCircuit,
  MailCheck,
  HardHat,
  ShieldAlert,
  Building2,
  Trash2,
  Check,
  MapPin,
} from "lucide-react";

export const metadata: Metadata = {
  title: "RückbauRadar – Frühwarnsystem für Rückbau & Schadstoffsanierung",
  description:
    "Erfahre von Abriss-, Rückbau- und Schadstoffsanierungsprojekten in Deutschland, " +
    "bevor sie ausgeschrieben sind. Signal-Abo ab 149 €/Monat.",
};

/*
 * Design read: B2B lead-gen landing für Bauunternehmer 40-60, trust-first,
 * Marke: dunkelgrün/anthrazit/weiß (Spec). Dials: VARIANCE 5 / MOTION 3 / DENSITY 4.
 * Theme: helle Seite mit dunklen Bookends (Hero + Bauherren-Block + Footer).
 * Tokens: var(--rr-*) aus radar.css. Icons: lucide (Projekt-Dependency), strokeWidth 1.5.
 */

const SW = 1.5; // globale Icon-Strichstärke

// ── Beispiel-Signal im Hero (Spec-Anforderung: anonymisiertes Beispiel;
//    Mini-Version der echten SignalCard aus dem Portal) ──────────────────────
function ExampleSignal() {
  return (
    <div className="rounded-xl bg-white border border-[var(--rr-border)] p-5 shadow-lg max-w-sm w-full">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[var(--rr-green)] text-white">
          Vor Ausschreibung
        </span>
        <span className="text-xs text-[var(--rr-muted)]">Score 87</span>
      </div>
      <h3 className="font-semibold text-sm mb-1 text-[var(--rr-anthracite)]">
        Teilabbruch und Asbestsanierung: ehem. Verwaltungsgebäude
      </h3>
      <p className="text-xs mb-3 flex items-center gap-1.5 text-[var(--rr-muted)]">
        <MapPin className="h-3 w-3" strokeWidth={SW} />
        Rhein-Ruhr, PLZ 452xx, Baujahr ca. 1968
      </p>
      <p className="text-xs leading-relaxed text-gray-600">
        Stadtratsbeschluss zum Rückbau eines Verwaltungsgebäudes mit Asbestfasern
        (TRGS 519) und KMF-Dämmung. Ausschreibung erwartet Q1 2026.
      </p>
      <div className="mt-3 pt-3 flex gap-2 flex-wrap border-t border-[var(--rr-border)]">
        {["Rückbau", "Schadstoff", "Entsorgung"].map((t) => (
          <span
            key={t}
            className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-[var(--rr-green)]/10 text-[var(--rr-green-2)]"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Nav ──────────────────────────────────────────────────────────────────────
function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-[var(--rr-green)] border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/radar" className="flex items-center gap-2">
          <Radar className="h-5 w-5 text-[var(--rr-accent-light)]" strokeWidth={SW} />
          <span className="font-bold text-white tracking-tight">RückbauRadar</span>
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm text-white/80">
          <a href="#funktionsweise" className="hover:text-white transition-colors">Funktionsweise</a>
          <a href="#preise" className="hover:text-white transition-colors">Preise</a>
          <a href="#bauherren" className="hover:text-white transition-colors">Für Bauherren</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/radar/login"
            className="hidden sm:block text-sm text-white/80 hover:text-white transition-colors"
          >
            Anmelden
          </Link>
          <Link
            href="/radar/registrieren"
            className="rr-press whitespace-nowrap text-sm font-semibold px-3 sm:px-4 py-2 rounded-lg bg-[var(--rr-accent)] text-white hover:opacity-90"
          >
            Kostenlos testen
          </Link>
        </div>
      </div>
    </nav>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────
export default function RadarLandingPage() {
  return (
    <>
      <Nav />

      {/* HERO (dunkles Bookend) + Stats in einem Block */}
      <header className="bg-[var(--rr-green)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-16 md:pt-24 md:pb-20">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 rr-enter">
              <p className="text-sm font-semibold uppercase tracking-widest mb-4 text-[var(--rr-accent-light)]">
                Frühwarnsystem für Deutschland
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight mb-6">
                Rückbau-Aufträge.{" "}
                <span className="block text-[var(--rr-accent-light)]">Vor der Ausschreibung.</span>
              </h1>
              <p className="text-lg text-white/75 leading-relaxed mb-8 max-w-xl">
                Wir überwachen täglich Ratsprotokolle, EU-Vergaben und Amtsblätter.
                Sie sehen neue Abriss- und Sanierungsprojekte vor der Ausschreibung.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/radar/registrieren"
                  className="rr-press inline-flex items-center px-6 py-3 rounded-lg font-semibold text-sm bg-[var(--rr-accent)] text-white hover:opacity-90"
                >
                  Kostenlos testen
                </Link>
                <a
                  href="#funktionsweise"
                  className="rr-press inline-flex items-center px-6 py-3 rounded-lg font-semibold text-sm border border-white/25 text-white/85 hover:bg-white/5"
                >
                  Funktionsweise ansehen
                </a>
              </div>
            </div>
            <div className="lg:col-span-5 flex justify-center lg:justify-end rr-enter-late">
              <ExampleSignal />
            </div>
          </div>
        </div>

        {/* Stats-Leiste als Abschluss des Hero-Blocks */}
        <div className="border-t border-white/10 bg-[var(--rr-anthracite)]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              ["Täglich", "neue geprüfte Signale"],
              ["10 bis 20 Tage", "Vorlauf vor der Vergabe"],
              ["Deutschlandweit", "Kommunen und EU-Vergaben"],
              ["14 Tage", "kostenlos, ohne Kreditkarte"],
            ].map(([num, label]) => (
              <div key={label} className="text-white">
                <div className="text-lg font-bold text-[var(--rr-accent-light)]">{num}</div>
                <div className="text-xs text-white/60 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* FUNKTIONSWEISE: linke Sticky-Headline + rechte Schrittliste (statt 3 gleicher Cards) */}
      <section id="funktionsweise" className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--rr-green)] mb-4">
                Von der Ratssitzung zu Ihrem Auftrag.
              </h2>
              <p className="text-base text-[var(--rr-muted)] max-w-md">
                Öffentliche Quellen, maschinelle Vorauswahl, menschliche Prüfung.
                Sie bekommen nur Signale, die Ihr Gewerk betreffen.
              </p>
            </div>
          </div>
          <div className="lg:col-span-7">
            <ol className="space-y-10">
              {[
                {
                  icon: FileSearch,
                  title: "Quellen scannen",
                  body:
                    "Jeden Morgen durchsuchen wir Ratsprotokolle, die EU-Vergabeplattform " +
                    "und Amtsblätter nach Rückbau- und Sanierungsvorhaben in ganz Deutschland.",
                },
                {
                  icon: BrainCircuit,
                  title: "Prüfen und einordnen",
                  body:
                    "Ein KI-Modell ordnet jedes Dokument ein: Gewerk, Projektphase, Volumen, " +
                    "Schadstoffhinweise. Danach prüft ein Redakteur jedes Signal von Hand.",
                },
                {
                  icon: MailCheck,
                  title: "Zuerst handeln",
                  body:
                    "Sie erhalten täglich passende Signale mit Quelldokument und Projektphase. " +
                    "Sie sprechen den Bauherrn an, bevor die Ausschreibung öffentlich ist.",
                },
              ].map((step, i) => (
                <li key={step.title} className="flex gap-5">
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="h-12 w-12 rounded-xl bg-[var(--rr-green)]/8 border border-[var(--rr-green)]/15 flex items-center justify-center">
                      <step.icon className="h-5 w-5 text-[var(--rr-green)]" strokeWidth={SW} />
                    </div>
                    {i < 2 && <div className="w-px flex-1 mt-3 bg-[var(--rr-border)]" />}
                  </div>
                  <div className="pb-2">
                    <h3 className="text-lg font-bold text-[var(--rr-green)] mb-2">{step.title}</h3>
                    <p className="text-sm leading-relaxed text-[var(--rr-muted)] max-w-[52ch]">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* PREISE: zwei echte Angebote (Cards hier gerechtfertigt: Auswahl-Hierarchie) */}
      <section id="preise" className="py-20 md:py-28 bg-white border-y border-[var(--rr-border)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-xl mb-14">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--rr-green)] mb-4">
              Zwei Angebote. Keine versteckten Kosten.
            </h2>
            <p className="text-base text-[var(--rr-muted)]">
              Signal-Abo für den Informationsvorsprung. Vermittlung, wenn wir Sie
              aktiv an Bauherren bringen sollen.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
            {/* Signal-Abo */}
            <div className="p-8 rounded-xl border-2 border-[var(--rr-green)] bg-white">
              <div className="text-sm font-bold uppercase tracking-wider mb-2 text-[var(--rr-teal)]">
                Signal-Abo
              </div>
              <div className="flex items-baseline flex-wrap gap-x-2 gap-y-1 mb-1">
                <span className="text-4xl font-bold whitespace-nowrap text-[var(--rr-green)]">149 €</span>
                <span className="text-sm text-[var(--rr-muted)]">/Monat, je nach Region bis 299 €</span>
              </div>
              <p className="text-sm mb-6 text-[var(--rr-muted)]">
                Tägliche geprüfte Signale aus Ihrem Umkreis. Monatlich kündbar.
              </p>
              <ul className="text-sm space-y-2.5 mb-8">
                {[
                  "Geprüfte Signale, kein Rauschen",
                  "Quelldokument und Abrufzeitpunkt zu jedem Signal",
                  "Filter nach Gewerk, Phase und Umkreis",
                  "Kartenansicht mit PLZ-Genauigkeit",
                  "Signal-Pro: vollständige Adressen",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 mt-0.5 flex-shrink-0 text-[var(--rr-accent)]" strokeWidth={2} />
                    <span className="text-gray-700">{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/radar/registrieren"
                className="rr-press block text-center py-3 rounded-lg font-semibold text-sm bg-[var(--rr-green)] text-white hover:opacity-90"
              >
                Kostenlos testen
              </Link>
            </div>

            {/* Vermittlung */}
            <div className="p-8 rounded-xl bg-[var(--rr-light)] border border-[var(--rr-border)]">
              <div className="text-sm font-bold uppercase tracking-wider mb-2 text-[var(--rr-teal)]">
                Vermittlung
              </div>
              <div className="flex items-baseline flex-wrap gap-x-2 gap-y-1 mb-1">
                <span className="text-4xl font-bold whitespace-nowrap text-[var(--rr-green)]">ab 249 €</span>
                <span className="text-sm text-[var(--rr-muted)]">pro qualifiziertem Lead</span>
              </div>
              <p className="text-sm mb-6 text-[var(--rr-muted)]">
                Start in Rhein-Ruhr, weitere Regionen folgen. Sie zahlen nur bei
                angenommenem Kontakt.
              </p>
              <ul className="text-sm space-y-2.5 mb-8">
                {[
                  "Aktives Matching durch unser Team",
                  "Nur verifizierte Bauherren",
                  "Zahlung erst nach Lead-Annahme",
                  "Gebietspartner ab 1.200 €/Monat",
                  "Höchstens 3 bis 5 Betriebe pro Gebiet",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 mt-0.5 flex-shrink-0 text-[var(--rr-accent)]" strokeWidth={2} />
                    <span className="text-gray-700">{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="mailto:hallo@rueckbauradar.de?subject=Warteliste%20Vermittlung"
                className="rr-press block text-center py-3 rounded-lg font-semibold text-sm border-2 border-[var(--rr-green)] text-[var(--rr-green)] hover:bg-white"
              >
                Auf die Warteliste
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FÜR BAUHERREN (das eine dunkle Mid-Page-Bookend) */}
      <section id="bauherren" className="py-20 md:py-28 bg-[var(--rr-green)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">
              Sie planen ein Projekt? Drei geprüfte Betriebe in 48 Stunden.
            </h2>
            <p className="text-base leading-relaxed mb-8 text-white/75 max-w-lg">
              Für Kommunen, Wohnungswirtschaft und Bauherren ist RückbauRadar
              kostenlos. Wir schlagen Ihnen zertifizierte Fachbetriebe aus Ihrer
              Region vor, Sie entscheiden.
            </p>
            <a
              href="mailto:bauherren@rueckbauradar.de?subject=Betriebe%20gesucht"
              className="rr-press inline-flex items-center px-6 py-3 rounded-lg font-semibold text-sm bg-[var(--rr-accent-light)] text-[var(--rr-green)] hover:opacity-90"
            >
              Betriebe finden
            </a>
          </div>
          <ul className="grid gap-3">
            {[
              { icon: HardHat, text: "Abbruch und Rückbau" },
              { icon: ShieldAlert, text: "Asbest- und Schadstoffsanierung" },
              { icon: Building2, text: "Entkernung und Kernsanierung" },
              { icon: Trash2, text: "Entsorgung gefährlicher Stoffe" },
            ].map((item) => (
              <li
                key={item.text}
                className="flex items-center gap-3 p-4 rounded-lg bg-white/8 border border-white/10"
              >
                <item.icon className="h-5 w-5 text-[var(--rr-accent-light)] flex-shrink-0" strokeWidth={SW} />
                <span className="font-medium text-white text-sm">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ: schlichte divide-y-Liste statt fünf Cards */}
      <section id="faq" className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold tracking-tight mb-10 text-[var(--rr-green)]">
            Häufige Fragen
          </h2>
          <div className="divide-y divide-[var(--rr-border)]">
            {[
              {
                q: "Welche Projekte erhalte ich?",
                a: "Nur Projekte mit konkretem Rückbau-, Abbruch- oder Schadstoffbezug. Jedes Signal wird von unserem Redaktionsteam geprüft, bevor es zu Ihnen gelangt.",
              },
              {
                q: "Wie früh erhalte ich die Signale?",
                a: "Typischerweise 10 bis 20 Tage vor der offiziellen Ausschreibung. Bei Projekten in der politischen Planungsphase oft Monate vorher.",
              },
              {
                q: "Für welche Gewerke ist RückbauRadar geeignet?",
                a: "Abbruchunternehmen, Schadstoffsanierer, Entsorger, Gerüstbauer, Abdichter sowie Gutachter und Sachverständige.",
              },
              {
                q: "Welche Regionen werden abgedeckt?",
                a: "Das Signal-Abo ist deutschlandweit buchbar und umfasst kommunale Quellen sowie EU-Vergaben. Die aktive Vermittlung startet in Rhein-Ruhr.",
              },
              {
                q: "Was unterscheidet RückbauRadar von Vergabeplattformen?",
                a: "Vergabeplattformen zeigen fertige Ausschreibungen. RückbauRadar zeigt Projekte davor, wenn Sie noch als Erstkontakt beim Bauherrn punkten können.",
              },
            ].map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="flex items-center justify-between cursor-pointer list-none font-semibold text-[var(--rr-green)] text-sm md:text-base">
                  {item.q}
                  <span className="ml-4 text-[var(--rr-muted)] transition-transform group-open:rotate-45 text-xl leading-none">
                    +
                  </span>
                </summary>
                <p className="text-sm leading-relaxed text-[var(--rr-muted)] mt-3 max-w-[65ch]">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER (dunkles Bookend) */}
      <footer className="bg-[var(--rr-anthracite)] border-t border-white/8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex flex-wrap justify-between gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Radar className="h-4 w-4 text-[var(--rr-accent-light)]" strokeWidth={SW} />
                <span className="font-bold text-white">RückbauRadar</span>
              </div>
              <p className="text-xs max-w-xs text-white/50">
                Frühwarnsystem für Rückbau, Abbruch und Schadstoffsanierung in Deutschland.
              </p>
            </div>
            <div className="flex gap-12 text-sm">
              <div className="flex flex-col gap-2">
                <span className="font-semibold text-white/60 text-xs uppercase tracking-wider">Rechtliches</span>
                <Link href="/radar/impressum" className="text-white/60 hover:text-white transition-colors">Impressum</Link>
                <Link href="/radar/datenschutz" className="text-white/60 hover:text-white transition-colors">Datenschutz</Link>
                <Link href="/radar/agb" className="text-white/60 hover:text-white transition-colors">AGB</Link>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-semibold text-white/60 text-xs uppercase tracking-wider">Kontakt</span>
                <a href="mailto:hallo@rueckbauradar.de" className="text-white/60 hover:text-white transition-colors">
                  hallo@rueckbauradar.de
                </a>
              </div>
            </div>
          </div>
          <div className="pt-6 flex flex-wrap justify-between gap-4 text-xs border-t border-white/8 text-white/30">
            <span>© 2026 RückbauRadar. Alle Rechte vorbehalten.</span>
            <span>Datenverarbeitung in der EU (Supabase Frankfurt, Vercel)</span>
          </div>
        </div>
      </footer>
    </>
  );
}
