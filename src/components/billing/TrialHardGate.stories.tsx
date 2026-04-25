import type { Meta, StoryObj } from "@storybook/react";
import { TrialHardGate } from "./TrialHardGate";

const meta: Meta<typeof TrialHardGate> = {
  title: "Billing/TrialHardGate",
  component: TrialHardGate,
  parameters: {
    layout: "padded",
  },
  args: {
    checkoutHref: "/billing",
    children: (
      <div className="rounded border border-steel/30 bg-concrete p-5 font-body text-chalk text-sm">
        App pages would render here.
      </div>
    ),
  },
};

export default meta;

type Story = StoryObj<typeof TrialHardGate>;

export const Expired: Story = {
  args: {
    trial: { status: "expired", expiredOn: "Apr 1, 2026" },
  },
};

export const ActiveTrialPasses: Story = {
  args: {
    trial: { status: "active", daysRemaining: 7, expiresOn: "Apr 30, 2026" },
  },
};

export const PaidPlanPasses: Story = {
  args: {
    trial: { status: "inactive" },
  },
};
