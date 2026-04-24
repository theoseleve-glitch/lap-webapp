import type { Meta, StoryObj } from "@storybook/react";
import { ReadinessGauge } from "./ReadinessGauge";

const meta: Meta<typeof ReadinessGauge> = {
  title: "Profile/ReadinessGauge",
  component: ReadinessGauge,
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof ReadinessGauge>;

export const Ready: Story = {
  args: { value: 82, eventLabel: "Imola, Mar 15" },
};

export const MidPrep: Story = {
  args: { value: 54, eventLabel: "Imola, Mar 15" },
};

export const Cold: Story = {
  args: { value: 18, eventLabel: "Spa, Apr 12" },
};

export const Maxed: Story = {
  args: { value: 100, eventLabel: "Nürburgring, May 3" },
};

export const NoEventLabel: Story = {
  args: { value: 60 },
};

export const Linkable: Story = {
  args: {
    value: 68,
    eventLabel: "Imola, Mar 15",
    targetHref: "/events/imola-2026-03",
  },
};
