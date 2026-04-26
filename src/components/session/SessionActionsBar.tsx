export type SessionAction = "delete" | "reprocess" | "share";

export interface SessionActionsBarProps {
  onDelete?: () => void;
  onReprocess?: () => void;
  onShare?: () => void;
  pendingAction?: SessionAction;
}

interface ActionButtonProps {
  label: string;
  ariaLabel: string;
  onClick?: () => void;
  isPending: boolean;
  variant: "neutral" | "destructive";
}

function ActionButton({ label, ariaLabel, onClick, isPending, variant }: ActionButtonProps) {
  const disabled = isPending || !onClick;
  const tone =
    variant === "destructive"
      ? "border-red-500/70 text-red-400 hover:border-red-500"
      : "border-steel/40 text-steel hover:border-steel/70";
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-busy={isPending}
      aria-label={ariaLabel}
      className={`rounded border px-3 py-1 font-telemetry text-[11px] uppercase tracking-[0.12em] disabled:cursor-not-allowed disabled:opacity-50 ${tone}`}
    >
      {label}
    </button>
  );
}

export function SessionActionsBar({
  onDelete,
  onReprocess,
  onShare,
  pendingAction,
}: SessionActionsBarProps) {
  return (
    <div
      role="toolbar"
      aria-label="Session actions"
      className="flex flex-wrap items-center gap-2 rounded border border-steel/30 bg-concrete p-3"
    >
      <ActionButton
        label="Delete"
        ariaLabel="Delete session"
        onClick={onDelete}
        isPending={pendingAction === "delete"}
        variant="destructive"
      />
      <ActionButton
        label="Re-process"
        ariaLabel="Re-process session"
        onClick={onReprocess}
        isPending={pendingAction === "reprocess"}
        variant="neutral"
      />
      <ActionButton
        label="Share"
        ariaLabel="Share session"
        onClick={onShare}
        isPending={pendingAction === "share"}
        variant="neutral"
      />
    </div>
  );
}
