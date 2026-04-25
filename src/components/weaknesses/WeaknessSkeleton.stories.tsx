import type { Meta, StoryObj } from "@storybook/react";
import { WeaknessSkeleton } from "./WeaknessSkeleton";

const meta: Meta<typeof WeaknessSkeleton> = {
  title: "Weaknesses/WeaknessSkeleton",
  component: WeaknessSkeleton,
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof WeaknessSkeleton>;

export const Default: Story = {};
