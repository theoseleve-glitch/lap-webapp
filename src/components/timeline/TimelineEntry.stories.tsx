import type { Meta, StoryObj } from "@storybook/react";
import { TimelineEntry } from "./TimelineEntry";

const meta: Meta<typeof TimelineEntry> = {
  title: "Timeline/TimelineEntry",
  component: TimelineEntry,
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof TimelineEntry>;

export const Minimal: Story = {
  args: {
    title: "Zandvoort — Practice",
    date: "24 Apr 2026",
    href: "/sessions/abc-123",
  },
};

export const WithTags: Story = {
  args: {
    title: "Monza — Qualifying sim",
    date: "22 Apr 2026",
    href: "/sessions/qual-42",
    subtitle: "BMW M4 GT4",
    tags: ["sim", "GT4", "Monza"],
  },
};

export const WithBadges: Story = {
  args: {
    title: "Spa — Race sim",
    date: "19 Apr 2026",
    href: "/sessions/spa-race-01",
    subtitle: "Porsche 911 GT3 R",
    tags: ["sim", "GT3", "Spa"],
    badges: [
      { label: "3 new weaknesses", tone: "warning" },
      { label: "1 prescription accepted", tone: "info" },
      { label: "Outcome achieved", tone: "success" },
    ],
  },
};

export const NeutralBadge: Story = {
  args: {
    title: "Nürburgring — Free practice",
    date: "15 Apr 2026",
    href: "/sessions/nurb-fp",
    badges: [{ label: "Archive-ready" }],
  },
};
