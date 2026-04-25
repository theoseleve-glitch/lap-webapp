import type { Meta, StoryObj } from "@storybook/react";
import { CompareSkeleton } from "./CompareSkeleton";

const meta: Meta<typeof CompareSkeleton> = {
  title: "Compare/CompareSkeleton",
  component: CompareSkeleton,
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof CompareSkeleton>;

export const Default: Story = {};
