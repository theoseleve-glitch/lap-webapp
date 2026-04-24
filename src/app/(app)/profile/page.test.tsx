import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ProfilePage from "./page";

describe("ProfilePage", () => {
  it("renders a level-1 heading titled 'Profile'", () => {
    render(<ProfilePage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Profile");
  });

  it("renders a subtitle describing the driver profile surface", () => {
    render(<ProfilePage />);
    expect(screen.getByText(/driver profile/i)).toBeInTheDocument();
  });
});
