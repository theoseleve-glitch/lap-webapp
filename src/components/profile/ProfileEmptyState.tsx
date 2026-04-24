export interface ProfileEmptyStateProps {
  onboardingHref: string;
}

export function ProfileEmptyState({ onboardingHref }: ProfileEmptyStateProps) {
  return (
    <section
      aria-label="Profile empty state"
      className="flex flex-col items-center gap-4 rounded border border-steel/30 bg-concrete p-10 text-center"
    >
      <h2 className="font-monument text-chalk text-xl leading-[var(--lh-heading)] tracking-[var(--ls-display)]">
        Your profile fills in as you drive
      </h2>
      <p className="font-body text-muted text-sm leading-[var(--lh-body)]">
        Walk through onboarding to upload your first session and unlock your skill map.
      </p>
      <a
        href={onboardingHref}
        className="rounded border border-pit-orange/70 text-pit-orange px-4 py-2 font-telemetry text-[11px] uppercase tracking-[0.12em] hover:bg-pit-orange/10"
      >
        Start onboarding
      </a>
    </section>
  );
}
