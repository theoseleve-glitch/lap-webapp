import type { Meta, StoryObj } from "@storybook/react";
import { BestSessionsList } from "./BestSessionsList";

const meta: Meta<typeof BestSessionsList> = {
  title: "Profile/BestSessionsList",
  component: BestSessionsList,
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof BestSessionsList>;

export const Default: Story = {
  args: {
    sessions: [
      {
        id: "s1",
        title: "Imola Practice 3",
        date: "2026-03-22",
        score: 88,
        detailHref: "/sessions/s1",
      },
      {
        id: "s2",
        title: "Imola Practice 2",
        date: "2026-03-15",
        score: 84,
        detailHref: "/sessions/s2",
      },
      {
        id: "s3",
        title: "Monza Qualifying",
        date: "2026-03-10",
        score: 82,
        detailHref: "/sessions/s3",
      },
      {
        id: "s4",
        title: "Spa Free Practice",
        date: "2026-03-05",
        score: 79,
        detailHref: "/sessions/s4",
      },
      {
        id: "s5",
        title: "Silverstone Race",
        date: "2026-02-28",
        score: 76,
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
      { id: "s1", title: "Private test day", date: "2026-03-22", score: 88 },
      { id: "s2", title: "Simulator session", date: "2026-03-15", score: 84 },
    ],
  },
};

export const Empty: Story = {
  args: { sessions: [] },
};
