import type { Meta, StoryObj } from "@storybook/react";
import { SkillTrendChart } from "./SkillTrendChart";

const meta: Meta<typeof SkillTrendChart> = {
  title: "Profile/SkillTrendChart",
  component: SkillTrendChart,
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof SkillTrendChart>;

export const Default: Story = {
  args: {
    points: [
      { date: "2026-03-01", score: 58 },
      { date: "2026-03-05", score: 61 },
      { date: "2026-03-08", score: 64 },
      { date: "2026-03-12", score: 66 },
      { date: "2026-03-15", score: 70 },
      { date: "2026-03-19", score: 73 },
      { date: "2026-03-22", score: 78 },
    ],
  },
};

export const WithCustomLabel: Story = {
  args: {
    ...Default.args,
    skillLabel: "Apex precision trend",
  },
};

export const Volatile: Story = {
  args: {
    points: [
      { date: "2026-03-01", score: 40 },
      { date: "2026-03-03", score: 65 },
      { date: "2026-03-05", score: 48 },
      { date: "2026-03-08", score: 72 },
      { date: "2026-03-11", score: 55 },
      { date: "2026-03-14", score: 80 },
      { date: "2026-03-17", score: 62 },
    ],
  },
};

export const SinglePoint: Story = {
  args: {
    points: [{ date: "2026-03-22", score: 74 }],
  },
};

export const Empty: Story = {
  args: {
    points: [],
  },
};
