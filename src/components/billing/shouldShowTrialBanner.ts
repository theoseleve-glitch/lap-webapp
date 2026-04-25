import type { BillingTrialStatus } from "./BillingOverview";

const SOFT_BLOCK_THRESHOLD_DAYS = 2;

export function shouldShowTrialBanner(trial: BillingTrialStatus): boolean {
  return trial.status === "active" && trial.daysRemaining <= SOFT_BLOCK_THRESHOLD_DAYS;
}
