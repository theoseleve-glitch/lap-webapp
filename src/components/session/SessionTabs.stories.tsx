import type { Meta, StoryObj } from "@storybook/react";
import { SessionTabs } from "./SessionTabs";

const meta: Meta<typeof SessionTabs> = {
  title: "Session/SessionTabs",
  component: SessionTabs,
  parameters: { layout: "padded" },
};

export default meta;

type Story = StoryObj<typeof SessionTabs>;

export const Overview: Story = { args: { activeTab: "overview" } };
export const Laps: Story = { args: { activeTab: "laps" } };
export const Telemetry: Story = { args: { activeTab: "telemetry" } };
export const Coaching: Story = { args: { activeTab: "coaching" } };
