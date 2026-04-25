import type { Meta, StoryObj } from "@storybook/react";
import { PageErrorBoundary } from "./PageErrorBoundary";

function Bomb({ shouldThrow = false }: { shouldThrow?: boolean }) {
  if (shouldThrow) {
    throw new Error("Storybook bomb");
  }
  return (
    <div className="rounded border border-steel/30 bg-concrete p-5 font-body text-chalk text-sm">
      App page would render here.
    </div>
  );
}

const meta: Meta<typeof PageErrorBoundary> = {
  title: "App/PageErrorBoundary",
  component: PageErrorBoundary,
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof PageErrorBoundary>;

export const HealthyChild: Story = {
  args: {
    onError: () => undefined,
    children: <Bomb />,
  },
};

export const ChildThrows: Story = {
  args: {
    onError: () => undefined,
    children: <Bomb shouldThrow />,
  },
};

export const CustomFallback: Story = {
  args: {
    onError: () => undefined,
    fallback: (
      <div className="rounded border border-pit-orange/40 bg-concrete p-5 font-body text-pit-orange text-sm">
        Custom fallback supplied via prop.
      </div>
    ),
    children: <Bomb shouldThrow />,
  },
};
