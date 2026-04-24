import type { Meta, StoryObj } from "@storybook/react";
import { TimelineSkeleton } from "./TimelineSkeleton";

const meta: Meta<typeof TimelineSkeleton> = {
  title: "Timeline/TimelineSkeleton",
  component: TimelineSkeleton,
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof TimelineSkeleton>;

export const Default: Story = {};

export const Five: Story = {
  args: { count: 5 },
};

export const Single: Story = {
  args: { count: 1 },
};
