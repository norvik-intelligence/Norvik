const workflow = [
  {
    title: "Client Intake",
    text: "Investmentthese, Zielunternehmen, Prozessphase und offene Fragen werden sauber erfasst. So beginnt jedes Projekt mit einer klaren Entscheidungslogik statt mit unstrukturierter Recherche.",
  },
  {
    title: "Package Selection",
    text: "Der Umfang wird an Deal-Komplexität, Zeitdruck und IC-Anforderungen angepasst. Kunden kaufen keinen Report, sondern den passenden Pre-DD-Arbeitsraum.",
  },
  {
    title: "Deal / Target Setup",
    text: "Target, Transaktion, Käuferlogik, Marktbezug und Datenlage werden als strukturierter Deal-Kontext angelegt. Das schafft die Basis für vergleichbare Analyse und saubere Übergabe.",
  },
  {
    title: "Research Command Center",
    text: "Öffentliche Daten, Filings, Pressemitteilungen, Präsentationen, Register, News und strukturierte Quellen werden systematisch gesammelt und priorisiert.",
  },
  {
    title: "Source Vault",
    text: "Alle relevanten Quellen werden nachvollziehbar abgelegt. Jede spätere Aussage bleibt bis zur Quelle zurückverfolgbar.",
  },
  {
    title: "Fact Ledger",
    text: "Fakten, Berechnungen, Ableitungen, Schätzungen und Hypothesen werden getrennt. Das reduziert Blind Spots und macht die Analyse validierungsfähig.",
  },
  {
    title: "Financial Model Layer",
    text: "Öffentliche Finanzdaten werden in ein nutzbares Modell überführt. Umsatz, EBITDA, Margen, Multiples, Segmentlogik und Treiber werden als Investment-Signale lesbar.",
  },
  {
    title: "Risk Engine",
    text: "Risiken werden nach Relevanz, Evidenz, Deal-Impact und Validierungsbedarf strukturiert. Das Ergebnis ist keine Risikoliste, sondern eine Priorisierung für Entscheidungen.",
  },
  {
    title: "Validation Matrix",
    text: "Offene Fragen werden mit Quellen, Confidence-Level, Advisor Owner und Workstream verknüpft. So wissen FDD, Legal, Tax, CDD und IT/Cyber genau, was geprüft werden muss.",
  },
  {
    title: "Module Builder",
    text: "Aus der Analyse entstehen kundenfertige Module wie Executive Summary, Public Financial Pack, Public QoE Proxy, Valuation Bridge oder Advisor Handoff.",
  },
  {
    title: "Internal QA",
    text: "Aussagen, Zahlen, Klassifizierungen, Quellen und Disclaimer werden intern geprüft. Nur belastbare Inhalte werden in den Client Room überführt.",
  },
  {
    title: "Client Room Link",
    text: "Der Kunde erhält einen privaten, klickbaren Decision-Support-Room. Kein statischer PDF-Anhang, sondern ein strukturierter Pre-DD-Raum für IC, Deal Team und Berater.",
  },
];

const modules = [
  ["Source Vault", "Ein zentraler Quellenraum für Filings, Präsentationen, Pressemitteilungen, Registerdaten, News und strukturierte Datenpunkte. Der Nutzen liegt nicht im Sammeln, sondern in der Fähigkeit, jede relevante Aussage später zu belegen."],
  ["Fact Ledger", "Das Fact Ledger trennt Reported Facts, Norvik Calculations, Inferences, Estimates, Hypotheses und Validation Required. Dadurch entsteht eine belastbare Wissensbasis, die nicht so tut, als wäre jede Aussage gleich sicher."],
  ["Financial Model Layer", "Öffentliche Finanzdaten werden in eine modellierbare Struktur gebracht. Umsatz, EBITDA, Margen, Brücken, Multiples und Segmentlogik werden für Deal-Teams nachvollziehbar gemacht."],
  ["Public QoE Proxy", "Eine öffentliche Annäherung an Earnings Quality, ohne formale Financial Due Diligence zu ersetzen. Der Proxy markiert Normalisierungsfragen, Ergebnisqualität, Sondereffekte und Punkte, die FDD-Teams validieren müssen."],
  ["Risk Engine", "Risiken werden nicht als generische Warnungen formuliert, sondern nach Evidenz, Deal-Relevanz, potenziellem Impact und Validierungsbedarf eingeordnet. So wird sichtbar, welche Risiken entscheidungsrelevant sind."],
  ["Validation Matrix", "Die Validation Matrix verbindet offene Fragen mit Quellen, Hypothesen, Workstreams und Advisor Ownern. Sie übersetzt Pre-DD in konkrete Prüfaufträge für Financial, Tax, Legal, Commercial, Operational und IT/Cyber DD."],
  ["Module Builder", "Aus strukturierten Daten entstehen kundenseitige Module: Executive Summary, Target Snapshot, Financial Pack, Valuation Bridge, Risk Engine, Source Register, IC Summary und Watchlist."],
  ["Internal QA", "Vor der Veröffentlichung werden Aussagen, Rechenwege, Quellenstatus und Disclaimer geprüft. Das schützt vor unklaren Ableitungen und macht den Client Room advisor-ready."],
  ["Publish Center", "Das Publish Center überführt geprüfte Module in einen privaten Kundenraum. Interne Arbeitsstände bleiben intern, kundenfertige Inhalte werden gezielt freigegeben."],
  ["Client Room", "Der Client Room ist der private Decision-Support-Room für Kunden, Investment Committees und externe Berater. Er kombiniert Executive View, Analyse, Quellenlogik und Handoff in einer klickbaren Umgebung."],
  ["Analytics / Monitoring", "Deal-Signale, offene Punkte und Watchlist-Themen können nach Lieferung weiter beobachtet werden. Updates werden nicht als neue Präsentation gedacht, sondern als Weiterentwicklung des Deal Rooms."],
];

