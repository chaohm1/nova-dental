import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import DoctorCard from "@/components/ui/DoctorCard";
import { doctors } from "@/content/doctors";

export default function TeamPreview() {
  return (
    <section className="border-b border-titanium/15 bg-bone/40">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
        <SectionHeading
          eyebrow="The team"
          title="Real people, named"
          intro="A team rather than a solo practice — so the right clinician treats the right problem."
        />

        <div className="reveal-stagger mt-14 grid gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {doctors.map((doctor, i) => (
            <div key={doctor.id} style={{ "--i": i } as React.CSSProperties}>
              <DoctorCard doctor={doctor} />
            </div>
          ))}
        </div>

        <div className="reveal mt-12">
          <Link
            href="/team"
            className="inline-block rounded-pill border border-teal/50 px-7 py-4 text-teal-deep hover:bg-teal-soft/50 transition-[transform,border-color] duration-200 ease-seat active:scale-[0.98]"
          >
            Meet the team
          </Link>
        </div>
      </div>
    </section>
  );
}
