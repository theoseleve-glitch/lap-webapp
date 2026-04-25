import type { Meta, StoryObj } from "@storybook/react";
import { OnboardingGate } from "./OnboardingGate";
import { OnboardingProvider, useOnboarding } from "./OnboardingProvider";

function MarkCompleteButton() {
  const { complete, reset, completed } = useOnboarding();
  return (
    <div className="flex items-center gap-3">
      <span className="font-telemetry text-steel text-[11px] uppercase tracking-[0.12em]">
        completed: {String(completed)}
      </span>
      <button
        type="button"
        onClick={complete}
        className="rounded border border-acid-green/70 text-acid-green px-3 py-1 font-telemetry text-[11px] uppercase tracking-[0.12em]"
      >
        Mark complete
      </button>
      <button
        type="button"
        onClick={reset}
        className="rounded border border-safety-red/40 text-safety-red px-3 py-1 font-telemetry text-[11px] uppercase tracking-[0.12em]"
      >
        Reset
      </button>
    </div>
  );
}

const meta: Meta<typeof OnboardingGate> = {
  title: "Onboarding/OnboardingGate",
  component: OnboardingGate,
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof OnboardingGate>;

export const Interactive: Story = {
  render: () => (
    <OnboardingProvider storageKey="lap.onboarding-gate-storybook">
      <div className="flex flex-col gap-4">
        <MarkCompleteButton />
        <OnboardingGate
          fallback={
            <div className="rounded border border-acid-green/40 bg-concrete p-5 font-body text-chalk text-sm">
              Onboarding already completed — flow hidden.
            </div>
          }
        >
          <div className="rounded border border-pit-orange/40 bg-concrete p-5 font-body text-chalk text-sm">
            Onboarding flow goes here.
          </div>
        </OnboardingGate>
      </div>
    </OnboardingProvider>
  ),
};
