import type { Meta, StoryObj } from "@storybook/react";
import { WeaknessError } from "./WeaknessError";

const meta: Meta<typeof WeaknessError> = {
  title: "Weaknesses/WeaknessError",
  component: WeaknessError,
  parameters: {
    layout: "padded",
  },
  args: {
    onRetry: () => {},
  },
};

export default meta;

type Story = StoryObj<typeof WeaknessError>;

export const Default: Story = {};

export const CustomMessage: Story = {
  args: {
    message: "You appear to be offline. Check your connection and try again.",
  },
};

export const Retrying: Story = {
  args: { pending: true },
};
