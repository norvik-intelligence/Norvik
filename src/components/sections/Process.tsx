"use client";

import { motion } from "framer-motion";
import { Compass, Activity, BookOpen } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Compass,
    label: "Bewerten",
    title: "Scope & Mandatsdefinition",
    desc: "Wir definieren die strategische Frage, den relevanten Marktperimeter, das richtige Intelligence-Format und den Lieferzeitplan. Keine vagen Briefings - jedes Mandat beginnt mit einem klaren Scope.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  {
    number: "02",
    icon: Activity,
    label: "Analysieren",
    title: "Recherche, Signal-Extraktion & Synthese",
    desc: "Wir kartieren systematisch Maerkte, Wettbewerber, Narrative, Positionierungssignale und Risikofaktoren. Primaer- und Sekundaerforschung, strukturiert in einem kohaerenten analytischen Rahmen.",
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
  },
  {
    number: "03",
    icon: BookOpen,
    label: "Beraten",
    title: "Lieferung des entscheidungsreifen Memos",
    desc: "Ein klarer, schriftlicher Intelligence-Output in Ihrem gewaehlten Format - Executive Briefing, Standard-Memo oder Premium-Report - mit klaren Implikationen, Prioritaeten und empfohlenen naechsten Schritten.",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
  },
];

export default function Process() {
  return (
    <section id="process" className="py-28 bg-[#050D1A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block text-[11px] font-semibold tracking-[0.2em] text-blue-400 uppercase mb-4">So funktioniert es</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">Der Norvik-Weg</h2>
          <p className="text-slate-400">Drei fokussierte Phasen. Ein entscheidungsreifer Output.</p>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute top-16 left-[16.67%] right-[16.67%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="grid lg:grid-cols-3 gap-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.7 }}
                  className="text-center"
                >
                  <div className="relative inline-flex mb-6">
                    <div className={`w-14 h-14 rounded-2xl ${step.bg} border ${step.border} flex items-center justify-center`}>
                      <Icon size={22} className={step.color} />
                    </div>
                    <span className={`absolute -top-2 -right-2 w-5 h-5 rounded-full ${step.bg} border ${step.border} flex items-center justify-center text-[9px] font-bold ${step.color}`}>
                      {i + 1}
                    </span>
                  </div>
                  <span className={`block text-[11px] font-semibold tracking-widest uppercase mb-2 ${step.color}`}>{step.label}</span>
                  <h3 className="text-base font-semibold text-white mb-3">{step.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
