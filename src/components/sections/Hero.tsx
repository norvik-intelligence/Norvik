"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: EASE },
  }),
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-16 overflow-hidden bg-white">
      {/* Ambient background blobs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#0066CC]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#00A8E8]/5 rounded-full blur-[100px]" />
      </div>

      {/* Badge */}
      <motion.div
        custom={0}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="mb-8"
      >
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#0066CC]/20 bg-[#EBF3FF] text-[#0066CC] text-xs font-semibold tracking-wide uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0066CC] animate-pulse" />
          Now Accepting New Clients
        </span>
      </motion.div>

      {/* Headline */}
      <motion.h1
        custom={0.1}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="text-center text-5xl sm:text-6xl lg:text-8xl font-bold text-[#1D1D1F] leading-[1.05] tracking-tight max-w-5xl mx-auto"
      >
        Build what&apos;s{" "}
        <span className="gradient-text">next.</span>
        <br />
        Ship it fast.
      </motion.h1>

      {/* Subtext */}
      <motion.p
        custom={0.2}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="mt-8 text-center text-lg sm:text-xl text-[#86868B] max-w-2xl mx-auto leading-relaxed"
      >
        Norvik is a boutique technology studio. We design and engineer digital
        products that are beautiful by default and resilient by design — from
        idea to launch in weeks, not months.
      </motion.p>

      {/* CTAs */}
      <motion.div
        custom={0.3}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="mt-10 flex flex-col sm:flex-row items-center gap-4"
      >
        <Button size="lg" asChild>
          <a href="#contact" className="group">
            Start Your Project
            <ArrowRight
              size={16}
              className="ml-1 group-hover:translate-x-1 transition-transform duration-200"
            />
          </a>
        </Button>
        <Button variant="ghost" size="lg" asChild>
          <a href="#services">Explore Services</a>
        </Button>
      </motion.div>

      {/* Stats */}
      <motion.div
        custom={0.4}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="mt-20 grid grid-cols-3 gap-8 sm:gap-16 text-center"
      >
        {[
          { value: "120+", label: "Projects Shipped" },
          { value: "98%", label: "Client Satisfaction" },
          { value: "4 wks", label: "Avg. Time to Launch" },
        ].map((stat) => (
          <div key={stat.label}>
            <p className="text-3xl sm:text-4xl font-bold text-[#1D1D1F] tracking-tight">
              {stat.value}
            </p>
            <p className="mt-1 text-xs sm:text-sm text-[#86868B] font-medium">
              {stat.label}
            </p>
          </div>
        ))}
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <a
          href="#trusted"
          className="flex flex-col items-center gap-1 text-[#AEAEB2] hover:text-[#86868B] transition-colors"
          aria-label="Scroll down"
        >
          <ChevronDown size={20} className="animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
}
