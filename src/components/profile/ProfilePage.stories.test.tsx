import type { StoryObj } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import meta, { Loaded, Loading, Empty } from "./ProfilePage.stories";

const invoke = (story: StoryObj) => {
  if (typeof story.render !== "function") {
    throw new Error("story has no render function");
  }
  return story.render({}, { loaded: {}, args: {} } as never);
};

describe("ProfilePage stories", () => {
  it("registers under the Profile/ProfilePage Storybook title", () => {
    expect(meta.title).toBe("Profile/ProfilePage");
  });

  it("exposes exactly three data-state stories: Loaded, Loading, Empty", () => {
    expect(typeof Loaded.render).toBe("function");
    expect(typeof Loading.render).toBe("function");
    expect(typeof Empty.render).toBe("function");
  });

  it("Loaded renders the driver score hero region", () => {
    render(<>{invoke(Loaded)}</>);
    expect(screen.getByRole("region", { name: /driver score/i })).toBeInTheDocument();
  });

  it("Loaded renders the skill radar chart", () => {
    render(<>{invoke(Loaded)}</>);
    expect(screen.getByRole("img", { name: /skill radar/i })).toBeInTheDocument();
  });

  it("Loaded renders the readiness gauge", () => {
    render(<>{invoke(Loaded)}</>);
    expect(screen.getByRole("link", { name: /readiness/i })).toBeInTheDocument();
  });

  it("Loading renders the profile loading skeleton", () => {
    render(<>{invoke(Loading)}</>);
    expect(screen.getByRole("status", { name: /loading profile/i })).toBeInTheDocument();
  });

  it("Empty renders the profile empty-state region", () => {
    render(<>{invoke(Empty)}</>);
    expect(screen.getByRole("region", { name: /profile empty state/i })).toBeInTheDocument();
  });

  it("Empty exposes an onboarding CTA link", () => {
    render(<>{invoke(Empty)}</>);
    expect(screen.getByRole("link", { name: /onboarding/i })).toBeInTheDocument();
  });
});
