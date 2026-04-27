"use client";

import { motion } from "framer-motion";

const clientTypes = [
  "Private Equity", "Family Offices", "M&A Advisory", "Founder-led B2B",
  "Growth-Stage SaaS", "Deal Teams", "Strategy Consulting", "Corporate Development",
];

export default function TrustedBy() {
  return (
    <section className="py-16 bg-[#07080F] border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-[10px] font-bold tracking-[0.22em] text-[rgba(239,237,232,0.22)] uppercase mb-10"
        >
          Entwickelt für Entscheider in
        </motion.p>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#07080F] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#07080F] to-transparent z-10 pointer-events-none" />
          <div className="flex overflow-hidden">
            <div className="animate-marquee flex items-center gap-14 shrink-0">
              {[...clientTypes, ...clientTypes].map((name, i) => (
                <div key={i} className="shrink-0 flex items-center gap-3.5">
                  <div className="w-1 h-1 rounded-full bg-[#5865F2]/40" />
                  <span className="text-[rgba(239,237,232,0.28)] font-semibold text-sm whitespace-nowrap select-none tracking-wide">
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
