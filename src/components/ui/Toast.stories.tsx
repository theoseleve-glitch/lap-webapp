import type { Meta, StoryObj } from "@storybook/react";
import { ToastProvider, useToast, type ToastIntent } from "./Toast";

function Demo({ intent }: { intent: ToastIntent }) {
  const { show } = useToast();
  return (
    <button
      type="button"
      onClick={() =>
        show({
          intent,
          title:
            intent === "success"
              ? "Prescription accepted"
              : intent === "error"
                ? "Network error"
                : "Heads up",
          description:
            intent === "success"
              ? "Drill scheduled for next session."
              : intent === "error"
                ? "We couldn't reach the server. Try again."
                : "Some informational context.",
        })
      }
      className="rounded border border-pit-orange/70 text-pit-orange px-3 py-1 font-telemetry text-[11px] uppercase tracking-[0.12em] hover:bg-pit-orange/10"
    >
      Fire {intent} toast
    </button>
  );
}

function Wrapper({ intent }: { intent: ToastIntent }) {
  return (
    <ToastProvider>
      <div className="flex flex-col gap-3 p-8">
        <p className="font-body text-chalk text-sm">Click the button to fire a toast.</p>
        <Demo intent={intent} />
      </div>
    </ToastProvider>
  );
}

const meta: Meta<typeof Wrapper> = {
  title: "UI/Toast",
  component: Wrapper,
  parameters: { layout: "padded" },
};

export default meta;

type Story = StoryObj<typeof Wrapper>;

export const Success: Story = { args: { intent: "success" } };
export const Error: Story = { args: { intent: "error" } };
export const Info: Story = { args: { intent: "info" } };
