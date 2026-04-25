import type { ReactNode } from "react";
import { PageIntro } from "@/components/ui/PageIntro";

export interface SessionDetailShellProps {
  sessionId: string;
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  children?: ReactNode;
}

export function SessionDetailShell({
  sessionId,
  title = "Session",
  subtitle,
  actions,
  children,
}: SessionDetailShellProps) {
  return (
    <section className="p-8 flex flex-col gap-6">
      <nav
        aria-label="Session breadcrumb"
        className="font-telemetry text-[11px] uppercase tracking-[0.12em]"
      >
        <a href="/timeline" className="text-steel hover:text-chalk inline-flex items-center gap-1">
          <span aria-hidden="true">←</span>
          <span>All sessions</span>
        </a>
      </nav>
      <PageIntro title={title} eyebrow={sessionId} subtitle={subtitle} actions={actions} />
      {children}
    </section>
  );
}
