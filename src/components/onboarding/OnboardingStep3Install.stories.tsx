import type { Meta, StoryObj } from "@storybook/react";
import { OnboardingStep3Install, type InstallLinks } from "./OnboardingStep3Install";

const LINKS: InstallLinks = {
  windows: "https://lap.example/download/windows",
  macos: "https://lap.example/download/macos",
  linux: "https://lap.example/download/linux",
  ios: "https://apps.apple.com/lap",
  android: "https://play.google.com/store/lap",
};

const meta: Meta<typeof OnboardingStep3Install> = {
  title: "Onboarding/Step3Install",
  component: OnboardingStep3Install,
  parameters: {
    layout: "padded",
  },
  args: {
    installLinks: LINKS,
    onContinue: () => {},
  },
};

export default meta;

type Story = StoryObj<typeof OnboardingStep3Install>;

export const Windows: Story = {
  args: { target: "windows" },
};

export const Macos: Story = {
  args: { target: "macos" },
};

export const Linux: Story = {
  args: { target: "linux" },
};

export const IOS: Story = {
  args: { target: "ios" },
};

export const Android: Story = {
  args: { target: "android" },
};

export const Unknown: Story = {
  args: { target: "unknown" },
};

export const Pending: Story = {
  args: { target: "windows", pending: true },
};
