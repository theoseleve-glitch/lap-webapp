import type { Meta, StoryObj } from "@storybook/react";
import { ActivePrescriptionsList } from "./ActivePrescriptionsList";

const meta: Meta<typeof ActivePrescriptionsList> = {
  title: "Profile/ActivePrescriptionsList",
  component: ActivePrescriptionsList,
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof ActivePrescriptionsList>;

const PRESCRIPTIONS = [
  { id: "p1", title: "Trail-brake release drill", detailHref: "/prescriptions/p1" },
  { id: "p2", title: "Throttle modulation — Parabolica", detailHref: "/prescriptions/p2" },
  { id: "p3", title: "Apex-consistency drill T2", detailHref: "/prescriptions/p3" },
  { id: "p4", title: "Late-apex drill T7", detailHref: "/prescriptions/p4" },
  { id: "p5", title: "Rotation drill T11", detailHref: "/prescriptions/p5" },
  { id: "p6", title: "Brake-pressure drill T5", detailHref: "/prescriptions/p6" },
  { id: "p7", title: "Sector-2 shadow drill", detailHref: "/prescriptions/p7" },
];

export const FiveOrFewer: Story = {
  args: { prescriptions: PRESCRIPTIONS.slice(0, 4) },
};

export const MoreThanMax: Story = {
  args: { prescriptions: PRESCRIPTIONS },
};

export const CustomMax: Story = {
  args: { prescriptions: PRESCRIPTIONS, max: 3 },
};

export const Empty: Story = {
  args: { prescriptions: [] },
};
