export interface FilterChipOption<V extends string> {
  value: V;
  label: string;
}

export interface FilterChipGroupProps<V extends string> {
  label: string;
  options: readonly FilterChipOption<V>[];
  value: V;
  onChange: (value: V) => void;
}

export function FilterChipGroup<V extends string>({
  label,
  options,
  value,
  onChange,
}: FilterChipGroupProps<V>) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className="flex flex-wrap gap-2 font-telemetry text-[11px] uppercase tracking-[0.12em]"
    >
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => {
              if (!selected) onChange(option.value);
            }}
            className={
              selected
                ? "rounded border border-pit-orange/70 bg-pit-orange/10 text-pit-orange px-3 py-1"
                : "rounded border border-steel/40 text-steel px-3 py-1 hover:text-chalk hover:border-steel"
            }
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
