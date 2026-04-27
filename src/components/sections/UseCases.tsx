"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, TrendingUp, Globe, Eye, Repeat } from "lucide-react";

const cases = [
  { icon: ArrowUpRight, label: "Pre-Transaktion", title: "Akquisitions- oder Investitionsvorbereitung",     desc: "Markt-, Wettbewerbs- und Narrativ-Intelligence vor einem Deal — schneller als vollständige DD, schärfer als ein Data-Room-Scan." },
  { icon: TrendingUp,   label: "Wachstum",        title: "Positionierungswechsel oder Wachstumsinitiative", desc: "Wettbewerbs-Benchmarking und Narrativanalyse vor einem Rebranding, einer Preisänderung oder einer Markterweiterung." },
  { icon: Globe,        label: "Markteintritt",   title: "Markteintritt oder Segmentvalidierung",           desc: "DACH-Marktgrößenbestimmung, Segment-Mapping und Wettbewerbslandschaft für neue Produkte oder geografische Einstiege." },
  { icon: Eye,          label: "Risiko",           title: "Narrativrisiko vor einem Kapitalereignis",        desc: "Wahrnehmungs- und Narrativrisikoanalyse vor einer Finanzierungsrunde, einer IPO-Vorbereitungsphase oder einer strategischen Ankündigung." },
  { icon: Repeat,       label: "Laufend",          title: "Wiederkehrende Intelligence für Deal-Teams",      desc: "Monatliche oder vierteljährliche Signal-Briefs für PE-Fonds, Family Offices oder M&A-Teams mit aktiven Pipelines." },
];

export default function UseCases() {
  return (
    <section className="py-28 lg:py-36 bg-[#08090F] relative overflow-hidden">
      <div className="absolute top-8 right-8 text-[clamp(100px,16vw,200px)] font-black text-white/[0.025] leading-none select-none pointer-events-none tracking-tighter">04</div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
          className="mb-20"
        >
          <span className="section-label">Wann Norvik beauftragen</span>
          <div className="overflow-hidden mt-6">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] as const }}
              className="text-4xl lg:text-5xl font-black text-[#EFEDE8] leading-tight tracking-tight max-w-lg"
            >
              Der richtige Moment für externe Klarheit.
            </motion.h2>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cases.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: i * 0.07, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
                className="group rounded-2xl border border-white/6 bg-white/[0.02] p-6 hover:border-[#5865F2]/22 hover:bg-[#5865F2]/[0.03] transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-[#5865F2]/10 flex items-center justify-center group-hover:bg-[#5865F2]/18 transition-colors duration-300">
                    <Icon size={16} className="text-[#5865F2]" />
                  </div>
                  <span className="text-[10px] font-bold tracking-[0.18em] text-[#5865F2]/70 uppercase">{c.label}</span>
                </div>
                <h3 className="text-sm font-semibold text-[#EFEDE8] mb-2 leading-snug">{c.title}</h3>
                <p className="text-xs text-[rgba(239,237,232,0.35)] leading-relaxed">{c.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
