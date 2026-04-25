import type { Meta, StoryObj } from "@storybook/react";
import { EvidenceSessionsList } from "./EvidenceSessionsList";

const meta: Meta<typeof EvidenceSessionsList> = {
  title: "Weaknesses/EvidenceSessionsList",
  component: EvidenceSessionsList,
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof EvidenceSessionsList>;

export const Default: Story = {
  args: {
    sessions: [
      {
        id: "s1",
        sessionTitle: "Imola Practice 3",
        date: "2026-03-22",
        evidenceNote: "Lap 5, T7",
        detailHref: "/sessions/s1",
      },
      {
        id: "s2",
        sessionTitle: "Imola Practice 2",
        date: "2026-03-15",
        evidenceNote: "Lap 12, T7",
        detailHref: "/sessions/s2",
      },
      {
        id: "s3",
        sessionTitle: "Monza Qualifying",
        date: "2026-03-10",
        evidenceNote: "Lap 3, T7",
        detailHref: "/sessions/s3",
      },
    ],
  },
};

export const WithoutNotes: Story = {
  args: {
    sessions: [
      {
        id: "s1",
        sessionTitle: "Spa Free Practice",
        date: "2026-03-05",
        detailHref: "/sessions/s1",
      },
      {
        id: "s2",
        sessionTitle: "Silverstone Race",
        date: "2026-02-28",
        detailHref: "/sessions/s2",
      },
    ],
  },
};

export const Capped: Story = {
  args: {
    max: 2,
    sessions: Default.args!.sessions!,
  },
};

export const Empty: Story = {
  args: { sessions: [] },
};
