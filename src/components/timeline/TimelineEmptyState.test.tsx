import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TimelineEmptyState } from "./TimelineEmptyState";

describe("TimelineEmptyState", () => {
  it("renders the 'No sessions yet' headline", () => {
    render(<TimelineEmptyState uploadHref="/upload" />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(/no sessions yet/i);
  });

  it("renders the 'Upload your first' supporting copy from the sprint brief", () => {
    render(<TimelineEmptyState uploadHref="/upload" />);
    expect(screen.getByText(/upload your first/i)).toBeInTheDocument();
  });

  it("renders an upload link that points at uploadHref", () => {
    render(<TimelineEmptyState uploadHref="/upload" />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/upload");
  });

  it("gives the link an actionable label for assistive tech", () => {
    render(<TimelineEmptyState uploadHref="/upload" />);
    expect(screen.getByRole("link")).toHaveAccessibleName(/upload/i);
  });

  it("exposes an accessible region named 'Timeline empty state'", () => {
    render(<TimelineEmptyState uploadHref="/upload" />);
    expect(screen.getByRole("region", { name: /timeline empty state/i })).toBeInTheDocument();
  });
});
