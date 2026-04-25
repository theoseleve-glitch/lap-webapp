import type { Metadata } from "next";
import { parseSettingsTab, SettingsTabs } from "@/components/settings/SettingsTabs";
import { PageIntro } from "@/components/ui/PageIntro";

export const metadata: Metadata = {
  title: "Settings",
};

interface SettingsPageProps {
  searchParams?: { tab?: string };
}

export default function SettingsPage({ searchParams = {} }: SettingsPageProps) {
  const activeTab = parseSettingsTab(searchParams.tab);
  return (
    <section className="p-8 flex flex-col gap-6">
      <PageIntro
        title="Settings"
        subtitle="Manage your profile, preferences, integrations, and data."
      />
      <SettingsTabs activeTab={activeTab} />
    </section>
  );
}
