import type { Metadata } from "next";
import { LegacyCompareCasePrompt } from "@/components/compare/LegacyCompareCasePrompt";
import { PageIntro } from "@/components/ui/PageIntro";

export const metadata: Metadata = {
  title: "Compare",
};

interface ComparePageProps {
  searchParams?: { sessions?: string };
}

function parseLegacySessionIds(raw: string | undefined): readonly string[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map((id) => id.trim())
    .filter((id) => id.length > 0);
}

export default function ComparePage({ searchParams = {} }: ComparePageProps) {
  const legacySessionIds = parseLegacySessionIds(searchParams.sessions);
  return (
    <section className="p-8">
      <PageIntro
        title="Compare"
        subtitle="Saved compare cases — durable side-by-side analyses with rationale and outcome."
      />
      <LegacyCompareCasePrompt legacySessionIds={legacySessionIds} />
    </section>
  );
}
