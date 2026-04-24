import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { FilterChipGroup } from "./FilterChipGroup";

const meta: Meta<typeof FilterChipGroup> = {
  title: "Timeline/FilterChipGroup",
  component: FilterChipGroup,
  parameters: {
    layout: "padded",
  },
};

export default meta;

type SourceValue = "all" | "sim" | "real";
type Story = StoryObj<typeof FilterChipGroup<SourceValue>>;

const SOURCE_OPTIONS = [
  { value: "all" as const, label: "All sources" },
  { value: "sim" as const, label: "Sim" },
  { value: "real" as const, label: "Real" },
];

function SourceFilter({ initial }: { initial: SourceValue }) {
  const [value, setValue] = useState<SourceValue>(initial);
  return (
    <FilterChipGroup<SourceValue>
      label="Source"
      options={SOURCE_OPTIONS}
      value={value}
      onChange={setValue}
    />
  );
}

export const AllSelected: Story = {
  render: () => <SourceFilter initial="all" />,
};

export const SimSelected: Story = {
  render: () => <SourceFilter initial="sim" />,
};

export const RealSelected: Story = {
  render: () => <SourceFilter initial="real" />,
};
