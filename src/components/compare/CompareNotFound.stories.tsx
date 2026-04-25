import type { Meta, StoryObj } from "@storybook/react";
import { CompareNotFound } from "./CompareNotFound";

const meta: Meta<typeof CompareNotFound> = {
  title: "Compare/CompareNotFound",
  component: CompareNotFound,
  parameters: {
    layout: "padded",
  },
  args: {
    backHref: "/compare",
  },
};

export default meta;

type Story = StoryObj<typeof CompareNotFound>;

export const Default: Story = {};
