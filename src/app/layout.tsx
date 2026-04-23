import type { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "LAP",
  description: "Driver OS webapp",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
