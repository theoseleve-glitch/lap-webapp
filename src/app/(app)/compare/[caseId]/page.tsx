import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/PageIntro";

export const metadata: Metadata = {
  title: "Compare case",
};

interface CompareCaseDetailPageProps {
  params: { caseId: string };
}

export default function CompareCaseDetailPage({ params }: CompareCaseDetailPageProps) {
  const caseId = decodeURIComponent(params.caseId);
  return (
    <section className="p-8">
      <PageIntro
        title={caseId}
        subtitle="Sessions side-by-side, rationale and outcome for this saved compare case."
      />
    </section>
  );
}
