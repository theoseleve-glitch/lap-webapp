import type { Meta, StoryObj } from "@storybook/react";
import { SessionTabSuspense } from "./SessionTabSuspense";

function Suspender(): JSX.Element {
  throw new Promise<void>(() => {});
}

const meta: Meta<typeof SessionTabSuspense> = {
  title: "Session/SessionTabSuspense",
  component: SessionTabSuspense,
  parameters: { layout: "padded" },
};

export default meta;

type Story = StoryObj<typeof SessionTabSuspense>;

export const SyncContent: Story = {
  args: {
    variant: "overview",
    children: <p className="text-chalk text-sm">Tab content rendered synchronously.</p>,
  },
};

export const SuspendedOverview: Story = {
  args: { variant: "overview", children: <Suspender /> },
};

export const SuspendedLaps: Story = {
  args: { variant: "laps", children: <Suspender /> },
};

export const SuspendedTelemetry: Story = {
  args: { variant: "telemetry", children: <Suspender /> },
};

export const SuspendedCoaching: Story = {
  args: { variant: "coaching", children: <Suspender /> },
};
