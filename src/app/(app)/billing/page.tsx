import type { Metadata } from "next";
import { BillingPageClient } from "@/components/billing/BillingPageClient";
import { PageIntro } from "@/components/ui/PageIntro";

export const metadata: Metadata = {
  title: "Billing",
};

export default function BillingPage() {
  return (
    <section className="p-8 flex flex-col gap-6">
      <PageIntro
        title="Billing"
        subtitle="Manage your plan, see trial status, and open the billing portal."
      />
      <BillingPageClient />
    </section>
  );
}
