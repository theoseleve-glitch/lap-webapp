import type { Meta, StoryObj } from "@storybook/react";
import { SessionOverviewTab, type SessionOverviewView } from "./SessionOverviewTab";

const SAMPLE: SessionOverviewView = {
  lapCount: 23,
  bestLapMs: 92456,
  averageLapMs: 93812,
  totalDurationMs: 2160000,
  lapTimeRangeMs: { fastest: 92456, slowest: 98214, stdDevMs: 1234 },
  sectors: [
    { index: 1, label: "S1", bestMs: 28010 },
    { index: 2, label: "S2", bestMs: 35020 },
    { index: 3, label: "S3", bestMs: 29426 },
  ],
};

const meta: Meta<typeof SessionOverviewTab> = {
  title: "Session/SessionOverviewTab",
  component: SessionOverviewTab,
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof SessionOverviewTab>;

export const Default: Story = {
  args: { overview: SAMPLE },
};

export const SingleLap: Story = {
  args: {
    overview: {
      ...SAMPLE,
      lapCount: 1,
      averageLapMs: SAMPLE.bestLapMs,
      lapTimeRangeMs: { fastest: SAMPLE.bestLapMs, slowest: SAMPLE.bestLapMs, stdDevMs: 0 },
    },
  },
};

export const NoSectorData: Story = {
  args: {
    overview: { ...SAMPLE, sectors: [] },
  },
};

export const LongRace: Story = {
  args: {
    overview: {
      ...SAMPLE,
      lapCount: 168,
      totalDurationMs: 60 * 60 * 1000 * 3 + 24 * 1000, // 3:00:24.000
      lapTimeRangeMs: { fastest: 90123, slowest: 102456, stdDevMs: 4321 },
    },
  },
};
