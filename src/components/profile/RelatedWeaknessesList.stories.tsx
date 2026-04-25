import type { Meta, StoryObj } from "@storybook/react";
import { RelatedWeaknessesList } from "./RelatedWeaknessesList";

const meta: Meta<typeof RelatedWeaknessesList> = {
  title: "Profile/RelatedWeaknessesList",
  component: RelatedWeaknessesList,
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof RelatedWeaknessesList>;

export const Default: Story = {
  args: {
    weaknesses: [
      { id: "w1", title: "Late trail-brake T5", severity: "high", detailHref: "/weaknesses/w1" },
      {
        id: "w2",
        title: "Early throttle T11",
        severity: "critical",
        detailHref: "/weaknesses/w2",
      },
      { id: "w3", title: "Apex drift T2", severity: "medium", detailHref: "/weaknesses/w3" },
    ],
  },
};

export const WithResolvedItems: Story = {
  args: {
    weaknesses: [
      { id: "w1", title: "Late trail-brake T5", severity: "high", detailHref: "/weaknesses/w1" },
      {
        id: "w4",
        title: "Braking point T7",
        severity: "low",
        detailHref: "/weaknesses/w4",
        status: "resolved",
      },
      {
        id: "w5",
        title: "Line choice T3",
        severity: "low",
        detailHref: "/weaknesses/w5",
        status: "resolved",
      },
    ],
  },
};

export const Capped: Story = {
  args: {
    max: 2,
    weaknesses: Default.args!.weaknesses!,
  },
};

export const Empty: Story = {
  args: { weaknesses: [] },
};
