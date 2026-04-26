"use client";

import { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { BarChart3, TrendingUp, Search, Layers } from "lucide-react";

const services = [
  {
    icon: BarChart3,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    glow: "group-hover:shadow-blue-500/10",
    title: "Competitive Narrative Intelligence",
    description:
      "Understand how competitors position themselves, how markets interpret their messaging and where narrative gaps create strategic advantage. We decode the stories shaping your market.",
    tags: ["Narrative Analysis", "Positioning Review", "Signal Mapping"],
  },
  {
    icon: TrendingUp,
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
    glow: "group-hover:shadow-indigo-500/10",
    title: "Strategic Market Insight",
    description:
      "Map market shifts, category dynamics and competitive opportunities before they become obvious. Deep segment analysis, market validation and opportunity mapping for high-stakes growth decisions.",
    tags: ["Market Mapping", "Segment Validation", "Opportunity Sizing"],
  },
  {
    icon: Search,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    glow: "group-hover:shadow-violet-500/10",
    title: "M&A Due Diligence Support",
    description:
      "An outside-in intelligence layer on markets, positioning, competition and narrative risks before investments or acquisitions. Faster, sharper analysis without full DD overhead.",
    tags: ["Commercial DD", "Target Screening", "Narrative Risk"],
  },
  {
    icon: Layers,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    glow: "group-hover:shadow-cyan-500/10",
    title: "Custom Intelligence Mandates",
    description:
      "Bespoke engagements for complex strategic questions — multi-stage deep dives, deal screenings, recurring intelligence retainers and special situation analysis.",
    tags: ["Deep Dives", "Deal Screening", "Retainer Programs"],
  },
];

/* ── 3D tilt card ────────────────────────────────────────────────── */
function TiltCard({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spring = { stiffness: 260, damping: 28 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), spring);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), spring);
  const Icon = service.icon;

  const move = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const }}
    >
      <motion.div
        ref={ref}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={move}
        onMouseLeave={() => { x.set(0); y.set(0); }}
        className="group h-full cursor-default"
      >
        <div
          className={`relative h-full rounded-2xl border border-white/6 bg-[#0A1628]/80 p-7 backdrop-blur-sm shimmer-card transition-all duration-300 ${service.glow} group-hover:border-white/10 group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]`}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Icon */}
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${service.bg} transition-transform duration-300 group-hover:scale-110`}
               style={{ transform: "translateZ(20px)" }}>
            <Icon size={22} className={service.color} />
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-white mb-3 leading-snug"
              style={{ transform: "translateZ(10px)" }}>
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-slate-400 leading-relaxed mb-6">{service.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {service.tags.map((t) => (
              <span key={t} className="px-2.5 py-1 rounded-full bg-white/4 border border-white/6 text-slate-500 text-[11px] font-medium">
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="py-24 lg:py-32 bg-[#060E1D]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16"
        >
          <span className="section-label">Intelligence Services</span>
          <h2 className="mt-5 text-4xl sm:text-5xl font-bold text-white leading-tight tracking-tight">
            Precision intelligence.<br />
            Every mandate.
          </h2>
          <p className="mt-5 text-lg text-slate-400 leading-relaxed">
            Norvik delivers focused, written, decision-ready analysis without the cost
            structure of a large consulting house.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5" style={{ perspective: "1200px" }}>
          {services.map((s, i) => (
            <TiltCard key={s.title} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
