import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AppShell } from "./AppShell";

export const metadata: Metadata = {
  title: { default: "Dashboard", template: "%s | LAP" },
  robots: { index: false, follow: false },
};

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return <AppShell>{children}</AppShell>;
}
