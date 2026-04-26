"use client";

import { motion } from "framer-motion";

const clientTypes = [
  "Private Equity",
  "Family Offices",
  "M&A Advisory",
  "Founder-led B2B",
  "Growth-Stage SaaS",
  "Deal Teams",
  "Strategy Consulting",
  "Corporate Development",
];

export default function TrustedBy() {
  return (
    <section className="py-14 bg-[#07111E] border-y border-white/4 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-[11px] font-semibold tracking-[0.2em] text-slate-600 uppercase mb-10"
        >
          Built for decision-makers in
        </motion.p>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-28 bg-gradient-to-r from-[#07111E] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-l from-[#07111E] to-transparent z-10 pointer-events-none" />

          <div className="flex overflow-hidden">
            <div className="animate-marquee flex items-center gap-12 shrink-0">
              {[...clientTypes, ...clientTypes].map((name, i) => (
                <div key={i} className="shrink-0 flex items-center gap-3">
                  <div className="w-1 h-1 rounded-full bg-blue-500/50" />
                  <span className="text-slate-600 font-semibold text-sm whitespace-nowrap select-none">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
