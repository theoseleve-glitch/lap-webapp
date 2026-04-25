import type { Meta, StoryObj } from "@storybook/react";
import { LinkedPrescriptionsList } from "./LinkedPrescriptionsList";

const meta: Meta<typeof LinkedPrescriptionsList> = {
  title: "Weaknesses/LinkedPrescriptionsList",
  component: LinkedPrescriptionsList,
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof LinkedPrescriptionsList>;

export const MixedOutcomes: Story = {
  args: {
    prescriptions: [
      {
        id: "p1",
        title: "Trail-brake release drill",
        detailHref: "/prescriptions/p1",
        outcome: "met",
      },
      {
        id: "p2",
        title: "Throttle modulation — Parabolica",
        detailHref: "/prescriptions/p2",
        outcome: "unmet",
      },
      {
        id: "p3",
        title: "Apex precision focus block",
        detailHref: "/prescriptions/p3",
        outcome: "pending",
      },
    ],
  },
};

export const AllPending: Story = {
  args: {
    prescriptions: [
      {
        id: "p1",
        title: "Brake bias step study",
        detailHref: "/prescriptions/p1",
        outcome: "pending",
      },
      {
        id: "p2",
        title: "Race craft scenario set",
        detailHref: "/prescriptions/p2",
        outcome: "pending",
      },
    ],
  },
};

export const NoOutcomes: Story = {
  args: {
    prescriptions: [
      {
        id: "p1",
        title: "Just-linked prescription",
        detailHref: "/prescriptions/p1",
      },
    ],
  },
};

export const Empty: Story = {
  args: { prescriptions: [] },
};
