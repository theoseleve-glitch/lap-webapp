import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi, type MockInstance } from "vitest";

const sentryCaptureException = vi.fn();

vi.mock("@sentry/browser", () => ({
  captureException: (...args: unknown[]) => sentryCaptureException(...args),
}));

import { PageErrorBoundary } from "./PageErrorBoundary";

function Bomb({ shouldThrow = false }: { shouldThrow?: boolean }) {
  if (shouldThrow) {
    throw new Error("boom");
  }
  return <span>safe-child</span>;
}

describe("PageErrorBoundary", () => {
  let consoleErrorSpy: MockInstance;

  beforeEach(() => {
    sentryCaptureException.mockReset();
    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it("renders children when nothing is thrown", () => {
    render(
      <PageErrorBoundary>
        <Bomb />
      </PageErrorBoundary>,
    );
    expect(screen.getByText("safe-child")).toBeInTheDocument();
  });

  it("renders the fallback alert when a child throws", () => {
    render(
      <PageErrorBoundary>
        <Bomb shouldThrow />
      </PageErrorBoundary>,
    );
    expect(screen.queryByText("safe-child")).toBeNull();
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("renders a level-1 heading 'Something went wrong' on error", () => {
    render(
      <PageErrorBoundary>
        <Bomb shouldThrow />
      </PageErrorBoundary>,
    );
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/something went wrong/i);
  });

  it("renders a reload action on error", () => {
    render(
      <PageErrorBoundary>
        <Bomb shouldThrow />
      </PageErrorBoundary>,
    );
    expect(screen.getByRole("button", { name: /reload/i })).toBeInTheDocument();
  });

  it("calls the onError callback with the error when a child throws", () => {
    const onError = vi.fn();
    render(
      <PageErrorBoundary onError={onError}>
        <Bomb shouldThrow />
      </PageErrorBoundary>,
    );
    expect(onError).toHaveBeenCalledTimes(1);
    const firstCall = onError.mock.calls[0];
    expect(firstCall).toBeDefined();
    const thrown = firstCall![0];
    expect(thrown).toBeInstanceOf(Error);
    expect((thrown as Error).message).toBe("boom");
  });

  it("does not call onError when no error is thrown", () => {
    const onError = vi.fn();
    render(
      <PageErrorBoundary onError={onError}>
        <Bomb />
      </PageErrorBoundary>,
    );
    expect(onError).not.toHaveBeenCalled();
  });

  it("falls back to Sentry.captureException when no onError is provided", () => {
    render(
      <PageErrorBoundary>
        <Bomb shouldThrow />
      </PageErrorBoundary>,
    );
    expect(sentryCaptureException).toHaveBeenCalledTimes(1);
    const firstCall = sentryCaptureException.mock.calls[0];
    expect(firstCall).toBeDefined();
    const thrown = firstCall![0];
    expect(thrown).toBeInstanceOf(Error);
    expect((thrown as Error).message).toBe("boom");
  });

  it("does not call Sentry.captureException when an explicit onError is provided", () => {
    const onError = vi.fn();
    render(
      <PageErrorBoundary onError={onError}>
        <Bomb shouldThrow />
      </PageErrorBoundary>,
    );
    expect(sentryCaptureException).not.toHaveBeenCalled();
    expect(onError).toHaveBeenCalled();
  });

  it("renders a custom fallback when provided", () => {
    render(
      <PageErrorBoundary fallback={<span>custom-fallback</span>}>
        <Bomb shouldThrow />
      </PageErrorBoundary>,
    );
    expect(screen.getByText("custom-fallback")).toBeInTheDocument();
    expect(screen.queryByRole("heading", { level: 1, name: /something went wrong/i })).toBeNull();
  });
});
