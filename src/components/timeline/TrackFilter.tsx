import { FilterChipGroup, type FilterChipOption } from "./FilterChipGroup";

const ALL_VALUE = "all";

export interface TrackFilterProps {
  tracks: readonly string[];
  value: string | null;
  onChange: (track: string | null) => void;
}

export function TrackFilter({ tracks, value, onChange }: TrackFilterProps) {
  const options: FilterChipOption<string>[] = [
    { value: ALL_VALUE, label: "All tracks" },
    ...tracks.map((track) => ({ value: track, label: track })),
  ];

  return (
    <FilterChipGroup
      label="Track"
      options={options}
      value={value ?? ALL_VALUE}
      onChange={(next) => onChange(next === ALL_VALUE ? null : next)}
    />
  );
}
