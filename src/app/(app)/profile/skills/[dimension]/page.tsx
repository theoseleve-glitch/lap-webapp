import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/PageIntro";

export const metadata: Metadata = {
  title: "Skill drilldown",
};

function slugToLabel(slug: string): string {
  const decoded = decodeURIComponent(slug).replace(/[-_]+/g, " ").trim();
  if (decoded.length === 0) return decoded;
  return decoded[0]!.toUpperCase() + decoded.slice(1);
}

interface SkillDrilldownPageProps {
  params: { dimension: string };
}

export default function SkillDrilldownPage({ params }: SkillDrilldownPageProps) {
  const label = slugToLabel(params.dimension);
  return (
    <section className="p-8">
      <PageIntro
        title={label}
        subtitle="Trend, best and worst sessions, and related weaknesses for this skill."
      />
    </section>
  );
}
