import type { Meta, StoryObj } from "@storybook/react";
import { OnboardingStep1Welcome } from "./OnboardingStep1Welcome";

const meta: Meta<typeof OnboardingStep1Welcome> = {
  title: "Onboarding/Step1Welcome",
  component: OnboardingStep1Welcome,
  parameters: {
    layout: "padded",
  },
  args: {
    onContinue: () => {},
  },
};

export default meta;

type Story = StoryObj<typeof OnboardingStep1Welcome>;

export const Default: Story = {};

export const Pending: Story = {
  args: { pending: true },
};
