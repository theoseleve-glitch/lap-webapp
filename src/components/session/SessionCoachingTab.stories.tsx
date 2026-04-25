import type { Meta, StoryObj } from "@storybook/react";
import { SessionCoachingTab, type SessionCoachingView } from "./SessionCoachingTab";

const FULL: SessionCoachingView = {
  newWeaknesses: [
    {
      id: "w1",
      title: "Late braking, Turn 1",
      category: "braking",
      severity: "high",
    },
    {
      id: "w2",
      title: "Inconsistent apex speed, Turn 4",
      category: "line",
      severity: "medium",
    },
  ],
  escalatedWeaknesses: [
    {
      id: "w3",
      title: "Throttle modulation, Turn 7",
      category: "throttle",
      severity: "medium",
    },
  ],
  prescriptions: [
    {
      id: "p1",
      title: "Threshold braking drill",
      description: "10 laps focused on brake-pressure release at Turn 1.",
      difficulty: "intermediate",
    },
    {
      id: "p2",
      title: "Trail-braking practice",
      description: "5 laps trail-braking into Turn 4 with reference markers.",
      difficulty: "advanced",
    },
  ],
  dataQualityInsufficient: false,
};

const meta: Meta<typeof SessionCoachingTab> = {
  title: "Session/SessionCoachingTab",
  component: SessionCoachingTab,
  parameters: { layout: "padded" },
};

export default meta;

type Story = StoryObj<typeof SessionCoachingTab>;

export const Default: Story = { args: { coaching: FULL } };

export const OnlyNewWeaknesses: Story = {
  args: {
    coaching: {
      newWeaknesses: FULL.newWeaknesses,
      escalatedWeaknesses: [],
      prescriptions: [],
      dataQualityInsufficient: false,
    },
  },
};

export const DataQualityInsufficient: Story = {
  args: {
    coaching: {
      newWeaknesses: [],
      escalatedWeaknesses: [],
      prescriptions: [],
      dataQualityInsufficient: true,
    },
  },
};

export const NoInsights: Story = {
  args: {
    coaching: {
      newWeaknesses: [],
      escalatedWeaknesses: [],
      prescriptions: [],
      dataQualityInsufficient: false,
    },
  },
};
