import { ViewTransition } from "react";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  CategoryIcon,
  categoryColor,
  categoryHoverTint,
} from "@/components/ui/icons";
import { treatments } from "@/content/treatments";

export default function TreatmentsPreview() {
  return (
    <section className="border-b border-titanium/15 bg-bone/40">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
        <div className="reveal flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Treatments"
            title="The full range, under one roof"
            intro="Seven areas of care — each owned by the dentist whose training matches it."
          />
        </div>

        <div className="reveal-stagger mt-14 flex flex-wrap justify-center gap-5 md:gap-6">
          {treatments.map((treatment, i) => (
            <div
              key={treatment.slug}
              style={{ "--i": i } as React.CSSProperties}
              className="w-full sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.834rem)] xl:w-[calc(25%-1.125rem)]"
            >
              <ViewTransition
                name={`treatment-${treatment.slug}`}
                share="morph"
                default="none"
              >
                <Link
                  href={`/treatments#${treatment.slug}`}
                  className={`group block h-full rounded-card border border-titanium/15 bg-porcelain p-6 transition-[transform,box-shadow,background-color] duration-300 ease-seat active:scale-[0.98] ${categoryHoverTint[treatment.colorKey]}`}
                >
                  <span
                    className={`block transition-transform duration-300 ease-seat group-hover:-translate-y-0.5 ${categoryColor[treatment.colorKey]}`}
                  >
                    <CategoryIcon name={treatment.iconKey} />
                  </span>
                  <h3 className="mt-5 font-display text-card-heading text-navy">
                    {treatment.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate">
                    {treatment.blurb}
                  </p>
                </Link>
              </ViewTransition>
            </div>
          ))}
        </div>

        <div className="reveal mt-12 text-center">
          <Link
            href="/treatments"
            className="inline-block rounded-pill border border-teal/50 px-7 py-4 text-teal-deep hover:bg-teal-soft/50 transition-[transform,border-color] duration-200 ease-seat active:scale-[0.98]"
          >
            Explore all treatments
          </Link>
        </div>
      </div>
    </section>
  );
}
