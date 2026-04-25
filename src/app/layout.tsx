import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Space_Grotesk, Space_Mono } from "next/font/google";
import {
  FONT_BODY_WEIGHTS,
  FONT_DISPLAY_WEIGHTS,
  FONT_MONO_WEIGHTS,
  FONT_SUBSETS,
} from "@/lib/font-config";
import "./globals.css";

// next/font: self-hosted, zero-CLS. Weights and subset are pulled from
// font-config.ts so the regression test there is the single source of
// truth for what we actually ship.
const inter = Inter({
  subsets: [...FONT_SUBSETS],
  weight: [...FONT_BODY_WEIGHTS],
  variable: "--font-body",
  display: "swap",
  preload: true,
});

const spaceGrotesk = Space_Grotesk({
  subsets: [...FONT_SUBSETS],
  weight: [...FONT_DISPLAY_WEIGHTS],
  variable: "--font-display",
  display: "swap",
  preload: true,
});

const spaceMono = Space_Mono({
  subsets: [...FONT_SUBSETS],
  weight: [...FONT_MONO_WEIGHTS],
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
