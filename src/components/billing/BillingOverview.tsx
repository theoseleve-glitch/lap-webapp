export interface BillingPlan {
  name: string;
  priceLabel?: string;
}

export type BillingTrialStatus =
  | { status: "active"; daysRemaining: number; expiresOn: string }
  | { status: "expired"; expiredOn: string }
  | { status: "inactive" };

export interface BillingOverviewProps {
  plan: BillingPlan;
  trial: BillingTrialStatus;
  onOpenBillingPortal: () => void;
  pending?: boolean;
}

type TrialTone = "neutral" | "warning" | "danger";

const TRIAL_TONE_BORDER: Record<TrialTone, string> = {
  neutral: "border-steel/20",
  warning: "border-pit-orange/60",
  danger: "border-safety-red/60",
};

function trialTone(trial: BillingTrialStatus): TrialTone {
  if (trial.status === "expired") return "danger";
  if (trial.status === "active" && trial.daysRemaining <= 2) return "warning";
  return "neutral";
}

function TrialBody({ trial }: { trial: BillingTrialStatus }) {
  switch (trial.status) {
    case "active":
      return (
        <>
          <p className="font-body text-chalk text-sm leading-[var(--lh-body)]">
            {trial.daysRemaining} days remaining
          </p>
          <p className="font-telemetry text-steel text-[11px] uppercase tracking-[0.12em]">
            Expires {trial.expiresOn}
          </p>
        </>
      );
    case "expired":
      return (
        <>
          <p className="font-body text-chalk text-sm leading-[var(--lh-body)]">Trial expired</p>
          <p className="font-telemetry text-steel text-[11px] uppercase tracking-[0.12em]">
            Expired {trial.expiredOn}
          </p>
        </>
      );
    case "inactive":
      return (
        <p className="font-body text-muted text-sm leading-[var(--lh-body)]">No active trial.</p>
      );
  }
}

export function BillingOverview({
  plan,
  trial,
  onOpenBillingPortal,
  pending = false,
}: BillingOverviewProps) {
  const tone = trialTone(trial);

  return (
    <section aria-label="Billing overview" className="flex flex-col gap-4">
      <section
        aria-label="Current plan"
        className="flex flex-col gap-2 rounded border border-steel/30 bg-concrete p-5"
      >
        <h2 className="font-monument text-chalk text-lg leading-[var(--lh-heading)] tracking-[var(--ls-display)]">
          Current plan
        </h2>
        <p className="font-body text-chalk text-sm leading-[var(--lh-body)]">{plan.name}</p>
        {plan.priceLabel && (
          <p className="font-telemetry text-steel text-[11px] uppercase tracking-[0.12em]">
            {plan.priceLabel}
          </p>
        )}
      </section>

      <section
        aria-label="Trial status"
        data-trial-tone={tone}
        className={`flex flex-col gap-2 rounded border bg-concrete p-5 ${TRIAL_TONE_BORDER[tone]}`}
      >
        <h2 className="font-monument text-chalk text-lg leading-[var(--lh-heading)] tracking-[var(--ls-display)]">
          Trial status
        </h2>
        <TrialBody trial={trial} />
      </section>

      <button
        type="button"
        onClick={onOpenBillingPortal}
        disabled={pending}
        className="self-start rounded border border-pit-orange/70 text-pit-orange px-4 py-2 font-telemetry text-[11px] uppercase tracking-[0.12em] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-pit-orange/10"
      >
        Open billing portal
      </button>
    </section>
  );
}
