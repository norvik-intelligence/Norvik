"use client";

import { motion } from "framer-motion";
import { Compass, Activity, BookOpen } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Compass,
    label: "Assess",
    title: "Scope & mandate definition",
    desc: "We define the strategic question, the relevant market perimeter, the right intelligence format and the delivery timeline. No vague briefs — every mandate starts with a clear scope.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  {
    number: "02",
    icon: Activity,
    label: "Analyze",
    title: "Research, signal extraction & synthesis",
    desc: "We systematically map markets, competitors, narratives, positioning signals and risk factors. Primary and secondary research, structured into a coherent analytical framework.",
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
  },
  {
    number: "03",
    icon: BookOpen,
    label: "Advise",
    title: "Decision-ready memo delivery",
    desc: "A clean, written intelligence output in your chosen format — Executive Briefing, Standard Memo or Premium Report — with clear implications, priorities and recommended next steps.",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
  },
];

export default function Process() {
  return (
    <section id="process" className="py-24 lg:py-32 bg-[#07111E]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-xl mx-auto mb-20"
        >
          <span className="section-label">How It Works</span>
          <h2 className="mt-5 text-4xl sm:text-5xl font-bold text-white leading-tight tracking-tight">
            The Norvik Path
          </h2>
          <p className="mt-5 text-lg text-slate-400 leading-relaxed">
            Three focused stages. One decision-ready output.
          </p>
        </motion.div>

        {/* Desktop: horizontal / Mobile: vertical */}
        <div className="relative">
          {/* Connector — desktop */}
          <div className="hidden lg:block absolute top-[60px] left-[calc(16.67%+32px)] right-[calc(16.67%+32px)] h-px">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const }}
              className="h-full origin-left"
              style={{ background: "linear-gradient(90deg, rgba(59,130,246,0.5) 0%, rgba(139,92,246,0.5) 100%)" }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.15, duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                  className="flex flex-col items-center lg:items-center text-center"
                >
                  {/* Circle with icon */}
                  <div className="relative mb-8">
                    <div
                      className={`w-[120px] h-[120px] rounded-full border ${step.border} flex items-center justify-center`}
                      style={{ background: "rgba(10,22,40,0.9)", boxShadow: "0 4px 30px rgba(0,0,0,0.4)" }}
                    >
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${step.bg}`}>
                        <Icon size={26} className={step.color} />
                      </div>
                    </div>
                    {/* Number badge */}
                    <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-[#060E1D] border border-white/10 flex items-center justify-center">
                      <span className="text-[11px] font-bold text-slate-400">{i + 1}</span>
                    </div>
                  </div>

                  <span className={`text-xs font-semibold uppercase tracking-widest ${step.color} mb-2`}>
                    {step.label}
                  </span>
                  <h3 className="text-lg font-semibold text-white mb-3 max-w-[240px] leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed max-w-[280px]">
                    {step.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
