import type { Meta, StoryObj } from "@storybook/react";
import { OpenWeaknessesList } from "./OpenWeaknessesList";

const meta: Meta<typeof OpenWeaknessesList> = {
  title: "Profile/OpenWeaknessesList",
  component: OpenWeaknessesList,
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof OpenWeaknessesList>;

const WEAKNESSES = [
  {
    id: "w1",
    title: "Late trail-brake into T5",
    severity: "high" as const,
    detailHref: "/weaknesses/w1",
  },
  {
    id: "w2",
    title: "Early throttle on T11 exit",
    severity: "critical" as const,
    detailHref: "/weaknesses/w2",
  },
  {
    id: "w3",
    title: "Apex drift at T2",
    severity: "medium" as const,
    detailHref: "/weaknesses/w3",
  },
  {
    id: "w4",
    title: "Braking point inconsistency T7",
    severity: "medium" as const,
    detailHref: "/weaknesses/w4",
  },
  {
    id: "w5",
    title: "Line choice through T3",
    severity: "low" as const,
    detailHref: "/weaknesses/w5",
  },
  {
    id: "w6",
    title: "Shift timing at T14",
    severity: "low" as const,
    detailHref: "/weaknesses/w6",
  },
  {
    id: "w7",
    title: "Corner entry speed T8",
    severity: "medium" as const,
    detailHref: "/weaknesses/w7",
  },
];

export const FiveOrFewer: Story = {
  args: { weaknesses: WEAKNESSES.slice(0, 4) },
};

export const MoreThanMax: Story = {
  args: { weaknesses: WEAKNESSES },
};

export const CustomMax: Story = {
  args: { weaknesses: WEAKNESSES, max: 3 },
};

export const Empty: Story = {
  args: { weaknesses: [] },
};
