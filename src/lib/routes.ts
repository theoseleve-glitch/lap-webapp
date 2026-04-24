export function sessionDetailPath(sessionId: string): string {
  if (sessionId.trim() === "") {
    throw new Error("sessionDetailPath: sessionId is required");
  }
  return `/sessions/${encodeURIComponent(sessionId)}`;
}

export function skillDrilldownPath(slug: string): string {
  if (slug.trim() === "") {
    throw new Error("skillDrilldownPath: slug is required");
  }
  return `/profile/skills/${encodeURIComponent(slug)}`;
}

export function weaknessDetailPath(weaknessId: string): string {
  if (weaknessId.trim() === "") {
    throw new Error("weaknessDetailPath: weaknessId is required");
  }
  return `/weaknesses/${encodeURIComponent(weaknessId)}`;
}

export function prescriptionDetailPath(prescriptionId: string): string {
  if (prescriptionId.trim() === "") {
    throw new Error("prescriptionDetailPath: prescriptionId is required");
  }
  return `/prescriptions/${encodeURIComponent(prescriptionId)}`;
}

export function targetEventPickerPath(): string {
  return "/profile/readiness";
}
