import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "RückbauRadar – Frühwarnsystem für Rückbau & Schadstoffsanierung",
  description:
    "Erfahre von Abriss-, Rückbau- und Schadstoffsanierungsprojekten in Deutschland, " +
    "bevor sie ausgeschrieben sind. Signal-Abo ab 149 €/Monat.",
};

// ── Design tokens: dunkelgrün/anthrazit/weiß ────────────────────────────────
const C = {
  green:  "#1A3A2A",
  green2: "#254D38",
  teal:   "#2E6B4D",
  anthracite: "#2C2C2C",
  light:  "#F5F4F2",
  white:  "#FFFFFF",
  muted:  "#6B7280",
  border: "#D4D0C8",
  accent: "#3A8A5A",
};

// ── Dummy signal card for hero ───────────────────────────────────────────────
function ExampleSignal() {
  return (
    <div
      style={{ background: C.white, border: `1px solid ${C.border}` }}
      className="rounded-xl p-5 shadow-lg max-w-sm w-full"
    >
      <div className="flex items-center gap-2 mb-3">
        <span
          style={{ background: C.green, color: C.white }}
          className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded"
        >
          Vor Ausschreibung
        </span>
        <span className="text-xs" style={{ color: C.muted }}>Score: 87/100</span>
      </div>
      <h3 className="font-semibold text-sm mb-1" style={{ color: C.anthracite }}>
        Teilabbruch + Asbestsanierung: ehem. Verwaltungsgebäude
      </h3>
      <p className="text-xs mb-3" style={{ color: C.muted }}>
        Rhein-Ruhr · PLZ 452xx · Baujahr ~1968 · ca. 1,5–2 Mio. €
      </p>
      <p className="text-xs leading-relaxed" style={{ color: "#4B5563" }}>
        Stadtratsbeschluss zum Rückbau eines Verwaltungsgebäudes mit Asbestfasern
        (TRGS 519) und KMF-Dämmung. Ausschreibung erwartet Q1 2026.
      </p>
      <div className="mt-3 pt-3 flex gap-2 flex-wrap" style={{ borderTop: `1px solid ${C.border}` }}>
        {["Rückbau", "Schadstoff", "Entsorgung"].map((t) => (
          <span
            key={t}
            className="text-[10px] px-2 py-0.5 rounded-full font-medium"
            style={{ background: `${C.green}18`, color: C.green2 }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Section wrapper ──────────────────────────────────────────────────────────
function Section({
  children,
  bg = C.light,
  py = "py-20 md:py-28",
}: {
  children: React.ReactNode;
  bg?: string;
  py?: string;
}) {
  return (
    <section style={{ background: bg }} className={`${py}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">{children}</div>
    </section>
  );
}

// ── Nav ──────────────────────────────────────────────────────────────────────
function Nav() {
  return (
    <nav
      style={{ background: C.green, borderBottom: "1px solid rgba(255,255,255,0.1)" }}
      className="sticky top-0 z-50"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">⬛</span>
          <span className="font-bold text-white tracking-tight">RückbauRadar</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm text-white/80">
          <a href="#so-funktionierts" className="hover:text-white transition-colors">So funktioniert's</a>
          <a href="#preise" className="hover:text-white transition-colors">Preise</a>
          <a href="#bauherren" className="hover:text-white transition-colors">Für Bauherren</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
        </div>
        <Link
          href="/radar/portal/onboarding"
          className="text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          style={{ background: C.accent, color: C.white }}
        >
          Kostenlos testen
        </Link>
      </div>
    </nav>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────
export default function RadarLandingPage() {
  return (
    <>
      <Nav />

      {/* ── HERO ── */}
      <Section bg={C.green} py="py-24 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: C.accent }}>
              Frühwarnsystem · Deutschland
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Rückbau-Aufträge,{" "}
              <span style={{ color: "#7BC8A0" }}>bevor sie ausgeschrieben sind.</span>
            </h1>
            <p className="text-lg text-white/75 leading-relaxed mb-8 max-w-xl">
              RückbauRadar überwacht täglich Ratsprotokolle, EU-Vergaben und
              Amtsblätter – und zeigt Ihnen Abriss-, Rückbau- und
              Schadstoffsanierungsprojekte früher als jeder Mitbewerber.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/radar/portal/onboarding"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all hover:opacity-90"
                style={{ background: C.accent, color: C.white }}
              >
                14 Tage kostenlos testen →
              </Link>
              <a
                href="#so-funktionierts"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm border transition-colors"
                style={{ borderColor: "rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.85)" }}
              >
                So funktioniert's
              </a>
            </div>
            <p className="text-xs mt-4" style={{ color: "rgba(255,255,255,0.45)" }}>
              Keine Kreditkarte. Keine Vertragsbindung.
            </p>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div
                className="absolute -inset-4 rounded-2xl blur-2xl opacity-30"
                style={{ background: C.accent }}
              />
              <ExampleSignal />
            </div>
          </div>
        </div>
      </Section>

      {/* ── TRUST BAR ── */}
      <Section bg={C.anthracite} py="py-6">
        <div className="flex flex-wrap justify-center gap-8 text-center">
          {[
            ["täglich", "Neue Signale"],
            ["10–20 Tage", "Frühzeitiger Vorlauf"],
            ["Rhein-Ruhr", "Startregion aktiv"],
            ["0 €", "Keine Kreditkarte nötig"],
          ].map(([num, label]) => (
            <div key={label} className="text-white">
              <div className="text-xl font-bold" style={{ color: "#7BC8A0" }}>{num}</div>
              <div className="text-xs text-white/60 mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── HOW IT WORKS ── */}
      <Section id="so-funktionierts">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: C.green }}>
            So funktioniert RückbauRadar
          </h2>
          <p className="text-base max-w-2xl mx-auto" style={{ color: C.muted }}>
            Drei Schritte von der öffentlichen Quelle bis zu Ihrem qualifizierten Auftrag.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "Täglich scannen",
              body:
                "Wir durchsuchen jeden Morgen Ratsprotokolle, EU-Vergabeplattformen und " +
                "Amtsblätter in Ihrer Region nach Rückbau- und Sanierungsprojekten.",
              icon: "🔍",
            },
            {
              step: "02",
              title: "KI klassifiziert",
              body:
                "Jedes Dokument wird von einem KI-Modell eingeordnet: Ist es relevant? " +
                "Welches Gewerk? Wie groß? Wie früh im Prozess? Unser Redakteur prüft jedes Signal.",
              icon: "🧠",
            },
            {
              step: "03",
              title: "Sie handeln zuerst",
              body:
                "Sie erhalten täglich nur geprüfte, passende Signale – mit Quelldokument, " +
                "Projektphase und Volumenband. Aufträge gewinnen, bevor andere davon wissen.",
              icon: "⚡",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="p-6 rounded-xl"
              style={{ background: C.white, border: `1px solid ${C.border}` }}
            >
              <div className="text-3xl mb-4">{item.icon}</div>
              <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: C.teal }}>
                Schritt {item.step}
              </div>
              <h3 className="text-lg font-bold mb-3" style={{ color: C.green }}>
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: C.muted }}>
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── PRICING ── */}
      <Section bg={C.white} id="preise">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: C.green }}>
            Transparente Preise
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: C.muted }}>
            Kein Abo-Dschungel. Zwei klare Angebote.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Signal-Abo */}
          <div
            className="p-8 rounded-xl border-2"
            style={{ borderColor: C.green }}
          >
            <div className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: C.teal }}>
              Signal-Abo
            </div>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-4xl font-bold" style={{ color: C.green }}>149</span>
              <span className="text-lg font-semibold" style={{ color: C.green }}>€</span>
              <span className="text-sm" style={{ color: C.muted }}>/Monat</span>
            </div>
            <p className="text-xs mb-1" style={{ color: C.muted }}>bis 299 €/Monat je nach Region</p>
            <p className="text-sm mb-6" style={{ color: C.muted }}>
              Tägliche E-Mail mit geprüften Signalen aus Ihrem Umkreis. Monatlich kündbar.
            </p>
            <ul className="text-sm space-y-2 mb-8">
              {[
                "Geprüfte Signale, kein Rauschen",
                "Quelldokument + Zeitpunkt",
                "Filter: Gewerk, Phase, Umkreis",
                "Kartenansicht (PLZ-Genauigkeit)",
                "Signal-Pro: volle Adresse",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <span style={{ color: C.accent }}>✓</span>
                  <span style={{ color: "#374151" }}>{f}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/radar/portal/onboarding"
              className="block text-center py-3 rounded-lg font-semibold text-sm transition-opacity hover:opacity-90"
              style={{ background: C.green, color: C.white }}
            >
              14 Tage gratis testen
            </Link>
          </div>

          {/* Vermittlung */}
          <div
            className="p-8 rounded-xl"
            style={{ background: C.light, border: `1px solid ${C.border}` }}
          >
            <div className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: C.teal }}>
              Vermittlung
            </div>
            <div className="text-2xl font-bold mb-1" style={{ color: C.green }}>
              Auf Anfrage
            </div>
            <p className="text-xs mb-1" style={{ color: C.muted }}>
              249–2.490 € pro Lead · Rhein-Ruhr (weitere Regionen in Planung)
            </p>
            <p className="text-sm mb-6" style={{ color: C.muted }}>
              Wir vermitteln Sie aktiv an Bauherren. Sie zahlen nur bei qualifiziertem Kontakt.
            </p>
            <ul className="text-sm space-y-2 mb-8">
              {[
                "Aktives Matching durch unser Team",
                "Nur verifizierte Bauherren",
                "Zahlung erst nach Lead-Annahme",
                "Gebietspartner: ab 1.200 €/Monat",
                "Max. 3–5 Betriebe pro Gebiet",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <span style={{ color: C.accent }}>✓</span>
                  <span style={{ color: "#374151" }}>{f}</span>
                </li>
              ))}
            </ul>
            <a
              href="mailto:hallo@rueckbauradar.de"
              className="block text-center py-3 rounded-lg font-semibold text-sm border-2 transition-colors hover:bg-white"
              style={{ borderColor: C.green, color: C.green }}
            >
              Warteliste – jetzt anfragen
            </a>
          </div>
        </div>
      </Section>

      {/* ── FÜR BAUHERREN ── */}
      <Section bg={C.green} id="bauherren">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: "#7BC8A0" }}>
              Für Bauherren & Kommunen
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              3 geprüfte Betriebe in 48 Stunden. Kostenlos.
            </h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.75)" }}>
              Sie planen ein Rückbau- oder Sanierungsprojekt? Wir bringen Ihnen
              innerhalb von 48 Stunden drei qualifizierte, zertifizierte Fachbetriebe
              aus Ihrer Region – ohne Aufwand, ohne Kosten.
            </p>
            <a
              href="mailto:bauherren@rueckbauradar.de"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-opacity hover:opacity-90"
              style={{ background: "#7BC8A0", color: C.green }}
            >
              Kostenlos anfragen →
            </a>
          </div>
          <div className="grid gap-4">
            {[
              { icon: "🏗️", text: "Abbruch & Rückbau" },
              { icon: "⚠️", text: "Asbest- & Schadstoffsanierung" },
              { icon: "🧱", text: "Entkernung & Kernsanierung" },
              { icon: "🗑️", text: "Entsorgung gefährlicher Stoffe" },
            ].map((item) => (
              <div
                key={item.text}
                className="flex items-center gap-3 p-4 rounded-lg"
                style={{ background: "rgba(255,255,255,0.08)" }}
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="font-medium text-white">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── FAQ ── */}
      <Section id="faq">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center" style={{ color: C.green }}>
            Häufige Fragen
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "Welche Projekte erhalte ich?",
                a: "Nur Projekte mit konkretem Rückbau-, Abbruch- oder Schadstoffbezug. Jedes Signal wird manuell durch unser Redaktionsteam geprüft, bevor es zu Ihnen gelangt.",
              },
              {
                q: "Wie früh erhalte ich die Signale?",
                a: "Typischerweise 10–20 Tage vor der offiziellen Ausschreibung – manchmal Monate vorher, wenn das Projekt noch in der politischen Planungsphase ist.",
              },
              {
                q: "Für welche Gewerke ist RückbauRadar geeignet?",
                a: "Abbruchunternehmen, Schadstoffsanierer, Entsorger, Gerüstbauer, Abdichter und Gutachter/Sachverständige.",
              },
              {
                q: "Welche Regionen werden abgedeckt?",
                a: "Start: Rhein-Ruhr (NRW). Weitere Regionen folgen. Signal-Abo ist bereits bundesweit buchbar – mit den TED-EU-Signalen erhalten Sie auch überregionale Ausschreibungen.",
              },
              {
                q: "Wie unterscheidet sich RückbauRadar von Vergabeplattformen?",
                a: "Vergabeplattformen zeigen Ihnen fertige Ausschreibungen. RückbauRadar zeigt Ihnen Projekte, bevor sie ausgeschrieben sind – wenn Sie noch als Berater oder Frühkontakt punkten können.",
              },
            ].map((item) => (
              <div
                key={item.q}
                className="p-6 rounded-xl"
                style={{ background: C.white, border: `1px solid ${C.border}` }}
              >
                <h3 className="font-semibold mb-2" style={{ color: C.green }}>
                  {item.q}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: C.muted }}>
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── FOOTER ── */}
      <footer style={{ background: C.anthracite, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex flex-wrap justify-between gap-8 mb-8">
            <div>
              <div className="font-bold text-white mb-2">RückbauRadar</div>
              <p className="text-xs max-w-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                Frühwarnsystem für Rückbau, Abbruch und Schadstoffsanierung in Deutschland.
              </p>
            </div>
            <div className="flex gap-8 text-sm">
              <div className="flex flex-col gap-2">
                <span className="font-semibold text-white/60 text-xs uppercase tracking-wider">Rechtliches</span>
                <a href="/radar/impressum" className="text-white/60 hover:text-white transition-colors">Impressum</a>
                <a href="/radar/datenschutz" className="text-white/60 hover:text-white transition-colors">Datenschutz</a>
                <a href="/radar/agb" className="text-white/60 hover:text-white transition-colors">AGB</a>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-semibold text-white/60 text-xs uppercase tracking-wider">Kontakt</span>
                <a href="mailto:hallo@rueckbauradar.de" className="text-white/60 hover:text-white transition-colors">
                  hallo@rueckbauradar.de
                </a>
              </div>
            </div>
          </div>
          <div className="pt-6 flex flex-wrap justify-between gap-4 text-xs" style={{ borderTop: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.3)" }}>
            <span>© 2026 RückbauRadar. Alle Rechte vorbehalten.</span>
            <span>AV-Vertrag: Supabase (EU) · Vercel (EU) · DSGVO-konform</span>
          </div>
        </div>
      </footer>
    </>
  );
}
