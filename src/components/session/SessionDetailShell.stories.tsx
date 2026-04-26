import type { Meta, StoryObj } from "@storybook/react";
import { SessionActionsBar } from "./SessionActionsBar";
import { SessionDetailShell } from "./SessionDetailShell";
import { SessionTabs } from "./SessionTabs";

const meta: Meta<typeof SessionDetailShell> = {
  title: "Session/SessionDetailShell",
  component: SessionDetailShell,
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof SessionDetailShell>;

const noop = () => {};

export const Placeholder: Story = {
  args: {
    sessionId: "s_demo_42",
    subtitle: "Coming soon — Block D decomposition lands when the data hooks unblock.",
  },
};

export const WithCustomTitle: Story = {
  args: {
    sessionId: "s_imola_2026_04_25",
    title: "Imola GT3",
    subtitle: "iRacing · Ferrari 296 GT3 · 2026-04-25",
  },
};

export const WithActions: Story = {
  args: {
    sessionId: "s_imola_2026_04_25",
    title: "Imola GT3",
    subtitle: "iRacing · Ferrari 296 GT3 · 2026-04-25",
    actions: <SessionActionsBar onDelete={noop} onReprocess={noop} onShare={noop} />,
  },
};

export const WithTabs: Story = {
  args: {
    sessionId: "s_imola_2026_04_25",
    title: "Imola GT3",
    children: <SessionTabs activeTab="overview" />,
  },
};

export const FullProductionLayout: Story = {
  args: {
    sessionId: "s_imola_2026_04_25",
    title: "Imola GT3",
    subtitle: "iRacing · Ferrari 296 GT3 · 2026-04-25",
    actions: <SessionActionsBar onDelete={noop} onReprocess={noop} onShare={noop} />,
    children: <SessionTabs activeTab="laps" />,
  },
};
