import type { BillingTrialStatus } from "./BillingOverview";
import { shouldShowTrialBanner } from "./shouldShowTrialBanner";

export interface TrialExpiryBannerProps {
  trial: BillingTrialStatus;
  upgradeHref: string;
}

function copyForDays(daysRemaining: number): string {
  if (daysRemaining <= 0) return "Trial expires today";
  if (daysRemaining === 1) return "Trial expires tomorrow";
  return `Trial expires in ${daysRemaining} days`;
}

export function TrialExpiryBanner({ trial, upgradeHref }: TrialExpiryBannerProps) {
  if (!shouldShowTrialBanner(trial)) return null;

  // Narrowed: shouldShowTrialBanner only returns true for status="active".
  if (trial.status !== "active") return null;
  const message = copyForDays(trial.daysRemaining);

  return (
    <div
      role="status"
      aria-label="Trial expiry"
      aria-live="polite"
      data-banner-tone="warning"
      className="flex items-center justify-between gap-3 rounded border border-pit-orange/60 bg-concrete px-4 py-3"
    >
      <p className="font-body text-chalk text-sm leading-[var(--lh-body)]">
        {message} — expires {trial.expiresOn}.
      </p>
      <a
        href={upgradeHref}
        className="rounded border border-pit-orange/70 text-pit-orange px-3 py-1 font-telemetry text-[11px] uppercase tracking-[0.12em] hover:bg-pit-orange/10"
      >
        Upgrade
      </a>
    </div>
  );
}
