"use client";

import { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Zap, FileText, BookOpen, Briefcase, Layers, Repeat } from "lucide-react";
import { Button } from "@/components/ui/button";

const tiers = [
  { icon: Zap,      name: "Norvik Spark",   sub: "Executive Briefing",    price: "1.000",  unit: "pro Briefing",     highlight: false, gold: false, delivery: "48–72h",              description: "Kompaktes C-Level-Intelligence-Briefing für dringende Board- oder Deal-Entscheidungen.",                           features: ["2–3 seitiges schriftliches Briefing", "1 definierte Intelligence-Frage", "Wichtige Wettbewerbs- oder Marktsignale", "Express-Lieferung verfügbar"],                                                                    cta: "Briefing anfragen" },
  { icon: FileText, name: "Standard Memo",  sub: "Intelligence Memo",     price: "1.800",  unit: "pro Memo",         highlight: false, gold: false, delivery: "5–7 Tage",            description: "Fokussierte Analyse einer definierten strategischen Frage mit Marktkontext und Wettbewerbsbenchmarks.",              features: ["5–8 seitiges strukturiertes Memo", "Markt- & Wettbewerbsanalyse", "Strategische Implikationen", "PDF, Word oder PowerPoint"],                                                                                           cta: "Mandat starten" },
  { icon: BookOpen, name: "Premium Memo",   sub: "Intelligence Report",   price: "3.200",  unit: "pro Report",       highlight: true,  gold: false, delivery: "7–10 Tage",           description: "Volle analytische Tiefe für komplexe Positionierungs-, Markt- oder Wettbewerbsfragen.",                              features: ["10–15 seitiger Premium-Report", "Tiefe Markt- & Narrativ-Analyse", "Wettbewerbs-Positionierungsaudit", "Handlungsempfehlungen", "Überarbeitungsrunde inklusive"],                                                          cta: "Mandat starten" },
  { icon: Briefcase,name: "Market DD Lite", sub: "Due Diligence Support", price: "4.200",  unit: "pro Engagement",   highlight: false, gold: false, delivery: "7–14 Tage",           description: "Externe Marktintelligenz-Ebene für Akquisitionsziele oder Investitionsthesen.",                                     features: ["Commercial & Market DD Scope", "Marktattraktivitätsanalyse", "Wettbewerbsrisikobewertung", "Narrativ- & Positionierungsreview", "Deal-fähiges Ausgabeformat"],                                                           cta: "Scope besprechen" },
  { icon: Layers,   name: "Deep Dive",      sub: "Custom Mandat",         price: "7.500",  unit: "ab",               highlight: false, gold: false, delivery: "Individuell",         description: "Mehrstufige Intelligence-Engagements für komplexe strategische oder transaktionale Fragen.",                         features: ["Individueller Scope & Struktur", "Mehrstufiger Rechercheprozess", "Primär- & Sekundäranalyse", "Stakeholder-Präsentationsformate", "Dediziertes Engagement-Management"],                                                  cta: "Scope besprechen" },
  { icon: Repeat,   name: "Signal Retainer",sub: "Monatliche Intelligence",price: "4.500", unit: "pro Monat",        highlight: false, gold: true,  delivery: "Monatlicher Rhythmus",description: "Wiederkehrende Intelligence für PE-Fonds, Family Offices oder Deal-Teams mit aktiven Pipelines.",                   features: ["Monatliche Intelligence-Briefings", "Wettbewerbssignal-Tracking", "Marktveränderungsalarme", "DACH Deal-Landscape-Updates", "Prioritätsreaktion & Express-Zugang"],                                                         cta: "Retainer besprechen" },
];

