import type { Meta, StoryObj } from "@storybook/react";
import { SettingsTabs } from "./SettingsTabs";

const meta: Meta<typeof SettingsTabs> = {
  title: "Settings/SettingsTabs",
  component: SettingsTabs,
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof SettingsTabs>;

export const ProfileActive: Story = {
  args: { activeTab: "profile" },
};

export const PreferencesActive: Story = {
  args: { activeTab: "preferences" },
};

export const IntegrationsActive: Story = {
  args: { activeTab: "integrations" },
};

export const DataActive: Story = {
  args: { activeTab: "data" },
};
