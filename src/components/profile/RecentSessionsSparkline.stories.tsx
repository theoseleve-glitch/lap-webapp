import type { Meta, StoryObj } from "@storybook/react";
import { RecentSessionsSparkline } from "./RecentSessionsSparkline";

const meta: Meta<typeof RecentSessionsSparkline> = {
  title: "Profile/RecentSessionsSparkline",
  component: RecentSessionsSparkline,
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof RecentSessionsSparkline>;

const TWENTY_FIVE = [
  92.4, 92.1, 91.9, 92.0, 91.6, 91.4, 91.2, 91.5, 91.1, 90.9, 90.8, 91.0, 90.6, 90.4, 90.7, 90.3,
  90.1, 90.2, 89.9, 89.8, 89.7, 89.5, 89.6, 89.3, 89.1,
];

export const Improving: Story = {
  args: { lapTimes: TWENTY_FIVE },
};

export const CustomLabel: Story = {
  args: { lapTimes: TWENTY_FIVE, label: "Best laps (last 20)" },
};

export const ShortSeries: Story = {
  args: { lapTimes: TWENTY_FIVE.slice(0, 5) },
};

export const Flat: Story = {
  args: { lapTimes: Array(20).fill(91.5) },
};

export const CustomMax: Story = {
  args: { lapTimes: TWENTY_FIVE, max: 10 },
};

export const SingleLap: Story = {
  args: { lapTimes: [91.2] },
};

export const Empty: Story = {
  args: { lapTimes: [] },
};