function PricingCard({ tier, index }: { tier: typeof tiers[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spring = { stiffness: 240, damping: 30 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [3, -3]), spring);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-3, 3]), spring);
  const Icon = tier.icon;

  const move = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = (ref.current as HTMLDivElement).getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };

  const cardCls = tier.highlight
    ? "relative h-full rounded-2xl border border-[#5865F2]/35 bg-gradient-to-b from-[rgba(88,101,242,0.08)] to-[#0C0D1A]/70 p-7 shimmer-card border-glow"
    : tier.gold
    ? "relative h-full rounded-2xl border border-[rgba(184,150,62,0.25)] bg-gradient-to-b from-[rgba(184,150,62,0.05)] to-[#0C0D1A]/70 p-7 shimmer-card"
    : "relative h-full rounded-2xl border border-white/6 bg-white/[0.02] p-7 shimmer-card hover:border-white/10 transition-colors duration-300";

  return (
    <motion.div
      ref={ref}
      onMouseMove={move}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className="h-full cursor-default group"
    >
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.07, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
        className={cardCls}
      >
        {tier.highlight && (
          <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-widest bg-[#5865F2] text-white px-3.5 py-1 rounded-full">
            Beliebteste Wahl
          </span>
        )}

        <div className="flex items-center justify-between mb-5">
          <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center">
            <Icon size={17} className={tier.gold ? "text-[#B8963E]" : tier.highlight ? "text-[#5865F2]" : "text-[rgba(239,237,232,0.5)]"} />
          </div>
          <span className="text-[10px] text-[rgba(239,237,232,0.35)] border border-white/8 rounded-full px-2.5 py-0.5">{tier.delivery}</span>
        </div>

        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[rgba(239,237,232,0.35)] mb-1">{tier.sub}</p>
        <h3 className="text-lg font-black text-[#EFEDE8] mb-4">{tier.name}</h3>

        <div className="flex items-baseline gap-1.5 mb-4">
          {tier.unit === "ab" && <span className="text-sm text-[rgba(239,237,232,0.4)]">ab</span>}
          <span className={`text-3xl font-black tracking-tight ${tier.gold ? "text-gradient-gold" : "text-[#EFEDE8]"}`}>€{tier.price}</span>
          {tier.unit !== "ab" && <span className="text-sm text-[rgba(239,237,232,0.35)]">/ {tier.unit}</span>}
        </div>

        <p className="text-sm text-[rgba(239,237,232,0.42)] mb-5 leading-relaxed">{tier.description}</p>

        <ul className="space-y-2 mb-7">
          {tier.features.map(f => (
            <li key={f} className="flex items-start gap-2 text-sm text-[rgba(239,237,232,0.55)]">
              <ArrowRight size={12} className={`mt-0.5 shrink-0 ${tier.gold ? "text-[#B8963E]" : "text-[#5865F2]"}`} />
              {f}
            </li>
          ))}
        </ul>

        <Button
          asChild
          size="sm"
          variant={tier.highlight ? "default" : tier.gold ? "gold" : "outline"}
          className="w-full"
        >
          <a href="#contact">{tier.cta}</a>
        </Button>
      </motion.div>
    </motion.div>
  );
}

export default function Pricing() {
  return (
    <section id="pricing" className="py-28 lg:py-36 bg-[#07080F] relative overflow-hidden">
      <div className="absolute top-8 right-8 text-[clamp(100px,16vw,200px)] font-black text-white/[0.025] leading-none select-none pointer-events-none tracking-tighter">07</div>

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
          className="mb-20 text-center"
        >
          <span className="section-label">Preise</span>
          <div className="overflow-hidden mt-6">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] as const }}
              className="text-4xl lg:text-5xl font-black text-[#EFEDE8] leading-tight tracking-tight"
            >
              Transparenter Scope.<br />Premium-Output.
            </motion.h2>
          </div>
          <p className="mt-5 text-[rgba(239,237,232,0.42)] max-w-xl mx-auto">
            Festpreismandate mit klaren Deliverables. 50 % Vorauszahlung, 50 % bei Lieferung. Keine Überraschungsrechnungen.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tiers.map((t, i) => <PricingCard key={t.name} tier={t} index={i} />)}
        </div>

        <p className="text-center text-[11px] text-[rgba(239,237,232,0.25)] mt-10">
          Alle Preise netto, zzgl. gesetzlicher MwSt. Express-Lieferung (+50 %) bei den meisten Tiers verfügbar.
        </p>
      </div>
    </section>
  );
}
