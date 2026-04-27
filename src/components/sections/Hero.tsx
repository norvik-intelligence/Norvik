"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, FileText, BarChart3, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

function TerrainBackground() {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <g className="terrain-a">
        <path d="M-100,160 C180,120 400,195 660,148 C900,102 1100,178 1360,132 C1420,118 1480,124 1540,110" stroke="rgba(88,101,242,0.07)" strokeWidth="1" fill="none"/>
        <path d="M-100,245 C220,205 450,272 700,228 C940,185 1130,260 1380,218 C1445,205 1500,210 1540,198" stroke="rgba(88,101,242,0.05)" strokeWidth="0.8" fill="none"/>
      </g>
      <g className="terrain-b">
        <path d="M-100,330 C200,292 430,358 690,310 C920,264 1120,340 1370,298 C1440,285 1500,290 1540,278" stroke="rgba(167,139,250,0.065)" strokeWidth="1" fill="none"/>
        <path d="M-100,415 C240,378 470,445 730,398 C960,352 1160,428 1400,386 C1458,374 1510,378 1540,368" stroke="rgba(167,139,250,0.045)" strokeWidth="0.7" fill="none"/>
      </g>
      <g className="terrain-c">
        <path d="M-100,500 C210,464 440,530 705,484 C935,440 1135,514 1375,472 C1445,460 1502,463 1540,452" stroke="rgba(88,101,242,0.085)" strokeWidth="1.2" fill="none"/>
        <path d="M-100,580 C230,545 460,612 725,566 C955,522 1155,596 1390,554 C1455,542 1508,546 1540,535" stroke="rgba(88,101,242,0.055)" strokeWidth="0.8" fill="none"/>
      </g>
      <g className="terrain-d">
        <path d="M-100,660 C250,626 480,692 748,647 C978,604 1178,678 1408,636 C1462,625 1514,628 1540,618" stroke="rgba(255,255,255,0.035)" strokeWidth="1" fill="none"/>
        <path d="M-100,740 C265,707 495,772 765,728 C995,685 1195,759 1418,718 C1468,708 1516,710 1540,701" stroke="rgba(255,255,255,0.022)" strokeWidth="0.6" fill="none"/>
      </g>
    </svg>
  );
}

