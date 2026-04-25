export interface OnboardingStep1WelcomeProps {
  onContinue: () => void;
  pending?: boolean;
  onSkip?: () => void;
}

export function OnboardingStep1Welcome({
  onContinue,
  pending = false,
  onSkip,
}: OnboardingStep1WelcomeProps) {
  return (
    <section
      aria-label="Welcome step"
      className="flex flex-col items-start gap-4 rounded border border-steel/30 bg-concrete p-8"
    >
      <h1 className="font-monument text-chalk text-2xl leading-[var(--lh-heading)] tracking-[var(--ls-display)]">
        Welcome to LAP
      </h1>
      <p className="font-body text-chalk text-base leading-[var(--lh-body)]">
        LAP turns your sim-racing telemetry into a personal coach. Drop a session, see where you
        lose time, and follow concrete drills that move your driving forward.
      </p>
      <p className="font-body text-muted text-sm leading-[var(--lh-body)]">
        Four short steps and you&apos;ll be reading your first lap.
      </p>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onContinue}
          disabled={pending}
          className="rounded border border-pit-orange/70 text-pit-orange px-4 py-2 font-telemetry text-[11px] uppercase tracking-[0.12em] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-pit-orange/10"
        >
          Get started
        </button>
        {onSkip && (
          <button
            type="button"
            onClick={onSkip}
            className="font-telemetry text-muted text-[11px] uppercase tracking-[0.12em] hover:text-chalk"
          >
            Skip onboarding
          </button>
        )}
      </div>
    </section>
  );
}
