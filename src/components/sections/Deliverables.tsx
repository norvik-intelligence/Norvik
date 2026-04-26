"use client";

import { motion } from "framer-motion";
import { FileText, File, BookOpen, Briefcase, Layers } from "lucide-react";

const deliverables = [
  {
    icon: FileText,
    name: "Executive Briefing",
    pages: "2-3 Seiten",
    use: "Dringende Vorstands- oder Deal-Entscheidungen",
    detail: "Kompaktes C-Suite-Format. Kernbefunde, Wettbewerbssignale und eine klare Empfehlung. Fuer Tempo entwickelt.",
    color: "text-blue-400",
    bg: "bg-blue-500/8",
  },
  {
    icon: File,
    name: "Standard-Intelligence-Memo",
    pages: "5-8 Seiten",
    use: "Fokussierte Einzelfragen-Analyse",
    detail: "Eine definierte Fragestellung, systematisch analysiert mit Marktkontext, Wettbewerbs-Benchmarks und strategischen Implikationen.",
    color: "text-indigo-400",
    bg: "bg-indigo-500/8",
  },
  {
    icon: BookOpen,
    name: "Premium-Intelligence-Memo",
    pages: "10-15 Seiten",
    use: "Tiefe Markt-, Wettbewerbs- oder Narrativarbeit",
    detail: "Volle analytische Tiefe - Segment-Mapping, Narrativ-Audit, Wettbewerbspositionierungs-Review und handlungsreife Empfehlungen.",
    color: "text-violet-400",
    bg: "bg-violet-500/8",
  },
  {
    icon: Briefcase,
    name: "Commercial / Market DD Lite",
    pages: "Scope-abhaengig",
    use: "Pre-Akquisitions- oder Investment-Review",
    detail: "Eine Aussen-Commercial-Ebene: Marktattraktivitaet, Wettbewerbsdynamiken, Positionierungsrisiko und Narrativsignale.",
    color: "text-purple-400",
    bg: "bg-purple-500/8",
  },
  {
    icon: Layers,
    name: "Deep-Dive-Mandat",
    pages: "Individueller Scope",
    use: "Komplexe strategische Fragen",
    detail: "Mehrstufige Forschungsengagements fuer groessere strategische Fragen - Markteintritt, Kategorieanalyse oder laufende Intelligence-Programme.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/8",
  },
];

export default function Deliverables() {
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
          <span className="inline-block text-[11px] font-semibold tracking-[0.2em] text-blue-400 uppercase mb-4">Deliverables</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            Klarer Scope. Nutzbare Formate.
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Norvik verkauft Ergebnisse, keine Stunden. Jedes Mandat liefert einen konkreten, schriftlichen Intelligence-Output auf Deutsch oder Englisch - als PDF, Word oder PowerPoint.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {deliverables.map((d, i) => {
            const Icon = d.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="rounded-2xl border border-white/6 bg-[#0A1628]/40 p-6 hover:border-white/10 transition-colors"
              >
                <div className={`w-10 h-10 rounded-xl ${d.bg} flex items-center justify-center mb-4`}>
                  <Icon size={18} className={d.color} />
                </div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="text-sm font-semibold text-white">{d.name}</h3>
                  <span className="text-[10px] text-slate-500 shrink-0">{d.pages}</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed mb-3">{d.detail}</p>
                <span className="text-[10px] font-semibold text-blue-400/70 uppercase tracking-wider">{d.use}</span>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3"
        >
          {["Als PDF, Word oder PowerPoint", "Deutsch & Englisch", "50% Vorauszahlung & 50% bei Lieferung", "Standard: 5-7 Werktage", "Express: 48-72 Stunden verfuegbar"].map((item) => (
            <span key={item} className="px-4 py-2 rounded-full border border-white/8 bg-white/3 text-xs text-slate-400">
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
