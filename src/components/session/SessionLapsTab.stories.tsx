import type { Meta, StoryObj } from "@storybook/react";
import { SessionLapsTab, type LapRow } from "./SessionLapsTab";

const SAMPLE: LapRow[] = [
  {
    number: 1,
    lapTimeMs: 95210,
    sectors: [29010, 36000, 30200],
    isPersonalBest: false,
    isInvalid: false,
  },
  {
    number: 2,
    lapTimeMs: 92456,
    sectors: [28010, 35020, 29426],
    isPersonalBest: true,
    isInvalid: false,
  },
  {
    number: 3,
    lapTimeMs: 99000,
    sectors: [30100, 38000, 30900],
    isPersonalBest: false,
    isInvalid: true,
  },
  {
    number: 4,
    lapTimeMs: 93812,
    sectors: [28510, 35400, 29902],
    isPersonalBest: false,
    isInvalid: false,
  },
];

const meta: Meta<typeof SessionLapsTab> = {
  title: "Session/SessionLapsTab",
  component: SessionLapsTab,
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof SessionLapsTab>;

export const Default: Story = {
  args: { laps: SAMPLE },
};

export const NoSectors: Story = {
  args: {
    laps: SAMPLE.map((l) => ({ ...l, sectors: [] })),
  },
};

export const Empty: Story = {
  args: { laps: [] },
};

export const ManyLaps: Story = {
  args: {
    laps: Array.from({ length: 24 }, (_, i): LapRow => {
      const base = 92000;
      const lapTimeMs = base + Math.floor(Math.sin(i / 3) * 2500) + Math.abs(i % 5) * 200;
      return {
        number: i + 1,
        lapTimeMs,
        sectors: [
          Math.floor(lapTimeMs * 0.3),
          Math.floor(lapTimeMs * 0.38),
          lapTimeMs - Math.floor(lapTimeMs * 0.68),
        ],
        isPersonalBest: i === 7,
        isInvalid: i === 11,
      };
    }),
  },
};
