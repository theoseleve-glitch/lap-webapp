import { FilterChipGroup, type FilterChipOption } from "./FilterChipGroup";

const ALL_VALUE = "all";

export interface CarFilterProps {
  cars: readonly string[];
  value: string | null;
  onChange: (car: string | null) => void;
}

export function CarFilter({ cars, value, onChange }: CarFilterProps) {
  const options: FilterChipOption<string>[] = [
    { value: ALL_VALUE, label: "All cars" },
    ...cars.map((car) => ({ value: car, label: car })),
  ];

  return (
    <FilterChipGroup
      label="Car"
      options={options}
      value={value ?? ALL_VALUE}
      onChange={(next) => onChange(next === ALL_VALUE ? null : next)}
      layout="scroll"
    />
  );
}
