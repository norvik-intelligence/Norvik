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
    unit: "per brief",
    highlight: false,
    gold: false,
    delivery: "48–72h",
    description: "Compact C-level intelligence brief for urgent board- or deal-level decisions.",
    features: ["2–3 page written briefing", "1 defined intelligence question", "Key competitive or market signals", "Express delivery available"],
    cta: "Request a Briefing",
  },
  {
    icon: FileText,
    name: "Standard Memo",
    sub: "Intelligence Memo",
    price: "1.800",
    unit: "per memo",
    highlight: false,
    gold: false,
    delivery: "5–7 days",
    description: "Focused analysis of one defined strategic question with market context and competitive benchmarks.",
    features: ["5–8 page structured memo", "Market & competitive analysis", "Strategic implications", "PDF, Word or PowerPoint"],
    cta: "Start a Mandate",
  },
  {
    icon: BookOpen,
    name: "Premium Memo",
    sub: "Intelligence Report",
    price: "3.200",
    unit: "per report",
    highlight: true,
    gold: false,
    delivery: "7–10 days",
    description: "Full analytical depth for complex positioning, market or competitive questions.",
    features: ["10–15 page premium report", "Deep market & narrative analysis", "Competitive positioning audit", "Actionable recommendations", "Revision round included"],
    cta: "Start a Mandate",
  },
  {
    icon: Briefcase,
    name: "Market DD Lite",
    sub: "Due Diligence Support",
    price: "4.200",
    unit: "per engagement",
    highlight: false,
    gold: false,
    delivery: "7–14 days",
    description: "Outside-in market intelligence layer for acquisition targets or investment theses.",
    features: ["Commercial & market DD scope", "Market attractiveness analysis", "Competitive risk assessment", "Narrative & positioning review", "Deal-ready output format"],
    cta: "Discuss Scope",
  },
  {
    icon: Layers,
    name: "Deep Dive",
    sub: "Custom Mandate",
    price: "7.500",
    unit: "from",
    highlight: false,
    gold: false,
    delivery: "Custom timeline",
    description: "Multi-stage intelligence engagements for complex strategic or transactional questions.",
    features: ["Custom scope & structure", "Multi-stage research process", "Primary & secondary analysis", "Stakeholder presentation formats", "Dedicated engagement management"],
    cta: "Discuss Scope",
  },
  {
    icon: Repeat,
    name: "Signal Retainer",
    sub: "Monthly Intelligence",
    price: "4.500",
    unit: "per month",
    highlight: false,
    gold: true,
    delivery: "Monthly cadence",
    description: "Recurring intelligence for PE funds, family offices or deal teams with active pipelines.",
    features: ["Monthly intelligence briefings", "Competitive signal tracking", "Market shift alerts", "DACH deal landscape updates", "Priority response & express access"],
    cta: "Discuss Retainer",
  },
];

function PricingCard({ tier, index }: { tier: typeof tiers[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spring = { stiffness: 260, damping: 28 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), spring);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-4, 4]), spring);
  const Icon = tier.icon;

  const move = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
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
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.07, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }}
    >
      <motion.div
        ref={ref}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={move}
        onMouseLeave={() => { x.set(0); y.set(0); }}
        className="h-full cursor-default group"
      >
        <div className={cardStyle}>
          {tier.highlight && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-blue-500/30">
                Most Popular
              </span>
            </div>
          )}

          {/* Icon + tier name */}
          <div className="flex items-center justify-between mb-6">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${tier.gold ? "bg-amber-500/12" : "bg-blue-500/10"}`}>
              <Icon size={20} className={tier.gold ? "text-amber-400" : tier.highlight ? "text-blue-300" : "text-blue-400"} />
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-600 border border-white/6 rounded-full px-2.5 py-1">
              {tier.delivery}
            </span>
          </div>

          <p className="text-xs text-slate-600 uppercase tracking-widest mb-1">{tier.sub}</p>
          <h3 className="text-lg font-bold text-white mb-4">{tier.name}</h3>

          {/* Price */}
          <div className="mb-5">
            <span className="text-slate-500 text-sm mr-1">{tier.unit === "from" ? "from" : ""}</span>
            <span className={`text-4xl font-bold tracking-tight ${tier.gold ? "text-gradient-gold" : "text-white"}`}>
              €{tier.price}
            </span>
            {tier.unit !== "from" && (
              <span className="text-slate-500 text-sm ml-1">/ {tier.unit}</span>
            )}
          </div>

          <p className="text-sm text-slate-500 leading-relaxed mb-6">{tier.description}</p>

          {/* Features */}
          <ul className="space-y-2 mb-8">
            {tier.features.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-slate-400">
                <span className={`mt-1 w-1.5 h-1.5 rounded-full shrink-0 ${tier.gold ? "bg-amber-400" : "bg-blue-400"}`} />
                {f}
              </li>
            ))}
          </ul>

          <Button
            variant={tier.highlight ? "default" : tier.gold ? "gold" : "outline"}
            className="w-full group/btn"
            asChild
          >
            <a href="#contact">
              {tier.cta}
              <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
            </a>
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 lg:py-32 bg-[#07111E]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="section-label">Pricing</span>
          <h2 className="mt-5 text-4xl sm:text-5xl font-bold text-white leading-tight tracking-tight">
            Transparent scope.<br />Premium output.
          </h2>
          <p className="mt-5 text-lg text-slate-400 leading-relaxed">
            Fixed-fee mandates with clear deliverables. 50 % upfront, 50 % on delivery.
            No surprise invoices, no open-ended hourly billing.
          </p>
        </motion.div>

        <div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          style={{ perspective: "1400px" }}
        >
          {tiers.map((t, i) => (
            <PricingCard key={t.name} tier={t} index={i} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 text-center text-sm text-slate-600"
        >
          All prices are net, excluding applicable VAT. Express delivery (+50 %) available on most tiers.
          Custom pricing for multi-mandate programs.
        </motion.p>
      </div>
    </section>
  );
}
