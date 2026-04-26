import type { Meta, StoryObj } from "@storybook/react";
import { SessionTabSkeleton } from "./SessionTabSkeleton";

const meta: Meta<typeof SessionTabSkeleton> = {
  title: "Session/SessionTabSkeleton",
  component: SessionTabSkeleton,
  parameters: { layout: "padded" },
};

export default meta;

type Story = StoryObj<typeof SessionTabSkeleton>;

export const Overview: Story = { args: { variant: "overview" } };
export const Laps: Story = { args: { variant: "laps" } };
export const Telemetry: Story = { args: { variant: "telemetry" } };
export const Coaching: Story = { args: { variant: "coaching" } };
