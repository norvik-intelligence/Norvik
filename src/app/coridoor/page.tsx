"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Check, ChevronDown, Database, FileText,
  BarChart3, AlertTriangle, Shield, Eye, Lock,
  Building2, TrendingUp, Search, Users, Layers,
  BookOpen, Target, Zap, Globe, GitBranch, Briefcase,
  MapPin, Cpu, ClipboardList, SendHorizonal,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const ease = [0.16, 1, 0.3, 1] as const;

// ─── DATA ────────────────────────────────────────────────────────────────────

const problems = [
  {
    icon: Globe,
    headline: "Informationen liegen verstreut",
    text: "Finanzdaten, regulatorische Hinweise, Wettbewerbssignale und Risikofaktoren befinden sich in Filings, Nachrichten, PDFs, Präsentationen und Notizen — ohne Struktur, ohne Quellenverifizierung.",
  },
  {
    icon: AlertTriangle,
    headline: "Formale DD beginnt zu spät",
    text: "Financial, Tax, Legal und Commercial Due Diligence wird oft erst dann beauftragt, wenn der Prozess bereits weit fortgeschritten ist. Die Vorentscheidung fällt ohne solide Datenbasis.",
  },
  {
    icon: FileText,
    headline: "IC-Vorbereitung bleibt ineffizient",
    text: "Investmentkomitees erhalten statische PDFs statt strukturierter Entscheidungslogik. Offene Fragen, kritische Risiken und Validierungsbedarfe bleiben unstrukturiert.",
  },
  {
    icon: Database,
    headline: "Öffentliche Daten werden verschwendet",
    text: "Filings, regulatorische Einreichungen, Jahresberichte und Branchendaten könnten ein klares Pre-DD-Bild ergeben — werden aber nicht systematisch ausgewertet.",
  },
  {
    icon: Briefcase,
    headline: "Ressourcen fließen in die falschen Deals",
    text: "Ohne strukturierte Pre-DD-Vorarbeit investieren Teams Zeit und Budget in Deals, die sich früher als nicht prüfenswert hätten erweisen können.",
  },
];

const steps = [
  { num: "01", icon: ClipboardList,  title: "Client Intake",              text: "Mandat, Investitionslogik, Zielsektor und Transaktionsparameter werden erfasst. Der Grundstein für jeden strukturierten Deal Room." },
  { num: "02", icon: Layers,         title: "Package Selection",           text: "Das passende Coridoor-Paket wird gewählt — von der schnellen IC-Vorbereitung bis zum vollständigen Investor-Judgment-Room." },
  { num: "03", icon: Target,         title: "Deal / Target Setup",         text: "Zielunternehmen, Sektor, Geografie, Eigentümerstruktur und relevante Deal-Parameter werden definiert und strukturiert." },
  { num: "04", icon: Search,         title: "Research Command Center",     text: "Systematische Recherche über öffentliche Quellen — Filings, Jahresberichte, Regulatorik, Nachrichten, Branchendaten und Datenbanken." },
  { num: "05", icon: Database,       title: "Source Vault",                text: "Alle Quellen werden erfasst, verlinkt, klassifiziert und mit Confidence-Level versehen. Kein Datum ohne Quellennachweis." },
  { num: "06", icon: BookOpen,       title: "Fact Ledger",                 text: "Fakten werden extrahiert und klar klassifiziert: Reported Fact, Norvik Calculation, Inference, Estimate, Hypothesis oder Validation Required." },
  { num: "07", icon: BarChart3,      title: "Financial Model Layer",       text: "Öffentliche Finanzdaten werden strukturiert: Revenue, EBITDA, Margen, Working Capital, Capex-Trends, Schuldenstruktur und Komps." },
  { num: "08", icon: AlertTriangle,  title: "Risk Engine",                 text: "Risiken werden identifiziert, kategorisiert, gewichtet und priorisiert — mit klarer Unterscheidung zwischen kritischen und beobachtbaren Risiken." },
  { num: "09", icon: Shield,         title: "Validation Matrix",           text: "Offene Validierungsfragen werden strukturiert und Advisor-Workstreams zugewiesen: FDD, Tax, Legal, CDD, OpDD, Cyber." },
  { num: "10", icon: Cpu,            title: "Module Builder",              text: "Client-Room-Module werden nach Paket zusammengestellt, formatiert und für die Auslieferung vorbereitet." },
  { num: "11", icon: Eye,            title: "Internal QA",                 text: "Alle Daten, Quellen, Klassifikationen und Aussagen werden intern geprüft. Keine Aussage ohne Quellenverifizierung." },
  { num: "12", icon: SendHorizonal,  title: "Client Room Link",            text: "Der private, klickbare Client Room wird generiert und per Link ausgeliefert — kein Login, kein Portal, kein Overhead." },
];

const features = [
  {
    icon: Database,
    title: "Source Vault",
    text: "Alle verwendeten Quellen werden erfasst, verlinkt und klassifiziert. Jeder Datenpunkt im Client Room ist auf eine verifizierbare Quelle zurückführbar. Das Source Register begleitet jeden Deal Room.",
    color: "text-[#5865F2]", bg: "bg-[rgba(88,101,242,0.1)]",
  },
  {
    icon: BookOpen,
    title: "Fact Ledger",
    text: "Fakten werden systematisch extrahiert und klassifiziert — als Reported Fact, Norvik Calculation, Inference, Estimate, Hypothesis oder Validation Required. Keine Vermischung von Wissen und Annahmen.",
    color: "text-violet-400", bg: "bg-violet-500/10",
  },
  {
    icon: BarChart3,
    title: "Financial Model Layer",
    text: "Öffentlich verfügbare Finanzdaten werden strukturiert: Revenue, EBITDA, Margen, Net Debt, Working Capital, Capex-Muster und Peer-Komps. Basis für Public QoE Proxy und Valuation Bridge.",
    color: "text-cyan-400", bg: "bg-cyan-500/10",
  },
  {
    icon: TrendingUp,
    title: "Public QoE Proxy",
    text: "Ein öffentlich-datenbasierter Qualitäts-of-Earnings-Proxy, der EBITDA-Qualität, Einmaleffekte, Working-Capital-Trends und Margenstabilität auf Basis verfügbarer Daten bewertet — ohne Datenzugang.",
    color: "text-emerald-400", bg: "bg-emerald-500/10",
  },
  {
    icon: AlertTriangle,
    title: "Risk Engine",
    text: "Risiken werden identifiziert, kategorisiert (operativ, regulatorisch, finanziell, strategisch, Narrativ) und priorisiert. Jedes Risiko erhält einen Status: kritisch, beobachtbar oder Validierung erforderlich.",
    color: "text-amber-400", bg: "bg-amber-500/10",
  },
  {
    icon: Shield,
    title: "Validation Matrix",
    text: "Offene Validierungsfragen werden strukturiert und konkreten Advisor-Workstreams zugewiesen. Der Advisor Handoff Pack zeigt, was FDD, Tax, Legal und CDD validieren müssen — und warum.",
    color: "text-rose-400", bg: "bg-rose-500/10",
  },
  {
    icon: GitBranch,
    title: "Module Builder",
    text: "Je nach Paket werden die relevanten Client-Room-Module zusammengestellt: Executive Summary, Target Snapshot, Financial Pack, Risk Engine, Valuation Bridge, IC Summary und weitere.",
    color: "text-purple-400", bg: "bg-purple-500/10",
  },
  {
    icon: Eye,
    title: "Internal QA",
    text: "Internes Qualitätssicherungsprotokoll: Quellenverifizierung, Klassifikationsprüfung, Konsistenzcheck und Disclaimer-Validierung. Kein Client Room wird ausgeliefert, bevor QA abgeschlossen ist.",
    color: "text-sky-400", bg: "bg-sky-500/10",
  },
  {
    icon: Lock,
    title: "Client Room",
    text: "Ein privater, klickbarer Raum, der per Link ausgeliefert wird. Enthält alle relevanten Module — Executive Summary, Financial Pack, Risk Engine, Validation Matrix, Source Register, Advisor Handoff und IC Summary.",
    color: "text-[#B8963E]", bg: "bg-[rgba(184,150,62,0.1)]",
  },
];

