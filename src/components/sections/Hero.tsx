"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, FileText, BarChart3, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

/* ── Floating 3D document card ─────────────────────────────────────── */
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
          <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">{tag}</span>
        </div>
        <p className="text-xs font-medium text-slate-300 leading-snug mb-4">{title}</p>
        <div className="space-y-2">
          {lines.map((w, i) => (
            <div key={i} className="h-1 rounded-full bg-blue-400/12" style={{ width: `${w}%` }} />
          ))}
        </div>
        <div className="mt-4 pt-3 border-t border-white/4 flex items-center justify-between">
          <span className="text-[10px] text-slate-600">Norvik Intelligence</span>
          <span className={`text-[10px] font-medium ${statusColor}`}>● {status}</span>
        </div>
      </div>
    </motion.div>
  );
}

const docCards: DocCardProps[] = [
  {
    title: "Competitive Narrative Analysis — SaaS ERP Segment, DACH",
    tag: "Competitive",
    icon: BarChart3,
    iconColor: "text-blue-400",
    iconBg: "bg-blue-500/15",
    lines: [85, 60, 90, 40],
    statusColor: "text-green-400/80",
    status: "Delivered",
    floatClass: "float-a",
    posClass: "top-[22%] right-[7%]",
    delay: 0.8,
  },
  {
    title: "M&A Market Due Diligence — Industrial Automation Target",
    tag: "Due Diligence",
    icon: Search,
    iconColor: "text-purple-400",
    iconBg: "bg-purple-500/15",
    lines: [70, 95, 55, 80],
    statusColor: "text-blue-400/80",
    status: "In Progress",
    floatClass: "float-b",
    posClass: "bottom-[28%] right-[3%]",
    delay: 1.1,
  },
  {
    title: "Strategic Market Insight — B2B SaaS Segment Validation",
    tag: "Market Intel",
    icon: FileText,
    iconColor: "text-cyan-400",
    iconBg: "bg-cyan-500/15",
    lines: [90, 65, 75],
    statusColor: "text-green-400/80",
    status: "Delivered",
    floatClass: "float-c",
    posClass: "top-[40%] left-[1%]",
    delay: 1.3,
  },
];

/* ── Hero ───────────────────────────────────────────────────────────── */
export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y       = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#060E1D]"
    >
      {/* ── Background layer ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Glow orbs */}
        <div
          className="absolute top-[20%] left-[35%] -translate-x-1/2 w-[700px] h-[600px] rounded-full glow-pulse"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-[15%] right-[20%] w-[450px] h-[450px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)",
            animation: "glowPulse 12s ease-in-out infinite 3s",
          }}
        />

        {/* Dot-grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(148,163,184,0.8) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Perspective grid floor */}
        <div className="absolute bottom-0 left-0 right-0 h-[45vh] overflow-hidden">
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: "-60%",
              right: "-60%",
              height: "220%",
              backgroundImage:
                "linear-gradient(rgba(59,130,246,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.18) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
              transform: "perspective(500px) rotateX(65deg)",
              transformOrigin: "bottom center",
              opacity: 0.45,
            }}
          />
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#060E1D] to-transparent" />
        {/* Side fades */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#060E1D] to-transparent" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#060E1D] to-transparent" />
      </div>

      {/* ── Floating doc cards ── */}
      <motion.div style={{ y, opacity }} className="absolute inset-0">
        {docCards.map((card) => (
          <DocCard key={card.title} {...card} />
        ))}
      </motion.div>

      {/* ── Main content ── */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="section-label">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Intelligence Studio · DACH
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          className="text-5xl sm:text-6xl lg:text-7xl xl:text-[82px] font-bold text-white leading-[1.04] tracking-[-0.02em]"
        >
          Strategic intelligence
          <br />
          for{" "}
          <span className="text-gradient">high-stakes</span>
          <br />
          decisions.
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22 }}
          className="mt-8 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
        >
          Norvik Intelligence delivers focused market, competitive and narrative
          analysis for founders, investors and deal teams navigating growth,
          positioning and transactions.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.34 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button size="lg" asChild>
            <a href="#contact" className="group">
              Book a Strategic Call
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="#services">View Intelligence Services</a>
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 grid grid-cols-3 gap-6 sm:gap-16 text-center max-w-md mx-auto"
        >
          {[
            { v: "48h",  l: "Express Delivery" },
            { v: "6",    l: "Intelligence Tiers" },
            { v: "DACH", l: "Market Focus" },
          ].map(({ v, l }) => (
            <div key={l}>
              <p className="text-3xl sm:text-4xl font-bold text-white tracking-tight">{v}</p>
              <p className="mt-1 text-xs sm:text-sm text-slate-500">{l}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[11px] text-slate-600 tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-slate-600 to-transparent" />
      </motion.div>
    </section>
  );
}
