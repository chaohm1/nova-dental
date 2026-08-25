import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import { visitSteps } from "@/content/experience";

export default function VisitPreview() {
  return (
    <section className="border-b border-titanium/15">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
        <SectionHeading
          eyebrow="Your visit"
          title="Nothing here will surprise you"
          intro="Every appointment follows the same calm shape — you always know what happens next."
        />

        <div className="reveal-stagger mt-14 grid gap-10 sm:grid-cols-3 sm:gap-8">
          {visitSteps.slice(0, 3).map((step, i) => (
            <div key={step.id} style={{ "--i": i } as React.CSSProperties}>
              <p className="font-display text-[4rem] leading-none text-titanium/45">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-4 font-display text-card-heading text-navy">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">
                {step.body}
              </p>
            </div>
          ))}
        </div>

        <div className="reveal mt-12">
          <Link
            href="/clinic"
            className="inline-block rounded-pill border border-teal/50 px-7 py-4 text-teal-deep hover:bg-teal-soft/50 transition-[transform,border-color] duration-200 ease-seat active:scale-[0.98]"
          >
            See the full process
          </Link>
        </div>
      </div>
    </section>
  );
}
