import type { Meta, StoryObj } from "@storybook/react";
import { LegacyCompareCasePrompt } from "./LegacyCompareCasePrompt";

const meta: Meta<typeof LegacyCompareCasePrompt> = {
  title: "Compare/LegacyCompareCasePrompt",
  component: LegacyCompareCasePrompt,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof LegacyCompareCasePrompt>;

export const TwoLegacySessions: Story = {
  args: {
    legacySessionIds: ["s-imola-A", "s-imola-B"],
  },
};

export const ThreeLegacySessions: Story = {
  args: {
    legacySessionIds: ["s-1", "s-2", "s-3"],
  },
};

export const NoLegacySessions: Story = {
  args: {
    legacySessionIds: [],
  },
};
