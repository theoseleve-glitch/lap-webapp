import type { Meta, StoryObj } from "@storybook/react";
import { ProfileSkeleton } from "./ProfileSkeleton";

const meta: Meta<typeof ProfileSkeleton> = {
  title: "Profile/ProfileSkeleton",
  component: ProfileSkeleton,
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof ProfileSkeleton>;

export const Default: Story = {};
