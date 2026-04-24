import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/PageIntro";

export const metadata: Metadata = {
  title: "Timeline",
};

export default function TimelinePage() {
  return (
    <section className="p-8">
      <PageIntro title="Timeline" subtitle="Your recent sessions, grouped by week." />
    </section>
  );
}
