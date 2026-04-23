import type { ReactNode } from "react";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen flex flex-col bg-asphalt text-chalk">
      <main className="flex-1">{children}</main>
    </div>
  );
}
