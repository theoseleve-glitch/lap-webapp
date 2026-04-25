import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PageErrorBoundary } from "@/components/PageErrorBoundary";
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
        <PageErrorBoundary>
          <AppShell>{children}</AppShell>
        </PageErrorBoundary>
      </QueryProvider>
    </ObservabilityProvider>
  );
}
