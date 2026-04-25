import type { Meta, StoryObj } from "@storybook/react";
import { SessionDetailShell } from "./SessionDetailShell";

const meta: Meta<typeof SessionDetailShell> = {
  title: "Session/SessionDetailShell",
  component: SessionDetailShell,
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof SessionDetailShell>;

export const Placeholder: Story = {
  args: {
    sessionId: "s_demo_42",
    subtitle: "Coming soon — Block D decomposition lands when the data hooks unblock.",
  },
};

export const WithCustomTitle: Story = {
  args: {
    sessionId: "s_imola_2026_04_25",
    title: "Imola GT3",
    subtitle: "iRacing · Ferrari 296 GT3 · 2026-04-25",
  },
};

export const WithActions: Story = {
  args: {
    sessionId: "s_imola_2026_04_25",
    title: "Imola GT3",
    subtitle: "iRacing · Ferrari 296 GT3 · 2026-04-25",
    actions: (
      <button
        type="button"
        className="rounded border border-pit-orange/70 text-pit-orange px-3 py-1 font-telemetry text-[11px] uppercase tracking-[0.12em] hover:bg-pit-orange/10"
      >
        Re-process
      </button>
    ),
  },
};

export const WithChildren: Story = {
  args: {
    sessionId: "s_imola_2026_04_25",
    title: "Imola GT3",
    children: (
      <div className="rounded border border-steel/30 bg-concrete p-5 font-body text-chalk text-sm">
        Tab content (Overview / Laps / Telemetry / Coaching) will render here.
      </div>
    ),
  },
};
