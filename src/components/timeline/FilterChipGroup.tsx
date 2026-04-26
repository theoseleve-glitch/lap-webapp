export interface FilterChipOption<V extends string> {
  value: V;
  label: string;
}

export type FilterChipLayout = "wrap" | "scroll";

export interface FilterChipGroupProps<V extends string> {
  label: string;
  options: readonly FilterChipOption<V>[];
  value: V;
  onChange: (value: V) => void;
  /**
   * "wrap" (default) lets chips wrap onto multiple lines on narrow viewports.
   * "scroll" pins them to a single horizontally-scrollable row — useful when
   * the option count would produce a tall multi-line wrap on mobile (T133).
   */
  layout?: FilterChipLayout;
}

export function FilterChipGroup<V extends string>({
  label,
  options,
  value,
  onChange,
  layout = "wrap",
}: FilterChipGroupProps<V>) {
  const containerClass =
    layout === "scroll"
      ? "flex gap-2 overflow-x-auto font-telemetry text-[11px] uppercase tracking-[0.12em]"
      : "flex flex-wrap gap-2 font-telemetry text-[11px] uppercase tracking-[0.12em]";

  return (
    <div role="radiogroup" aria-label={label} className={containerClass}>
      {options.map((option) => {
        const selected = option.value === value;
        const baseChip =
          "rounded border px-3 py-1 whitespace-nowrap " +
          (selected
            ? "border-pit-orange/70 bg-pit-orange/10 text-pit-orange"
            : "border-steel/40 text-steel hover:text-chalk hover:border-steel");
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => {
              if (!selected) onChange(option.value);
            }}
            className={baseChip}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
