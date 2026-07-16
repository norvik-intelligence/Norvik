import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./radar.css";

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

export default function RadarRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de" className={inter.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
