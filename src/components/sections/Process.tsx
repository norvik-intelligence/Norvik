"use client";

import { motion } from "framer-motion";
import { Search, Lightbulb, PenTool, Rocket, HeartHandshake } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Discovery",
    description:
      "We dig into your business goals, users, and constraints — building a shared understanding before writing a single line of code.",
  },
  {
    number: "02",
    icon: Lightbulb,
    title: "Strategy",
    description:
      "Define the product scope, prioritise features by impact, and produce a technical blueprint that the whole team aligns on.",
  },
  {
    number: "03",
    icon: PenTool,
    title: "Design",
    description:
      "High-fidelity mockups, interaction prototypes, and a complete design system — all validated with real users before handoff.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Build & Ship",
    description:
      "Rapid, iterative development with weekly demos. We run CI/CD from day one so shipping is always one button away.",
  },
  {
    number: "05",
    icon: HeartHandshake,
    title: "Grow Together",
    description:
      "Post-launch support, performance monitoring, and iterative improvements — we stay on as your long-term engineering partner.",
  },
];

export default function Process() {
  return (
    <section id="process" className="py-24 lg:py-32 bg-[#F5F5F7]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <span className="text-xs font-semibold tracking-widest text-[#0066CC] uppercase">
            How We Work
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-bold text-[#1D1D1F] leading-tight tracking-tight">
            The Norvik Path
          </h2>
          <p className="mt-5 text-lg text-[#86868B] leading-relaxed">
            A clear, repeatable process that keeps projects on track and
            stakeholders informed at every step.
          </p>
        </motion.div>

        {/* Steps — horizontal on large screens, vertical on mobile */}
        <div className="relative">
          {/* Connector line — desktop only */}
          <div className="hidden lg:block absolute top-[52px] left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D2D2D7] to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="flex flex-col items-center lg:items-start text-center lg:text-left"
                >
                  {/* Icon circle */}
                  <div className="relative w-[104px] h-[104px] flex items-center justify-center mb-6">
                    <div className="absolute inset-0 rounded-full bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)]" />
                    <div className="relative w-12 h-12 rounded-2xl bg-[#EBF3FF] flex items-center justify-center">
                      <Icon size={22} className="text-[#0066CC]" />
                    </div>
                    {/* Step number */}
                    <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#0066CC] text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                      {i + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-[#1D1D1F] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#86868B] leading-relaxed max-w-[200px] lg:max-w-none">
                    {step.description}
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
