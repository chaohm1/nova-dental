import { clinic } from "@/content/clinic";
import { treatments } from "@/content/treatments";
import { doctors } from "@/content/doctors";
import { faqGroups } from "@/content/faq";

export const dentistSchema = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: clinic.name,
  url: clinic.siteUrl,
  image: `${clinic.siteUrl}/clinic/room.webp`,
  telephone: `+${clinic.phone}`,
  description: clinic.tagline,
  openingHoursSpecification: clinic.hoursSpec.map((span) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: span.dayOfWeek,
    opens: span.opens,
    closes: span.closes,
  })),
  employee: doctors.map((doctor) => ({
    "@type": "Person",
    name: doctor.name,
    jobTitle: doctor.role,
  })),
  availableService: treatments.map((treatment) => ({
    "@type": "MedicalProcedure",
    name: treatment.title,
  })),
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqGroups.flatMap((group) =>
    group.questions.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  ),
};

const treatmentQuestions =
  faqGroups.find((group) => group.id === "treatments")?.questions ?? [];

export const treatmentsFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: treatmentQuestions.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};