interface DocCardProps {
  title: string; tag: string; icon: React.ElementType;
  iconColor: string; iconBg: string; lines: number[];
  statusColor: string; status: string;
  floatClass: string; posClass: string; delay: number;
}
function DocCard({ title, tag, icon: Icon, iconColor, iconBg, lines, statusColor, status, floatClass, posClass, delay }: DocCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 1, ease: [0.16, 1, 0.3, 1] as const }}
      className={`absolute ${posClass} ${floatClass} hidden lg:block select-none pointer-events-none`}
    >
      <div className="w-56 rounded-2xl border border-white/8 bg-[#0C0D1A]/85 backdrop-blur-2xl p-5 shadow-[0_24px_64px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.05)]">
        <div className="flex items-center gap-2.5 mb-4">
          <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${iconBg}`}>
            <Icon size={13} className={iconColor} />
          </div>
          <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-[rgba(239,237,232,0.35)]">{tag}</span>
        </div>
        <p className="text-[11px] font-medium text-[rgba(239,237,232,0.75)] leading-snug mb-4">{title}</p>
        <div className="space-y-1.5">
          {lines.map((w, i) => (
            <div key={i} className="h-1 rounded-full bg-white/8" style={{ width: `${w}%` }} />
          ))}
        </div>
        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
          <span className="text-[9px] text-[rgba(239,237,232,0.25)]">Norvik Intelligence</span>
          <span className={`text-[9px] font-semibold ${statusColor}`}>● {status}</span>
        </div>
      </div>
    </motion.div>
  );
}

const docCards: DocCardProps[] = [
  { title: "Competitive Narrative Analysis — SaaS ERP Segment, DACH", tag: "Competitive", icon: BarChart3, iconColor: "text-[#5865F2]", iconBg: "bg-[rgba(88,101,242,0.15)]", lines: [85,60,90,42], statusColor: "text-emerald-400/80", status: "Geliefert", floatClass: "float-a", posClass: "top-[20%] right-[6%]", delay: 0.9 },
  { title: "M&A Market Due Diligence — Industrial Automation Target", tag: "Due Diligence", icon: Search, iconColor: "text-violet-400", iconBg: "bg-violet-500/15", lines: [70,95,55,78], statusColor: "text-[#5865F2]/80", status: "In Arbeit", floatClass: "float-b", posClass: "bottom-[26%] right-[2%]", delay: 1.15 },
  { title: "Strategic Market Insight — B2B SaaS Segment Validation", tag: "Market Intel", icon: FileText, iconColor: "text-cyan-400", iconBg: "bg-cyan-500/15", lines: [90,65,76], statusColor: "text-emerald-400/80", status: "Geliefert", floatClass: "float-c", posClass: "top-[38%] left-[0%]", delay: 1.35 },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const contentY   = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const contentOpa = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const bgY        = useTransform(scrollYProgress, [0, 1], [0, 55]);
  const lines = ["Strategische", "Intelligence", "die entscheidet."];

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#07080F]">
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[28%] left-1/2 -translate-x-1/2 w-[860px] h-[580px] rounded-full glow-pulse" style={{ background: "radial-gradient(ellipse, rgba(88,101,242,0.09) 0%, transparent 68%)" }} />
        <div className="absolute bottom-[10%] right-[18%] w-[420px] h-[420px] rounded-full" style={{ background: "radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 70%)", animation: "glowPulse 12s ease-in-out infinite 4s" }} />
        <TerrainBackground />
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#07080F] to-transparent" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#07080F] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#07080F] to-transparent" />
      </motion.div>

      <motion.div style={{ y: contentY, opacity: contentOpa }} className="absolute inset-0">
        {docCards.map(c => <DocCard key={c.title} {...c} />)}
      </motion.div>

      <motion.div style={{ y: contentY, opacity: contentOpa }} className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
          className="mb-10"
        >
          <span className="section-label">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5865F2]" style={{ animation: "glowPulse 3s ease-in-out infinite" }} />
            Intelligence Studio · DACH
          </span>
        </motion.div>

        <h1 className="font-black tracking-tight leading-[1.04]">
          {lines.map((line, i) => (
            <div key={i} className="overflow-hidden">
              <motion.div
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.05, delay: 0.08 + i * 0.13, ease: [0.16, 1, 0.3, 1] as const }}
                className={`block ${i === 1 ? "text-gradient text-6xl sm:text-7xl lg:text-[88px] xl:text-[104px]" : "text-[#EFEDE8] text-5xl sm:text-6xl lg:text-[78px] xl:text-[92px]"}`}
              >
                {line}
              </motion.div>
            </div>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.52, ease: [0.16, 1, 0.3, 1] as const }}
          className="mt-8 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed text-[rgba(239,237,232,0.5)]"
        >
          Norvik Intelligence liefert fokussierte Markt-, Wettbewerbs- und Narrativanalysen
          für Founder, Investoren und Deal-Teams — präzise, schriftlich, entscheidungsreif.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.66, ease: [0.16, 1, 0.3, 1] as const }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button size="lg" asChild>
            <a href="mailto:mohamed.jamai.norvik@gmail.com?subject=Strategiegespr%C3%A4ch%20%E2%80%94%20Norvik%20Intelligence" className="group">
              Strategiegespräch vereinbaren
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="#services">Leistungen ansehen</a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.88 }}
          className="mt-20 grid grid-cols-3 gap-8 sm:gap-16 max-w-xs mx-auto text-center"
        >
          {[{ v: "48h", l: "Express-Lieferung" }, { v: "6", l: "Leistungsstufen" }, { v: "DACH", l: "Marktfokus" }].map(({ v, l }) => (
            <div key={l}>
              <p className="text-3xl sm:text-4xl font-black text-[#EFEDE8] tracking-tight">{v}</p>
              <p className="mt-1.5 text-[10px] font-semibold tracking-[0.16em] uppercase text-[rgba(239,237,232,0.3)]">{l}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.9, duration: 0.7 }} className="absolute bottom-9 left-1/2 -translate-x-1/2">
        <div className="w-px h-14 overflow-hidden">
          <motion.div
            className="w-full h-full bg-gradient-to-b from-transparent via-white/25 to-transparent"
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 1.6, ease: "linear", repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
