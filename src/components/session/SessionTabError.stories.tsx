import type { Meta, StoryObj } from "@storybook/react";
import { SessionTabError } from "./SessionTabError";

const meta: Meta<typeof SessionTabError> = {
  title: "Session/SessionTabError",
  component: SessionTabError,
  parameters: { layout: "padded" },
};

export default meta;

type Story = StoryObj<typeof SessionTabError>;

const noop = () => {};

export const Overview: Story = { args: { variant: "overview", onRetry: noop } };
export const Laps: Story = { args: { variant: "laps", onRetry: noop } };
export const Telemetry: Story = { args: { variant: "telemetry", onRetry: noop } };
export const Coaching: Story = { args: { variant: "coaching", onRetry: noop } };

export const RetryPending: Story = {
  args: { variant: "overview", pending: true, onRetry: noop },
};

export const CustomMessage: Story = {
  args: {
    variant: "telemetry",
    message: "Network unreachable. Check your connection.",
    onRetry: noop,
  },
};
