"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, TrendingUp, Globe, Eye, Repeat } from "lucide-react";

const cases = [
  {
    icon: ArrowUpRight,
    label: "Pre-transaction",
    title: "Acquisition or investment preparation",
    desc: "Market, competitive and narrative intelligence before a deal — faster than full DD, sharper than a data room scan.",
  },
  {
    icon: TrendingUp,
    label: "Growth",
    title: "Positioning change or growth initiative",
    desc: "Competitive benchmarking and narrative analysis before a rebrand, pricing change or market expansion.",
  },
  {
    icon: Globe,
    label: "Market entry",
    title: "Market entry or segment validation",
    desc: "DACH market sizing, segment mapping and competitive landscape for new product or geographic entries.",
  },
  {
    icon: Eye,
    label: "Risk",
    title: "Narrative risk before a capital event",
    desc: "Perception and narrative risk analysis ahead of fundraising, an IPO-prep phase or a strategic announcement.",
  },
  {
    icon: Repeat,
    label: "Ongoing",
    title: "Recurring intelligence for deal teams",
    desc: "Monthly or quarterly signal briefs for PE funds, family offices or M&A teams with active pipelines.",
  },
];

export default function UseCases() {
  return (
    <section className="py-24 lg:py-32 bg-[#060E1D]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="section-label">When to Brief Norvik</span>
          <h2 className="mt-5 text-4xl sm:text-5xl font-bold text-white leading-tight tracking-tight">
            The right moment<br />for outside-in clarity.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cases.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.08, duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                className="group relative rounded-2xl border border-white/5 bg-white/2 p-6 hover:border-blue-500/20 hover:bg-blue-500/3 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0 group-hover:bg-blue-500/18 transition-colors duration-300">
                    <Icon size={18} className="text-blue-400" />
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-blue-400/70 mb-1 block">{c.label}</span>
                    <h3 className="text-sm font-semibold text-white mb-2 leading-snug">{c.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{c.desc}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
