import type { Meta, StoryObj } from "@storybook/react";
import { SkillRadarChart } from "./SkillRadarChart";

const meta: Meta<typeof SkillRadarChart> = {
  title: "Profile/SkillRadarChart",
  component: SkillRadarChart,
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof SkillRadarChart>;

const TEN_DIMENSIONS = [
  { label: "Braking", value: 72 },
  { label: "Trail-braking", value: 64 },
  { label: "Apex precision", value: 80 },
  { label: "Throttle modulation", value: 58 },
  { label: "Consistency", value: 88 },
  { label: "Tyre management", value: 66 },
  { label: "Race craft", value: 54 },
  { label: "Qualifying pace", value: 78 },
  { label: "Adaptability", value: 62 },
  { label: "Recovery", value: 70 },
];

export const TenDimensions: Story = {
  args: { dimensions: TEN_DIMENSIONS },
};

export const Novice: Story = {
  args: {
    dimensions: TEN_DIMENSIONS.map((d) => ({ ...d, value: 25 + (d.value % 10) })),
    title: "Early-session skill radar",
  },
};

export const Maxed: Story = {
  args: {
    dimensions: TEN_DIMENSIONS.map((d) => ({ ...d, value: 100 })),
  },
};

export const Empty: Story = {
  args: { dimensions: [] },
};
