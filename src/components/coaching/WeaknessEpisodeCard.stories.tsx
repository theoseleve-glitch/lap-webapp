import type { Meta, StoryObj } from "@storybook/react";
import { WeaknessEpisodeCard } from "./WeaknessEpisodeCard";

const meta: Meta<typeof WeaknessEpisodeCard> = {
  title: "Coaching/WeaknessEpisodeCard",
  component: WeaknessEpisodeCard,
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof WeaknessEpisodeCard>;

export const High: Story = {
  args: {
    title: "Late trail-braking into T5",
    severity: "high",
    confidence: 0.85,
    evidence: ["Lap 12 @ T5", "Lap 15 @ T5", "Lap 18 @ T3"],
  },
};

export const Critical: Story = {
  args: {
    title: "Over-rotating on power-down out of Parabolica",
    severity: "critical",
    confidence: 0.92,
    evidence: [
      "Lap 8 @ T11 — 42% throttle",
      "Lap 14 @ T11 — 38% throttle",
      "Lap 17 @ T11 — 40% throttle",
      "Lap 21 @ T11 — 36% throttle",
    ],
  },
};

export const Medium: Story = {
  args: {
    title: "Inconsistent apex on T2",
    severity: "medium",
    confidence: 0.64,
    evidence: ["Lap 4 @ T2", "Lap 9 @ T2"],
  },
};

export const Low: Story = {
  args: {
    title: "Minor steering jitter pre-apex",
    severity: "low",
    confidence: 0.42,
    evidence: ["Lap 6 @ T3"],
  },
};

export const NoEvidenceYet: Story = {
  args: {
    title: "Potential braking-pressure drift",
    severity: "medium",
    confidence: 0.55,
    evidence: [],
  },
};
