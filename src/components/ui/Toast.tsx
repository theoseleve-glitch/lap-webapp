"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type ToastIntent = "success" | "error" | "info";

export interface ToastInput {
  intent?: ToastIntent;
  title?: string;
  description?: string;
  duration?: number;
}

interface ToastRecord {
  id: string;
  intent: ToastIntent;
  title?: string;
  description?: string;
  duration: number;
}

interface ToastContextValue {
  show: (toast: ToastInput) => string;
  dismiss: (id: string) => void;
}

const DEFAULT_DURATION = 4000;
const ToastContext = createContext<ToastContextValue | null>(null);

const INTENT_TONE: Record<ToastIntent, string> = {
  success: "border-pit-orange/60 text-pit-orange",
  error: "border-red-500/70 text-red-400",
  info: "border-steel/40 text-steel",
};

function makeId(): string {
  return `t_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<readonly ToastRecord[]>([]);
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const dismiss = useCallback((id: string) => {
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const show = useCallback(
    (input: ToastInput) => {
      const id = makeId();
      const record: ToastRecord = {
        id,
        intent: input.intent ?? "info",
        title: input.title,
        description: input.description,
        duration: input.duration ?? DEFAULT_DURATION,
      };
      setToasts((prev) => [...prev, record]);
      const timer = setTimeout(() => dismiss(id), record.duration);
      timersRef.current.set(id, timer);
      return id;
    },
    [dismiss],
  );

  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      for (const timer of timers.values()) {
        clearTimeout(timer);
      }
      timers.clear();
    };
  }, []);

  const value = useMemo<ToastContextValue>(() => ({ show, dismiss }), [show, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        role="region"
        aria-label="Notifications"
        className="pointer-events-none fixed bottom-4 right-4 z-50 flex flex-col gap-2"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            role={t.intent === "error" ? "alert" : "status"}
            className={`pointer-events-auto flex items-start gap-3 rounded border bg-concrete px-4 py-3 shadow-lg max-w-sm ${INTENT_TONE[t.intent]}`}
          >
            <div className="flex flex-col gap-0.5 min-w-0">
              {t.title && (
                <p className="font-telemetry text-[11px] uppercase tracking-[0.12em] break-words">
                  {t.title}
                </p>
              )}
              {t.description && (
                <p className="font-body text-chalk text-xs break-words">{t.description}</p>
              )}
            </div>
            <button
              type="button"
              onClick={() => dismiss(t.id)}
              aria-label="Dismiss notification"
              className="flex-shrink-0 rounded border border-steel/40 text-steel px-2 py-0.5 font-telemetry text-[10px] uppercase tracking-[0.12em] hover:border-steel/70"
            >
              Dismiss
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used inside <ToastProvider>");
  }
  return ctx;
}
