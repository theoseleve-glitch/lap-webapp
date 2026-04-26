import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SessionTabSuspense } from "./SessionTabSuspense";
import type { SessionTabSkeletonVariant } from "./SessionTabSkeleton";

const VARIANTS: readonly SessionTabSkeletonVariant[] = [
  "overview",
  "laps",
  "telemetry",
  "coaching",
];

function Suspender(): JSX.Element {
  // Throwing a never-resolving promise is how a component signals suspension
  // to React. Suspense catches it and renders the fallback.
  throw new Promise<void>(() => {});
}

describe("SessionTabSuspense", () => {
  it("renders the children when they do not suspend", () => {
    render(
      <SessionTabSuspense variant="overview">
        <p>panel-ready</p>
      </SessionTabSuspense>,
    );
    expect(screen.getByText("panel-ready")).toBeInTheDocument();
  });

  it.each(VARIANTS)(
    "renders the SessionTabSkeleton fallback for variant '%s' while suspended",
    (variant) => {
      render(
        <SessionTabSuspense variant={variant}>
          <Suspender />
        </SessionTabSuspense>,
      );
      const status = screen.getByRole("status");
      expect(status).toHaveAttribute("aria-busy", "true");
      expect(status).toHaveAccessibleName(new RegExp(`loading.*${variant}|loading`, "i"));
    },
  );

  it("does not render the fallback when children render synchronously", () => {
    render(
      <SessionTabSuspense variant="laps">
        <p>laps content</p>
      </SessionTabSuspense>,
    );
    expect(screen.queryByRole("status")).toBeNull();
  });
});
