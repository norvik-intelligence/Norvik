"use client";

import { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Zap, FileText, BookOpen, Briefcase, Layers, Repeat } from "lucide-react";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    icon: Zap,
    name: "Norvik Spark",
    sub: "Executive Briefing",
    price: "1.000",
    unit: "pro Briefing",
    highlight: false,
    gold: false,
    delivery: "48–72h",
    description: "Kompaktes C-Level-Intelligence-Briefing für dringende Board- oder Deal-Entscheidungen.",
    features: [
      "2–3 seitiges schriftliches Briefing",
      "1 definierte Intelligence-Frage",
      "Wichtige Wettbewerbs- oder Marktsignale",
      "Express-Lieferung verfügbar",
    ],
    cta: "Briefing anfragen",
  },
  {
    icon: FileText,
    name: "Standard Memo",
    sub: "Intelligence Memo",
    price: "1.800",
    unit: "pro Memo",
    highlight: false,
    gold: false,
    delivery: "5–7 Tage",
    description: "Fokussierte Analyse einer definierten strategischen Frage mit Marktkontext und Wettbewerbsbenchmarks.",
    features: [
      "5–8 seitiges strukturiertes Memo",
      "Markt- & Wettbewerbsanalyse",
      "Strategische Implikationen",
      "PDF, Word oder PowerPoint",
    ],
    cta: "Mandat starten",
  },
  {
    icon: BookOpen,
    name: "Premium Memo",
    sub: "Intelligence Report",
    price: "3.200",
    unit: "pro Report",
    highlight: true,
    gold: false,
    delivery: "7–10 Tage",
    description: "Volle analytische Tiefe für komplexe Positionierungs-, Markt- oder Wettbewerbsfragen.",
    features: [
      "10–15 seitiger Premium-Report",
      "Tiefe Markt- & Narrativ-Analyse",
      "Wettbewerbs-Positionierungsaudit",
      "Handlungsempfehlungen",
      "Überarbeitungsrunde inklusive",
    ],
    cta: "Mandat starten",
  },
  {
    icon: Briefcase,
    name: "Market DD Lite",
    sub: "Due Diligence Support",
    price: "4.200",
    unit: "pro Engagement",
    highlight: false,
    gold: false,
    delivery: "7–14 Tage",
    description: "Externe Marktintelligenz-Ebene für Akquisitionsziele oder Investitionsthesen.",
    features: [
      "Commercial & Market DD Scope",
      "Marktattraktivitätsanalyse",
      "Wettbewerbsrisikobewertung",
      "Narrativ- & Positionierungsreview",
      "Deal-fähiges Ausgabeformat",
    ],
    cta: "Scope besprechen",
  },
  {
    icon: Layers,
    name: "Deep Dive",
    sub: "Custom Mandat",
    price: "7.500",
    unit: "ab",
    highlight: false,
    gold: false,
    delivery: "Individueller Zeitplan",
    description: "Mehrstufige Intelligence-Engagements für komplexe strategische oder transaktionale Fragen.",
    features: [
      "Individueller Scope & Struktur",
      "Mehrstufiger Rechercheprozess",
      "Primär- & Sekundäranalyse",
      "Stakeholder-Präsentationsformate",
      "Dediziertes Engagement-Management",
    ],
    cta: "Scope besprechen",
  },
  {
    icon: Repeat,
    name: "Signal Retainer",
    sub: "Monatliche Intelligence",
    price: "4.500",
    unit: "pro Monat",
    highlight: false,
    gold: true,
    delivery: "Monatlicher Rhythmus",
    description: "Wiederkehrende Intelligence für PE-Fonds, Family Offices oder Deal-Teams mit aktiven Pipelines.",
    features: [
      "Monatliche Intelligence-Briefings",
      "Wettbewerbssignal-Tracking",
      "Marktveränderungsalarme",
      "DACH Deal-Landscape-Updates",
      "Prioritätsreaktion & Express-Zugang",
    ],
    cta: "Retainer besprechen",
  },
];

function PricingCard({ tier, index }: { tier: typeof tiers[0]; index: number }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spring = { stiffness: 260, damping: 28 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), spring);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-4, 4]), spring);
  const Icon = tier.icon;

  const move = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = (ref.current as HTMLDivElement).getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };

  const baseCard = `relative h-full rounded-2xl border p-7 shimmer-card transition-all duration-300`;
  const cardStyle = tier.highlight
    ? `${baseCard} border-blue-500/40 bg-gradient-to-b from-blue-950/60 to-[#0A1628]/80 border-glow`
    : tier.gold
    ? `${baseCard} border-amber-500/25 bg-gradient-to-b from-amber-950/30 to-[#0A1628]/80`
    : `${baseCard} border-white/6 bg-[#0A1628]/60 hover:border-white/10`;

  return (
    <motion.div
      ref={ref}
      onMouseMove={move}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className="h-full cursor-default group"
    >
      <div className={cardStyle}>
        {tier.highlight && (
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-semibold uppercase tracking-widest bg-blue-600 text-white px-3 py-1 rounded-full">
            Beliebteste Wahl
          </span>
        )}
        <div className="flex items-center justify-between mb-5">
          <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center">
            <Icon size={18} className="text-slate-300" />
          </div>
          <span className="text-[11px] text-slate-500 border border-white/8 rounded-full px-2.5 py-0.5">
            {tier.delivery}
          </span>
        </div>
        <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500 mb-1">{tier.sub}</p>
        <h3 className="text-xl font-bold text-white mb-4">{tier.name}</h3>
        <div className="flex items-baseline gap-1 mb-4">
          {tier.unit === "ab" ? <span className="text-sm text-slate-400">ab</span> : ""}
          <span className="text-3xl font-bold text-white">&euro;{tier.price}</span>
          {tier.unit !== "ab" && (
            <span className="text-sm text-slate-500">/ {tier.unit}</span>
          )}
        </div>
        <p className="text-sm text-slate-400 mb-5 leading-relaxed">{tier.description}</p>
        <ul className="space-y-2 mb-7">
          {tier.features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
              <ArrowRight size={13} className="mt-0.5 text-blue-400 shrink-0" />
              {f}
            </li>
          ))}
        </ul>
        <Button
          asChild
          size="sm"
          variant={tier.highlight ? "default" : "outline"}
          className="w-full"
        >
          <a href="#contact">{tier.cta}</a>
        </Button>
      </div>
    </motion.div>
  );
}

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-[11px] font-semibold tracking-[0.2em] text-blue-400 uppercase mb-4">
            Preise
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            Transparenter Scope.{" "}<br />Premium-Output.
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Festpreismandate mit klaren Deliverables. 50 % Vorauszahlung, 50 % bei Lieferung. Keine Überraschungsrechnungen, keine offene Stundenabrechnung.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tiers.map((t, i) => (
            <PricingCard key={t.name} tier={t} index={i} />
          ))}
        </div>

        <p className="text-center text-xs text-slate-600 mt-10">
          Alle Preise netto, zzgl. gesetzlicher MwSt. Express-Lieferung (+50 %) bei den meisten Tiers verfügbar. Individuelle Preise für Multi-Mandat-Programme.
        </p>
      </div>
    </section>
  );
}
