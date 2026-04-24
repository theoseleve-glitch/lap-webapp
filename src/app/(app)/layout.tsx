import type { Metadata } from "next";
import type { ReactNode } from "react";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { AppShell } from "./AppShell";

export const metadata: Metadata = {
  title: { default: "Dashboard", template: "%s | LAP" },
  robots: { index: false, follow: false },
};

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <QueryProvider>
      <AppShell>{children}</AppShell>
    </QueryProvider>
  );
}
