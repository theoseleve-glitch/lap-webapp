import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { CarFilter } from "./CarFilter";

const CARS = [
  "Ferrari 296 GT3",
  "Porsche 992 GT3",
  "BMW M4 GT3",
  "McLaren 720S GT3",
  "Audi R8 LMS",
] as const;

function Demo({ initial }: { initial: string | null }) {
  const [value, setValue] = useState<string | null>(initial);
  return (
    <div className="flex flex-col gap-3 p-6">
      <CarFilter cars={CARS} value={value} onChange={setValue} />
      <p className="font-body text-chalk text-sm">
        Selected: <code className="font-mono text-pit-orange">{value ?? "(all cars)"}</code>
      </p>
    </div>
  );
}

const meta: Meta<typeof Demo> = {
  title: "Timeline/CarFilter",
  component: Demo,
  parameters: { layout: "padded" },
};

export default meta;

type Story = StoryObj<typeof Demo>;

export const AllCars: Story = { args: { initial: null } };
export const Ferrari: Story = { args: { initial: "Ferrari 296 GT3" } };
export const Porsche: Story = { args: { initial: "Porsche 992 GT3" } };
