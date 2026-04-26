import { Suspense, type ReactNode } from "react";
import { SessionTabSkeleton, type SessionTabSkeletonVariant } from "./SessionTabSkeleton";

export interface SessionTabSuspenseProps {
  variant: SessionTabSkeletonVariant;
  children: ReactNode;
}

export function SessionTabSuspense({ variant, children }: SessionTabSuspenseProps) {
  return <Suspense fallback={<SessionTabSkeleton variant={variant} />}>{children}</Suspense>;
}
