import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/PageIntro";

export const metadata: Metadata = {
  title: "Profile",
};

export default function ProfilePage() {
  return (
    <section className="p-8">
      <PageIntro
        title="Profile"
        subtitle="Your driver profile, skill map and open coaching actions."
      />
    </section>
  );
}
