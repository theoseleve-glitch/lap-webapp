import type { Meta, StoryObj } from "@storybook/react";
import { SessionActionsBar } from "./SessionActionsBar";

const meta: Meta<typeof SessionActionsBar> = {
  title: "Session/SessionActionsBar",
  component: SessionActionsBar,
  parameters: { layout: "padded" },
};

export default meta;

type Story = StoryObj<typeof SessionActionsBar>;

const noop = () => {};

export const Default: Story = {
  args: {
    onDelete: noop,
    onReprocess: noop,
    onShare: noop,
  },
};

export const ReadOnly: Story = {
  args: {},
};

export const DeletePending: Story = {
  args: {
    onDelete: noop,
    onReprocess: noop,
    onShare: noop,
    pendingAction: "delete",
  },
};

export const ReprocessPending: Story = {
  args: {
    onDelete: noop,
    onReprocess: noop,
    onShare: noop,
    pendingAction: "reprocess",
  },
};
