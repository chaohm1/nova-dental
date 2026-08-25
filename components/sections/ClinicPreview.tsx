import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import PlaceholderBlock from "@/components/ui/PlaceholderBlock";

export default function ClinicPreview() {
  return (
    <section className="border-b border-titanium/15">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
        <SectionHeading
          eyebrow="The clinic"
          title="Modern, quiet, unhurried"
        />

        <div className="reveal-stagger mt-14 grid gap-5 md:grid-cols-2 md:gap-6">
          <div style={{ "--i": 0 } as React.CSSProperties}>
            <Image
              src="/clinic/room.webp"
              alt="Treatment room with a dental chair, operating light, and monitor"
              width={1200}
              height={800}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="h-full min-h-64 w-full rounded-card object-cover"
            />
          </div>
          <div style={{ "--i": 1 } as React.CSSProperties}>
            <PlaceholderBlock
              label="Reception"
              className="h-full min-h-64 w-full"
            />
          </div>
        </div>

        <p className="reveal mt-8 max-w-2xl text-slate">
          Treatment rooms are quiet and appointments are sized to stay
          comfortable. Equipment is maintained and instruments are sterilised
          between every patient. The full tour — how we work, the environment,
          and exactly what a visit is like — is on the clinic page.
        </p>

        <div className="reveal mt-8">
          <Link
            href="/clinic"
            className="inline-block rounded-pill border border-teal/50 px-7 py-4 text-teal-deep hover:bg-teal-soft/50 transition-[transform,border-color] duration-200 ease-seat active:scale-[0.98]"
          >
            Tour the clinic
          </Link>
        </div>
      </div>
    </section>
  );
}
