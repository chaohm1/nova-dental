import type { Metadata } from "next";
import { ViewTransition } from "react";
import PageHeader from "@/components/ui/PageHeader";
import RevealController from "@/components/ui/RevealController";
import {
  CategoryIcon,
  categoryColor,
} from "@/components/ui/icons";
import { treatments } from "@/content/treatments";
import { treatmentsFaqSchema } from "@/lib/schema";
import { breadcrumbSchema } from "@/lib/breadcrumb";

export const metadata: Metadata = {
  title: "Treatments",
  alternates: { canonical: "/treatments" },
  description:
    "Seven areas of care, from check-ups and braces to implants and oral surgery — what each involves and who treats it.",
};

export default function TreatmentsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(treatmentsFaqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: "/" },
              { name: "Treatments", url: "/treatments" },
            ]),
          ),
        }}
      />
      <RevealController />

      <PageHeader
        eyebrow="Care"
        title="Treatments"
        lede="Seven areas of care under one roof, each owned by the dentist whose training matches it. Pick a category below, or read straight through."
      />

      <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20">
        <div className="reveal-stagger grid gap-6 md:grid-cols-2">
          {treatments.map((treatment, i) => {
            return (
              <section
                key={treatment.slug}
                id={treatment.slug}
                aria-labelledby={`${treatment.slug}-title`}
                style={{ "--i": i } as React.CSSProperties}
                className={`scroll-mt-6 flex w-full flex-col rounded-card border border-titanium/15 bg-porcelain p-6 transition-transform duration-300 md:p-7 ${i === treatments.length - 1 ? "md:col-span-2 md:mx-auto md:max-w-[calc(50%-0.75rem)]" : ""}`}
              >
                <ViewTransition
                  name={`treatment-${treatment.slug}`}
                  share="morph"
                  default="none"
                >
                  <div className="reveal flex items-center gap-4">
                    <span className={categoryColor[treatment.colorKey]}>
                      <CategoryIcon name={treatment.iconKey} size={32} />
                    </span>
                    <h2
                      id={`${treatment.slug}-title`}
                      className={`font-display text-section-heading ${categoryColor[treatment.colorKey]}`}
                    >
                      {treatment.title}
                    </h2>
                  </div>
                </ViewTransition>

                <p className="reveal mt-5 flex-1 text-[15px] leading-relaxed text-slate">
                  {treatment.description}
                </p>

                <ul className="reveal-stagger mt-6 grid gap-x-6 gap-y-2 border-t border-titanium/10 pt-5 sm:grid-cols-2">
                  {treatment.services.map((service, j) => (
                    <li
                      key={service}
                      style={{ "--i": j } as React.CSSProperties}
                      className="flex items-start gap-2.5 text-[15px] leading-relaxed text-navy"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        className={`mt-1.5 h-3.5 w-3.5 shrink-0 ${categoryColor[treatment.colorKey]}`}
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      {service}
                    </li>
                  ))}
                </ul>

                <div className="reveal mt-auto pt-8">
                  <a
                    href={`/appointment?treatment=${treatment.slug}`}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-pill bg-teal px-6 py-3.5 text-sm font-semibold text-porcelain transition-[transform,background-color,border-color] duration-200 ease-seat hover:bg-teal-deep active:scale-[0.98]"
                  >
                    Book for {treatment.title}
                   
                  </a>
                </div>
              </section>
            );
          })}
        </div>

        <section className="reveal mt-16 rounded-card bg-navy-deep p-8 md:p-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="max-w-xl font-display text-section-heading text-porcelain">
                Not sure what you need?
              </h2>
              <p className="mt-4 max-w-xl text-porcelain/70">
                That&apos;s completely fine — request a consultation and
                we&apos;ll guide you.
              </p>
            </div>
            <a
              href="/appointment"
              className="shrink-0 rounded-pill bg-teal px-8 py-4 text-center font-semibold text-porcelain transition-[transform,background-color,border-color] duration-200 ease-seat hover:bg-teal-deep active:scale-[0.98]"
            >
              Request a consultation
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
