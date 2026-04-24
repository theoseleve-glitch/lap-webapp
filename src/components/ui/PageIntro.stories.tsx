import type { Meta, StoryObj } from "@storybook/react";
import { PageIntro } from "./PageIntro";

const meta: Meta<typeof PageIntro> = {
  title: "UI/PageIntro",
  component: PageIntro,
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof PageIntro>;

export const Basic: Story = {
  args: {
    title: "Dashboard",
  },
};

export const WithSubtitle: Story = {
  args: {
    title: "Dashboard",
    subtitle: "Driver OS — landing surface.",
  },
};

export const WithEyebrowAndBadge: Story = {
  args: {
    eyebrow: "Session 042",
    title: "Zandvoort Practice",
    badge: "BETA",
    subtitle: "3 laps completed, 1 with complete telemetry.",
  },
};