const packages = [
  {
    name: "Basic Interactive Deal Briefing",
    range: "€ 3.000 – 7.500",
    tag: "IC Pre-Read",
    desc: "Für schnelle Executive Briefings und IC-Vorbereitung bei frühen Deal-Prüfungen.",
    features: [
      "Target Snapshot", "Timeline & Meilensteine", "Key Facts (~20 Fakten)", "Risk Summary",
      "Source Register (~5 Quellen)", "IC Pre-Read", "Advisor Handoff Light",
    ],
    highlight: false,
    badge: null,
  },
  {
    name: "Professional Deal Room",
    range: "€ 8.000 – 20.000",
    tag: "Pre-DD Empfohlen",
    desc: "Für ernsthafte Pre-DD-Vorbereitung und strukturierte Deal Reviews vor formaler Due Diligence.",
    features: [
      "Target Snapshot & Evidence Trail", "Scoring Methodology", "Regulatory View",
      "Bull / Base / Bear Szenarien", "Watchlist", "Advisor Handoff Pack",
      "Charts & Kurven (~45 Fakten, ~12 Quellen)",
    ],
    highlight: true,
    badge: "Meistgewählt",
  },
  {
    name: "Premium Judgment Room",
    range: "€ 20.000 – 50.000",
    tag: "Komplexe Transaktionen",
    desc: "Für komplexe Deals mit hohem Informationsbedarf, Narrativrisiken und strukturiertem Advisor-Handoff.",
    features: [
      "Decision Delta & Remedy Decoder", "Unknowns Register", "Narrative Risk Analysis",
      "Contradiction Finder", "Full Validation Matrix", "Big-4 Handoff Pack",
      "Sensitivity Support (~80 Fakten, ~20 Quellen)",
    ],
    highlight: false,
    badge: null,
  },
  {
    name: "Custom Investor Version",
    range: "€ 35.000 – 100.000+",
    tag: "Institutional",
    desc: "Maßgeschneiderte Deal-Intelligence für PE-Fonds, Family Offices und strategische Käufer mit komplexen Anforderungen.",
    features: [
      "Public Financial Pack & Public QoE Proxy", "Segment Economics & Valuation Bridge",
      "Asset Map & Customer/Supplier Exposure", "Client Thesis Lens & Portfolio Impact",
      "Custom IC Questions", "Advisor Workstream Map", "Sensitivity Model",
      "Live Monitoring Setup (~130 Fakten, ~35 Quellen)",
    ],
    highlight: false,
    badge: "Auf Anfrage",
  },
];

const useCases = [
  {
    icon: Building2,
    label: "Private Equity",
    situation: "Ein PE-Fonds erhält einen Teaser für ein DACH-Mittelstandsunternehmen im Healthcare-Sektor.",
    problem: "Das IC-Meeting ist in 72 Stunden. Strukturierte Vorabinformationen fehlen. Das Team recherchiert manuell.",
    solution: "Coridoor liefert innerhalb von 48 Stunden einen Deal Room mit Target Snapshot, Financial Pack, Risk Engine und IC Pre-Read.",
    output: "Das IC entscheidet auf Basis strukturierter Daten — mit klaren Fragen für die formale DD.",
  },
  {
    icon: Users,
    label: "Family Office",
    situation: "Ein Single Family Office prüft eine direkte Beteiligung an einem B2B-SaaS-Anbieter.",
    problem: "Kein internes Deal-Team. Externe Berater sind teuer. Der Entscheidungsprozess ist unstrukturiert.",
    solution: "Coridoor erstellt einen Professional Deal Room mit Scoring Methodology, Bull/Base/Bear und Advisor Handoff.",
    output: "Das Family Office entscheidet, ob und wie formale DD beauftragt wird — mit konkreten Fragen und Priorisierungen.",
  },
  {
    icon: Briefcase,
    label: "M&A-Boutique",
    situation: "Eine M&A-Boutique begleitet eine Sell-Side-Transaktion und benötigt Käufer-seitige Vorarbeit.",
    problem: "Potenziellen Käufern fehlt die strukturierte Vorabinformation, um schnell qualifizierte Entscheidungen zu treffen.",
    solution: "Coridoor erstellt einen Advisor-fertigen Deal Room, der als Entscheidungsgrundlage für qualifizierte Käufer dient.",
    output: "Qualifiziertere Käufergespräche, weniger Informations-Overhead, strukturierte Validation Matrix für den Prozess.",
  },
  {
    icon: TrendingUp,
    label: "Corporate Development",
    situation: "Ein Corporate-Development-Team prüft drei potenzielle Akquisitionsziele gleichzeitig.",
    problem: "Mangelnde Vergleichbarkeit, fragmentierte Quellen, keine einheitliche Risikostruktur über alle Targets.",
    solution: "Coridoor liefert für jedes Target einen standardisierten Deal Room mit einheitlicher Risikostruktur und Scoring.",
    output: "Klare Priorisierung: welches Target verfolgen, welches beobachten, welches verwerfen.",
  },
  {
    icon: Search,
    label: "Search Fund",
    situation: "Ein Searcher hat vier potenzielle Akquisitionsziele identifiziert und muss priorisieren.",
    problem: "Begrenzte Ressourcen. Keine Zeit für manuelle Tiefenrecherche zu allen vier Targets.",
    solution: "Coridoor liefert Basic Deal Briefings für alle vier Targets — schnell, strukturiert, quellenbasiert.",
    output: "Der Searcher fokussiert sich auf das prüfenswerteste Target. Ressourcen werden gezielt eingesetzt.",
  },
  {
    icon: Globe,
    label: "Strategischer Käufer",
    situation: "Ein strategischer Käufer prüft einen Add-on im Zielmarkt und will vor dem LOI wissen, was formale DD erwartet.",
    problem: "Öffentliche Daten sind vorhanden, aber nicht strukturiert. Das interne Team fehlt für die Vorarbeit.",
    solution: "Coridoor erstellt ein Premium Judgment Room mit Narrative Risk, Contradiction Finder und Big-4 Handoff Pack.",
    output: "Das Management tritt in die formale DD mit klaren Fragen, Priorisierungen und einem strukturierten Advisor-Briefing ein.",
  },
];

