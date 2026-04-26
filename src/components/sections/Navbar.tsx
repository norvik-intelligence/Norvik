"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Services",   href: "#services" },
  { label: "Process",    href: "#process" },
  { label: "Pricing",    href: "#pricing" },
  { label: "About",      href: "#about" },
  { label: "Contact",    href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#060E1D]/85 backdrop-blur-2xl border-b border-white/6 shadow-[0_1px_30px_rgba(0,0,0,0.4)]"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center group">
            <Image
              src="/norvik-logo-white.png"
              alt="Norvik Intelligence"
              width={120}
              height={40}
              className="h-7 w-auto opacity-90 group-hover:opacity-100 transition-opacity duration-200"
              priority
            />
          </a>

          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200 rounded-full hover:bg-white/6"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-3">
            <Button size="default" asChild>
              <a href="#contact">Book a Call</a>
            </Button>
          </div>

          <button
            className="md:hidden p-2 rounded-xl text-slate-300 hover:bg-white/8 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 bg-[#060E1D]/95 backdrop-blur-2xl border-b border-white/6 md:hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {navLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/6 rounded-xl transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <div className="pt-2 pb-1">
                <Button className="w-full" asChild>
                  <a href="#contact" onClick={() => setMobileOpen(false)}>Book a Call</a>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
