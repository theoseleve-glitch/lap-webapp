export type SettingsTab = "profile" | "preferences" | "integrations" | "data";

const VALID_TABS: readonly SettingsTab[] = ["profile", "preferences", "integrations", "data"];

export function parseSettingsTab(value: string | undefined): SettingsTab {
  if (value && (VALID_TABS as readonly string[]).includes(value)) {
    return value as SettingsTab;
  }
  return "profile";
}

interface TabDescriptor {
  id: SettingsTab;
  label: string;
}

const TABS: readonly TabDescriptor[] = [
  { id: "profile", label: "Profile" },
  { id: "preferences", label: "Preferences" },
  { id: "integrations", label: "Integrations" },
  { id: "data", label: "Data" },
];

const PANEL_COPY: Record<SettingsTab, string> = {
  profile: "Display name, skill level, and avatar will appear here.",
  preferences: "Coaching tone, unit system, and language will appear here.",
  integrations: "Paired devices and revoke controls will appear here.",
  data: "Cohort opt-in, export-all, and delete-account will appear here.",
};

export interface SettingsTabsProps {
  activeTab: SettingsTab;
}

export function SettingsTabs({ activeTab }: SettingsTabsProps) {
  return (
    <div className="flex flex-col gap-6">
      <nav aria-label="Settings tabs" className="flex gap-1 border-b border-steel/30">
        {TABS.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <a
              key={tab.id}
              href={`?tab=${tab.id}`}
              aria-current={isActive ? "page" : undefined}
              className={
                isActive
                  ? "border-b-2 border-pit-orange px-4 py-2 font-telemetry text-pit-orange text-[11px] uppercase tracking-[0.12em]"
                  : "border-b-2 border-transparent px-4 py-2 font-telemetry text-steel text-[11px] uppercase tracking-[0.12em] hover:text-chalk"
              }
            >
              {tab.label}
            </a>
          );
        })}
      </nav>
      <SettingsPanel tab={activeTab} />
    </div>
  );
}

function SettingsPanel({ tab }: { tab: SettingsTab }) {
  const label = TABS.find((t) => t.id === tab)?.label ?? "Profile";
  return (
    <section aria-label={label} className="rounded border border-steel/30 bg-concrete p-6">
      <p className="font-body text-chalk text-sm leading-[var(--lh-body)]">{PANEL_COPY[tab]}</p>
    </section>
  );
}