const faqs = [
  {
    q: "Ersetzt Coridoor die Big-4-Due-Diligence?",
    a: "Nein. Coridoor ist kein Ersatz für formale Financial, Tax, Legal, Commercial oder Operational Due Diligence. Coridoor kommt davor. Es strukturiert Daten, identifiziert Risiken und formuliert Validierungsfragen — damit formale DD gezielter, schneller und effizienter wird.",
  },
  {
    q: "Welche Daten verwendet Coridoor?",
    a: "Coridoor arbeitet ausschließlich mit öffentlich verfügbaren und strukturierten Daten: Jahresberichte, regulatorische Einreichungen, Filings, Handelsdaten, Branchendaten, Nachrichten, Unternehmensregister und weitere öffentliche Quellen. Kein Datenzugang zu vertraulichen Unterlagen ist erforderlich.",
  },
  {
    q: "Kann Coridoor vor Datenzugang oder Data Room Zugang arbeiten?",
    a: "Ja. Coridoor ist explizit für die Pre-DD-Phase konzipiert — bevor ein Data Room geöffnet wird oder vertrauliche Unterlagen zugänglich sind. Alle Analysen basieren auf öffentlich verfügbaren Informationen.",
  },
  {
    q: "Was erhält der Kunde?",
    a: "Der Kunde erhält einen privaten, klickbaren Client Room, der per Link ausgeliefert wird. Je nach Paket enthält er: Executive Summary, Target Snapshot, Financial Pack, Public QoE Proxy, Risk Engine, Validation Matrix, Source Register, Advisor Handoff und IC Summary.",
  },
  {
    q: "Was ist der Unterschied zu einem PDF-Report?",
    a: "Coridoor ist kein PDF-Report. Der Client Room ist ein strukturierter, klickbarer Deal-Intelligence-Workspace mit Quellenregistern, Fact Ledger, Risk Engine, Validation Matrix und Advisor Handoff — nicht ein statisches Dokument, sondern ein entscheidungsreifer Arbeitsraum.",
  },
  {
    q: "Wie lange dauert die Erstellung eines Rooms?",
    a: "Basic Interactive Deal Briefings sind in 48–72 Stunden lieferbar. Professional Deal Rooms benötigen in der Regel 5–7 Werktage. Premium Judgment Rooms und Custom Investor Versions werden individuell terminiert — Express-Optionen sind auf Anfrage verfügbar.",
  },
  {
    q: "Können Rooms nach Lieferung aktualisiert werden?",
    a: "Ja. Rooms können nach Lieferung mit neuen Quellen, aktualisierten Daten oder zusätzlichen Modulen ergänzt werden. Update-Mandates werden separat bepreist.",
  },
  {
    q: "Kann Coridoor auf unsere Investitionsthese angepasst werden?",
    a: "Ja. Die Custom Investor Version ist explizit für kundespezifische Anforderungen konzipiert: Client Thesis Lens, Portfolio Impact, Custom IC Questions und Advisor Workstream Map werden auf die individuelle Investitionslogik des Kunden abgestimmt.",
  },
  {
    q: "Was ist ein Public QoE Proxy?",
    a: "Der Public QoE Proxy ist ein öffentlich-datenbasierter Qualitäts-of-Earnings-Proxy. Er bewertet auf Basis verfügbarer Daten: EBITDA-Qualität, Einmaleffekte, Working-Capital-Trends, Margenstabilität und Umsatzqualität — ohne vertraulichen Datenzugang. Kein Ersatz für formale QoE, aber ein strukturierter Pre-DD-Indikator.",
  },
  {
    q: "Was rechtfertigt den Preis der Custom Investor Version?",
    a: "Die Custom Investor Version umfasst die tiefste Analyse-Ebene: ~130 Fakten, ~35 Quellen, Financial Pack, Public QoE Proxy, Segment Economics, Valuation Bridge, Asset Map, Customer/Supplier Exposure, Client Thesis Lens, Portfolio Impact, Custom IC Questions, Advisor Workstream Map, Sensitivity Model und Live Monitoring Setup. Sie ist für institutionelle Investoren konzipiert, die vor einer Akquisitionsentscheidung maximale Klarheit benötigen.",
  },
];

