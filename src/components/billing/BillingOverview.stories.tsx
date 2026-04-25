import type { Meta, StoryObj } from "@storybook/react";
import { BillingOverview } from "./BillingOverview";

const meta: Meta<typeof BillingOverview> = {
  title: "Billing/BillingOverview",
  component: BillingOverview,
  parameters: {
    layout: "padded",
  },
  args: {
    onOpenBillingPortal: () => {},
  },
};

export default meta;

type Story = StoryObj<typeof BillingOverview>;

export const FreeWithActiveTrial: Story = {
  args: {
    plan: { name: "Free" },
    trial: { status: "active", daysRemaining: 7, expiresOn: "Apr 30, 2026" },
  },
};

export const FreeTrialExpiringSoon: Story = {
  args: {
    plan: { name: "Free" },
    trial: { status: "active", daysRemaining: 1, expiresOn: "Apr 26, 2026" },
  },
};

export const FreeTrialExpired: Story = {
  args: {
    plan: { name: "Free" },
    trial: { status: "expired", expiredOn: "Apr 1, 2026" },
  },
};

export const ProNoTrial: Story = {
  args: {
    plan: { name: "Pro", priceLabel: "$12 / month" },
    trial: { status: "inactive" },
  },
};

export const Pending: Story = {
  args: {
    plan: { name: "Pro", priceLabel: "$12 / month" },
    trial: { status: "inactive" },
    pending: true,
  },
};
