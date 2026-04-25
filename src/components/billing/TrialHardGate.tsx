import type { ReactNode } from "react";
import type { BillingTrialStatus } from "./BillingOverview";

export interface TrialHardGateProps {
  trial: BillingTrialStatus;
  checkoutHref: string;
  children: ReactNode;
}

export function TrialHardGate({ trial, checkoutHref, children }: TrialHardGateProps) {
  if (trial.status !== "expired") {
    return <>{children}</>;
  }

  return (
    <section
      aria-label="Trial expired"
      className="flex flex-col items-center gap-4 rounded border border-safety-red/40 bg-concrete p-10 text-center"
    >
      <h1 className="font-monument text-chalk text-2xl leading-[var(--lh-heading)] tracking-[var(--ls-display)]">
        Trial expired
      </h1>
      <p className="font-body text-chalk text-base leading-[var(--lh-body)]">
        Your LAP trial ended on {trial.expiredOn}. Upgrade to keep access to your sessions, profile,
        and coaching.
      </p>
      <a
        href={checkoutHref}
        className="rounded border border-pit-orange/70 text-pit-orange px-4 py-2 font-telemetry text-[11px] uppercase tracking-[0.12em] hover:bg-pit-orange/10"
      >
        Upgrade to continue
      </a>
    </section>
  );
}
