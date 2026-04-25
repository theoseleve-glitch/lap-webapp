import type { Meta, StoryObj } from "@storybook/react";
import { OnboardingProvider, useOnboarding } from "./OnboardingProvider";

function StateInspector() {
  const o = useOnboarding();
  return (
    <div className="flex flex-col gap-3 rounded border border-steel/30 bg-concrete p-5">
      <p className="font-monument text-chalk text-lg">Onboarding state</p>
      <p className="font-body text-chalk text-sm">currentStep: {o.currentStep}</p>
      <p className="font-body text-chalk text-sm">completed: {String(o.completed)}</p>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={o.back}
          className="rounded border border-steel/50 text-chalk px-3 py-1 font-telemetry text-[11px] uppercase"
        >
          Back
        </button>
        <button
          onClick={o.next}
          className="rounded border border-pit-orange/70 text-pit-orange px-3 py-1 font-telemetry text-[11px] uppercase"
        >
          Next
        </button>
        <button
          onClick={() => o.goToStep(3)}
          className="rounded border border-steel/50 text-chalk px-3 py-1 font-telemetry text-[11px] uppercase"
        >
          Go to step 3
        </button>
        <button
          onClick={o.complete}
          className="rounded border border-acid-green/70 text-acid-green px-3 py-1 font-telemetry text-[11px] uppercase"
        >
          Complete
        </button>
        <button
          onClick={o.reset}
          className="rounded border border-safety-red/40 text-safety-red px-3 py-1 font-telemetry text-[11px] uppercase"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

const meta: Meta<typeof OnboardingProvider> = {
  title: "Onboarding/OnboardingProvider",
  component: OnboardingProvider,
  parameters: {
    layout: "padded",
  },
  args: {
    storageKey: "lap.onboarding-storybook",
  },
};

export default meta;

type Story = StoryObj<typeof OnboardingProvider>;

export const Interactive: Story = {
  render: (args) => (
    <OnboardingProvider {...args}>
      <StateInspector />
    </OnboardingProvider>
  ),
};
