"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Clock, FileText, Target } from "lucide-react";

const pillars = [
  {
    icon: Target,
    title: "Specialist, not generalist",
    desc: "Focused exclusively on competitive narrative, market and M&A intelligence — not a broad consulting retainer.",
  },
  {
    icon: FileText,
    title: "Written, decision-ready outputs",
    desc: "Every mandate delivers a structured document built for C-suite decisions, board meetings or deal processes.",
  },
  {
    icon: Clock,
    title: "Fast without sacrificing depth",
    desc: "Standard delivery in 5–7 business days. Express mandates in 48–72 hours. No six-week engagements for focused questions.",
  },
  {
    icon: ShieldCheck,
    title: "Positioned between boutiques and SaaS",
    desc: "Sharper than a data platform. Faster and more affordable than a traditional DD boutique. Built for DACH markets.",
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-[#07111E]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          >
            <span className="section-label">About Norvik</span>
            <h2 className="mt-5 text-4xl sm:text-5xl font-bold text-white leading-tight tracking-tight">
              Your external<br />
              intelligence department.
            </h2>
            <p className="mt-5 text-lg text-slate-400 leading-relaxed">
              Norvik Intelligence is a specialist research studio for competitive narrative
              intelligence, strategic market insight and M&A due diligence support. We help
              decision-makers move faster with structured, written analysis that is precise,
              relevant and built for action.
            </p>
            <p className="mt-4 text-base text-slate-500 leading-relaxed">
              We work with founders, PE investors, family offices and deal teams across
              DACH who need sharp outside-in analysis without the overhead of a traditional
              consulting engagement.
            </p>
          </motion.div>

          {/* Right: pillar cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="rounded-2xl border border-white/6 bg-white/2 p-5 hover:border-blue-500/20 hover:bg-blue-500/4 transition-all duration-300"
                >
                  <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
                    <Icon size={17} className="text-blue-400" />
                  </div>
                  <h4 className="text-sm font-semibold text-white mb-2">{p.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{p.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
