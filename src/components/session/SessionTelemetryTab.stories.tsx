import type { Meta, StoryObj } from "@storybook/react";
import {
  SessionTelemetryTab,
  type SessionTelemetryView,
  type TelemetryChannel,
} from "./SessionTelemetryTab";

function lapWaveform(
  lapNumber: number,
  samples: number,
  scale: number,
  offset: number,
): TelemetryChannel["laps"][number] {
  return {
    lapNumber,
    samples: Array.from({ length: samples }, (_, i) => ({
      t: i * 100,
      v: Math.round(Math.sin(i / 5 + lapNumber) * scale + offset),
    })),
  };
}

const SAMPLE: SessionTelemetryView = {
  channels: [
    {
      key: "speed",
      label: "Speed",
      unit: "mph",
      laps: [lapWaveform(1, 40, 50, 80), lapWaveform(2, 40, 55, 85), lapWaveform(3, 40, 45, 75)],
    },
    {
      key: "throttle",
      label: "Throttle",
      unit: "%",
      laps: [lapWaveform(1, 40, 40, 60), lapWaveform(2, 40, 45, 60)],
    },
    {
      key: "brake",
      label: "Brake",
      unit: "%",
      laps: [lapWaveform(1, 40, 30, 30)],
    },
  ],
};

const meta: Meta<typeof SessionTelemetryTab> = {
  title: "Session/SessionTelemetryTab",
  component: SessionTelemetryTab,
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof SessionTelemetryTab>;

export const Default: Story = {
  args: { telemetry: SAMPLE },
};

export const Empty: Story = {
  args: { telemetry: { channels: [] } },
};

export const SingleChannelNoSamples: Story = {
  args: {
    telemetry: {
      channels: [
        { key: "speed", label: "Speed", unit: "mph", laps: [{ lapNumber: 1, samples: [] }] },
      ],
    },
  },
};
