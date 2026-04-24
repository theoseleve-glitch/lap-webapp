import type { Meta, StoryObj } from "@storybook/react";
import { DriverScoreCard } from "./DriverScoreCard";

const meta: Meta<typeof DriverScoreCard> = {
  title: "Profile/DriverScoreCard",
  component: DriverScoreCard,
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof DriverScoreCard>;

export const Rising: Story = {
  args: {
    score: 78,
    delta: 5,
    trend: [62, 65, 68, 70, 72, 75, 78],
  },
};

export const Falling: Story = {
  args: {
    score: 70,
    delta: -3,
    trend: [78, 76, 74, 73, 71, 70],
  },
};

export const Flat: Story = {
  args: {
    score: 74,
    delta: 0,
    trend: [74, 74, 73, 75, 74, 74, 74],
  },
};

export const NoDelta: Story = {
  args: {
    score: 82,
    trend: [70, 72, 75, 78, 80, 82],
  },
};

export const NoTrend: Story = {
  args: {
    score: 82,
    trend: [],
  },
};

export const CustomLabel: Story = {
  args: {
    score: 91,
    delta: 2,
    label: "Consistency score",
    trend: [85, 87, 88, 89, 91],
  },
};
