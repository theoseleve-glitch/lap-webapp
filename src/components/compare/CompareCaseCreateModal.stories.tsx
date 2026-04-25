import type { Meta, StoryObj } from "@storybook/react";
import { CompareCaseCreateModal } from "./CompareCaseCreateModal";

const meta: Meta<typeof CompareCaseCreateModal> = {
  title: "Compare/CompareCaseCreateModal",
  component: CompareCaseCreateModal,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    open: true,
    selectedSessionIds: ["s-imola-1", "s-imola-2"],
    onSubmit: () => {},
    onCancel: () => {},
  },
};

export default meta;

type Story = StoryObj<typeof CompareCaseCreateModal>;

export const Default: Story = {};

export const ManySessions: Story = {
  args: {
    selectedSessionIds: ["s-1", "s-2", "s-3", "s-4"],
  },
};

export const Pending: Story = {
  args: { pending: true },
};

export const WithBackendError: Story = {
  args: { error: "Backend rejected the case — try again later." },
};

export const Closed: Story = {
  args: { open: false },
};
