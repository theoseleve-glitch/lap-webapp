import { act, fireEvent, render, screen } from "@testing-library/react";
import { useEffect } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ToastProvider, useToast, type ToastIntent } from "./Toast";

function HarnessButton({
  intent,
  title,
  description,
  duration,
  onShow,
}: {
  intent?: ToastIntent;
  title?: string;
  description?: string;
  duration?: number;
  onShow?: (id: string) => void;
}) {
  const { show } = useToast();
  return (
    <button
      type="button"
      onClick={() => {
        const id = show({ intent, title, description, duration });
        onShow?.(id);
      }}
    >
      fire
    </button>
  );
}

function HarnessAutoFire({
  intent,
  title,
  description,
  duration,
}: {
  intent?: ToastIntent;
  title?: string;
  description?: string;
  duration?: number;
}) {
  const { show } = useToast();
  useEffect(() => {
    show({ intent, title, description, duration });
  }, [intent, title, description, duration, show]);
  return null;
}

describe("Toast", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders a notifications region (always present, even with no toasts)", () => {
    render(
      <ToastProvider>
        <p>app content</p>
      </ToastProvider>,
    );
    expect(screen.getByRole("region", { name: /notifications/i })).toBeInTheDocument();
  });

  it("does not render any toast before show() is called", () => {
    render(
      <ToastProvider>
        <p>app</p>
      </ToastProvider>,
    );
    expect(screen.queryByRole("status")).toBeNull();
    expect(screen.queryByRole("alert")).toBeNull();
  });

  it("shows a status toast (intent=success) with the supplied title", () => {
    render(
      <ToastProvider>
        <HarnessButton intent="success" title="Prescription accepted" />
      </ToastProvider>,
    );
    fireEvent.click(screen.getByRole("button", { name: /fire/i }));
    const status = screen.getByRole("status");
    expect(status).toBeInTheDocument();
    expect(status).toHaveTextContent(/prescription accepted/i);
  });

  it("uses role='alert' for intent='error' so AT users hear it immediately", () => {
    render(
      <ToastProvider>
        <HarnessButton intent="error" title="Network error" />
      </ToastProvider>,
    );
    fireEvent.click(screen.getByRole("button", { name: /fire/i }));
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.queryByRole("status")).toBeNull();
  });

  it("renders multiple toasts when show() is called repeatedly", () => {
    render(
      <ToastProvider>
        <HarnessButton intent="info" title="One" />
      </ToastProvider>,
    );
    const fire = screen.getByRole("button", { name: /fire/i });
    fireEvent.click(fire);
    fireEvent.click(fire);
    fireEvent.click(fire);
    expect(screen.getAllByRole("status")).toHaveLength(3);
  });

  it("renders a dismiss button per toast that removes that toast", () => {
    render(
      <ToastProvider>
        <HarnessButton intent="info" title="Prescription skipped" />
      </ToastProvider>,
    );
    fireEvent.click(screen.getByRole("button", { name: /fire/i }));
    const dismiss = screen.getByRole("button", { name: /dismiss notification/i });
    fireEvent.click(dismiss);
    expect(screen.queryByRole("status")).toBeNull();
  });

  it("auto-dismisses a toast after the default duration (4000ms)", () => {
    render(
      <ToastProvider>
        <HarnessAutoFire intent="info" title="Auto-dismissed" />
      </ToastProvider>,
    );
    expect(screen.getByRole("status")).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(4000);
    });
    expect(screen.queryByRole("status")).toBeNull();
  });

  it("respects a custom duration", () => {
    render(
      <ToastProvider>
        <HarnessAutoFire intent="info" title="Long-lived" duration={8000} />
      </ToastProvider>,
    );
    act(() => {
      vi.advanceTimersByTime(4000);
    });
    expect(screen.getByRole("status")).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(4001);
    });
    expect(screen.queryByRole("status")).toBeNull();
  });

  it("renders the description below the title when provided", () => {
    render(
      <ToastProvider>
        <HarnessButton
          intent="success"
          title="Prescription accepted"
          description="Drill scheduled for next session."
        />
      </ToastProvider>,
    );
    fireEvent.click(screen.getByRole("button", { name: /fire/i }));
    const status = screen.getByRole("status");
    expect(status).toHaveTextContent(/drill scheduled for next session/i);
  });

  it("returns an id from show() that dismiss() can target", () => {
    const ids: string[] = [];
    render(
      <ToastProvider>
        <HarnessButton intent="info" title="One" onShow={(id) => ids.push(id)} />
      </ToastProvider>,
    );
    const fire = screen.getByRole("button", { name: /fire/i });
    fireEvent.click(fire);
    fireEvent.click(fire);
    expect(ids).toHaveLength(2);
    expect(ids[0]).not.toEqual(ids[1]);
  });
});
