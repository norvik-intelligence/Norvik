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
    title: "Wettbewerbs-Narrativ-Intelligence",
    description: "Verstehen Sie, wie Wettbewerber sich positionieren, wie Maerkte ihre Botschaften interpretieren und wo Narrativluecken strategische Vorteile schaffen. Wir entschluesseln die Geschichten, die Ihren Markt praegen.",
    tags: ["Narrativanalyse", "Positionierungspruefung", "Signal-Mapping"],
  },
  {
    icon: TrendingUp,
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
    glow: "group-hover:shadow-indigo-500/10",
    title: "Strategische Marktanalyse",
    description: "Kartieren Sie Marktverschiebungen, Kategoriedynamiken und Wettbewerbschancen, bevor sie offensichtlich werden. Tiefe Segmentanalyse, Marktvalidierung und Chancenmapping fuer weitreichende Wachstumsentscheidungen.",
    tags: ["Markt-Mapping", "Segmentvalidierung", "Chancen-Sizing"],
  },
  {
    icon: Search,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    glow: "group-hover:shadow-violet-500/10",
    title: "M&A Due-Diligence-Unterstuetzung",
    description: "Eine Aussen-Intelligence-Ebene zu Maerkten, Positionierung, Wettbewerb und Narrativrisiken vor Investitionen oder Akquisitionen. Schnellere, praezisere Analyse ohne den vollen DD-Overhead.",
    tags: ["Commercial DD", "Target Screening", "Narrativrisiko"],
  },
  {
    icon: Layers,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    glow: "group-hover:shadow-cyan-500/10",
    title: "Individuelle Intelligence-Mandate",
    description: "Masgeschneiderte Engagements fuer komplexe strategische Fragen - mehrstufige Deep Dives, Deal Screenings, laufende Intelligence-Retainer und Sondersituationsanalysen.",
    tags: ["Deep Dives", "Deal Screening", "Retainer-Programme"],
  },
];

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
      ref={ref}
      onMouseMove={move}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className="group h-full cursor-default"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.6 }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={`h-full rounded-2xl border border-white/6 bg-[#0A1628]/60 p-7 transition-shadow duration-300 ${service.glow} group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]`}
      >
        <div className={`w-11 h-11 rounded-xl ${service.bg} flex items-center justify-center mb-5`}>
          <Icon size={20} className={service.color} />
        </div>
        <h3 className="text-lg font-semibold text-white mb-3">{service.title}</h3>
        <p className="text-sm text-slate-400 leading-relaxed mb-5">{service.description}</p>
        <div className="flex flex-wrap gap-2">
          {service.tags.map((t) => (
            <span key={t} className="px-2.5 py-1 rounded-full bg-white/4 border border-white/6 text-[11px] text-slate-400">{t}</span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="py-28 bg-[#050D1A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-[11px] font-semibold tracking-[0.2em] text-blue-400 uppercase mb-4">Intelligence-Leistungen</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            Praezise Intelligence. Jedes Mandat.
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Norvik liefert fokussierte, schriftliche, entscheidungsreife Analysen ohne die Kostenstruktur eines grossen Beratungshauses.
          </p>
        </motion.div>
        <div className="grid sm:grid-cols-2 gap-5">
          {services.map((s, i) => (
            <TiltCard key={s.title} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
