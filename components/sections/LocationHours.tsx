import SectionHeading from "@/components/ui/SectionHeading";
import PlaceholderBlock from "@/components/ui/PlaceholderBlock";
import { clinic } from "@/content/clinic";
import { telUrl, whatsappUrl } from "@/lib/links";

export default function LocationHours() {
  return (
    <section className="border-b border-titanium/15">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
        <SectionHeading
          eyebrow="Visiting"
          title="Where, when, and how to reach us"
        />

        <div className="reveal-stagger mt-14 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10">
          <div style={{ "--i": 0 } as React.CSSProperties}>
            <PlaceholderBlock
              label="Map — the clinic location is set when the template is licensed"
              className="h-72 w-full md:h-96"
            />
          </div>

          <div
            className="reveal-right grid content-start gap-4"
            style={{ "--i": 1 } as React.CSSProperties}
          >
            <div className="rounded-card border border-titanium/15 bg-porcelain p-6">
              <p className="text-eyebrow text-titanium">Hours</p>
              <p className="mt-3 text-navy">
                {clinic.hours.weekdays}
                <br />
                {clinic.hours.saturday}
              </p>
              <p className="mt-2 text-sm text-slate">{clinic.hours.closed}</p>
            </div>

            <div className="rounded-card border border-titanium/15 bg-porcelain p-6">
              <p className="text-eyebrow text-titanium">Phone</p>
              <a
                href={telUrl}
                className="mt-3 inline-block py-2.5 text-lg font-semibold text-navy underline-offset-4 transition-colors duration-200 ease-seat hover:text-teal-deep hover:underline"
                dir="ltr"
              >
                {clinic.phoneDisplay}
              </a>
            </div>

            <div className="rounded-card border border-titanium/15 bg-porcelain p-6">
              <p className="text-eyebrow text-titanium">WhatsApp</p>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block py-2.5 font-semibold text-navy underline-offset-4 transition-colors duration-200 ease-seat hover:text-teal-deep hover:underline"
              >
                Message us directly
              </a>
              <p className="mt-2 text-sm text-slate">
                Opens WhatsApp with a ready-made message. Nothing is stored on
                this website.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
