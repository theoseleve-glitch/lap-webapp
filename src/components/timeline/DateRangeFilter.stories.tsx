import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { DateRangeFilter, type DateRange } from "./DateRangeFilter";

const meta: Meta<typeof DateRangeFilter> = {
  title: "Timeline/DateRangeFilter",
  component: DateRangeFilter,
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof DateRangeFilter>;

function Controlled({ initial }: { initial: DateRange }) {
  const [value, setValue] = useState<DateRange>(initial);
  return <DateRangeFilter label="Date range" value={value} onChange={setValue} />;
}

export const Empty: Story = {
  render: () => <Controlled initial={{ start: "", end: "" }} />,
};

export const PartialRange: Story = {
  render: () => <Controlled initial={{ start: "2026-04-01", end: "" }} />,
};

export const FullRange: Story = {
  render: () => <Controlled initial={{ start: "2026-04-01", end: "2026-04-24" }} />,
};

export const InvalidRange: Story = {
  render: () => <Controlled initial={{ start: "2026-04-24", end: "2026-04-01" }} />,
};
