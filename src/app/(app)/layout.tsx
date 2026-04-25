import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ObservabilityProvider } from "@/components/providers/ObservabilityProvider";
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
    <ObservabilityProvider>
      <QueryProvider>
        <AppShell>{children}</AppShell>
      </QueryProvider>
    </ObservabilityProvider>
  );
}
