import type { Meta, StoryObj } from "@storybook/react";
import { CompareCaseLayout } from "./CompareCaseLayout";

const meta: Meta<typeof CompareCaseLayout> = {
  title: "Compare/CompareCaseLayout",
  component: CompareCaseLayout,
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof CompareCaseLayout>;

export const TwoSessions: Story = {
  args: {
    sessions: [
      {
        id: "s-imola-A",
        title: "Imola — Tuesday baseline",
        date: "Mar 12, 2026",
        detailHref: "/timeline/s-imola-A",
        scoreLabel: "Score 72",
      },
      {
        id: "s-imola-B",
        title: "Imola — Tuesday post-bias",
        date: "Mar 12, 2026",
        detailHref: "/timeline/s-imola-B",
        scoreLabel: "Score 79",
      },
    ],
    rationale:
      "Compare the brake-bias step (3% rear) against the baseline run on the same tyre set, same track temp.",
    outcome: { summary: "Apex precision +4 vs baseline. Trail-brake confidence flat." },
  },
};

export const ThreeSessions: Story = {
  args: {
    sessions: [
      { id: "s-1", title: "Run 1", date: "Mar 1, 2026", scoreLabel: "Score 60" },
      { id: "s-2", title: "Run 2", date: "Mar 3, 2026", scoreLabel: "Score 65" },
      { id: "s-3", title: "Run 3", date: "Mar 5, 2026", scoreLabel: "Score 71" },
    ],
    rationale: "Three-run progression after coaching block.",
    outcome: { summary: "Steady +5/run on overall score; consistency variance halved." },
  },
};

export const PendingOutcome: Story = {
  args: {
    sessions: [
      { id: "s-1", title: "Run 1", date: "Mar 1, 2026" },
      { id: "s-2", title: "Run 2", date: "Mar 3, 2026" },
    ],
    rationale: "Just saved — outcome computation hasn't run yet.",
  },
};
