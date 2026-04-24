export function sessionDetailPath(sessionId: string): string {
  if (sessionId.trim() === "") {
    throw new Error("sessionDetailPath: sessionId is required");
  }
  return `/sessions/${encodeURIComponent(sessionId)}`;
}
