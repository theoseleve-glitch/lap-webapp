import type { Meta, StoryObj } from "@storybook/react";
import { ProfileError } from "./ProfileError";

const meta: Meta<typeof ProfileError> = {
  title: "Profile/ProfileError",
  component: ProfileError,
  parameters: {
    layout: "padded",
  },
  args: {
    onRetry: () => {},
  },
};

export default meta;

type Story = StoryObj<typeof ProfileError>;

export const Default: Story = {};

export const CustomMessage: Story = {
  args: {
    message: "You appear to be offline. Check your connection and try again.",
  },
};

export const Retrying: Story = {
  args: { pending: true },
};
