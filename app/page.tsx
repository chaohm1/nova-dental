import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import WhyNova from "@/components/sections/WhyNova";
import TreatmentsPreview from "@/components/sections/TreatmentsPreview";
import VisitPreview from "@/components/sections/VisitPreview";
import TeamPreview from "@/components/sections/TeamPreview";
import ClinicPreview from "@/components/sections/ClinicPreview";
import FaqPreview from "@/components/sections/FaqPreview";
import LocationHours from "@/components/sections/LocationHours";
import FinalCta from "@/components/sections/FinalCta";
import RevealController from "@/components/ui/RevealController";
import { dentistSchema } from "@/lib/schema";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dentistSchema) }}
      />
      <RevealController />
      <Hero />
      <WhyNova />
      <TreatmentsPreview />
      <VisitPreview />
      <TeamPreview />
      <ClinicPreview />
      <FaqPreview />
      <LocationHours />
      <FinalCta />
    </>
  );
}
