import type { Meta, StoryObj } from "@storybook/react";
import { ArchetypeBadge } from "./ArchetypeBadge";

const meta: Meta<typeof ArchetypeBadge> = {
  title: "Profile/ArchetypeBadge",
  component: ArchetypeBadge,
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof ArchetypeBadge>;

export const UnlockedSmoothOperator: Story = {
  args: { archetype: "Smooth Operator" },
};

export const UnlockedBrakeLater: Story = {
  args: { archetype: "Aggressive Brake-Later" },
};

export const Locked: Story = {
  args: { archetype: null },
};

export const LockedCustomCohort: Story = {
  args: { archetype: null, cohortSize: 50 },
};
