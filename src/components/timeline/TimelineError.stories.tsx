import type { Meta, StoryObj } from "@storybook/react";
import { TimelineError } from "./TimelineError";

const meta: Meta<typeof TimelineError> = {
  title: "Timeline/TimelineError",
  component: TimelineError,
  parameters: {
    layout: "padded",
  },
  args: {
    onRetry: () => {},
  },
};

export default meta;

type Story = StoryObj<typeof TimelineError>;

export const Default: Story = {};

export const CustomMessage: Story = {
  args: {
    message: "You appear to be offline. Check your connection and try again.",
  },
};

export const Retrying: Story = {
  args: {
    pending: true,
  },
};
