import type { Meta, StoryObj } from "@storybook/react";
import { PrescriptionCard } from "./PrescriptionCard";

const noop = () => {};

const meta: Meta<typeof PrescriptionCard> = {
  title: "Coaching/PrescriptionCard",
  component: PrescriptionCard,
  parameters: {
    layout: "padded",
  },
  args: {
    onAccept: noop,
    onSkip: noop,
  },
};

export default meta;

type Story = StoryObj<typeof PrescriptionCard>;

export const Default: Story = {
  args: {
    title: "Trail-brake release drill",
    rationale:
      "You release the brake too abruptly before apex on high-speed right-handers. This drill builds the muscle memory for a progressive release.",
    drillHref: "/drills/trail-brake-release",
  },
};

export const CustomDrillLabel: Story = {
  args: {
    title: "Throttle-modulation drill — Parabolica",
    rationale:
      "Power-down is currently binary. This drill trains a three-step modulation through the apex.",
    drillHref: "/drills/throttle-mod-parabolica",
    drillLabel: "Open drill brief",
  },
};

export const Pending: Story = {
  args: {
    title: "Apex-consistency drill",
    rationale:
      "Your apex point varies lap-to-lap on T2 by up to 1.2 metres. This drill reinforces a single reference line.",
    drillHref: "/drills/apex-consistency",
    pending: true,
  },
};
