import type { Metadata } from "next";
import { SessionDetailShell } from "@/components/session/SessionDetailShell";
import { parseSessionTab, SessionTabs } from "@/components/session/SessionTabs";

/**
 * Block D — Session Detail decomposition (T061+).
 *
 * Layer cake:
 *   SessionDetailShell (T062)            chrome + breadcrumb + actions slot
 *     SessionTabs (T068)                 ?tab= URL routing → panel switch
 *       SessionOverviewTab  (T063, ≤250 LOC)
 *       SessionLapsTab      (T064, ≤250 LOC)
 *       SessionTelemetryTab (T065, ≤300 LOC)
 *       SessionCoachingTab  (T066, ready for T086 next_actions)
 *     SessionActionsBar     (T067, ≤150 LOC) sits in actions slot
 *
 * Each tab panel currently shows placeholder copy because the data hooks
 * (T069 onwards — useQuery per tab) are backend-blocked on the
 * @lap/schemas typed client + the lap-detail/telemetry-window endpoints.
 * Wiring real components in here lands incrementally as those unblock.
 */

export const metadata: Metadata = {
  title: "Session",
};

interface SessionDetailPageProps {
  params: { id: string };
  searchParams?: { tab?: string };
}

export default function SessionDetailPage({ params, searchParams = {} }: SessionDetailPageProps) {
  const activeTab = parseSessionTab(searchParams.tab);
  return (
    <SessionDetailShell sessionId={params.id}>
      <SessionTabs activeTab={activeTab} />
    </SessionDetailShell>
  );
}
