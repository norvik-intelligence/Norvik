"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "Who is Norvik for?",
    a: "Norvik works with founders, private equity investors, family offices, M&A advisors, deal teams and B2B decision-makers who need structured, written market and competitive intelligence. Our clients are typically navigating a growth decision, a transaction or a positioning question that requires a clear outside-in view.",
  },
  {
    q: "What do clients receive?",
    a: "Clients receive written intelligence outputs in practical business formats — Executive Briefings, Standard or Premium Intelligence Memos, Commercial/Market Due Diligence support or Deep Dive mandates. All deliverables are in German or English, formatted as PDF, Word or PowerPoint.",
  },
  {
    q: "Does Norvik replace a full due diligence provider?",
    a: "No. Norvik adds a focused outside-in intelligence layer on market attractiveness, competitive dynamics, positioning and narrative risk. We are not a legal, financial or audit firm. Our Commercial/Market DD Lite complements — rather than replaces — full-scope financial and legal due diligence.",
  },
  {
    q: "How quickly can a project start and be delivered?",
    a: "Standard mandates are typically delivered within 5–7 business days from confirmed scope. Express delivery in 48–72 hours is available on Executive Briefings and Standard Memos with a surcharge. We confirm timelines at scope definition.",
  },
  {
    q: "What markets and industries does Norvik cover?",
    a: "Norvik has particular depth in DACH B2B markets across technology, industrial, professional services and financial sectors. We cover both established category leaders and emerging challengers. For sectors outside our core coverage, we will tell you clearly at scope stage.",
  },
  {
    q: "How are mandates structured commercially?",
    a: "All mandates operate on a fixed-fee basis — 50 % payable at engagement confirmation, 50 % on delivery. No open-ended hourly billing. Retainer programs are billed monthly in advance.",
  },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ delay: index * 0.07, duration: 0.5 }}
      className="faq-border"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 py-6 text-left group"
        aria-expanded={open}
      >
        <span className="text-base font-semibold text-slate-200 group-hover:text-white transition-colors duration-200">
          {q}
        </span>
        <div className="shrink-0 w-7 h-7 rounded-full border border-white/8 flex items-center justify-center mt-0.5 group-hover:border-blue-500/30 transition-colors duration-200">
          {open
            ? <Minus size={13} className="text-blue-400" />
            : <Plus  size={13} className="text-slate-500 group-hover:text-slate-300" />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-sm text-slate-500 leading-relaxed max-w-3xl">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <section className="py-24 lg:py-32 bg-[#060E1D]">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label">FAQ</span>
          <h2 className="mt-5 text-4xl sm:text-5xl font-bold text-white leading-tight tracking-tight">
            Common questions.
          </h2>
        </motion.div>

        <div className="border-t border-white/6">
          {faqs.map((f, i) => (
            <FAQItem key={f.q} q={f.q} a={f.a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
