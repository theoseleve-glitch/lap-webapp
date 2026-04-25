import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { OnboardingStep3Install, type InstallLinks } from "./OnboardingStep3Install";

const LINKS: InstallLinks = {
  windows: "https://lap.example/download/windows",
  macos: "https://lap.example/download/macos",
  linux: "https://lap.example/download/linux",
  ios: "https://apps.apple.com/lap",
  android: "https://play.google.com/store/lap",
};

describe("OnboardingStep3Install", () => {
  it("renders a level-1 heading naming the install step", () => {
    render(<OnboardingStep3Install target="windows" installLinks={LINKS} onContinue={() => {}} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/install/i);
  });

  it("exposes an accessible region named 'Install step'", () => {
    render(<OnboardingStep3Install target="windows" installLinks={LINKS} onContinue={() => {}} />);
    expect(screen.getByRole("region", { name: /install step/i })).toBeInTheDocument();
  });

  it("renders the Windows download link when target is 'windows'", () => {
    render(<OnboardingStep3Install target="windows" installLinks={LINKS} onContinue={() => {}} />);
    expect(screen.getByRole("link", { name: /windows/i })).toHaveAttribute("href", LINKS.windows);
  });

  it("renders the macOS download link when target is 'macos'", () => {
    render(<OnboardingStep3Install target="macos" installLinks={LINKS} onContinue={() => {}} />);
    expect(screen.getByRole("link", { name: /macos|mac/i })).toHaveAttribute("href", LINKS.macos);
  });

  it("renders the Linux download link when target is 'linux'", () => {
    render(<OnboardingStep3Install target="linux" installLinks={LINKS} onContinue={() => {}} />);
    expect(screen.getByRole("link", { name: /linux/i })).toHaveAttribute("href", LINKS.linux);
  });

  it("renders the iOS download link when target is 'ios'", () => {
    render(<OnboardingStep3Install target="ios" installLinks={LINKS} onContinue={() => {}} />);
    expect(screen.getByRole("link", { name: /ios|iphone/i })).toHaveAttribute("href", LINKS.ios);
  });

  it("renders the Android download link when target is 'android'", () => {
    render(<OnboardingStep3Install target="android" installLinks={LINKS} onContinue={() => {}} />);
    expect(screen.getByRole("link", { name: /android/i })).toHaveAttribute("href", LINKS.android);
  });

  it("does not show the other platforms when target is recognised", () => {
    render(<OnboardingStep3Install target="windows" installLinks={LINKS} onContinue={() => {}} />);
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(1);
  });

  it("shows all five platform links when target is 'unknown'", () => {
    render(<OnboardingStep3Install target="unknown" installLinks={LINKS} onContinue={() => {}} />);
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(5);
  });

  it("renders 'Choose your platform' copy when target is 'unknown'", () => {
    render(<OnboardingStep3Install target="unknown" installLinks={LINKS} onContinue={() => {}} />);
    expect(screen.getByText(/choose your platform/i)).toBeInTheDocument();
  });

  it("renders a continue button", () => {
    render(<OnboardingStep3Install target="windows" installLinks={LINKS} onContinue={() => {}} />);
    expect(screen.getByRole("button", { name: /continue|next/i })).toBeInTheDocument();
  });

  it("calls onContinue when the continue button is clicked", () => {
    const onContinue = vi.fn();
    render(
      <OnboardingStep3Install target="windows" installLinks={LINKS} onContinue={onContinue} />,
    );
    fireEvent.click(screen.getByRole("button", { name: /continue|next/i }));
    expect(onContinue).toHaveBeenCalledTimes(1);
  });

  it("disables the continue button while pending", () => {
    render(
      <OnboardingStep3Install
        target="windows"
        installLinks={LINKS}
        onContinue={() => {}}
        pending
      />,
    );
    expect(screen.getByRole("button", { name: /continue|next/i })).toBeDisabled();
  });
});