const packages = [
  {
    name: "Basic Interactive Deal Briefing",
    price: "€3k–7.5k",
    fit: "Für schnelle Executive Briefings, frühe Deal-Sichtung und erste IC-Vorbereitung.",
    facts: "ca. 20 Facts · ca. 5 Sources",
    items: ["Target Snapshot", "Timeline", "Key Facts", "Risk Summary", "Source Register", "IC Pre-read", "Advisor Handoff Light"],
  },
  {
    name: "Professional Deal Room",
    price: "€8k–20k",
    fit: "Für ernsthafte Pre-DD, Deal Review, Investment Committee Vorbereitung und strukturierte Advisor-Fragen.",
    facts: "ca. 45 Facts · ca. 12 Sources",
    items: ["Target Snapshot", "Evidence Trail", "Scoring Methodology", "Regulatory View", "Bull/Base/Bear", "Watchlist", "Advisor Handoff", "Charts & Curves"],
    featured: true,
  },
  {
    name: "Premium Judgment Room",
    price: "€20k–50k",
    fit: "Für komplexe Deals, widersprüchliche Datenlagen, hohe Transaktionsrisiken und anspruchsvolle IC-Fragen.",
    facts: "ca. 80 Facts · ca. 20 Sources",
    items: ["Decision Delta", "Remedy Decoder", "Unknowns Register", "Narrative Risk", "Contradiction Finder", "Validation Matrix", "Big-4 Handoff Pack", "Sensitivity Support"],
  },
  {
    name: "Custom Investor Version",
    price: "€35k–100k+",
    fit: "Für kundenspezifische High-Ticket-Projekte mit Investment Thesis Lens, Portfolio-Kontext und Live-Monitoring.",
    facts: "ca. 130 Facts · ca. 35 Sources",
    items: ["Financial Pack", "Public QoE Proxy", "Segment Economics", "Valuation Bridge", "Asset Map", "Client Thesis Lens", "Portfolio Impact", "Customer / Supplier Exposure", "Custom IC Questions", "Advisor Workstream Map", "Sensitivity Model", "Live Monitoring Setup"],
  },
];

