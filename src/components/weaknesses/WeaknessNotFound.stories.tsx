import type { Meta, StoryObj } from "@storybook/react";
import { WeaknessNotFound } from "./WeaknessNotFound";

const meta: Meta<typeof WeaknessNotFound> = {
  title: "Weaknesses/WeaknessNotFound",
  component: WeaknessNotFound,
  parameters: {
    layout: "padded",
  },
  args: {
    backHref: "/profile",
  },
};

export default meta;

type Story = StoryObj<typeof WeaknessNotFound>;

export const Default: Story = {};
