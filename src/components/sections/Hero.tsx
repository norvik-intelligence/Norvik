"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, FileText, BarChart3, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

/* ── Schwebende 3D-Dokumentkarte ──────────────────────────────────── */
interface DocCardProps {
  title: string;
  tag: string;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  lines: number[];
  statusColor: string;
  status: string;
  floatClass: string;
  posClass: string;
  delay: number;
}

function DocCard({ title, tag, icon: Icon, iconColor, iconBg, lines, statusColor, status, floatClass, posClass, delay }: DocCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] as const }}
      className={`absolute ${posClass} ${floatClass} hidden lg:block select-none pointer-events-none`}
    >
      <div className="w-60 rounded-2xl border border-blue-400/12 bg-[#0A1628]/80 backdrop-blur-xl p-5 shadow-[0_20px_60px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.04)]">
        <div className="flex items-center gap-2.5 mb-4">
          <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${iconBg}`}>
            <Icon size={13} className={iconColor} />
          </div>
          <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">{tag}</span>
        </div>
        <p className="text-[11px] font-semibold text-slate-200 leading-snug mb-3">{title}</p>
        <div className="space-y-1.5 mb-4">
          {lines.map((w, i) => (
            <div key={i} className="h-1.5 rounded-full bg-slate-700/60" style={{ width: `${w}%` }} />
          ))}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[9px] text-slate-600">Norvik Intelligence</span>
          <span className={`text-[9px] font-medium ${statusColor}`}>● {status}</span>
        </div>
      </div>
    </motion.div>
  );
}

const docCards: DocCardProps[] = [
  {
    title: "Wettbewerbs-Narrativanalyse — SaaS-ERP-Segment, DACH",
    tag: "Wettbewerb",
    icon: BarChart3,
    iconColor: "text-blue-400",
    iconBg: "bg-blue-500/15",
    lines: [85, 60, 90, 40],
    statusColor: "text-green-400/80",
    status: "Geliefert",
    floatClass: "float-a",
    posClass: "top-[22%] right-[7%]",
    delay: 0.8,
  },
  {
    title: "M&A-Markt Due Diligence — Industrieautomatisierungsziel",
    tag: "Due Diligence",
    icon: Search,
    iconColor: "text-purple-400",
    iconBg: "bg-purple-500/15",
    lines: [70, 95, 55, 80],
    statusColor: "text-blue-400/80",
    status: "In Bearbeitung",
    floatClass: "float-b",
    posClass: "bottom-[28%] right-[3%]",
    delay: 1.1,
  },
  {
    title: "Strategische Marktanalyse — B2B-SaaS-Segmentvalidierung",
    tag: "Markt-Intel",
    icon: FileText,
    iconColor: "text-cyan-400",
    iconBg: "bg-cyan-500/15",
    lines: [90, 65, 75],
    statusColor: "text-green-400/80",
    status: "Geliefert",
    floatClass: "float-c",
    posClass: "top-[40%] left-[1%]",
    delay: 1.3,
  },
];

/* ── Hero ───────────────────────────────────────────────────────────── */
export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-20"
    >
      {/* ── Hintergrundebene ── */}
      <div className="absolute inset-0 bg-[#030812]" />

      {/* Leuchtkugeln */}
      <div className="absolute top-[-20%] left-[10%] w-[600px] h-[600px] rounded-full bg-blue-600/8 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[5%] w-[500px] h-[500px] rounded-full bg-indigo-600/6 blur-[100px] pointer-events-none" />

      {/* Punktgitter-Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Perspektivisches Gitter */}
      <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-[linear-gradient(to_top,#030812,transparent)] pointer-events-none" />

      {/* Seitliche Verbländungen */}
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#030812] to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#030812] to-transparent pointer-events-none" />

      {/* ── Schwebende Dokumentkarten ── */}
      {docCards.map((card) => (
        <DocCard key={card.title} {...card} />
      ))}

      {/* ── Hauptinhalt ── */}
      <motion.div style={{ y, opacity }} className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/8 text-blue-300 text-xs font-semibold tracking-widest uppercase mb-8"
        >
          Intelligence Studio · DACH
        </motion.div>

        {/* Überschrift */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] mb-6"
        >
          Strategische Intelligenz{" "}
          <br />
          für{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400">
            weitreichende
          </span>{" "}
          <br />
          Entscheidungen.
        </motion.h1>

        {/* Untertext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="text-lg sm:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto mb-10"
        >
          Norvik Intelligence liefert fokussierte Markt-, Wettbewerbs- und Narrativanalysen für Gründer, Investoren und Deal-Teams, die Wachstum, Positionierung und Transaktionen navigieren.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Button asChild size="lg" className="rounded-xl px-8">
            <a href="mailto:mohamed.jamai.norvik@gmail.com?subject=Book%20a%20Strategic%20Call%20%E2%80%94%20Norvik%20Intelligence">
              Strategiegespräch buchen
              <ArrowRight size={16} className="ml-2" />
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-xl px-8">
            <a href="#services">Intelligence-Leistungen ansehen</a>
          </Button>
        </motion.div>

        {/* Statistiken */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.95, duration: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-8 sm:gap-12"
        >
          {[
            { v: "48h", l: "Express-Lieferung" },
            { v: "6", l: "Intelligence-Stufen" },
            { v: "DACH", l: "Marktfokus" },
          ].map(({ v, l }) => (
            <div key={l} className="text-center">
              <p className="text-2xl font-bold text-white">{v}</p>
              <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">{l}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll-Hinweis */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600"
      >
        <div className="w-px h-8 bg-gradient-to-b from-transparent to-slate-600" />
        <span className="text-[10px] uppercase tracking-[0.2em]">Scrollen</span>
      </motion.div>
    </section>
  );
}
