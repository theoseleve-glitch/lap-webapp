import type { Meta, StoryObj } from "@storybook/react";
import { TimelineEmptyState } from "./TimelineEmptyState";

const meta: Meta<typeof TimelineEmptyState> = {
  title: "Timeline/TimelineEmptyState",
  component: TimelineEmptyState,
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof TimelineEmptyState>;

export const Default: Story = {
  args: {
    uploadHref: "/upload",
  },
};
