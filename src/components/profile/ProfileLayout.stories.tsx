import type { Meta, StoryObj } from "@storybook/react";
import { ProfileLayout, type ProfileLayoutProps } from "./ProfileLayout";

const meta: Meta<typeof ProfileLayout> = {
  title: "Profile/ProfileLayout",
  component: ProfileLayout,
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof ProfileLayout>;

const BASE: ProfileLayoutProps = {
  score: {
    score: 78,
    trend: [62, 65, 68, 70, 72, 75, 78],
    delta: 5,
  },
  skillDimensions: [
    { label: "Braking", value: 72 },
    { label: "Trail-braking", value: 64 },
    { label: "Apex precision", value: 80 },
    { label: "Throttle modulation", value: 58 },
    { label: "Consistency", value: 88 },
    { label: "Tyre management", value: 66 },
    { label: "Race craft", value: 54 },
    { label: "Qualifying pace", value: 78 },
    { label: "Adaptability", value: 62 },
    { label: "Recovery", value: 70 },
  ],
  weaknesses: [
    { id: "w1", title: "Late trail-brake into T5", severity: "high", detailHref: "/weaknesses/w1" },
    {
      id: "w2",
      title: "Early throttle on T11 exit",
      severity: "critical",
      detailHref: "/weaknesses/w2",
    },
    { id: "w3", title: "Apex drift at T2", severity: "medium", detailHref: "/weaknesses/w3" },
  ],
  prescriptions: [
    { id: "p1", title: "Trail-brake release drill", detailHref: "/prescriptions/p1" },
    { id: "p2", title: "Throttle modulation — Parabolica", detailHref: "/prescriptions/p2" },
  ],
  readiness: { value: 68, eventLabel: "Imola, Mar 15", targetHref: "/events/imola" },
};

export const Populated: Story = {
  args: BASE,
};

export const WithArchetypeUnlocked: Story = {
  args: { ...BASE, archetype: "Smooth Operator" },
};

export const WithArchetypeLocked: Story = {
  args: { ...BASE, archetype: null },
};

export const NewDriver: Story = {
  args: {
    ...BASE,
    score: { score: 40, trend: [], delta: undefined },
    weaknesses: [],
    prescriptions: [],
    readiness: { value: 20 },
    archetype: null,
  },
};
