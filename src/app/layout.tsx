import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://norvik.studio"),
  title: {
    default: "Norvik — Boutique Digital Product Studio",
    template: "%s | Norvik",
  },
  description:
    "Norvik is a boutique technology studio that designs and engineers beautiful, resilient digital products. From idea to launch in weeks, not months.",
  keywords: [
    "product studio",
    "web development",
    "UI/UX design",
    "Next.js",
    "React",
    "startup",
    "software engineering",
    "digital agency",
  ],
  authors: [{ name: "Norvik Studio", url: "https://norvik.studio" }],
  creator: "Norvik Studio",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://norvik.studio",
    title: "Norvik — Boutique Digital Product Studio",
    description:
      "We design and engineer digital products that are beautiful by default and resilient by design — from idea to launch in weeks, not months.",
    siteName: "Norvik Studio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Norvik — Boutique Digital Product Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Norvik — Boutique Digital Product Studio",
    description:
      "We design and engineer digital products that are beautiful by default and resilient by design.",
    images: ["/og-image.png"],
    creator: "@norvik_studio",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
