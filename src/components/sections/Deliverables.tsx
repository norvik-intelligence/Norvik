"use client";

import { motion } from "framer-motion";
import { FileText, File, BookOpen, Briefcase, Layers } from "lucide-react";

const deliverables = [
  { icon: FileText,  name: "Executive Briefing",          pages: "2–3 Seiten",       use: "Dringende Vorstands- oder Deal-Entscheidungen",    detail: "Kompaktes C-Suite-Format. Kernbefunde, Wettbewerbssignale und eine klare Empfehlung. Für Tempo entwickelt.",                                                                                           color: "text-[#5865F2]", bg: "bg-[rgba(88,101,242,0.1)]" },
  { icon: File,      name: "Standard-Intelligence-Memo",  pages: "5–8 Seiten",       use: "Fokussierte Einzelfragen-Analyse",                  detail: "Eine definierte Fragestellung, systematisch analysiert mit Marktkontext, Wettbewerbs-Benchmarks und strategischen Implikationen.",                                                              color: "text-violet-400", bg: "bg-violet-500/10" },
  { icon: BookOpen,  name: "Premium-Intelligence-Memo",   pages: "10–15 Seiten",     use: "Tiefe Markt-, Wettbewerbs- oder Narrativarbeit",    detail: "Volle analytische Tiefe — Segment-Mapping, Narrativ-Audit, Wettbewerbspositionierungs-Review und handlungsreife Empfehlungen.",                                                             color: "text-cyan-400",   bg: "bg-cyan-500/10" },
  { icon: Briefcase, name: "Commercial / Market DD Lite", pages: "Scope-abhängig",   use: "Pre-Akquisitions- oder Investment-Review",          detail: "Eine Außen-Commercial-Ebene: Marktattraktivität, Wettbewerbsdynamiken, Positionierungsrisiko und Narrativsignale.",                                                                          color: "text-purple-400", bg: "bg-purple-500/10" },
  { icon: Layers,    name: "Deep-Dive-Mandat",            pages: "Individueller Scope", use: "Komplexe strategische Fragen",                  detail: "Mehrstufige Forschungsengagements für größere strategische Fragen — Markteintritt, Kategorieanalyse oder laufende Intelligence-Programme.",                                                       color: "text-amber-400",  bg: "bg-amber-500/10" },
];

const terms = ["PDF, Word oder PowerPoint", "Deutsch & Englisch", "50 % Voraus / 50 % bei Lieferung", "Standard: 5–7 Werktage", "Express: 48–72 h verfügbar"];

export default function Deliverables() {
  return (
    <section className="py-28 lg:py-36 bg-[#09090F] relative overflow-hidden">
      <div className="absolute top-8 right-8 text-[clamp(100px,16vw,200px)] font-black text-white/[0.025] leading-none select-none pointer-events-none tracking-tighter">06</div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
          className="mb-20"
        >
          <span className="section-label">Deliverables</span>
          <div className="overflow-hidden mt-6">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] as const }}
              className="text-4xl lg:text-5xl font-black text-[#EFEDE8] leading-tight tracking-tight max-w-lg"
            >
              Klarer Scope. Nutzbare Formate.
            </motion.h2>
          </div>
          <p className="mt-5 text-[rgba(239,237,232,0.42)] max-w-lg text-base leading-relaxed">
            Norvik verkauft Ergebnisse, keine Stunden. Jedes Mandat liefert einen konkreten,
            schriftlichen Intelligence-Output auf Deutsch oder Englisch.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {deliverables.map((d, i) => {
            const Icon = d.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: i * 0.07, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
                className="rounded-2xl border border-white/6 bg-white/[0.02] p-6 hover:border-white/10 transition-colors duration-300"
              >
                <div className={`w-10 h-10 rounded-xl ${d.bg} flex items-center justify-center mb-4`}>
                  <Icon size={17} className={d.color} />
                </div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="text-sm font-semibold text-[#EFEDE8] leading-snug">{d.name}</h3>
                  <span className="text-[10px] text-[rgba(239,237,232,0.3)] shrink-0 pt-0.5">{d.pages}</span>
                </div>
                <p className="text-xs text-[rgba(239,237,232,0.38)] leading-relaxed mb-3">{d.detail}</p>
                <span className="text-[10px] font-bold text-[#5865F2]/60 uppercase tracking-wider">{d.use}</span>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {terms.map(t => (
            <span key={t} className="px-4 py-2 rounded-full border border-white/7 bg-white/[0.025] text-xs text-[rgba(239,237,232,0.38)]">{t}</span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
