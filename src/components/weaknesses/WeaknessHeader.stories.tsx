import type { Meta, StoryObj } from "@storybook/react";
import { WeaknessHeader } from "./WeaknessHeader";

const meta: Meta<typeof WeaknessHeader> = {
  title: "Weaknesses/WeaknessHeader",
  component: WeaknessHeader,
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof WeaknessHeader>;

export const OpenHigh: Story = {
  args: {
    title: "Late trail-brake into T5",
    category: "Trail-braking",
    severity: "high",
    status: "open",
  },
};

export const OpenCritical: Story = {
  args: {
    title: "Early throttle on T11 exit",
    category: "Throttle modulation",
    severity: "critical",
    status: "open",
  },
};

export const Resolved: Story = {
  args: {
    title: "Apex drift at T2",
    category: "Apex precision",
    severity: "low",
    status: "resolved",
  },
};

export const MediumOpen: Story = {
  args: {
    title: "Inconsistent brake bias",
    category: "Braking",
    severity: "medium",
    status: "open",
  },
};