// ─── HERO ─────────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#07080F] pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#5865F2]/6 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
        >
          <span className="section-label mb-6 inline-flex">Coridoor by Norvik Intelligence</span>
        </motion.div>

        <div className="overflow-hidden mt-8 mb-6">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1, ease, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-[#EFEDE8] leading-[1.02] tracking-tight"
          >
            Deal Intelligence.<br />
            <span className="text-gradient">Bevor Due Diligence beginnt.</span>
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease }}
          className="text-lg sm:text-xl text-[rgba(239,237,232,0.52)] max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Coridoor verwandelt öffentliche und strukturierte Daten in quellenbasierte,
          validierungsfähige Deal Rooms — damit Investoren früher wissen, was prüfenswert ist.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 bg-[#5865F2] text-white px-8 py-3.5 rounded-xl text-sm font-semibold hover:bg-[#4752D4] shadow-[0_0_28px_rgba(88,101,242,0.28)] hover:shadow-[0_0_36px_rgba(88,101,242,0.38)] transition-all duration-200"
          >
            Deal Room anfragen <ArrowRight size={15} />
          </a>
          <a
            href="#packages"
            className="inline-flex items-center justify-center gap-2 border border-white/15 text-[#EFEDE8] bg-transparent hover:bg-white/5 px-8 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200"
          >
            Pakete ansehen
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-8 text-xs text-[rgba(239,237,232,0.28)] tracking-wider uppercase"
        >
          Für Private-Equity-Fonds · Family Offices · M&A-Boutiquen · Strategische Käufer
        </motion.p>
      </div>

      {/* Module preview strip */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.8, ease }}
        className="relative z-10 max-w-4xl mx-auto mt-16"
      >
        <div className="rounded-2xl border border-white/6 bg-white/[0.02] p-4 sm:p-6">
          <p className="text-[10px] font-bold tracking-[0.2em] text-[rgba(239,237,232,0.28)] uppercase mb-4 text-center">Client Room Module</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {["Executive Summary","Target Snapshot","Public Financial Pack","Public QoE Proxy","Segment Economics","Valuation Bridge","Risk Engine","Validation Matrix","Source Register","Advisor Handoff","IC Summary","Watchlist"].map(m => (
              <span key={m} className="px-3 py-1.5 rounded-full border border-white/8 bg-white/[0.03] text-[11px] text-[rgba(239,237,232,0.42)]">{m}</span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// ─── PROBLEM ──────────────────────────────────────────────────────────────────

function ProblemSection() {
  return (
    <section className="py-20 sm:py-28 lg:py-36 bg-[#08090F] relative overflow-hidden">
      <div className="absolute top-8 right-8 text-[clamp(80px,12vw,160px)] font-black text-white/[0.02] leading-none select-none pointer-events-none tracking-tighter">01</div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="mb-16"
        >
          <span className="section-label">Das Problem</span>
          <div className="overflow-hidden mt-6">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease }}
              className="text-4xl lg:text-5xl font-black text-[#EFEDE8] leading-tight tracking-tight max-w-2xl"
            >
              Investoren entscheiden zu oft im Blindflug.
            </motion.h2>
          </div>
          <p className="mt-5 text-[rgba(239,237,232,0.42)] max-w-xl text-base leading-relaxed">
            Bevor formale Due Diligence beginnt, fehlt die Struktur. Deal-Signale sind verstreut.
            Öffentliche Daten werden nicht systematisch genutzt. Das IC entscheidet auf fragmentierter Basis.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {problems.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: i * 0.07, duration: 0.7, ease }}
                className="rounded-2xl border border-white/6 bg-white/[0.02] p-6 hover:border-white/10 transition-colors duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center mb-4">
                  <Icon size={17} className="text-rose-400" />
                </div>
                <h3 className="text-sm font-semibold text-[#EFEDE8] mb-2">{p.headline}</h3>
                <p className="text-xs text-[rgba(239,237,232,0.38)] leading-relaxed">{p.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── SOLUTION ─────────────────────────────────────────────────────────────────

function SolutionSection() {
  return (
    <section className="py-20 sm:py-28 lg:py-36 bg-[#07080F] relative overflow-hidden">
      <div className="absolute top-8 right-8 text-[clamp(80px,12vw,160px)] font-black text-white/[0.02] leading-none select-none pointer-events-none tracking-tighter">02</div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
          >
            <span className="section-label">Die Lösung</span>
            <div className="overflow-hidden mt-6">
              <motion.h2
                initial={{ y: "100%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease }}
                className="text-4xl lg:text-5xl font-black text-[#EFEDE8] leading-tight tracking-tight"
              >
                Coridoor. Der Pre-Diligence-Layer.
              </motion.h2>
            </div>
            <p className="mt-6 text-[rgba(239,237,232,0.48)] text-base leading-relaxed">
              Coridoor ist ein Deal-Intelligence-Workspace und Client-Room-System. Es strukturiert öffentliche Daten,
              extrahiert verifizierte Fakten, bewertet Risiken und liefert einen quellenbasierten, klickbaren Deal Room —
              bevor formale Financial, Tax, Legal oder Commercial Due Diligence beginnt.
            </p>
            <div className="mt-10 space-y-4">
              {[
                { label: "Quellenbasiert", desc: "Jede Aussage verlinkt auf eine verifizierbare Quelle." },
                { label: "Strukturiert", desc: "Fakten, Kalkulationen, Inferenzen und Validierungsbedarfe klar getrennt." },
                { label: "Entscheidungsreif", desc: "IC-Vorbereitung, Advisor-Handoff und Watchlist in einem Room." },
                { label: "Privat ausgeliefert", desc: "Der Client Room wird per Link übergeben — kein Portal, kein Overhead." },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.6, ease }}
                  className="flex items-start gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-[#5865F2]/15 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={11} className="text-[#5865F2]" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-[#EFEDE8]">{item.label} — </span>
                    <span className="text-sm text-[rgba(239,237,232,0.42)]">{item.desc}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
            className="rounded-2xl border border-[#5865F2]/20 bg-[#5865F2]/[0.04] p-8"
          >
            <p className="text-[10px] font-bold tracking-[0.2em] text-[#5865F2]/70 uppercase mb-6">Zentrale Positionierung</p>
            <blockquote className="text-2xl font-black text-[#EFEDE8] leading-snug tracking-tight mb-6">
              "Bevor Investoren teure Due Diligence beauftragen, zeigt Coridoor, welche Deals, Risiken und Fragen überhaupt prüfenswert sind."
            </blockquote>
            <div className="border-t border-white/8 pt-6 space-y-3">
              {[
                "Welche Deals sind prüfenswert?",
                "Welche Risiken sind kritisch?",
                "Welche Fragen muss formale DD beantworten?",
                "Welche öffentlichen Signale ergeben bereits ein Bild?",
                "Verfolgen, beobachten oder verwerfen?",
              ].map((q, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#5865F2]/60 shrink-0" />
                  <p className="text-sm text-[rgba(239,237,232,0.55)]">{q}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── HOW IT WORKS ─────────────────────────────────────────────────────────────

function HowItWorksSection() {
  return (
    <section className="py-20 sm:py-28 lg:py-36 bg-[#06070C] relative overflow-hidden">
      <div className="absolute top-8 right-8 text-[clamp(80px,12vw,160px)] font-black text-white/[0.02] leading-none select-none pointer-events-none tracking-tighter">03</div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="mb-16 text-center"
        >
          <span className="section-label">Workflow</span>
          <div className="overflow-hidden mt-6">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease }}
              className="text-4xl lg:text-5xl font-black text-[#EFEDE8] leading-tight tracking-tight"
            >
              Vom Mandat zum Client Room.
            </motion.h2>
          </div>
          <p className="mt-4 text-[rgba(239,237,232,0.38)] text-base max-w-lg mx-auto">
            Zwölf strukturierte Phasen. Ein quellenbasierter, entscheidungsreifer Deal Room.
          </p>
        </motion.div>

        <div className="space-y-0">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ delay: i * 0.05, duration: 0.6, ease }}
                className="group relative border-t border-white/6 py-6 grid grid-cols-[52px_1fr] md:grid-cols-[80px_1fr_auto] gap-4 md:gap-6 items-start hover:border-white/12 transition-colors duration-300"
              >
                <div className="absolute left-0 top-0 h-px w-0 bg-[#5865F2] group-hover:w-full transition-all duration-700 ease-out" />
                <span className="text-lg font-black text-[rgba(239,237,232,0.10)] group-hover:text-[rgba(239,237,232,0.2)] transition-colors duration-300 pt-1 leading-none tracking-tighter">{step.num}</span>
                <div>
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className="w-7 h-7 rounded-lg bg-[#5865F2]/10 flex items-center justify-center">
                      <Icon size={13} className="text-[#5865F2]" />
                    </div>
                    <h3 className="text-sm font-semibold text-[#EFEDE8]">{step.title}</h3>
                  </div>
                  <p className="text-xs text-[rgba(239,237,232,0.38)] leading-relaxed max-w-2xl">{step.text}</p>
                </div>
                {i === 11 && (
                  <div className="hidden md:flex items-center gap-2 pt-1">
                    <span className="px-3 py-1 rounded-full bg-[#5865F2]/15 text-[10px] font-bold text-[#5865F2] uppercase tracking-wider">Output</span>
                  </div>
                )}
              </motion.div>
            );
          })}
          <div className="border-t border-white/6" />
        </div>
      </div>
    </section>
  );
}

// ─── PRODUCT LAYERS ───────────────────────────────────────────────────────────

function ProductLayersSection() {
  return (
    <section className="py-20 sm:py-28 lg:py-36 bg-[#08090F] relative overflow-hidden">
      <div className="absolute top-8 right-8 text-[clamp(80px,12vw,160px)] font-black text-white/[0.02] leading-none select-none pointer-events-none tracking-tighter">04</div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="mb-16"
        >
          <span className="section-label">Produktstruktur</span>
          <div className="overflow-hidden mt-6">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease }}
              className="text-4xl lg:text-5xl font-black text-[#EFEDE8] leading-tight tracking-tight max-w-xl"
            >
              Zwei Ebenen. Ein System.
            </motion.h2>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Internal Workspace */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="rounded-2xl border border-white/8 bg-white/[0.025] p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#5865F2]/12 flex items-center justify-center">
                <Lock size={18} className="text-[#5865F2]" />
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-[0.18em] text-[rgba(239,237,232,0.3)] uppercase">Ebene 01</p>
                <h3 className="text-base font-bold text-[#EFEDE8]">Internal Workspace</h3>
              </div>
            </div>
            <p className="text-sm text-[rgba(239,237,232,0.45)] leading-relaxed mb-6">
              Der interne Arbeitsbereich, in dem Coridoor-Mandate strukturiert bearbeitet werden.
              Vom Client Intake bis zur QA — vollständig dokumentiert und nachvollziehbar.
            </p>
            <div className="grid grid-cols-2 gap-2">
              {["Client Intake","Package Selection","Deal / Target Setup","Research Command Center","Source Vault","Fact Ledger","Financial Model Layer","Risk Engine","Validation Matrix","Module Builder","Internal QA","Publish Center"].map(m => (
                <div key={m} className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-[#5865F2]/50 shrink-0" />
                  <span className="text-[11px] text-[rgba(239,237,232,0.38)]">{m}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Client Room */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="rounded-2xl border border-[#B8963E]/25 bg-[rgba(184,150,62,0.04)] p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[rgba(184,150,62,0.12)] flex items-center justify-center">
                <Eye size={18} className="text-[#B8963E]" />
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-[0.18em] text-[rgba(239,237,232,0.3)] uppercase">Ebene 02</p>
                <h3 className="text-base font-bold text-[#EFEDE8]">Client Room</h3>
              </div>
            </div>
            <p className="text-sm text-[rgba(239,237,232,0.45)] leading-relaxed mb-6">
              Der private, klickbare Kundenraum — ausgeliefert per Link.
              Kein Portal, kein Login-Aufwand. Strukturierte Deal-Intelligence, entscheidungsreif und quellenbasiert.
            </p>
            <div className="grid grid-cols-2 gap-2">
              {["Executive Summary","Target Snapshot","Public Financial Pack","Public QoE Proxy","Segment Economics","Valuation Bridge","Risk Engine","Validation Matrix","Source Register","Advisor Handoff","IC Summary","Watchlist"].map(m => (
                <div key={m} className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-[#B8963E]/50 shrink-0" />
                  <span className="text-[11px] text-[rgba(239,237,232,0.38)]">{m}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── FEATURES ─────────────────────────────────────────────────────────────────

function FeaturesSection() {
  return (
    <section className="py-20 sm:py-28 lg:py-36 bg-[#07080F] relative overflow-hidden">
      <div className="absolute top-8 right-8 text-[clamp(80px,12vw,160px)] font-black text-white/[0.02] leading-none select-none pointer-events-none tracking-tighter">05</div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="mb-16"
        >
          <span className="section-label">Module</span>
          <div className="overflow-hidden mt-6">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease }}
              className="text-4xl lg:text-5xl font-black text-[#EFEDE8] leading-tight tracking-tight max-w-xl"
            >
              Jedes Modul. Ein klarer Zweck.
            </motion.h2>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ delay: i * 0.06, duration: 0.7, ease }}
                className="rounded-2xl border border-white/6 bg-white/[0.02] p-6 hover:border-white/10 transition-all duration-300 shimmer-card"
              >
                <div className={`w-10 h-10 rounded-xl ${f.bg} flex items-center justify-center mb-4`}>
                  <Icon size={17} className={f.color} />
                </div>
                <h3 className="text-sm font-semibold text-[#EFEDE8] mb-2">{f.title}</h3>
                <p className="text-xs text-[rgba(239,237,232,0.38)] leading-relaxed">{f.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── PACKAGES ─────────────────────────────────────────────────────────────────

function PackagesSection() {
  return (
    <section id="packages" className="py-20 sm:py-28 lg:py-36 bg-[#06070C] relative overflow-hidden">
      <div className="absolute top-8 right-8 text-[clamp(80px,12vw,160px)] font-black text-white/[0.02] leading-none select-none pointer-events-none tracking-tighter">06</div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="mb-16 text-center"
        >
          <span className="section-label">Pakete</span>
          <div className="overflow-hidden mt-6">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease }}
              className="text-4xl lg:text-5xl font-black text-[#EFEDE8] leading-tight tracking-tight"
            >
              Klarer Scope. Definierbarer Output.
            </motion.h2>
          </div>
          <p className="mt-4 text-[rgba(239,237,232,0.38)] text-base max-w-lg mx-auto">
            Coridoor liefert keinen Report. Coridoor liefert einen Deal-Intelligence-Workspace — strukturiert, quellenbasiert und entscheidungsreif.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {packages.map((pkg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ delay: i * 0.08, duration: 0.7, ease }}
              className={`relative rounded-2xl p-6 flex flex-col ${
                pkg.highlight
                  ? "border border-[#5865F2]/35 bg-[#5865F2]/[0.06] border-glow"
                  : "border border-white/6 bg-white/[0.02]"
              }`}
            >
              {pkg.badge && (
                <span className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${
                  pkg.highlight ? "bg-[#5865F2] text-white" : "bg-white/10 text-[rgba(239,237,232,0.6)]"
                }`}>{pkg.badge}</span>
              )}
              <div className="mb-5">
                <span className="text-[10px] font-bold tracking-[0.18em] text-[rgba(239,237,232,0.3)] uppercase">{pkg.tag}</span>
                <h3 className="text-base font-bold text-[#EFEDE8] mt-1 mb-2 leading-snug">{pkg.name}</h3>
                <p className={`text-xl font-black tracking-tight ${pkg.highlight ? "text-gradient" : "text-[#EFEDE8]"}`}>{pkg.range}</p>
              </div>
              <p className="text-xs text-[rgba(239,237,232,0.38)] leading-relaxed mb-6 flex-1">{pkg.desc}</p>
              <ul className="space-y-2 mb-6">
                {pkg.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <Check size={11} className={`shrink-0 mt-0.5 ${pkg.highlight ? "text-[#5865F2]" : "text-[rgba(239,237,232,0.3)]"}`} />
                    <span className="text-[11px] text-[rgba(239,237,232,0.45)] leading-snug">{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`w-full py-2.5 rounded-xl text-xs font-semibold text-center transition-all duration-200 ${
                  pkg.highlight
                    ? "bg-[#5865F2] text-white hover:bg-[#4752D4]"
                    : "border border-white/12 text-[rgba(239,237,232,0.6)] hover:border-white/25 hover:text-[#EFEDE8]"
                }`}
              >
                {pkg.badge === "Auf Anfrage" ? "Individuell anfragen" : "Room anfragen"}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── BIG-4 POSITIONING ────────────────────────────────────────────────────────

function BigFourSection() {
  return (
    <section className="py-20 sm:py-28 lg:py-36 bg-[#08090F] relative overflow-hidden">
      <div className="absolute top-8 right-8 text-[clamp(80px,12vw,160px)] font-black text-white/[0.02] leading-none select-none pointer-events-none tracking-tighter">07</div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
          >
            <span className="section-label">Abgrenzung</span>
            <div className="overflow-hidden mt-6">
              <motion.h2
                initial={{ y: "100%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease }}
                className="text-4xl lg:text-5xl font-black text-[#EFEDE8] leading-tight tracking-tight"
              >
                Coridoor ersetzt keine Big 4.<br />Coridoor kommt davor.
              </motion.h2>
            </div>
            <p className="mt-6 text-[rgba(239,237,232,0.48)] text-base leading-relaxed">
              Formale Financial, Tax, Legal, Commercial und Operational Due Diligence bleiben bei den richtigen Experten.
              Coridoor strukturiert die Fragen, Quellen, Risiken und Validierungslogik — bevor diese Mandate beginnen.
            </p>

            <div className="mt-10 rounded-2xl border border-white/6 bg-white/[0.02] p-6">
              <div className="grid grid-cols-2 gap-0">
                <div className="pr-6 border-r border-white/8">
                  <p className="text-[10px] font-bold tracking-[0.18em] text-[rgba(239,237,232,0.28)] uppercase mb-3">Big 4 / Advisor</p>
                  <p className="text-sm font-semibold text-[#EFEDE8] mb-1">Validiert den Deal.</p>
                  <p className="text-xs text-[rgba(239,237,232,0.35)] leading-relaxed">FDD, Tax, Legal, CDD, OpDD, Cyber-DD — auf Basis vertraulicher Daten und Datenzugang.</p>
                </div>
                <div className="pl-6">
                  <p className="text-[10px] font-bold tracking-[0.18em] text-[#5865F2]/60 uppercase mb-3">Coridoor</p>
                  <p className="text-sm font-semibold text-[#EFEDE8] mb-1">Zeigt, was validiert werden muss.</p>
                  <p className="text-xs text-[rgba(239,237,232,0.35)] leading-relaxed">Pre-DD-Layer auf Basis öffentlicher Daten. Fakten, Risiken, offene Fragen — strukturiert und Advisor-ready.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="space-y-3"
          >
            {[
              { area: "Financial DD", who: "FDD-Team / Big 4", coridoor: "Financial Model Layer, Public QoE Proxy, offene FDD-Fragen" },
              { area: "Tax DD", who: "Tax Advisor", coridoor: "Steuerstruktur-Hinweise, regulatorische Signale, Tax-Validierungsfragen" },
              { area: "Legal DD", who: "Law Firm", coridoor: "Vertragsstruktur-Signale, Rechtsstreit-Historie, Legal-Validierungsmatrix" },
              { area: "Commercial DD", who: "Strategy / CDD", coridoor: "Marktpositionierung, Wettbewerbsanalyse, Segment Economics" },
              { area: "Operational DD", who: "OpDD-Spezialisten", coridoor: "Betriebssignale, Kapazitätsstruktur, operative Risiken" },
              { area: "Cyber / IT DD", who: "IT-Spezialisten", coridoor: "Technologie-Footprint, öffentliche IT-Signale, Cyber-Risikofragen" },
            ].map((row, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.6, ease }}
                className="rounded-xl border border-white/6 bg-white/[0.02] p-4 grid grid-cols-[1fr_1px_1fr] gap-4"
              >
                <div>
                  <p className="text-[10px] font-bold text-[rgba(239,237,232,0.28)] uppercase tracking-wider mb-1">{row.area}</p>
                  <p className="text-xs text-[rgba(239,237,232,0.45)]">{row.who}</p>
                </div>
                <div className="bg-white/6" />
                <div>
                  <p className="text-[10px] font-bold text-[#5865F2]/50 uppercase tracking-wider mb-1">Coridoor Layer</p>
                  <p className="text-xs text-[rgba(239,237,232,0.38)] leading-snug">{row.coridoor}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── USE CASES ────────────────────────────────────────────────────────────────

function UseCasesSection() {
  return (
    <section className="py-20 sm:py-28 lg:py-36 bg-[#07080F] relative overflow-hidden">
      <div className="absolute top-8 right-8 text-[clamp(80px,12vw,160px)] font-black text-white/[0.02] leading-none select-none pointer-events-none tracking-tighter">08</div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="mb-16"
        >
          <span className="section-label">Anwendungsfälle</span>
          <div className="overflow-hidden mt-6">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease }}
              className="text-4xl lg:text-5xl font-black text-[#EFEDE8] leading-tight tracking-tight max-w-xl"
            >
              Wer Coridoor einsetzt.
            </motion.h2>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {useCases.map((uc, i) => {
            const Icon = uc.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ delay: i * 0.07, duration: 0.7, ease }}
                className="rounded-2xl border border-white/6 bg-white/[0.02] p-6 hover:border-[#5865F2]/20 hover:bg-[#5865F2]/[0.03] transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-[#5865F2]/10 flex items-center justify-center">
                    <Icon size={15} className="text-[#5865F2]" />
                  </div>
                  <span className="text-[10px] font-bold tracking-[0.18em] text-[#5865F2]/70 uppercase">{uc.label}</span>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-[10px] font-bold text-[rgba(239,237,232,0.28)] uppercase tracking-wider mb-1">Situation</p>
                    <p className="text-xs text-[rgba(239,237,232,0.48)] leading-relaxed">{uc.situation}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-rose-400/60 uppercase tracking-wider mb-1">Problem</p>
                    <p className="text-xs text-[rgba(239,237,232,0.38)] leading-relaxed">{uc.problem}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-[#5865F2]/60 uppercase tracking-wider mb-1">Coridoor</p>
                    <p className="text-xs text-[rgba(239,237,232,0.48)] leading-relaxed">{uc.solution}</p>
                  </div>
                  <div className="border-t border-white/6 pt-3">
                    <p className="text-[10px] font-bold text-emerald-400/60 uppercase tracking-wider mb-1">Output</p>
                    <p className="text-xs text-[rgba(239,237,232,0.48)] leading-relaxed">{uc.output}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── EXAMPLE OUTPUT ───────────────────────────────────────────────────────────

function ExampleOutputSection() {
  return (
    <section className="py-20 sm:py-28 lg:py-36 bg-[#06070C] relative overflow-hidden">
      <div className="absolute top-8 right-8 text-[clamp(80px,12vw,160px)] font-black text-white/[0.02] leading-none select-none pointer-events-none tracking-tighter">09</div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="mb-16"
        >
          <span className="section-label">Beispiel Client Room</span>
          <div className="overflow-hidden mt-6">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease }}
              className="text-4xl lg:text-5xl font-black text-[#EFEDE8] leading-tight tracking-tight max-w-xl"
            >
              So sieht ein Coridoor Deal Room aus.
            </motion.h2>
          </div>
          <p className="mt-5 text-[rgba(239,237,232,0.42)] max-w-xl text-base leading-relaxed">
            Illustratives Beispiel auf Basis öffentlicher Daten. Zeigt, wie Coridoor echte Transaktionsdaten
            mit strukturierten Validierungsfragen und Quellenregistern kombiniert.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="rounded-2xl border border-white/8 bg-white/[0.025] overflow-hidden"
        >
          {/* Room header */}
          <div className="border-b border-white/8 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold tracking-[0.18em] text-[#5865F2]/60 uppercase mb-2">Coridoor Premium Judgment Room · Illustrativ</p>
                <h3 className="text-2xl font-black text-[#EFEDE8] tracking-tight">Novo Holdings × Catalent</h3>
                <p className="text-sm text-[rgba(239,237,232,0.42)] mt-1">Healthcare · CDMO · Transaktionswert: $16,5 Mrd.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Healthcare","CDMO","M&A","$16.5bn EV"].map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-full border border-white/8 bg-white/[0.03] text-[10px] text-[rgba(239,237,232,0.38)]">{tag}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0 border-b border-white/8">
            {[
              { label: "Transaction EV", value: "$16,5 Mrd.", note: "Reported Fact" },
              { label: "FY2024 Net Revenue", value: "$4,38 Mrd.", note: "Reported Fact" },
              { label: "FY2024 adj. EBITDA", value: "$703 Mio.", note: "Reported Fact" },
              { label: "EV / adj. EBITDA", value: "~23,5x", note: "Norvik Calculation" },
            ].map((stat, i) => (
              <div key={i} className={`p-6 ${i < 3 ? "border-b sm:border-b-0 sm:border-r border-white/8" : ""}`}>
                <p className="text-[10px] text-[rgba(239,237,232,0.28)] uppercase tracking-wider mb-1">{stat.label}</p>
                <p className="text-xl font-black text-[#EFEDE8] tracking-tight">{stat.value}</p>
                <span className="text-[10px] text-[#5865F2]/50 font-medium">{stat.note}</span>
              </div>
            ))}
          </div>

          <div className="p-6 sm:p-8">
            <p className="text-[10px] font-bold tracking-[0.18em] text-[rgba(239,237,232,0.28)] uppercase mb-5">Enthaltene Module</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {[
                { name: "Public Financial Pack", status: "Enthalten", color: "text-emerald-400", bg: "bg-emerald-500/8" },
                { name: "Public QoE Proxy", status: "Enthalten", color: "text-emerald-400", bg: "bg-emerald-500/8" },
                { name: "Valuation Bridge", status: "Enthalten", color: "text-emerald-400", bg: "bg-emerald-500/8" },
                { name: "Capacity Map (Anagni, Bloomington, Brussels)", status: "Enthalten", color: "text-emerald-400", bg: "bg-emerald-500/8" },
                { name: "Customer Neutrality Risk", status: "Validation Required", color: "text-amber-400", bg: "bg-amber-500/8" },
                { name: "Risk Engine", status: "Enthalten", color: "text-emerald-400", bg: "bg-emerald-500/8" },
                { name: "Validation Matrix", status: "Enthalten", color: "text-emerald-400", bg: "bg-emerald-500/8" },
                { name: "Advisor Handoff", status: "Enthalten", color: "text-emerald-400", bg: "bg-emerald-500/8" },
              ].map((mod, i) => (
                <div key={i} className={`rounded-xl border border-white/6 ${mod.bg} p-3`}>
                  <p className="text-[11px] font-semibold text-[#EFEDE8] mb-1 leading-snug">{mod.name}</p>
                  <span className={`text-[10px] font-bold ${mod.color}`}>{mod.status}</span>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-amber-500/15 bg-amber-500/[0.04] p-5">
              <p className="text-[10px] font-bold tracking-[0.18em] text-amber-400/70 uppercase mb-2">Validation Required — Beispiel aus der Validation Matrix</p>
              <p className="text-xs text-[rgba(239,237,232,0.45)] leading-relaxed">
                Customer Neutrality Risk: Novo Nordisk repräsentiert nach dem Erwerb von 3 Standorten für $11 Mrd. einen signifikanten Umsatzanteil.
                Formale FDD / CDD muss validieren: Kundenkonzentration, vertragliche Bindung, Exklusivitätsklauseln und Kapazitätszuteilung
                an Dritte. → Advisor Owner: FDD-Team + CDD-Boutique.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── METHODOLOGY ──────────────────────────────────────────────────────────────

function MethodologySection() {
  return (
    <section className="py-20 sm:py-28 lg:py-36 bg-[#08090F] relative overflow-hidden">
      <div className="absolute top-8 right-8 text-[clamp(80px,12vw,160px)] font-black text-white/[0.02] leading-none select-none pointer-events-none tracking-tighter">10</div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
          >
            <span className="section-label">Methodik</span>
            <div className="overflow-hidden mt-6">
              <motion.h2
                initial={{ y: "100%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease }}
                className="text-4xl lg:text-5xl font-black text-[#EFEDE8] leading-tight tracking-tight"
              >
                Jede Aussage hat eine Klassifikation.
              </motion.h2>
            </div>
            <p className="mt-6 text-[rgba(239,237,232,0.48)] text-base leading-relaxed">
              Coridoor trennt konsequent zwischen dem, was bekannt ist, was berechnet wurde, was inferiert wurde
              und was formaler Validierung bedarf. Keine Vermischung von Fakten und Annahmen.
            </p>

            <div className="mt-10 space-y-2">
              {[
                { label: "Reported Fact", desc: "Direkt aus einer verifizierten Quelle entnommen.", color: "bg-emerald-500/15", text: "text-emerald-400" },
                { label: "Norvik Calculation", desc: "Berechnet auf Basis verifizierter Ausgangsdaten.", color: "bg-[#5865F2]/12", text: "text-[#5865F2]" },
                { label: "Inference", desc: "Logisch abgeleitet aus verfügbaren Fakten.", color: "bg-cyan-500/12", text: "text-cyan-400" },
                { label: "Estimate", desc: "Geschätzter Wert mit methodischer Basis.", color: "bg-violet-500/12", text: "text-violet-400" },
                { label: "Hypothesis", desc: "Annahme, die durch weitere Analyse bestätigt werden sollte.", color: "bg-amber-500/10", text: "text-amber-400" },
                { label: "Validation Required", desc: "Formale DD oder Advisor-Prüfung notwendig.", color: "bg-rose-500/10", text: "text-rose-400" },
                { label: "Internal Only", desc: "Nicht im Client Room sichtbar.", color: "bg-white/5", text: "text-[rgba(239,237,232,0.4)]" },
              ].map((cls, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.5, ease }}
                  className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.015] p-3"
                >
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${cls.color} ${cls.text} shrink-0 whitespace-nowrap`}>{cls.label}</span>
                  <p className="text-xs text-[rgba(239,237,232,0.38)]">{cls.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
          >
            <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-7 mb-4">
              <p className="text-[10px] font-bold tracking-[0.18em] text-[rgba(239,237,232,0.28)] uppercase mb-4">Jeder Client Room enthält</p>
              <div className="space-y-3">
                {[
                  ["Quellenregister", "Alle Quellen mit Link, Datum und Klassifikation"],
                  ["Confidence Level", "Einschätzung der Quellenqualität und Datenverlässlichkeit"],
                  ["Validation Status", "Offen · In Prüfung · Validiert · Nicht prüfbar"],
                  ["Advisor Owner", "Zugewiesener Workstream pro Validierungsfrage"],
                  ["QA-Check", "Interne Qualitätssicherung vor Auslieferung"],
                  ["Disclaimer", "Vollständige Methodenoffenlegung und Haftungsrahmen"],
                ].map(([label, desc], i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check size={13} className="text-[#5865F2] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-semibold text-[#EFEDE8]">{label} — </span>
                      <span className="text-xs text-[rgba(239,237,232,0.4)]">{desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-[#5865F2]/20 bg-[#5865F2]/[0.04] p-7">
              <p className="text-[10px] font-bold tracking-[0.18em] text-[#5865F2]/60 uppercase mb-3">Norvik-Grundsatz</p>
              <p className="text-base font-semibold text-[#EFEDE8] leading-snug">
                "Kein Datum ohne Quelle. Keine Aussage ohne Klassifikation. Kein Room ohne QA."
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 sm:py-28 lg:py-36 bg-[#07080F] relative overflow-hidden">
      <div className="absolute top-8 right-8 text-[clamp(80px,12vw,160px)] font-black text-white/[0.02] leading-none select-none pointer-events-none tracking-tighter">11</div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="mb-16 text-center"
        >
          <span className="section-label">FAQ</span>
          <div className="overflow-hidden mt-6">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease }}
              className="text-4xl lg:text-5xl font-black text-[#EFEDE8] leading-tight tracking-tight"
            >
              Häufige Fragen.
            </motion.h2>
          </div>
        </motion.div>

        <div>
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.5 }}
              className="faq-border"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-start justify-between gap-4 py-5 text-left group"
              >
                <span className="text-sm font-semibold text-[#EFEDE8] group-hover:text-white transition-colors duration-200 leading-snug">
                  {faq.q}
                </span>
                <div className="w-6 h-6 rounded-full border border-white/12 flex items-center justify-center shrink-0 mt-0.5 group-hover:border-white/25 transition-colors">
                  <ChevronDown
                    size={13}
                    className={`text-[rgba(239,237,232,0.5)] transition-transform duration-300 ${open === i ? "rotate-180" : ""}`}
                  />
                </div>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease }}
                  >
                    <p className="pb-5 text-sm text-[rgba(239,237,232,0.45)] leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA + CLOSING ────────────────────────────────────────────────────────────

function ClosingSection() {
  return (
    <section id="contact" className="py-20 sm:py-28 lg:py-36 bg-[#06070C] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#5865F2]/6 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
        >
          <span className="section-label mb-6 inline-flex">Coridoor by Norvik Intelligence</span>
          <div className="overflow-hidden mt-6 mb-6">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#EFEDE8] leading-tight tracking-tight"
            >
              Wissen, was prüfenswert ist —<br />
              <span className="text-gradient">bevor es teuer wird.</span>
            </motion.h2>
          </div>
          <p className="text-[rgba(239,237,232,0.48)] text-lg leading-relaxed max-w-xl mx-auto mb-10">
            Coridoor gibt Investoren, Deal-Teams und Advisors die strukturierte Vorarbeit, die formale Due Diligence
            effizienter, gezielter und entscheidungsreifer macht.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href="mailto:contact@norvik.studio?subject=Coridoor%20Deal%20Room%20Anfrage"
              className="inline-flex items-center justify-center gap-2 bg-[#5865F2] text-white px-8 py-4 rounded-xl text-sm font-semibold hover:bg-[#4752D4] shadow-[0_0_28px_rgba(88,101,242,0.28)] hover:shadow-[0_0_40px_rgba(88,101,242,0.4)] transition-all duration-200"
            >
              Deal Room anfragen <ArrowRight size={15} />
            </a>
            <a
              href="#packages"
              className="inline-flex items-center justify-center gap-2 border border-white/15 text-[#EFEDE8] bg-transparent hover:bg-white/5 px-8 py-4 rounded-xl text-sm font-semibold transition-all duration-200"
            >
              Pakete ansehen
            </a>
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
            {[
              { n: "48h", l: "Express" },
              { n: "100%", l: "Quellenbasiert" },
              { n: "DACH", l: "Fokus" },
            ].map(({ n, l }) => (
              <div key={l} className="rounded-xl border border-white/6 bg-white/[0.02] py-4">
                <p className="text-xl font-black text-[#EFEDE8] tracking-tight">{n}</p>
                <p className="text-[10px] text-[rgba(239,237,232,0.3)] tracking-wider uppercase mt-0.5">{l}</p>
              </div>
            ))}
          </div>

          <p className="mt-10 text-xs text-[rgba(239,237,232,0.22)] leading-relaxed max-w-lg mx-auto">
            Coridoor liefert keinen Ersatz für formale Due Diligence. Coridoor liefert einen datenbasierten
            Pre-DD- und Decision-Support-Layer auf Basis öffentlich verfügbarer Daten.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────

function CoridoorNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-5">
      <div className="max-w-7xl mx-auto liquid-glass rounded-xl px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="Norvik Intelligence" width={90} height={30} className="h-7 w-auto" />
          </Link>
          <span className="hidden sm:flex h-4 w-px bg-white/15" />
          <span className="hidden sm:block text-[11px] font-bold text-[rgba(239,237,232,0.45)] tracking-wider">CORIDOOR</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm">
          {[["Workflow","#"],["Module","#"],["Pakete","#packages"],["FAQ","#faq"]].map(([label, href]) => (
            <a key={label} href={href} className="text-[rgba(239,237,232,0.55)] hover:text-[#EFEDE8] transition-colors text-sm">{label}</a>
          ))}
        </div>
        <a
          href="#contact"
          className="bg-white text-black px-5 py-2 rounded-lg text-xs font-semibold hover:bg-gray-100 transition-colors"
        >
          Room anfragen
        </a>
      </div>
    </nav>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function CoridoorPage() {
  return (
    <main className="bg-[#07080F]">
      <CoridoorNav />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <HowItWorksSection />
      <ProductLayersSection />
      <FeaturesSection />
      <PackagesSection />
      <BigFourSection />
      <UseCasesSection />
      <ExampleOutputSection />
      <MethodologySection />
      <FaqSection />
      <ClosingSection />
    </main>
  );
}
