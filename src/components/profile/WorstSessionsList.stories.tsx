import type { Meta, StoryObj } from "@storybook/react";
import { WorstSessionsList } from "./WorstSessionsList";

const meta: Meta<typeof WorstSessionsList> = {
  title: "Profile/WorstSessionsList",
  component: WorstSessionsList,
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof WorstSessionsList>;

export const Default: Story = {
  args: {
    sessions: [
      {
        id: "s1",
        title: "Nordschleife Race",
        date: "2026-03-22",
        score: 42,
        detailHref: "/sessions/s1",
      },
      {
        id: "s2",
        title: "Sebring Endurance",
        date: "2026-03-18",
        score: 45,
        detailHref: "/sessions/s2",
      },
      {
        id: "s3",
        title: "COTA Qualifying",
        date: "2026-03-14",
        score: 48,
        detailHref: "/sessions/s3",
      },
      {
        id: "s4",
        title: "Suzuka Wet Race",
        date: "2026-03-09",
        score: 51,
        detailHref: "/sessions/s4",
      },
      {
        id: "s5",
        title: "Spa Night Race",
        date: "2026-03-04",
        score: 55,
        detailHref: "/sessions/s5",
      },
    ],
  },
};

export const Capped: Story = {
  args: {
    max: 3,
    sessions: Default.args!.sessions!,
  },
};

export const WithoutLinks: Story = {
  args: {
    sessions: [
      { id: "s1", title: "Private test day", date: "2026-03-22", score: 42 },
      { id: "s2", title: "Simulator session", date: "2026-03-15", score: 48 },
    ],
  },
};

export const Empty: Story = {
  args: { sessions: [] },
};