const useCases = [
  ["PE-Fonds", "Ein Deal kommt früh in den Funnel, aber Management-Zugang und Datenraum sind noch begrenzt.", "Das Team muss entscheiden, ob sich Zeit, Partner Attention und externe Beratung lohnen.", "Coridoor baut einen quellenbasierten Pre-DD-Raum mit Financial Pack, Risk Engine und IC Summary.", "Ein klarer Go / Watch / No-Go-Vorschlag mit Validierungsfragen für die nächste Prozessphase."],
  ["Family Offices", "Ein direkt angebotener Deal wirkt attraktiv, die interne Deal-Kapazität ist aber begrenzt.", "Das Office braucht unabhängige Struktur, bevor Beraterbudgets freigegeben werden.", "Coridoor übersetzt öffentliche Signale in eine verständliche Investment- und Risikologik.", "Ein privater Client Room für Principal, Investment Lead und externe Spezialisten."],
  ["M&A-Boutiquen", "Ein Mandant erwartet schnelle Einschätzung zu Käuferlogik, Target-Risiken oder Marktposition.", "Das Team verliert Zeit mit manueller Recherche und statischen Materialien.", "Coridoor liefert advisor-ready Module, Source Register und Validation Matrix.", "Ein differenzierter Client Room, der Advisory-Arbeit hochwertiger und schneller kommunizierbar macht."],
  ["Corporate Development", "Ein strategischer Käufer prüft mehrere Targets parallel.", "Öffentliche Daten liegen verstreut, interne Stakeholder brauchen Vergleichbarkeit.", "Coridoor strukturiert Target Snapshot, Synergiefragen, Risiken, Segmentlogik und Watchlist.", "Ein entscheidungsfähiger Raum für CorpDev, Strategie, Finance und Legal."],
  ["Search Funds", "Ein einzelnes Target soll schnell bewertet werden, bevor Ressourcen gebunden werden.", "Der Käufer braucht Klarheit über Markt, Qualität der Zahlen, Risiken und offene Fragen.", "Coridoor erstellt einen fokussierten Deal Room mit IC Pre-read, Public QoE Proxy und Advisor Handoff Light.", "Eine strukturierte Grundlage für LOI-Entscheidung, Beraterauswahl und nächste Fragen an den Verkäufer."],
  ["Strategische Käufer", "Ein Akquisitionskandidat passt zur Strategie, aber Risiken, Multiples und Kundenabhängigkeiten sind unklar.", "Interne Funktionen prüfen aus unterschiedlichen Blickwinkeln und oft ohne gemeinsame Faktengrundlage.", "Coridoor bündelt Signale, Fakten, Risiken und Validierungsbedarf in einem gemeinsamen Decision-Support-Room.", "Ein einheitlicher Vorraum für Vorstand, M&A, Finance, Legal und operative Fachbereiche."],
];

const faqs = [
  ["Ersetzt Coridoor Big-4 Due Diligence?", "Nein. Coridoor ersetzt keine Financial, Tax, Legal, Commercial, Operational oder IT/Cyber Due Diligence. Coridoor kommt davor und zeigt, welche Deals, Risiken und Fragen überhaupt prüfenswert sind."],
  ["Welche Daten nutzt Coridoor?", "Coridoor nutzt öffentliche und strukturierte Daten: Filings, Pressemitteilungen, Investor-Präsentationen, Register, News, Transaktionsdaten, Unternehmensangaben und weitere öffentlich zugängliche Signale. Jede relevante Aussage wird mit Quelle, Klassifizierung und Confidence-Level geführt."],
  ["Kann Coridoor vor Datenraumzugang arbeiten?", "Ja. Genau dafür ist Coridoor gebaut. Der Workspace erzeugt eine Pre-DD-Sicht auf Basis öffentlicher Daten, bevor ein formaler Datenraum geöffnet ist oder bevor teure Beratermandate ausgelöst werden."],
  ["Was erhält der Kunde?", "Der Kunde erhält einen privaten, klickbaren Client Room mit Executive Summary, Target Snapshot, Financial Pack, Risk Engine, Validation Matrix, Source Register, Advisor Handoff, IC Summary und je nach Paket weiteren Modulen."],
  ["Wie unterscheidet sich Coridoor von einem PDF-Report?", "Ein PDF ist ein statischer Endpunkt. Coridoor ist ein Deal-Intelligence-Workspace mit kundenfertigem Output: Quellenlogik, Faktenklassifizierung, Validierungsstatus, Advisor Owner, Module und aktualisierbare Räume bleiben strukturiert verbunden."],
  ["Wie lange dauert die Erstellung eines Rooms?", "Das hängt von Paket, Datenlage und Deal-Komplexität ab. Ein Basic Briefing ist für schnelle Executive-Sichtung ausgelegt, Professional und Premium Rooms für tiefere Pre-DD-Arbeit. Der Umfang wird beim Intake präzise festgelegt."],
  ["Können Rooms nach Lieferung aktualisiert werden?", "Ja. Watchlists, neue Quellen, geänderte Zahlen, neue Risiken und Advisor-Feedback können in den Room eingearbeitet werden. So bleibt der Raum über die Prozessphase hinweg nutzbar."],
  ["Kann Coridoor an unsere Investmentthese angepasst werden?", "Ja. Besonders in der Custom Investor Version werden Client Thesis Lens, Portfolio Impact, Custom IC Questions, spezifische Risikokategorien und Advisor Workstream Maps auf den Investor zugeschnitten."],
  ["Was ist ein Public QoE Proxy?", "Ein Public QoE Proxy ist eine quellenbasierte Annäherung an Ergebnisqualität mit öffentlichen Daten. Er ersetzt keine formale QoE oder FDD, markiert aber Normalisierungsfragen, Sondereffekte, Margenqualität und Themen, die später validiert werden sollten."],
  ["Warum ist die Custom Investor Version deutlich wertvoller?", "Sie ist kein standardisierter Deal Brief. Sie verbindet Financial Pack, Public QoE Proxy, Segment Economics, Valuation Bridge, Client Thesis Lens, Portfolio Impact, Customer / Supplier Exposure, Sensitivity Model und Live Monitoring zu einem kundenspezifischen Investment-Arbeitsraum."],
];

