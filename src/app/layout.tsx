import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";

// next/font: self-hosted, zero-CLS, automatic subsetting.
// CSS variable names match tailwind.config.ts + tokens.css expectations.
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
  preload: true,
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["600", "700"],
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
