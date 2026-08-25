import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import PlaceholderBlock from "@/components/ui/PlaceholderBlock";
import RevealController from "@/components/ui/RevealController";
import { visitSteps } from "@/content/experience";
import { breadcrumbSchema } from "@/lib/breadcrumb";

export const metadata: Metadata = {
  
  alternates: { canonical: "/clinic" },
  title: "Clinic",
  description:
    "The practice: how NOVA Dental works, the environment, the technology, and what a visit is like from request to follow-up.",
};

export default function ClinicPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: "/" },
              { name: "Clinic", url: "/clinic" },
            ]),
          ),
        }}
      />
      <RevealController />

      <PageHeader
        eyebrow="The practice"
        title="The clinic"
        lede="How we work, what the rooms are like, and what happens on a visit — nothing here should surprise you on the day."
      />

      <div className="mx-auto max-w-6xl px-6 pb-24 md:px-10">
        <section className="reveal max-w-2xl border-t border-titanium/15 pt-12">
          <h2 className="font-display text-section-heading text-navy">
            How we work
          </h2>
          <p className="mt-5 text-slate">
            Three dentists with different specialities share one clinic, one
            set of records, and one standard of care: explain first, treat
            second. You will always know what we found, what the options are,
            and what each one costs before anything begins.
          </p>
          <p className="mt-4 text-slate">
            If a problem needs two of us — an implant placed by one dentist and
            restored by another — that happens inside the same walls, with no
            repeat examinations and no letters passing between practices.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="reveal font-display text-section-heading text-navy">
            The environment
          </h2>
          <div className="reveal-stagger mt-10 grid gap-5 sm:grid-cols-2 md:gap-6">
            <div
              style={{ "--i": 0 } as React.CSSProperties}
              className="sm:col-span-2"
            >
              <Image
                src="/clinic/room.webp"
                alt="Treatment room with a dental chair, operating light, and monitor"
                width={1200}
                height={800}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 66vw"
                className="w-full rounded-card object-cover"
              />
            </div>
            <div style={{ "--i": 1 } as React.CSSProperties}>
              <PlaceholderBlock
                label="Reception"
                className="h-56 w-full md:h-64"
              />
            </div>
            <div style={{ "--i": 2 } as React.CSSProperties}>
              <PlaceholderBlock
                label="Consultation area"
                className="h-56 w-full md:h-64"
              />
            </div>
            <div style={{ "--i": 3 } as React.CSSProperties}>
              <PlaceholderBlock
                label="Sterilisation"
                className="h-56 w-full md:h-64"
              />
            </div>
            <div
              style={{ "--i": 4 } as React.CSSProperties}
              className="flex flex-col justify-center rounded-card border border-titanium/15 bg-porcelain p-6 md:p-7"
            >
              <p className="text-slate">
                Instruments are sterilised between every patient, records are
                digital, and rooms are quiet enough to hear yourself think.
                Nervous patients are expected, not exceptional — say so at the
                desk and the visit adapts to you.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-20 max-w-2xl">
          <h2 className="reveal font-display text-section-heading text-navy">
            What a visit is like
          </h2>
          <p className="reveal mt-5 text-slate">
            The same five steps, every time — from your first message to your
            next appointment.
          </p>
          <ol className="mt-10 grid gap-10">
            {visitSteps.map((step, i) => (
              <li
                key={step.id}
                style={{ "--i": i } as React.CSSProperties}
                className="reveal flex gap-6 border-t border-titanium/20 pt-7"
              >
                <span
                  className="font-display text-[3.5rem] leading-none text-titanium/45"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-card-heading text-navy">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <div className="reveal mt-20 rounded-card bg-navy-deep p-8 md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <h2 className="max-w-md font-display text-section-heading text-porcelain">
              See for yourself.
            </h2>
            <Link
              href="/appointment"
              className="shrink-0 rounded-pill bg-teal px-8 py-4 text-center font-semibold text-porcelain transition-[transform,background-color,border-color] duration-200 ease-seat hover:bg-teal-deep active:scale-[0.98]"
            >
              Request an appointment
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
