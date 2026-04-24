import type { Meta, StoryObj } from "@storybook/react";
import { OutcomeBadge } from "./OutcomeBadge";

const meta: Meta<typeof OutcomeBadge> = {
  title: "Coaching/OutcomeBadge",
  component: OutcomeBadge,
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof OutcomeBadge>;

export const Met: Story = {
  args: { status: "met" },
};

export const Unmet: Story = {
  args: { status: "unmet" },
};

export const Pending: Story = {
  args: { status: "pending" },
};

export const Skipped: Story = {
  args: { status: "skipped" },
};

export const CustomLabel: Story = {
  args: { status: "met", label: "Target cleared" },
};
