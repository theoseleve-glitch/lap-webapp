import type { InstallTarget, ResolvedInstallTarget } from "./detectInstallTarget";

export type InstallLinks = Record<ResolvedInstallTarget, string>;

export interface OnboardingStep3InstallProps {
  target: InstallTarget;
  installLinks: InstallLinks;
  onContinue: () => void;
  pending?: boolean;
  onSkip?: () => void;
}

const LABELS: Record<ResolvedInstallTarget, string> = {
  windows: "Download for Windows",
  macos: "Download for macOS",
  linux: "Download for Linux",
  ios: "Get the iOS app",
  android: "Get the Android app",
};

const ORDER: readonly ResolvedInstallTarget[] = [
  "windows",
  "macos",
  "linux",
  "ios",
  "android",
] as const;

function PlatformLink({ target, href }: { target: ResolvedInstallTarget; href: string }) {
  return (
    <a
      href={href}
      className="rounded border border-pit-orange/70 text-pit-orange px-4 py-2 font-telemetry text-[11px] uppercase tracking-[0.12em] hover:bg-pit-orange/10"
    >
      {LABELS[target]}
    </a>
  );
}

export function OnboardingStep3Install({
  target,
  installLinks,
  onContinue,
  pending = false,
  onSkip,
}: OnboardingStep3InstallProps) {
  const isUnknown = target === "unknown";

  return (
    <section
      aria-label="Install step"
      className="flex flex-col items-start gap-4 rounded border border-steel/30 bg-concrete p-8"
    >
      <h1 className="font-monument text-chalk text-2xl leading-[var(--lh-heading)] tracking-[var(--ls-display)]">
        Install LAP
      </h1>
      {isUnknown ? (
        <>
          <p className="font-body text-chalk text-base leading-[var(--lh-body)]">
            Choose your platform to grab the LAP installer.
          </p>
          <div className="flex flex-wrap gap-2">
            {ORDER.map((t) => (
              <PlatformLink key={t} target={t} href={installLinks[t]} />
            ))}
          </div>
        </>
      ) : (
        <>
          <p className="font-body text-chalk text-base leading-[var(--lh-body)]">
            We detected your platform. Grab the right LAP installer below.
          </p>
          <PlatformLink target={target} href={installLinks[target]} />
        </>
      )}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onContinue}
          disabled={pending}
          className="rounded border border-steel/50 text-chalk px-4 py-2 font-telemetry text-[11px] uppercase tracking-[0.12em] disabled:opacity-40 disabled:cursor-not-allowed hover:border-steel"
        >
          Continue
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
