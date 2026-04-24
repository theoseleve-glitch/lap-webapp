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
