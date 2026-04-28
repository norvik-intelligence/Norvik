"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4";

const navLinks = [
  { label: "Leistungen", href: "#services" },
  { label: "Prozess", href: "#process" },
  { label: "Preise", href: "#pricing" },
  { label: "Kontakt", href: "#contact" },
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
    const timeout = window.setTimeout(() => setVisible(true), delay);
    return () => window.clearTimeout(timeout);
  }, [delay]);

  return (
    <div
      className="transition-opacity"
      style={{
        opacity: visible ? 1 : 0,
        transitionDuration: `${duration}ms`,
      }}
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
  const charDelay = 30;

  useEffect(() => {
    const timeout = window.setTimeout(() => setStarted(true), 200);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <h1 className={className} style={{ letterSpacing: "-0.04em" }}>
      {lines.map((line, lineIndex) => (
        <span key={line} className="block">
          {line.split("").map((char, charIndex) => {
            const delay =
              lineIndex * line.length * charDelay + charIndex * charDelay;

            return (
              <span
                key={`${lineIndex}-${charIndex}-${char}`}
                className="inline-block transition-all duration-500"
                style={{
                  opacity: started ? 1 : 0,
                  transform: started ? "translateX(0)" : "translateX(-18px)",
                  transitionDelay: `${delay}ms`,
                }}
              >
                {char === " " ? "\u00A0" : char}
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
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={VIDEO_URL}
        autoPlay
        loop
        muted
        playsInline
      />

      <div className="absolute inset-0 bg-black/18" aria-hidden="true" />

      <div className="relative z-10 flex h-full flex-col px-6 md:px-12 lg:px-16">
        <div className="pt-6">
          <nav className="liquid-glass flex min-h-[68px] items-center justify-between rounded-xl px-5 py-1.5">
            <a href="#" className="flex items-center shrink-0">
              <Image
                src="/logo.png"
                alt="Norvik Intelligence"
                width={120}
                height={40}
                priority
              />
            </a>

            <div className="hidden md:flex items-center gap-8 text-sm leading-none text-white/80">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="transition-colors duration-200 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <a
              href="#contact"
              className="inline-flex h-10 shrink-0 items-center justify-center 
