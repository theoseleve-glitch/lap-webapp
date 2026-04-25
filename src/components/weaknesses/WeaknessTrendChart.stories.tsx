import type { Meta, StoryObj } from "@storybook/react";
import { WeaknessTrendChart } from "./WeaknessTrendChart";

const meta: Meta<typeof WeaknessTrendChart> = {
  title: "Weaknesses/WeaknessTrendChart",
  component: WeaknessTrendChart,
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof WeaknessTrendChart>;

export const RisingConfidence: Story = {
  args: {
    points: [
      { date: "2026-03-01", confidence: 35 },
      { date: "2026-03-05", confidence: 48 },
      { date: "2026-03-09", confidence: 62 },
      { date: "2026-03-14", confidence: 71 },
      { date: "2026-03-18", confidence: 80 },
      { date: "2026-03-22", confidence: 88 },
    ],
  },
};

export const FadingConfidence: Story = {
  args: {
    points: [
      { date: "2026-03-01", confidence: 82 },
      { date: "2026-03-05", confidence: 78 },
      { date: "2026-03-09", confidence: 65 },
      { date: "2026-03-14", confidence: 52 },
      { date: "2026-03-18", confidence: 40 },
      { date: "2026-03-22", confidence: 32 },
    ],
  },
};

export const Volatile: Story = {
  args: {
    points: [
      { date: "2026-03-01", confidence: 40 },
      { date: "2026-03-04", confidence: 75 },
      { date: "2026-03-07", confidence: 50 },
      { date: "2026-03-10", confidence: 85 },
      { date: "2026-03-13", confidence: 45 },
      { date: "2026-03-16", confidence: 70 },
    ],
  },
};

export const SinglePoint: Story = {
  args: {
    points: [{ date: "2026-03-22", confidence: 80 }],
  },
};

export const Empty: Story = {
  args: { points: [] },
};
