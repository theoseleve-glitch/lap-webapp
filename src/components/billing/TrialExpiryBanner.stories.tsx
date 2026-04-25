import type { Meta, StoryObj } from "@storybook/react";
import { TrialExpiryBanner } from "./TrialExpiryBanner";

const meta: Meta<typeof TrialExpiryBanner> = {
  title: "Billing/TrialExpiryBanner",
  component: TrialExpiryBanner,
  parameters: {
    layout: "padded",
  },
  args: {
    upgradeHref: "/billing",
  },
};

export default meta;

type Story = StoryObj<typeof TrialExpiryBanner>;

export const ExpiresIn2Days: Story = {
  args: {
    trial: { status: "active", daysRemaining: 2, expiresOn: "Apr 27, 2026" },
  },
};

export const ExpiresTomorrow: Story = {
  args: {
    trial: { status: "active", daysRemaining: 1, expiresOn: "Apr 26, 2026" },
  },
};

export const ExpiresToday: Story = {
  args: {
    trial: { status: "active", daysRemaining: 0, expiresOn: "Apr 25, 2026" },
  },
};

export const HiddenWhenAmpleTime: Story = {
  args: {
    trial: { status: "active", daysRemaining: 7, expiresOn: "Apr 30, 2026" },
  },
};

export const HiddenWhenInactive: Story = {
  args: {
    trial: { status: "inactive" },
  },
};

export const HiddenWhenExpired: Story = {
  args: {
    trial: { status: "expired", expiredOn: "Apr 1, 2026" },
  },
};
