import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/PageIntro";

export const metadata: Metadata = {
  title: "Compare",
};

export default function ComparePage() {
  return (
    <section className="p-8">
      <PageIntro
        title="Compare"
        subtitle="Saved compare cases — durable side-by-side analyses with rationale and outcome."
      />
    </section>
  );
}
