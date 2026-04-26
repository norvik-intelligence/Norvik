"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const pillars = [
  "Transparent communication — weekly updates, no surprises.",
  "Senior engineers only — no outsourcing, no juniors without oversight.",
  "Fixed-scope engagements — you own the code from day one.",
  "Quality gates — we ship nothing without tests and accessibility reviews.",
];

export default function About() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span className="text-xs font-semibold tracking-widest text-[#0066CC] uppercase">
              About Norvik
            </span>
            <h2 className="mt-4 text-4xl sm:text-5xl font-bold text-[#1D1D1F] leading-tight tracking-tight">
              A studio that bets on craft.
            </h2>
            <p className="mt-5 text-lg text-[#86868B] leading-relaxed">
              Norvik was founded on the belief that most software agencies
              prioritise throughput over quality. We do the opposite. Our small,
              senior-only team takes on fewer clients so we can go deep on every
              engagement.
            </p>
            <p className="mt-4 text-lg text-[#86868B] leading-relaxed">
              We work with early-stage startups and growth-stage companies who
              need a trusted technical partner — not a vendor.
            </p>

            <ul className="mt-8 space-y-3">
              {pillars.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <CheckCircle
                    size={18}
                    className="text-[#0066CC] mt-0.5 shrink-0"
                  />
                  <span className="text-[15px] text-[#1D1D1F]">{p}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right: Visual card stack */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative h-[400px] hidden lg:block"
          >
            {/* Card 1 — back */}
            <div className="absolute top-8 right-0 left-12 h-full rounded-3xl bg-[#EBF3FF] border border-[#C5DCFF]" />
            {/* Card 2 — middle */}
            <div className="absolute top-4 right-4 left-8 h-full rounded-3xl bg-[#F0F7FF] border border-[#D0E8FF]" />
            {/* Card 3 — front */}
            <div className="absolute top-0 right-8 left-4 h-full rounded-3xl bg-white border border-[#E8E8ED] shadow-[0_8px_40px_rgba(0,0,0,0.08)] p-8 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#0066CC] flex items-center justify-center mb-6">
                  <span className="text-white font-bold text-lg">N</span>
                </div>
                <p className="text-2xl font-bold text-[#1D1D1F] leading-snug">
                  &ldquo;Great products are built by people who care about every
                  detail.&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-3 mt-6">
                <div className="w-10 h-10 rounded-full bg-[#F5F5F7] flex items-center justify-center font-bold text-sm text-[#1D1D1F]">
                  AK
                </div>
                <div>
                  <p className="font-semibold text-sm text-[#1D1D1F]">
                    Alex Kovac
                  </p>
                  <p className="text-xs text-[#86868B]">
                    Founder, Norvik Studio
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
