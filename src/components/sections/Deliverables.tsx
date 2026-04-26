"use client";

import { motion } from "framer-motion";
import { FileText, File, BookOpen, Briefcase, Layers } from "lucide-react";

const deliverables = [
  {
    icon: FileText,
    name: "Executive Briefing",
    pages: "2–3 pages",
    use: "Urgent board- or deal-level decisions",
    detail: "Compact C-level format. Key findings, competitive signals and one clear recommendation. Built for speed.",
    color: "text-blue-400",
    bg: "bg-blue-500/8",
  },
  {
    icon: File,
    name: "Standard Intelligence Memo",
    pages: "5–8 pages",
    use: "Focused single-question analysis",
    detail: "A defined fragestellung, systematically analyzed with market context, competitive benchmarks and strategic implications.",
    color: "text-indigo-400",
    bg: "bg-indigo-500/8",
  },
  {
    icon: BookOpen,
    name: "Premium Intelligence Memo",
    pages: "10–15 pages",
    use: "Deep market, competitive or narrative work",
    detail: "Full analytical depth — segment mapping, narrative audit, competitive positioning review and actionable recommendations.",
    color: "text-violet-400",
    bg: "bg-violet-500/8",
  },
  {
    icon: Briefcase,
    name: "Commercial / Market DD Lite",
    pages: "Scoped to mandate",
    use: "Pre-acquisition or investment review",
    detail: "An outside-in commercial layer: market attractiveness, competitive dynamics, positioning risk and narrative signals.",
    color: "text-purple-400",
    bg: "bg-purple-500/8",
  },
  {
    icon: Layers,
    name: "Deep Dive Mandate",
    pages: "Custom scope",
    use: "Complex strategic questions",
    detail: "Multi-stage research engagements for larger strategic questions — market entry, category analysis or ongoing intelligence programs.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/8",
  },
];

export default function Deliverables() {
  return (
    <section className="py-24 lg:py-32 bg-[#060E1D]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16"
        >
          <span className="section-label">Deliverables</span>
          <h2 className="mt-5 text-4xl sm:text-5xl font-bold text-white leading-tight tracking-tight">
            Clear scope.<br />Usable formats.
          </h2>
          <p className="mt-5 text-lg text-slate-400 leading-relaxed">
            Norvik sells results, not hours. Every mandate delivers a concrete, written
            intelligence output in German or English — as PDF, Word or PowerPoint.
          </p>
        </motion.div>

        <div className="space-y-3">
          {deliverables.map((d, i) => {
            const Icon = d.icon;
            return (
              <motion.div
                key={d.name}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.07, duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                className="group flex flex-col sm:flex-row sm:items-center gap-5 rounded-2xl border border-white/5 bg-white/2 px-6 py-5 hover:border-white/10 hover:bg-white/3 transition-all duration-300"
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${d.bg}`}>
                  <Icon size={20} className={d.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="text-base font-semibold text-white">{d.name}</span>
                    <span className="text-xs text-slate-600 border border-white/6 rounded-full px-2.5 py-0.5">{d.pages}</span>
                  </div>
                  <p className="mt-1 text-sm text-slate-500 leading-relaxed">{d.detail}</p>
                </div>
                <div className="shrink-0 hidden sm:block">
                  <span className="text-xs text-slate-600 whitespace-nowrap">{d.use}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 flex flex-wrap gap-6 text-sm text-slate-600"
        >
          {["Delivered as PDF, Word or PowerPoint", "German & English", "50 % upfront · 50 % on delivery", "Standard: 5–7 business days", "Express: 48–72 hours available"].map((item) => (
            <span key={item} className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-blue-500/50" />
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
