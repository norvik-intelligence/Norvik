"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, TrendingUp, Globe, Eye, Repeat } from "lucide-react";

const cases = [
  {
    icon: ArrowUpRight,
    label: "Pre-Transaktion",
    title: "Akquisitions- oder Investitionsvorbereitung",
    desc: "Markt-, Wettbewerbs- und Narrativ-Intelligence vor einem Deal - schneller als vollstaendige DD, schaerfer als ein Data-Room-Scan.",
  },
  {
    icon: TrendingUp,
    label: "Wachstum",
    title: "Positionierungswechsel oder Wachstumsinitiative",
    desc: "Wettbewerbs-Benchmarking und Narrativanalyse vor einem Rebranding, einer Preisaenderung oder einer Markterweiterung.",
  },
  {
    icon: Globe,
    label: "Markteintritt",
    title: "Markteintritt oder Segmentvalidierung",
    desc: "DACH-Marktgroessenbestimmung, Segment-Mapping und Wettbewerbslandschaft fuer neue Produkte oder geografische Einstiege.",
  },
  {
    icon: Eye,
    label: "Risiko",
    title: "Narrativrisiko vor einem Kapitalereignis",
    desc: "Wahrnehmungs- und Narrativrisikoanalyse vor einer Finanzierungsrunde, einer IPO-Vorbereitungsphase oder einer strategischen Ankuendigung.",
  },
  {
    icon: Repeat,
    label: "Laufend",
    title: "Wiederkehrende Intelligence fuer Deal-Teams",
    desc: "Monatliche oder vierteljaehrliche Signal-Briefs fuer PE-Fonds, Family Offices oder M&A-Teams mit aktiven Pipelines.",
  },
];

export default function UseCases() {
  return (
    <section className="py-28 bg-[#030812]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-[11px] font-semibold tracking-[0.2em] text-blue-400 uppercase mb-4">Wann Norvik beauftragen</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
            Der richtige Moment<br />fuer externe Klarheit.
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cases.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="rounded-2xl border border-white/6 bg-[#0A1628]/40 p-6 hover:border-white/10 transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <Icon size={15} className="text-blue-400" />
                  </div>
                  <span className="text-[11px] font-semibold tracking-widest text-blue-400 uppercase">{c.label}</span>
                </div>
                <h3 className="text-sm font-semibold text-white mb-2">{c.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{c.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
