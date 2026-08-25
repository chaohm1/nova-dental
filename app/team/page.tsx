import type { Metadata } from "next";
import { ViewTransition } from "react";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import RevealController from "@/components/ui/RevealController";
import { doctors } from "@/content/doctors";
import { treatments } from "@/content/treatments";
import { categoryBorder, categoryTint } from "@/components/ui/icons";
import { breadcrumbSchema } from "@/lib/breadcrumb";

export const metadata: Metadata = {
  
  alternates: { canonical: "/team" },
  title: "Team",
  description:
    "Meet the three dentists of NOVA Dental — general and restorative care, orthodontics, and children's dentistry with oral surgery.",
};

export default function TeamPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: "/" },
              { name: "Team", url: "/team" },
            ]),
          ),
        }}
      />
      <RevealController />

      <PageHeader
        eyebrow="The team"
        title="Three dentists, one clinic"
        lede="A team rather than a solo practice. Each dentist owns the treatments their training matches — and hands you to a colleague when that serves you better."
      />

      {doctors.map((doctor, i) => {
        const covers = treatments.filter((treatment) =>
          (treatment.doctorIds as readonly string[]).includes(doctor.id),
        );
        return (
          <section
            key={doctor.id}
            id={doctor.id}
            className={`scroll-mt-6 border-b border-titanium/15 ${i % 2 === 1 ? "bg-bone/40" : ""}`}
          >
            <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
              <ViewTransition
                name={`doctor-${doctor.id}`}
                share="morph"
                default="none"
              >
                <div className="reveal-up flex flex-col gap-8 md:flex-row md:gap-12">
                  <div
                    className={`flex h-36 w-36 shrink-0 items-center justify-center rounded-card ${categoryTint[doctor.colorKey]}`}
                  >
                    <span className="font-display text-[5.5rem] leading-none text-navy">
                      {doctor.initials}
                    </span>
                  </div>
                  <div>
                    <h2 className="font-display text-section-heading text-navy">
                      {doctor.name}
                    </h2>
                    <p className="mt-2 text-slate">{doctor.role}</p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {doctor.focusAreas.map((area) => (
                        <li
                          key={area}
                          className="rounded-pill border border-titanium/30 px-3 py-1.5 text-xs text-slate"
                        >
                          {area}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ViewTransition>

              <p className="reveal mt-8 max-w-2xl leading-relaxed text-slate">
                {doctor.approach}
              </p>

              <div className="reveal mt-10">
                <p className="text-eyebrow text-titanium">Treatments covered</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {covers.map((treatment) => (
                    <li key={treatment.slug}>
                      <a
                        href={`/treatments#${treatment.slug}`}
                        className={`block rounded-pill border px-4 py-3 text-sm text-navy transition-[border-color,background-color] duration-200 ease-seat hover:bg-teal-soft hover:border-teal ${categoryBorder[treatment.colorKey]}`}
                      >
                        {treatment.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="reveal mt-10">
                <a
                  href={`/appointment?doctor=${doctor.id}`}
                  className="inline-block rounded-pill bg-teal px-7 py-4 font-semibold text-porcelain transition-[transform,background-color,border-color] duration-200 ease-seat hover:bg-teal-deep active:scale-[0.98]"
                >
                  Request an appointment with {doctor.name}
                </a>
              </div>
            </div>
          </section>
        );
      })}

      <section className="bg-navy-deep">
        <div className="reveal mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-24">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="max-w-xl font-display text-section-heading text-porcelain">
                Not sure who you need?
              </h2>
              <p className="mt-4 max-w-xl text-porcelain/70">
                Request a consultation — we&apos;ll match you with the right
                dentist.
              </p>
            </div>
            <Link
              href="/appointment"
              className="shrink-0 rounded-pill bg-teal px-8 py-4 text-center font-semibold text-porcelain transition-[transform,background-color,border-color] duration-200 ease-seat hover:bg-teal-deep active:scale-[0.98]"
            >
              Request a consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
