import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SettingsPage from "./page";

describe("SettingsPage", () => {
  it("renders a level-1 heading titled 'Settings'", () => {
    render(<SettingsPage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Settings");
  });

  it("renders a subtitle describing the settings surface", () => {
    render(<SettingsPage />);
    expect(screen.getByText(/profile, preferences, integrations, and data/i)).toBeInTheDocument();
  });

  it("renders the Settings tabs navigation", () => {
    render(<SettingsPage />);
    expect(screen.getByRole("navigation", { name: /settings tabs/i })).toBeInTheDocument();
  });

  it("renders the Profile panel by default (no searchParams)", () => {
    render(<SettingsPage />);
    expect(screen.getByRole("region", { name: /^profile$/i })).toBeInTheDocument();
  });

  it("renders the Preferences panel when ?tab=preferences", () => {
    render(<SettingsPage searchParams={{ tab: "preferences" }} />);
    expect(screen.getByRole("region", { name: /^preferences$/i })).toBeInTheDocument();
  });

  it("renders the Integrations panel when ?tab=integrations", () => {
    render(<SettingsPage searchParams={{ tab: "integrations" }} />);
    expect(screen.getByRole("region", { name: /^integrations$/i })).toBeInTheDocument();
  });

  it("renders the Data panel when ?tab=data", () => {
    render(<SettingsPage searchParams={{ tab: "data" }} />);
    expect(screen.getByRole("region", { name: /^data$/i })).toBeInTheDocument();
  });

  it("falls back to the Profile panel for unknown tab values", () => {
    render(<SettingsPage searchParams={{ tab: "bogus" }} />);
    expect(screen.getByRole("region", { name: /^profile$/i })).toBeInTheDocument();
  });
});
