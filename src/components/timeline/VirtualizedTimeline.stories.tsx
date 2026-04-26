import type { Meta, StoryObj } from "@storybook/react";
import { VirtualizedTimeline, type TimelineRow } from "./VirtualizedTimeline";

const TONES = ["success", "warning", "info", "neutral"] as const;

function makeEntries(count: number): TimelineRow[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `t${i + 1}`,
    title: `Session ${i + 1} — Imola GT3`,
    date: `2026-04-${String((i % 28) + 1).padStart(2, "0")}`,
    href: `/sessions/s${i + 1}`,
    subtitle: i % 3 === 0 ? "iRacing · Ferrari 296 GT3" : undefined,
    tags: i % 4 === 0 ? ["sim", "race"] : ["practice"],
    badges:
      i % 5 === 0
        ? [{ label: "PB", tone: "success" as const }]
        : i % 7 === 0
          ? [{ label: "INV", tone: "warning" as const }]
          : [
              {
                label: `${(i % 3) + 1} new`,
                tone: TONES[i % TONES.length] ?? "neutral",
              },
            ],
  }));
}

const meta: Meta<typeof VirtualizedTimeline> = {
  title: "Timeline/VirtualizedTimeline",
  component: VirtualizedTimeline,
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div style={{ height: 720 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof VirtualizedTimeline>;

export const ShortList: Story = { args: { entries: makeEntries(8) } };
export const HundredEntries: Story = { args: { entries: makeEntries(100) } };
export const ThousandEntries: Story = { args: { entries: makeEntries(1000) } };
export const Empty: Story = { args: { entries: [] } };
