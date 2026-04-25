import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/PageIntro";

export const metadata: Metadata = {
  title: "Weakness detail",
};

interface WeaknessDetailPageProps {
  params: { id: string };
}

export default function WeaknessDetailPage({ params }: WeaknessDetailPageProps) {
  const id = decodeURIComponent(params.id);
  return (
    <section className="p-8">
      <PageIntro
        title={id}
        subtitle="Trend, evidence sessions and linked prescriptions for this weakness."
      />
    </section>
  );
}
