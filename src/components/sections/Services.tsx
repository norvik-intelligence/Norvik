"use client";

import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Search, Layers } from "lucide-react";

const services = [
  { num: "01", icon: BarChart3,  color: "text-[#5865F2]", bg: "bg-[rgba(88,101,242,0.12)]",  title: "Wettbewerbs-Narrativ-Intelligence",     desc: "Verstehen Sie, wie Wettbewerber sich positionieren, wie Märkte ihre Botschaften interpretieren und wo Narrativlücken strategische Vorteile schaffen. Wir entschlüsseln die Geschichten, die Ihren Markt prägen.", tags: ["Narrativanalyse", "Positionierungsprüfung", "Signal-Mapping"] },
  { num: "02", icon: TrendingUp, color: "text-violet-400", bg: "bg-violet-500/12",            title: "Strategische Marktanalyse",             desc: "Kartieren Sie Marktverschiebungen, Kategoriedynamiken und Wettbewerbschancen, bevor sie offensichtlich werden. Tiefe Segmentanalyse, Marktvalidierung und Chancenmapping für weitreichende Wachstumsentscheidungen.", tags: ["Markt-Mapping", "Segmentvalidierung", "Chancen-Sizing"] },
  { num: "03", icon: Search,     color: "text-cyan-400",   bg: "bg-cyan-500/12",              title: "M&A Due-Diligence-Unterstützung",       desc: "Eine Außen-Intelligence-Ebene zu Märkten, Positionierung, Wettbewerb und Narrativrisiken vor Investitionen oder Akquisitionen. Schnellere, präzisere Analyse ohne den vollen DD-Overhead.",               tags: ["Commercial DD", "Target Screening", "Narrativrisiko"] },
  { num: "04", icon: Layers,     color: "text-amber-400",  bg: "bg-amber-500/12",             title: "Individuelle Intelligence-Mandate",     desc: "Maßgeschneiderte Engagements für komplexe strategische Fragen — mehrstufige Deep Dives, Deal Screenings, laufende Intelligence-Retainer und Sondersituationsanalysen.",                                    tags: ["Deep Dives", "Deal Screening", "Retainer-Programme"] },
];

export default function Services() {
  return (
    <section id="services" className="py-28 lg:py-36 bg-[#06070C] relative overflow-hidden">
      <div className="absolute top-8 right-8 text-[clamp(100px,16vw,200px)] font-black text-white/[0.025] leading-none select-none pointer-events-none tracking-tighter">03</div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
          className="mb-20"
        >
          <span className="section-label">Intelligence-Leistungen</span>
          <div className="overflow-hidden mt-6">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] as const }}
              className="text-4xl lg:text-5xl font-black text-[#EFEDE8] leading-tight tracking-tight max-w-xl"
            >
              Präzise Intelligence.<br />Jedes Mandat.
            </motion.h2>
          </div>
          <p className="mt-5 text-[rgba(239,237,232,0.42)] max-w-lg text-base leading-relaxed">
            Norvik liefert fokussierte, schriftliche, entscheidungsreife Analysen ohne die Kostenstruktur eines großen Beratungshauses.
          </p>
        </motion.div>

        <div className="space-y-0">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
                className="group relative border-t border-white/6 py-8 grid grid-cols-[80px_1fr_auto] md:grid-cols-[100px_1fr_auto] gap-6 items-start hover:border-white/12 transition-colors duration-300"
              >
                {/* Hover accent line */}
                <div className="absolute left-0 top-0 h-px w-0 bg-[#5865F2] group-hover:w-full transition-all duration-700 ease-out" />

                {/* Number */}
                <span className="text-[clamp(28px,3vw,42px)] font-black text-[rgba(239,237,232,0.12)] group-hover:text-[rgba(239,237,232,0.22)] transition-colors duration-300 pt-1 leading-none tracking-tighter">
                  {s.num}
                </span>

                {/* Content */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center`}>
                      <Icon size={15} className={s.color} />
                    </div>
                    <h3 className="text-lg font-semibold text-[#EFEDE8]">{s.title}</h3>
                  </div>
                  <p className="text-sm text-[rgba(239,237,232,0.42)] leading-relaxed max-w-xl">{s.desc}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {s.tags.map(t => (
                      <span key={t} className="px-2.5 py-1 rounded-full border border-white/6 bg-white/[0.03] text-[11px] text-[rgba(239,237,232,0.35)]">{t}</span>
                    ))}
                  </div>
                </div>

                {/* Arrow */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 pt-2">
                  <div className="w-8 h-8 rounded-full border border-white/12 flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 10L10 2M10 2H4M10 2V8" stroke="rgba(239,237,232,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>
              </motion.div>
            );
          })}
          <div className="border-t border-white/6" />
        </div>
      </div>
    </section>
  );
}
