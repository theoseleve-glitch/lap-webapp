import type { Metadata } from "next";
import { SessionDetailShell } from "@/components/session/SessionDetailShell";

/**
 * Block D — Session Detail decomposition plan (T061).
 *
 * This file is a placeholder until the data hooks land. When they do, this
 * route becomes a server component that delegates rendering to the components
 * extracted below. Each piece has its own LOC budget per the sprint queue;
 * the budgets exist to prevent the legacy 600-LOC monolith from re-emerging.
 *
 * Layer cake (top → bottom of the rendered tree):
 *
 *   SessionDetailShell (T062, ≤150 LOC)
 *     - Layout chrome: PageIntro w/ breadcrumb back to /timeline
 *     - Renders SessionActionsBar in the actions slot
 *     - Renders the active tab via children
 *
 *   Tab routing (T068)
 *     - URL query param `?tab=overview|laps|telemetry|coaching` (mirrors the
 *       T222 SettingsTabs pattern: parseSettingsTab → SettingsTabs → panel).
 *     - Default tab = "overview". parseSessionTab falls back to overview for
 *       unknown values.
 *     - Anchor-based nav with aria-current="page" on the active tab.
 *
 *   SessionOverviewTab     (T063, ≤250 LOC)  — summary stats, lap-time
 *                                              distribution, key sectors.
 *   SessionLapsTab         (T064, ≤250 LOC)  — lap-by-lap table, sort/filter,
 *                                              click → in-tab focus on lap.
 *   SessionTelemetryTab    (T065, ≤300 LOC)  — channel selector, time-series
 *                                              viz, lap overlay (largest tab —
 *                                              highest LOC budget).
 *   SessionCoachingTab     (T066, NEW)       — WeaknessEpisodes (this session),
 *                                              escalations, Prescriptions
 *                                              (Block E content; stub here).
 *
 *   SessionActionsBar      (T067, ≤150 LOC)  — delete (with confirm modal),
 *                                              re-process, share. Sits above
 *                                              the tabs in SessionDetailShell.
 *
 * Data flow (T069)
 *   Each tab fetches with its own useQuery key — no prop drilling for data.
 *   Header data (track/car/date/source/data_quality — T070, T071) is the only
 *   query the shell itself runs; tabs fetch their own slices.
 *
 * Constraints
 *   - Webapp doctrine: rendering only. Insights/coaching text comes from the
 *     backend (T086 next_actions endpoint). No local heuristic modules
 *     (T087 strips the legacy `src/lib/debrief/*`).
 *   - Mobile (T083): tabs render as accordion or horizontal scroll under a
 *     responsive breakpoint.
 *   - A11y (T081, T082): each tab keyboard-navigable, every action has an
 *     aria-label (already gated by T236 categories:accessibility minScore: 1).
 *
 * Until those tasks unblock (every one is gated on lap-backend session-data
 * hooks + the @lap/schemas typed client), this page just echoes the requested
 * session id so the routing layer is testable end-to-end.
 */

export const metadata: Metadata = {
  title: "Session",
};

interface SessionDetailPageProps {
  params: { id: string };
}

export default function SessionDetailPage({ params }: SessionDetailPageProps) {
  return (
    <SessionDetailShell
      sessionId={params.id}
      subtitle="Coming soon — Block D decomposition (T063–T067) lands when the session-data hooks unblock."
    />
  );
}
