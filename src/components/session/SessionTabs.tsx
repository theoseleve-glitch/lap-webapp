export type SessionTab = "overview" | "laps" | "telemetry" | "coaching";

const VALID_TABS: readonly SessionTab[] = ["overview", "laps", "telemetry", "coaching"];

export function parseSessionTab(value: string | undefined): SessionTab {
  if (value && (VALID_TABS as readonly string[]).includes(value)) {
    return value as SessionTab;
  }
  return "overview";
}

interface TabDescriptor {
  id: SessionTab;
  label: string;
}

const TABS: readonly TabDescriptor[] = [
  { id: "overview", label: "Overview" },
  { id: "laps", label: "Laps" },
  { id: "telemetry", label: "Telemetry" },
  { id: "coaching", label: "Coaching" },
];

const PANEL_COPY: Record<SessionTab, string> = {
  overview:
    "Session summary, lap-time distribution, and key sectors will appear here once the session-data hooks unblock.",
  laps: "Lap-by-lap table will appear here once the lap-detail query lands.",
  telemetry:
    "Channel selector and time-series chart will appear here once the telemetry-window query lands.",
  coaching:
    "WeaknessEpisodes and Prescriptions for this session will appear here once the next_actions endpoint (T086) lands.",
};

export interface SessionTabsProps {
  activeTab: SessionTab;
}

export function SessionTabs({ activeTab }: SessionTabsProps) {
  return (
    <div className="flex flex-col gap-6">
      <nav
        aria-label="Session tabs"
        className="flex gap-1 border-b border-steel/30 overflow-x-auto"
      >
        {TABS.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <a
              key={tab.id}
              href={`?tab=${tab.id}`}
              aria-current={isActive ? "page" : undefined}
              className={
                isActive
                  ? "border-b-2 border-pit-orange px-4 py-2 font-telemetry text-pit-orange text-[11px] uppercase tracking-[0.12em] whitespace-nowrap"
                  : "border-b-2 border-transparent px-4 py-2 font-telemetry text-steel text-[11px] uppercase tracking-[0.12em] whitespace-nowrap hover:text-chalk"
              }
            >
              {tab.label}
            </a>
          );
        })}
      </nav>
      <SessionPanel tab={activeTab} />
    </div>
  );
}

function SessionPanel({ tab }: { tab: SessionTab }) {
  const label = TABS.find((t) => t.id === tab)?.label ?? "Overview";
  return (
    <section aria-label={label} className="rounded border border-steel/30 bg-concrete p-6">
      <p className="font-body text-chalk text-sm leading-[var(--lh-body)]">{PANEL_COPY[tab]}</p>
    </section>
  );
}
