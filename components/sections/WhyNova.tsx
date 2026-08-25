import SectionHeading from "@/components/ui/SectionHeading";
import { clinic } from "@/content/clinic";
import { whyIcons, type WhyKey } from "@/components/ui/icons";

export default function WhyNova() {
  return (
    <section className="border-b border-titanium/15">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
        <SectionHeading
          eyebrow="Why NOVA"
          title="Why here rather than elsewhere"
        />

        <div className="reveal-stagger mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {clinic.whyNova.map((point, i) => {
            const Icon = whyIcons[point.iconKey as WhyKey];
            return (
              <div
                key={point.title}
                style={{ "--i": i } as React.CSSProperties}
                className="group flex gap-5 border-t border-titanium/20 pt-7"
              >
                <div className="shrink-0 text-navy transition-transform duration-300 ease-seat group-hover:-translate-y-0.5">
                  <Icon strokeWidth={1.5} size={24} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-display text-card-heading text-navy">
                    {point.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate">
                    {point.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