function Pill({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-neutral-700">{children}</span>;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div className="mb-5 inline-flex rounded-full border border-neutral-300 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-600">{children}</div>;
}

function ArrowLink({ children }: { children: React.ReactNode }) {
  return <a href="#contact" className="inline-flex items-center rounded-full bg-[#e9ff3f] px-5 py-3 text-sm font-bold text-[#161214] transition hover:translate-y-[-1px] hover:shadow-[0_10px_30px_rgba(0,0,0,0.12)]">{children} ↗</a>;
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#c6caaa] px-4 py-6 text-[#191314] sm:px-6 lg:px-10">
      <nav className="mx-auto mb-6 flex max-w-7xl items-center justify-between rounded-3xl bg-[#f5f5f3] px-5 py-4 shadow-[0_18px_60px_rgba(25,19,20,0.08)]">
        <a href="#top" className="flex items-center gap-3 font-bold tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#191314] text-[#e9ff3f]">C</span>
          <span>Coridoor <span className="font-medium text-neutral-500">by Norvik Intelligence</span></span>
        </a>
        <div className="hidden items-center gap-8 text-sm font-semibold md:flex">
          <a href="#problem" className="hover:opacity-60">Problem</a>
          <a href="#workflow" className="hover:opacity-60">Workflow</a>
          <a href="#packages" className="hover:opacity-60">Pakete</a>
          <a href="#faq" className="hover:opacity-60">FAQ</a>
        </div>
        <a href="#contact" className="rounded-full bg-[#191314] px-5 py-3 text-sm font-bold text-white">Demo buchen</a>
      </nav>

      <section id="top" className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="rounded-[2rem] bg-[#f4f4f2] p-6 shadow-[0_18px_60px_rgba(25,19,20,0.08)] sm:p-10 lg:p-14">
          <Pill>Pre-Diligence Operating System</Pill>
          <h1 className="mt-10 max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.06em] sm:text-6xl lg:text-7xl">
            Deal Intelligence, bevor Due Diligence beginnt.
          </h1>
          <p className="mt-7 max-w-2xl text-xl font-semibold leading-snug text-neutral-800">
            Coridoor verwandelt öffentliche und strukturierte Daten in quellenbasierte, validierungsfähige und kundenfertige Deal Rooms.
          </p>
          <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-600">
            Für Private-Equity-Fonds, Family Offices, M&A-Berater, strategische Käufer, Corporate Development Teams, Search Funds, Fundless Sponsors und Investment Committees, die früher wissen müssen, welche Deals, Risiken und Fragen wirklich prüfenswert sind.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ArrowLink>Deal Room anfragen</ArrowLink>
            <a href="#example" className="inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white px-5 py-3 text-sm font-bold text-[#191314]">Beispiel-Room ansehen</a>
          </div>
          <div className="mt-10 border-t border-neutral-200 pt-6 text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500">
            Bevor Investoren teure Due Diligence beauftragen, zeigt Coridoor, welche Deals, Risiken und Fragen überhaupt prüfenswert sind.
          </div>
        </div>

        <div className="rounded-[2rem] bg-[#e9ff3f] p-5 shadow-[0_18px_60px_rgba(25,19,20,0.08)] sm:p-7">
          <div className="rounded-[1.5rem] bg-[#191314] p-6 text-white">
            <div className="mb-6 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-white/50">
              <span>Client Room</span><span>Private Link</span>
            </div>
            <h2 className="text-3xl font-black leading-tight tracking-[-0.04em]">Know what is worth diligencing before you start diligence.</h2>
            <div className="mt-8 grid gap-3">
              {["Executive Summary", "Public Financial Pack", "Risk Engine", "Validation Matrix", "Source Register", "Advisor Handoff"].map((item) => (
                <div key={item} className="flex items-center justify-between rounded-2xl bg-white/8 px-4 py-4 text-sm font-semibold">
                  <span>{item}</span><span className="text-[#e9ff3f]">●</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-4">
            <div className="rounded-3xl bg-white p-5">
              <div className="text-3xl font-black tracking-[-0.05em]">Fact</div>
              <p className="mt-2 text-sm leading-6 text-neutral-600">Jede Aussage wird klassifiziert und auf Quellen zurückgeführt.</p>
            </div>
            <div className="rounded-3xl bg-white p-5">
              <div className="text-3xl font-black tracking-[-0.05em]">QA</div>
              <p className="mt-2 text-sm leading-6 text-neutral-600">Interne Prüfung vor Veröffentlichung in den Client Room.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="problem" className="mx-auto mt-6 max-w-7xl rounded-[2rem] bg-[#f4f4f2] p-6 shadow-[0_18px_60px_rgba(25,19,20,0.08)] sm:p-10 lg:p-14">
        <SectionLabel>Das Problem</SectionLabel>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <h2 className="text-4xl font-black leading-tight tracking-[-0.05em] sm:text-5xl">Deals werden oft zu spät, zu teuer und mit zu wenig strukturierter Vorarbeit geprüft.</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {["Deal-Informationen liegen verstreut in Quellen, PDFs, News, Filings, Präsentationen und Notizen.", "Teams verlieren Zeit mit manueller Recherche, ohne eine belastbare Entscheidungslogik aufzubauen.", "PDFs sind statisch und trennen Quellen, Fakten, Risiken und offene Fragen nicht sauber.", "Big-4- und Legal-Due-Diligence beginnt häufig erst, wenn der Prozess bereits weit fortgeschritten ist.", "Investment Committees brauchen klare Logik: Was ist Fakt, was ist Berechnung, was ist Hypothese?", "Öffentliche Daten liefern oft frühe Signale, werden aber nicht systematisch als Pre-DD-Layer genutzt."].map((text) => (
              <div key={text} className="rounded-3xl border border-neutral-200 bg-white p-6 text-base leading-7 text-neutral-700">{text}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-6 grid max-w-7xl gap-6 lg:grid-cols-3">
        <div className="rounded-[2rem] bg-[#f4f4f2] p-8 shadow-[0_18px_60px_rgba(25,19,20,0.08)] lg:col-span-1">
          <SectionLabel>Die Lösung</SectionLabel>
          <h2 className="text-4xl font-black leading-tight tracking-[-0.05em]">Ein Workspace für interne Analyse. Ein Client Room für Entscheidungen.</h2>
        </div>
        <div className="rounded-[2rem] bg-[#191314] p-8 text-white shadow-[0_18px_60px_rgba(25,19,20,0.08)] lg:col-span-2">
          <p className="max-w-3xl text-2xl font-semibold leading-snug">
            Coridoor ist kein interaktiver Report, kein Dashboard und keine AI-Zusammenfassung. Coridoor ist ein Deal-Intelligence-Workspace, der öffentliche Daten in einen advisor-ready Decision-Support-Room überführt.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {["Internal Workspace", "Source-backed Fact Ledger", "Financial Model Layer", "Risk Engine", "Validation Matrix", "Publishable Deal Rooms"].map((item) => (
              <div key={item} className="rounded-3xl bg-white/8 p-5 text-sm font-semibold text-white/85">{item}</div>
            ))}
          </div>
        </div>
      </section>

      <section id="workflow" className="mx-auto mt-6 max-w-7xl rounded-[2rem] bg-[#f4f4f2] p-6 shadow-[0_18px_60px_rgba(25,19,20,0.08)] sm:p-10 lg:p-14">
        <SectionLabel>So funktioniert Coridoor</SectionLabel>
        <h2 className="max-w-4xl text-4xl font-black leading-tight tracking-[-0.05em] sm:text-5xl">Vom ersten Deal-Signal zum privaten Client Room.</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {workflow.map((step, index) => (
            <div key={step.title} className="rounded-3xl bg-white p-6 shadow-[0_10px_30px_rgba(25,19,20,0.04)]">
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#e9ff3f] text-sm font-black">{String(index + 1).padStart(2, "0")}</div>
              <h3 className="text-2xl font-black tracking-[-0.04em]">{step.title}</h3>
              <p className="mt-4 text-sm leading-7 text-neutral-600">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-6 grid max-w-7xl gap-6 lg:grid-cols-2">
        <div className="rounded-[2rem] bg-[#f4f4f2] p-8 shadow-[0_18px_60px_rgba(25,19,20,0.08)]">
          <SectionLabel>Ebene A</SectionLabel>
          <h2 className="text-4xl font-black tracking-[-0.05em]">Internal Workspace</h2>
          <p className="mt-5 text-lg leading-8 text-neutral-700">Für Analysten, Norvik und interne Deal-Teams. Hier werden Quellen gesammelt, Fakten extrahiert, Finanzdaten strukturiert, Risiken bewertet, Validierungsfragen gebaut, Module vorbereitet, QA durchgeführt und Inhalte veröffentlicht.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {["Client Intake", "Research Command Center", "Source Vault", "Fact Ledger", "Financial Model Layer", "Risk Engine", "Internal QA", "Publish Center"].map((item) => <Pill key={item}>{item}</Pill>)}
          </div>
        </div>
        <div className="rounded-[2rem] bg-[#e9ff3f] p-8 shadow-[0_18px_60px_rgba(25,19,20,0.08)]">
          <SectionLabel>Ebene B</SectionLabel>
          <h2 className="text-4xl font-black tracking-[-0.05em]">Client Room</h2>
          <p className="mt-5 text-lg leading-8 text-neutral-800">Für Kunden, Investment Committees und externe Berater. Der private Link bündelt Executive Summary, Target Snapshot, Public Financial Pack, Public QoE Proxy, Risk Engine, Validation Matrix, Source Register, Advisor Handoff, IC Summary, Watchlist sowie Charts und Kurven.</p>
          <div className="mt-8 rounded-3xl bg-white p-5 text-sm font-semibold leading-7">Private Link-Auslieferung · Kundenfertige Module · Quellenregister · Advisor-ready Übergabe · IC-fähige Entscheidungslogik</div>
        </div>
      </section>

      <section className="mx-auto mt-6 max-w-7xl rounded-[2rem] bg-[#f4f4f2] p-6 shadow-[0_18px_60px_rgba(25,19,20,0.08)] sm:p-10 lg:p-14">
        <SectionLabel>Produktmodule</SectionLabel>
        <h2 className="max-w-4xl text-4xl font-black leading-tight tracking-[-0.05em] sm:text-5xl">Mehr als Output: ein validierungsfähiges Deal-System.</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {modules.map(([title, text]) => (
            <div key={title} className="rounded-3xl bg-white p-6">
              <h3 className="text-2xl font-black tracking-[-0.04em]">{title}</h3>
              <p className="mt-4 text-sm leading-7 text-neutral-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="packages" className="mx-auto mt-6 max-w-7xl rounded-[2rem] bg-[#f4f4f2] p-6 shadow-[0_18px_60px_rgba(25,19,20,0.08)] sm:p-10 lg:p-14">
        <SectionLabel>Pakete</SectionLabel>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <h2 className="max-w-3xl text-4xl font-black leading-tight tracking-[-0.05em] sm:text-5xl">Eine Value Ladder für unterschiedliche Deal-Komplexität.</h2>
          <p className="max-w-md text-base leading-7 text-neutral-600">Jedes Paket ist ein strukturierter Deal Room, kein billiges Report-Paket. Umfang, Quellenlage und Validierungsbedarf bestimmen die Tiefe.</p>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-4">
          {packages.map((pkg) => (
            <div key={pkg.name} className={`rounded-[1.75rem] p-6 ${pkg.featured ? "bg-[#e9ff3f]" : "bg-white"}`}>
              <div className="text-sm font-bold uppercase tracking-[0.16em] text-neutral-500">{pkg.price}</div>
              <h3 className="mt-5 text-2xl font-black leading-tight tracking-[-0.04em]">{pkg.name}</h3>
              <p className="mt-4 text-sm leading-7 text-neutral-700">{pkg.fit}</p>
              <div className="mt-5 rounded-2xl bg-[#191314] px-4 py-3 text-sm font-bold text-white">{pkg.facts}</div>
              <ul className="mt-5 space-y-3 text-sm font-semibold text-neutral-800">
                {pkg.items.map((item) => <li key={item}>→ {item}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-6 max-w-7xl rounded-[2rem] bg-[#191314] p-6 text-white shadow-[0_18px_60px_rgba(25,19,20,0.08)] sm:p-10 lg:p-14">
        <SectionLabel>Big-4 Positionierung</SectionLabel>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-4xl font-black leading-tight tracking-[-0.05em] sm:text-5xl">Coridoor ersetzt keine Big 4. Coridoor macht Due Diligence gezielter.</h2>
            <p className="mt-6 text-xl font-semibold leading-snug text-white/85">Big 4 prüft den Deal. Coridoor zeigt, welche Deals und Fragen prüfenswert sind.</p>
          </div>
          <div className="space-y-4 text-base leading-8 text-white/70">
            <p>Financial DD bleibt bei FDD-Teams. Tax DD bleibt bei Tax Advisors. Legal DD bleibt bei Law Firms. Cyber / IT DD bleibt bei Spezialisten.</p>
            <p>Coridoor strukturiert davor die Fragen, Quellen, Risiken und Validierungslogik. Das Ergebnis ist ein präziserer Scope, bessere Advisor-Briefings und weniger Blind Spots vor teuren Prüfmandaten.</p>
            <div className="rounded-3xl bg-white p-6 text-[#191314]"><strong>Big 4 validates the deal.</strong><br /><strong>Coridoor helps you decide what deserves validation.</strong></div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-6 max-w-7xl rounded-[2rem] bg-[#f4f4f2] p-6 shadow-[0_18px_60px_rgba(25,19,20,0.08)] sm:p-10 lg:p-14">
        <SectionLabel>Use Cases</SectionLabel>
        <h2 className="max-w-4xl text-4xl font-black leading-tight tracking-[-0.05em] sm:text-5xl">Für Teams, die vor formaler Due Diligence entscheidungsfähig sein müssen.</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {useCases.map(([title, situation, problem, solution, output]) => (
            <div key={title} className="rounded-3xl bg-white p-6">
              <h3 className="text-2xl font-black tracking-[-0.04em]">{title}</h3>
              <div className="mt-5 space-y-4 text-sm leading-7 text-neutral-700">
                <p><strong>Situation:</strong> {situation}</p>
                <p><strong>Problem:</strong> {problem}</p>
                <p><strong>Coridoor:</strong> {solution}</p>
                <p><strong>Output:</strong> {output}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="example" className="mx-auto mt-6 max-w-7xl rounded-[2rem] bg-[#f4f4f2] p-6 shadow-[0_18px_60px_rgba(25,19,20,0.08)] sm:p-10 lg:p-14">
        <SectionLabel>Beispiel Output</SectionLabel>
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <h2 className="text-4xl font-black leading-tight tracking-[-0.05em] sm:text-5xl">Client Room für einen Healthcare / CDMO Deal.</h2>
            <p className="mt-6 text-lg leading-8 text-neutral-700">Beispiel: Novo Holdings × Catalent. Der Room kombiniert echte öffentliche Daten mit Validierungsfragen, damit ein Investment Team nicht nur Zahlen sieht, sondern die nächste Prüfungslogik versteht.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {["Public Financial Pack", "Public QoE Proxy", "Valuation Bridge", "Capacity Map", "Customer Neutrality Risk", "Risk Engine", "Validation Matrix", "Advisor Handoff"].map((item) => <Pill key={item}>{item}</Pill>)}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["Transaction EV", "$16.5bn"],
              ["FY2024 Net Revenue", "$4.38bn"],
              ["FY2024 Adjusted EBITDA", "$703m"],
              ["FY2024 EBITDA Margin", "~16.0%"],
              ["FY2024 Net Loss", "$(1.04)bn"],
              ["EV / FY2024 Adj. EBITDA", "~23.5x"],
              ["Novo Nordisk Site Purchase", "$11bn"],
              ["Sites", "Anagni · Bloomington · Brussels"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-3xl bg-white p-5">
                <div className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-500">{label}</div>
                <div className="mt-3 text-2xl font-black tracking-[-0.04em]">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-6 grid max-w-7xl gap-6 lg:grid-cols-[1fr_1.2fr]">
        <div className="rounded-[2rem] bg-[#e9ff3f] p-8 shadow-[0_18px_60px_rgba(25,19,20,0.08)]">
          <SectionLabel>Methodik</SectionLabel>
          <h2 className="text-4xl font-black leading-tight tracking-[-0.05em]">Norvik trennt Evidenz von Interpretation.</h2>
          <p className="mt-6 text-lg leading-8 text-neutral-800">Jede Aussage wird klassifiziert, geprüft und mit Validierungsstatus geführt. So bleibt sichtbar, was bekannt ist, was berechnet wurde und was formale Due Diligence noch beantworten muss.</p>
        </div>
        <div className="rounded-[2rem] bg-[#f4f4f2] p-8 shadow-[0_18px_60px_rgba(25,19,20,0.08)]">
          <div className="grid gap-3 sm:grid-cols-2">
            {["Reported Fact", "Norvik Calculation", "Inference", "Estimate", "Hypothesis", "Validation Required", "Internal Only", "QA-Check"].map((item) => <div key={item} className="rounded-2xl bg-white p-4 text-sm font-bold">{item}</div>)}
          </div>
          <p className="mt-6 text-base leading-7 text-neutral-600">Jeder Client Room enthält Quellenregister, Confidence-Level, Validation Status, Advisor Owner, QA-Check und Disclaimer.</p>
        </div>
      </section>

      <section id="contact" className="mx-auto mt-6 max-w-7xl rounded-[2rem] bg-[#f4f4f2] p-6 text-center shadow-[0_18px_60px_rgba(25,19,20,0.08)] sm:p-10 lg:p-14">
        <SectionLabel>Nächster Schritt</SectionLabel>
        <h2 className="mx-auto max-w-4xl text-4xl font-black leading-tight tracking-[-0.05em] sm:text-6xl">Starten Sie mit einem Deal Room, bevor Sie teure Diligence beauftragen.</h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-neutral-700">Fordern Sie einen Coridoor Room für ein konkretes Target, einen aktiven Prozess oder eine Watchlist-Situation an.</p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <ArrowLink>Private Demo buchen</ArrowLink>
          <a href="#packages" className="inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white px-5 py-3 text-sm font-bold text-[#191314]">Paketoptionen ansehen</a>
          <a href="#example" className="inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white px-5 py-3 text-sm font-bold text-[#191314]">Sample Room ansehen</a>
        </div>
      </section>

      <section id="faq" className="mx-auto mt-6 max-w-7xl rounded-[2rem] bg-[#f4f4f2] p-6 shadow-[0_18px_60px_rgba(25,19,20,0.08)] sm:p-10 lg:p-14">
        <SectionLabel>FAQ</SectionLabel>
        <h2 className="max-w-4xl text-4xl font-black leading-tight tracking-[-0.05em] sm:text-5xl">Häufige Fragen.</h2>
        <div className="mt-10 divide-y divide-neutral-200 rounded-3xl bg-white">
          {faqs.map(([question, answer]) => (
            <details key={question} className="group p-6 open:bg-white">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left text-lg font-black tracking-[-0.03em]">
                {question}<span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e9ff3f] text-sm">+</span>
              </summary>
              <p className="mt-4 max-w-4xl text-base leading-8 text-neutral-600">{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-6 max-w-7xl rounded-[2rem] bg-[#191314] p-6 text-white shadow-[0_18px_60px_rgba(25,19,20,0.08)] sm:p-10 lg:p-14">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div>
            <SectionLabel>Closing</SectionLabel>
            <h2 className="text-4xl font-black leading-tight tracking-[-0.05em] sm:text-5xl">Before formal diligence, Coridoor helps investors know what is worth diligencing.</h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70">Coridoor bringt Struktur in die Phase, in der Entscheidungen oft noch auf verstreuten Signalen beruhen. Es schafft eine gemeinsame Faktenbasis, priorisiert Risiken und übersetzt Pre-DD in konkrete Validierungsfragen für die nächste Prozessstufe.</p>
          </div>
          <div className="rounded-3xl bg-[#e9ff3f] p-6 text-[#191314]">
            <h3 className="text-2xl font-black tracking-[-0.04em]">Deutsche Positionierung</h3>
            <p className="mt-4 text-base font-semibold leading-7">Bevor Investoren teure Due Diligence beauftragen, zeigt Coridoor, welche Deals, Risiken und Fragen überhaupt prüfenswert sind.</p>
            <div className="mt-6"><a href="#contact" className="inline-flex rounded-full bg-[#191314] px-5 py-3 text-sm font-bold text-white">Ersten Pre-DD Room bauen ↗</a></div>
          </div>
        </div>
      </section>

      <footer className="mx-auto mt-6 max-w-7xl px-4 py-10 text-center text-sm font-semibold text-neutral-700">
        Coridoor by Norvik Intelligence · Source-backed investment intelligence · Public-data based pre-DD layer
      </footer>
    </main>
  );
}
