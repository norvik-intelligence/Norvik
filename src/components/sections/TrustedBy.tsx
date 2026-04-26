"use client";

import { motion } from "framer-motion";

const logos = [
  "Acme Corp",
  "Vercel",
  "Loom",
  "Notion",
  "Linear",
  "Stripe",
  "Figma",
  "Supabase",
];

export default function TrustedBy() {
  return (
    <section id="trusted" className="py-16 bg-[#F5F5F7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-xs font-semibold tracking-widest text-[#AEAEB2] uppercase mb-10"
        >
          Trusted by innovative teams worldwide
        </motion.p>

        {/* Marquee wrapper */}
        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#F5F5F7] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#F5F5F7] to-transparent z-10 pointer-events-none" />

          <div className="flex overflow-hidden">
            <div className="animate-marquee flex items-center gap-12 shrink-0">
              {[...logos, ...logos].map((name, i) => (
                <div
                  key={i}
                  className="shrink-0 px-2"
                  aria-label={name}
                >
                  <span className="text-xl font-bold text-[#C7C7CC] tracking-tight select-none whitespace-nowrap">
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
