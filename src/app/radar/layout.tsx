import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL("https://rueckbauradar.de"),
  title: {
    default: "RückbauRadar – Frühsignale für Rückbau & Schadstoffsanierung",
    template: "%s | RückbauRadar",
  },
  description:
    "Deutschlands Frühwarnsystem für Rückbau- & Sanierungsprojekte. " +
    "Erfahre von Aufträgen, bevor sie ausgeschrieben sind.",
  robots: { index: true, follow: true },
};

export default function RadarLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de" className={inter.variable}>
      <body className="bg-[#F5F4F2] text-[#1C1C1A] font-[var(--font-inter)] antialiased">
        {children}
      </body>
    </html>
  );
}
