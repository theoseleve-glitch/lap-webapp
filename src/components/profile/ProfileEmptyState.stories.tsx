import type { Meta, StoryObj } from "@storybook/react";
import { ProfileEmptyState } from "./ProfileEmptyState";

const meta: Meta<typeof ProfileEmptyState> = {
  title: "Profile/ProfileEmptyState",
  component: ProfileEmptyState,
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof ProfileEmptyState>;

export const Default: Story = {
  args: { onboardingHref: "/onboarding" },
};
