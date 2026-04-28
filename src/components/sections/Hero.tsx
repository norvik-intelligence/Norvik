"use client";

import { useState, useEffect, ReactNode } from "react";
import Image from "next/image";

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4";

const navLinks = [
  { label: "Leistungen", href: "#services" },
  { label: "Prozess",    href: "#process"  },
  { label: "Preise",     href: "#pricing"  },
  { label: "Kontakt",    href: "#contact"  },
];

function FadeIn({
  children,
  delay,
  duration = 1000,
}: {
  children: ReactNode;
  delay: number;
  duration?: number;
}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <div
      className="transition-opacity"
      style={{ opacity: visible ? 1 : 0, transitionDuration: `${duration}ms` }}
    >
      {children}
    </div>
  );
}

function AnimatedHeading({
  lines,
  className,
}: {
  lines: string[];
  className?: string;
}) {
  const [started, setStarted] = useState(false);
  const CHAR_DELAY = 30;

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <h1 className={className} style={{ letterSpacing: "-0.04em" }}>
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} className="block">
          {line.split("").map((char, charIndex) => {
            const delay =
              lineIndex * line.length * CHAR_DELAY + charIndex * CHAR_DELAY;
            return (
              <span
                key={charIndex}
                className="inline-block transition-all duration-500"
                style={{
                  opacity: started ? 1 : 0,
                  transform: started ? "translateX(0)" : "translateX(-18px)",
                  transitionDelay: `${delay}ms`,
                }}
              >
                {char === " " ? " " : char}
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}

export default function Hero() {
  return (
    <section className="relative h-screen overflow-hidden text-white">
      {/* Video — no overlay */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={VIDEO_URL}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col px-6 md:px-12 lg:px-16">
        {/* Navbar */}
        <div className="pt-6">
          <nav className="liquid-glass rounded-xl px-4 py-2 flex items-center justify-between">
            <a href="#" className="flex items-center">
              <Image
                src="/logo.png"
                alt="Norvik Intelligence"
                width={120}
                height={40}
                priority
              />
            </a>
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-white/80 hover:text-gray-300 transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <a
              href="#contact"
              className="bg-white text-black px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors duration-200"
            >
              Mandat anfragen
            </a>
          </nav>
        </div>

        {/* Hero content — pushed to bottom */}
        <div className="flex-1 flex flex-col justify-end pb-12 lg:pb-16">
          <div className="lg:grid lg:grid-cols-2 lg:items-end">
            {/* Left column */}
            <div>
              <AnimatedHeading
                lines={["Strategische Intelligence,", "die entscheidet."]}
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal mb-4 text-white"
              />
              <FadeIn delay={800} duration={1000}>
                <p className="text-base md:text-lg text-gray-300 mb-5 max-w-lg">
                  Fokussierte Markt-, Wettbewerbs- und Narrativ-Intelligence für
                  Gründer, Investoren und Deal-Teams im DACH-Raum.
                </p>
              </FadeIn>
              <FadeIn delay={1200} duration={1000}>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="#contact"
                    className="bg-white text-black px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200"
                  >
                    Mandat anfragen
                  </a>
                  <a
                    href="#services"
                    className="liquid-glass border border-white/20 text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-black transition-all duration-200"
                  >
                    Leistungen erkunden
                  </a>
                </div>
              </FadeIn>
            </div>

            {/* Right column — tag */}
            <FadeIn delay={1400} duration={1000}>
              <div className="flex items-end justify-start lg:justify-end mt-8 lg:mt-0">
                <div className="liquid-glass border border-white/20 px-6 py-3 rounded-xl">
                  <p className="text-lg md:text-xl lg:text-2xl font-light text-white">
                    Analyse. Strategie. Klarheit.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
