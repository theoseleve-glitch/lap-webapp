import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { TrackFilter } from "./TrackFilter";

const TRACKS = ["Imola", "Silverstone", "Spa", "Nürburgring", "Suzuka", "Monza"] as const;

function Demo({ initial }: { initial: string | null }) {
  const [value, setValue] = useState<string | null>(initial);
  return (
    <div className="flex flex-col gap-3 p-6">
      <TrackFilter tracks={TRACKS} value={value} onChange={setValue} />
      <p className="font-body text-chalk text-sm">
        Selected: <code className="font-mono text-pit-orange">{value ?? "(all tracks)"}</code>
      </p>
    </div>
  );
}

const meta: Meta<typeof Demo> = {
  title: "Timeline/TrackFilter",
  component: Demo,
  parameters: { layout: "padded" },
};

export default meta;

type Story = StoryObj<typeof Demo>;

export const AllTracks: Story = { args: { initial: null } };
export const Spa: Story = { args: { initial: "Spa" } };
export const Imola: Story = { args: { initial: "Imola" } };
