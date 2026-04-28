import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], weight: ["300", "400", "500", "600"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://norvik.studio"),
  title: {
    default: "Norvik Intelligence — Strategic Market & Competitive Intelligence",
    template: "%s | Norvik Intelligence",
  },
  description:
    "Norvik Intelligence is a specialist research and intelligence studio for competitive narrative intelligence, strategic market insight and M&A due diligence support — for founders, investors and deal teams in DACH.",
  keywords: [
    "competitive intelligence",
    "market intelligence",
    "M&A due diligence",
    "narrative intelligence",
    "DACH market research",
    "strategic analysis",
    "private equity research",
    "deal team support",
  ],
  authors: [{ name: "Norvik Intelligence", url: "https://norvik.studio" }],
  creator: "Norvik Intelligence",
  openGraph: {
    type: "website",
    locale: "de_DE",
    alternateLocale: "en_US",
    url: "https://norvik.studio",
    title: "Norvik Intelligence — Strategic Market & Competitive Intelligence",
    description:
      "Focused market, competitive and narrative analysis for founders, investors and deal teams navigating growth, positioning and transactions.",
    siteName: "Norvik Intelligence",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Norvik Intelligence" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Norvik Intelligence — Strategic Market & Competitive Intelligence",
    description: "Focused intelligence for high-stakes business decisions. DACH markets.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} scroll-smooth`}>
      <body className="antialiased bg-[#060E1D]">{children}</body>
    </html>
  );
}
