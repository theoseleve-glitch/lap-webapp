import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";

// next/font: self-hosted, zero-CLS. Weights below are trimmed to match
// the only font-weight declarations in globals.css (Inter→400, Space
// Grotesk→700, Space Mono→400). Arrays MUST stay inline literals — the
// next/font SWC plugin reads the AST at build time and rejects spreads.
// See src/lib/font-subsetting.test.ts for the regression guard.
const inter = Inter({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-body",
  display: "swap",
  preload: true,
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-display",
  display: "swap",
  preload: true,
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mono",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "LAP",
  description: "Driver OS webapp",
  manifest: "/manifest.json",
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${spaceMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
