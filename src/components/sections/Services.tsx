"use client";

import { motion } from "framer-motion";
import {
  Palette,
  Code2,
  Layers,
  Smartphone,
  BarChart3,
  Zap,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: Palette,
    title: "UI/UX Design",
    description:
      "Human-centred interfaces that feel intuitive from first touch. We go from wireframes to pixel-perfect prototypes with systematic design tokens.",
    tags: ["Figma", "Design Systems", "Prototyping"],
    color: "bg-purple-50 text-purple-500",
  },
  {
    icon: Code2,
    title: "Web Engineering",
    description:
      "Performant web applications built on modern stacks — Next.js, TypeScript, and edge-first deployment for sub-100ms load times globally.",
    tags: ["Next.js", "TypeScript", "Edge"],
    color: "bg-blue-50 text-blue-500",
  },
  {
    icon: Layers,
    title: "Product Strategy",
    description:
      "We partner with founders to validate ideas, define roadmaps, and prioritise ruthlessly — so your team builds the right thing first.",
    tags: ["Discovery", "Roadmap", "OKRs"],
    color: "bg-green-50 text-green-500",
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description:
      "Native iOS and Android experiences, or cross-platform React Native apps that feel genuinely at home on every device.",
    tags: ["React Native", "SwiftUI", "Jetpack"],
    color: "bg-orange-50 text-orange-500",
  },
  {
    icon: BarChart3,
    title: "Analytics & Growth",
    description:
      "Instrument your product with the right metrics from day one. We set up event tracking, funnels, and dashboards that drive real decisions.",
    tags: ["PostHog", "Amplitude", "Mixpanel"],
    color: "bg-red-50 text-red-500",
  },
  {
    icon: Zap,
    title: "Performance Audits",
    description:
      "Deep-dive audits of your existing product. We identify bottlenecks, optimise Core Web Vitals, and deliver an actionable remediation plan.",
    tags: ["Core Web Vitals", "Lighthouse", "A11y"],
    color: "bg-yellow-50 text-yellow-500",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

export default function Services() {
  return (
    <section id="services" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16"
        >
          <span className="text-xs font-semibold tracking-widest text-[#0066CC] uppercase">
            What We Do
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-bold text-[#1D1D1F] leading-tight tracking-tight">
            End-to-end digital
            <br />
            craftsmanship.
          </h2>
          <p className="mt-5 text-lg text-[#86868B] leading-relaxed">
            From strategy to shipping — we cover every layer of your product so
            you can focus on growing your business.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div key={service.title} variants={cardVariants}>
                <Card className="h-full group cursor-default">
                  <CardHeader>
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-4 ${service.color} transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon size={20} />
                    </div>
                    <CardTitle>{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-5 text-[15px]">
                      {service.description}
                    </CardDescription>
                    <div className="flex flex-wrap gap-2">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-full bg-[#F5F5F7] text-[#86868B] text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
