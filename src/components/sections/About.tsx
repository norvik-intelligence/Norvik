"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Clock, FileText, Target } from "lucide-react";

const pillars = [
  { icon: Target,     title: "Spezialisiert, nicht generalistisch",    desc: "Ausschließlich fokussiert auf Competitive Narrative, Markt- und M&A-Intelligence — kein breites Beratungsretainer." },
  { icon: FileText,   title: "Schriftlich und entscheidungsreif",      desc: "Jedes Mandat liefert ein strukturiertes Dokument für C-Suite-Entscheidungen, Board-Meetings oder Deal-Prozesse." },
  { icon: Clock,      title: "Schnell ohne Qualitätsverlust",          desc: "Standardlieferung in 5–7 Werktagen. Express-Mandate in 48–72 Stunden. Keine wochenlangen Engagements für fokussierte Fragen." },
  { icon: ShieldCheck, title: "Zwischen Boutique und SaaS positioniert", desc: "Schärfer als eine Datenplattform. Schneller und kosteneffizienter als eine klassische DD-Boutique. Entwickelt für DACH-Märkte." },
];

export default function About() {
  return (
    <section id="about" className="py-28 lg:py-36 bg-[#09090F] relative overflow-hidden">
      {/* Background section number */}
      <div className="absolute top-8 right-8 text-[clamp(100px,16vw,200px)] font-black text-white/[0.025] leading-none select-none pointer-events-none tracking-tighter">
        02
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <span className="section-label">Über Norvik</span>
            <div className="overflow-hidden mt-6">
              <motion.h2
                initial={{ y: "100%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] as const }}
                className="text-4xl sm:text-5xl font-black text-[#EFEDE8] leading-[1.06] tracking-tight"
              >
                Ihre externe<br />Intelligence-Abteilung.
              </motion.h2>
            </div>
            <p className="mt-6 text-lg text-[rgba(239,237,232,0.48)] leading-relaxed">
              Norvik Intelligence ist ein spezialisiertes Research-Studio für Competitive
              Narrative Intelligence, Strategic Market Insight und M&A Due Diligence Support.
              Wir helfen Entscheidungsträgern, schneller zu agieren — mit strukturierter,
              schriftlicher Analyse, die präzise, relevant und handlungsorientiert ist.
            </p>
            <p className="mt-4 text-base text-[rgba(239,237,232,0.32)] leading-relaxed">
              Wir arbeiten mit Foundern, PE-Investoren, Family Offices und Deal-Teams im
              DACH-Raum, die eine klare Außenperspektive benötigen — ohne den Overhead
              eines klassischen Beratungsengagements.
            </p>

            {/* Stats row */}
            <div className="mt-10 flex gap-10 pt-10 border-t border-white/6">
              {[{ n: "48h", l: "Express" }, { n: "100%", l: "Schriftlich" }, { n: "DACH", l: "Fokus" }].map(({ n, l }) => (
                <div key={l}>
                  <p className="text-2xl font-black text-[#EFEDE8] tracking-tight">{n}</p>
                  <p className="text-xs text-[rgba(239,237,232,0.3)] tracking-wider uppercase mt-0.5">{l}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: pillar cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          >
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
                  className="rounded-2xl border border-white/6 bg-white/[0.02] p-5 hover:border-[#5865F2]/25 hover:bg-[#5865F2]/[0.04] transition-all duration-300"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#5865F2]/10 flex items-center justify-center mb-4">
                    <Icon size={16} className="text-[#5865F2]" />
                  </div>
                  <h4 className="text-sm font-semibold text-[#EFEDE8] mb-2">{p.title}</h4>
                  <p className="text-xs text-[rgba(239,237,232,0.38)] leading-relaxed">{p.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
