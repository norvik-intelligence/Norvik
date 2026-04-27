"use client";

import { motion } from "framer-motion";
import { Compass, Activity, BookOpen } from "lucide-react";

const steps = [
  { number: "01", icon: Compass,   label: "Bewerten",   title: "Scope & Mandatsdefinition",                   desc: "Wir definieren die strategische Frage, den relevanten Marktperimeter, das richtige Intelligence-Format und den Lieferzeitplan. Keine vagen Briefings — jedes Mandat beginnt mit einem klaren Scope.", color: "text-[#5865F2]", bg: "bg-[rgba(88,101,242,0.12)]", border: "border-[rgba(88,101,242,0.2)]" },
  { number: "02", icon: Activity,   label: "Analysieren", title: "Recherche, Signal-Extraktion & Synthese",    desc: "Wir kartieren systematisch Märkte, Wettbewerber, Narrative, Positionierungssignale und Risikofaktoren. Primär- und Sekundärforschung, strukturiert in einem kohärenten analytischen Rahmen.",          color: "text-violet-400", bg: "bg-violet-500/12",           border: "border-violet-500/20" },
  { number: "03", icon: BookOpen,   label: "Beraten",    title: "Lieferung des entscheidungsreifen Memos",     desc: "Ein klarer, schriftlicher Intelligence-Output in Ihrem gewählten Format — Executive Briefing, Standard-Memo oder Premium-Report — mit klaren Implikationen, Prioritäten und empfohlenen nächsten Schritten.", color: "text-cyan-400",    bg: "bg-cyan-500/12",             border: "border-cyan-500/20" },
];

export default function Process() {
  return (
    <section id="process" className="py-28 lg:py-36 bg-[#06070C] relative overflow-hidden">
      <div className="absolute top-8 right-8 text-[clamp(100px,16vw,200px)] font-black text-white/[0.025] leading-none select-none pointer-events-none tracking-tighter">05</div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
          className="mb-20 text-center"
        >
          <span className="section-label">So funktioniert es</span>
          <div className="overflow-hidden mt-6">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] as const }}
              className="text-4xl lg:text-5xl font-black text-[#EFEDE8] leading-tight tracking-tight"
            >
              Der Norvik-Weg
            </motion.h2>
          </div>
          <p className="mt-4 text-[rgba(239,237,232,0.4)] text-base">Drei fokussierte Phasen. Ein entscheidungsreifer Output.</p>
        </motion.div>

        {/* Connector line */}
        <div className="hidden lg:block relative mb-0">
          <div className="absolute top-[52px] left-[calc(16.67%+28px)] right-[calc(16.67%+28px)] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.14, duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
                className="text-center px-4"
              >
                <div className="relative inline-flex mb-6">
                  <div className={`w-14 h-14 rounded-2xl ${step.bg} border ${step.border} flex items-center justify-center`}>
                    <Icon size={22} className={step.color} />
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#07080F] border border-white/10 flex items-center justify-center text-[10px] font-black text-[rgba(239,237,232,0.5)]">
                    {i + 1}
                  </span>
                </div>
                <div className="overflow-hidden mb-2">
                  <motion.span
                    initial={{ y: "100%" }}
                    whileInView={{ y: "0%" }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.14 + 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
                    className={`block text-[10px] font-bold tracking-[0.2em] uppercase ${step.color} mb-2`}
                  >
                    {step.label}
                  </motion.span>
                </div>
                <h3 className="text-base font-semibold text-[#EFEDE8] mb-3">{step.title}</h3>
                <p className="text-sm text-[rgba(239,237,232,0.38)] leading-relaxed">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
