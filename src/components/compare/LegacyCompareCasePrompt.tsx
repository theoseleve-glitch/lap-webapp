"use client";

import { useState } from "react";
import { CompareCaseCreateModal } from "./CompareCaseCreateModal";

export interface LegacyCompareCasePromptProps {
  legacySessionIds: readonly string[];
}

export function LegacyCompareCasePrompt({ legacySessionIds }: LegacyCompareCasePromptProps) {
  const hasLegacy = legacySessionIds.length > 0;
  const [open, setOpen] = useState(hasLegacy);

  if (!hasLegacy) return null;

  return (
    <CompareCaseCreateModal
      open={open}
      selectedSessionIds={legacySessionIds}
      onCancel={() => setOpen(false)}
      onSubmit={() => setOpen(false)}
    />
  );
}
