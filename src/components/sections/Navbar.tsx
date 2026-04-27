"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Leistungen", href: "#services" },
  { label: "Vorgehen",   href: "#process" },
  { label: "Preise",     href: "#pricing" },
  { label: "Über uns",   href: "#about" },
  { label: "Kontakt",    href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#07080F]/88 backdrop-blur-2xl border-b border-white/6 shadow-[0_1px_0_rgba(255,255,255,0.04)]"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center group">
            <Image
              src="/norvik-logo-white.png"
              alt="Norvik Intelligence"
              width={160}
              height={52}
              className="h-9 w-auto opacity-85 group-hover:opacity-100 transition-opacity duration-300"
              priority
            />
          </a>

          <ul className="hidden md:flex items-center gap-0.5">
            {navLinks.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="px-4 py-2 text-sm font-medium text-[rgba(239,237,232,0.45)] hover:text-[#EFEDE8] transition-colors duration-200 rounded-lg hover:bg-white/5"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center">
            <Button size="sm" asChild>
              <a href="mailto:mohamed.jamai.norvik@gmail.com?subject=Strategiegespr%C3%A4ch%20%E2%80%94%20Norvik%20Intelligence">
                Gespräch vereinbaren
              </a>
            </Button>
          </div>

          <button
            className="md:hidden p-2 rounded-lg text-[rgba(239,237,232,0.6)] hover:bg-white/8 hover:text-[#EFEDE8] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menü öffnen"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22 }}
            className="fixed top-16 left-0 right-0 z-40 bg-[#07080F]/96 backdrop-blur-2xl border-b border-white/6 md:hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {navLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-[rgba(239,237,232,0.55)] hover:text-[#EFEDE8] hover:bg-white/5 rounded-lg transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <div className="pt-3 pb-1">
                <Button className="w-full" asChild>
                  <a href="mailto:mohamed.jamai.norvik@gmail.com?subject=Strategiegespr%C3%A4ch%20%E2%80%94%20Norvik%20Intelligence" onClick={() => setMobileOpen(false)}>
                    Gespräch vereinbaren
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
