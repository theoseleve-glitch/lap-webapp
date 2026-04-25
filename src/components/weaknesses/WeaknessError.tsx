export interface WeaknessErrorProps {
  message?: string;
  pending?: boolean;
  onRetry: () => void;
}

const DEFAULT_MESSAGE = "We couldn't load this weakness. Try again in a moment.";

export function WeaknessError({
  message = DEFAULT_MESSAGE,
  pending = false,
  onRetry,
}: WeaknessErrorProps) {
  return (
    <div
      role="alert"
      className="flex flex-col items-start gap-3 rounded border border-safety-red/40 bg-concrete p-5"
    >
      <p className="font-body text-chalk text-sm leading-[var(--lh-body)]">{message}</p>
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
