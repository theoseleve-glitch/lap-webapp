"use client";

import { BillingOverview, type BillingPlan, type BillingTrialStatus } from "./BillingOverview";

const PLACEHOLDER_PLAN: BillingPlan = { name: "—" };
const PLACEHOLDER_TRIAL: BillingTrialStatus = { status: "inactive" };

export function BillingPageClient() {
  // T218 will replace placeholders with hook-fetched data and wire the portal mutation.
  return (
    <BillingOverview
      plan={PLACEHOLDER_PLAN}
      trial={PLACEHOLDER_TRIAL}
      onOpenBillingPortal={() => {}}
    />
  );
}
