export type SessionTabErrorVariant = "overview" | "laps" | "telemetry" | "coaching";

export interface SessionTabErrorProps {
  variant: SessionTabErrorVariant;
  message?: string;
  pending?: boolean;
  onRetry: () => void;
}

const DEFAULT_MESSAGE: Record<SessionTabErrorVariant, string> = {
  overview: "We couldn't load this session's overview. Try again in a moment.",
  laps: "We couldn't load this session's laps. Try again in a moment.",
  telemetry: "We couldn't load this session's telemetry. Try again in a moment.",
  coaching: "We couldn't load this session's coaching insights. Try again in a moment.",
};

export function SessionTabError({
  variant,
  message,
  pending = false,
  onRetry,
}: SessionTabErrorProps) {
  return (
    <div
      role="alert"
      className="flex flex-col items-start gap-3 rounded border border-safety-red/40 bg-concrete p-5"
    >
      <p className="font-body text-chalk text-sm leading-[var(--lh-body)]">
        {message ?? DEFAULT_MESSAGE[variant]}
      </p>
      <button
        type="button"
        onClick={onRetry}
        disabled={pending}
        className="rounded border border-pit-orange/70 text-pit-orange px-3 py-1 font-telemetry text-[11px] uppercase tracking-[0.12em] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-pit-orange/10"
      >
        Retry
      </button>
    </div>
  );
}
