import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { OnboardingStep1Welcome } from "./OnboardingStep1Welcome";

describe("OnboardingStep1Welcome", () => {
  it("renders a level-1 heading welcoming the new user", () => {
    render(<OnboardingStep1Welcome onContinue={() => {}} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/welcome/i);
  });

  it("mentions LAP in the welcome copy", () => {
    render(<OnboardingStep1Welcome onContinue={() => {}} />);
    expect(screen.getAllByText(/LAP/).length).toBeGreaterThan(0);
  });

  it("explains what LAP does (telemetry / coaching / driving)", () => {
    render(<OnboardingStep1Welcome onContinue={() => {}} />);
    expect(screen.getByText(/telemetry|coaching|driving|sim/i)).toBeInTheDocument();
  });

  it("renders a continue button", () => {
    render(<OnboardingStep1Welcome onContinue={() => {}} />);
    expect(screen.getByRole("button", { name: /get started|continue|next/i })).toBeInTheDocument();
  });

  it("calls onContinue when the continue button is clicked", () => {
    const onContinue = vi.fn();
    render(<OnboardingStep1Welcome onContinue={onContinue} />);
    fireEvent.click(screen.getByRole("button", { name: /get started|continue|next/i }));
    expect(onContinue).toHaveBeenCalledTimes(1);
  });

  it("exposes an accessible region named 'Welcome step'", () => {
    render(<OnboardingStep1Welcome onContinue={() => {}} />);
    expect(screen.getByRole("region", { name: /welcome step/i })).toBeInTheDocument();
  });

  it("disables the continue button while pending", () => {
    render(<OnboardingStep1Welcome onContinue={() => {}} pending />);
    expect(screen.getByRole("button", { name: /get started|continue|next/i })).toBeDisabled();
  });

  it("does not render a skip button when onSkip is omitted", () => {
    render(<OnboardingStep1Welcome onContinue={() => {}} />);
    expect(screen.queryByRole("button", { name: /skip/i })).toBeNull();
  });

  it("renders a skip button when onSkip is provided", () => {
    render(<OnboardingStep1Welcome onContinue={() => {}} onSkip={() => {}} />);
    expect(screen.getByRole("button", { name: /skip/i })).toBeInTheDocument();
  });

  it("fires onSkip when the skip button is clicked", () => {
    const onSkip = vi.fn();
    render(<OnboardingStep1Welcome onContinue={() => {}} onSkip={onSkip} />);
    fireEvent.click(screen.getByRole("button", { name: /skip/i }));
    expect(onSkip).toHaveBeenCalledTimes(1);
  });
});
