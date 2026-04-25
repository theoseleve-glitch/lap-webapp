import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { parseSettingsTab, SettingsTabs } from "./SettingsTabs";

describe("parseSettingsTab", () => {
  it("returns 'profile' by default when value is undefined", () => {
    expect(parseSettingsTab(undefined)).toBe("profile");
  });

  it("returns 'profile' for the 'profile' value", () => {
    expect(parseSettingsTab("profile")).toBe("profile");
  });

  it("returns 'preferences' for the 'preferences' value", () => {
    expect(parseSettingsTab("preferences")).toBe("preferences");
  });

  it("returns 'integrations' for the 'integrations' value", () => {
    expect(parseSettingsTab("integrations")).toBe("integrations");
  });

  it("returns 'data' for the 'data' value", () => {
    expect(parseSettingsTab("data")).toBe("data");
  });

  it("falls back to 'profile' for unknown values", () => {
    expect(parseSettingsTab("unknown")).toBe("profile");
    expect(parseSettingsTab("")).toBe("profile");
    expect(parseSettingsTab("PROFILE")).toBe("profile");
  });
});

describe("SettingsTabs", () => {
  it("renders a navigation landmark labelled 'Settings tabs'", () => {
    render(<SettingsTabs activeTab="profile" />);
    expect(screen.getByRole("navigation", { name: /settings tabs/i })).toBeInTheDocument();
  });

  it("renders a Profile tab linking to ?tab=profile", () => {
    render(<SettingsTabs activeTab="profile" />);
    expect(screen.getByRole("link", { name: /^profile$/i })).toHaveAttribute(
      "href",
      "?tab=profile",
    );
  });

  it("renders a Preferences tab linking to ?tab=preferences", () => {
    render(<SettingsTabs activeTab="profile" />);
    expect(screen.getByRole("link", { name: /^preferences$/i })).toHaveAttribute(
      "href",
      "?tab=preferences",
    );
  });

  it("renders an Integrations tab linking to ?tab=integrations", () => {
    render(<SettingsTabs activeTab="profile" />);
    expect(screen.getByRole("link", { name: /^integrations$/i })).toHaveAttribute(
      "href",
      "?tab=integrations",
    );
  });

  it("renders a Data tab linking to ?tab=data", () => {
    render(<SettingsTabs activeTab="profile" />);
    expect(screen.getByRole("link", { name: /^data$/i })).toHaveAttribute("href", "?tab=data");
  });

  it("marks the active tab with aria-current='page'", () => {
    render(<SettingsTabs activeTab="preferences" />);
    expect(screen.getByRole("link", { name: /^preferences$/i })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("does not mark inactive tabs with aria-current", () => {
    render(<SettingsTabs activeTab="preferences" />);
    expect(screen.getByRole("link", { name: /^profile$/i })).not.toHaveAttribute("aria-current");
    expect(screen.getByRole("link", { name: /^integrations$/i })).not.toHaveAttribute(
      "aria-current",
    );
    expect(screen.getByRole("link", { name: /^data$/i })).not.toHaveAttribute("aria-current");
  });

  it("renders the Profile panel when activeTab is 'profile'", () => {
    render(<SettingsTabs activeTab="profile" />);
    expect(screen.getByRole("region", { name: /^profile$/i })).toBeInTheDocument();
  });

  it("renders the Preferences panel when activeTab is 'preferences'", () => {
    render(<SettingsTabs activeTab="preferences" />);
    expect(screen.getByRole("region", { name: /^preferences$/i })).toBeInTheDocument();
  });

  it("renders the Integrations panel when activeTab is 'integrations'", () => {
    render(<SettingsTabs activeTab="integrations" />);
    expect(screen.getByRole("region", { name: /^integrations$/i })).toBeInTheDocument();
  });

  it("renders the Data panel when activeTab is 'data'", () => {
    render(<SettingsTabs activeTab="data" />);
    expect(screen.getByRole("region", { name: /^data$/i })).toBeInTheDocument();
  });

  it("renders only the active panel (not all four)", () => {
    render(<SettingsTabs activeTab="profile" />);
    expect(screen.getByRole("region", { name: /^profile$/i })).toBeInTheDocument();
    expect(screen.queryByRole("region", { name: /^preferences$/i })).toBeNull();
    expect(screen.queryByRole("region", { name: /^integrations$/i })).toBeNull();
    expect(screen.queryByRole("region", { name: /^data$/i })).toBeNull();
  });

  it("renders the four tabs in the documented order", () => {
    render(<SettingsTabs activeTab="profile" />);
    const nav = screen.getByRole("navigation", { name: /settings tabs/i });
    const links = within(nav).getAllByRole("link");
    expect(links.map((a) => a.textContent)).toEqual([
      "Profile",
      "Preferences",
      "Integrations",
      "Data",
    ]);
  });
});
