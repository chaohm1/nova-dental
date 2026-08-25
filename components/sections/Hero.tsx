import Link from "next/link";
import { Phone } from "lucide-react";
import { clinic } from "@/content/clinic";
import { navigation } from "@/content/navigation";
import { telUrl } from "@/lib/links";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-titanium/15 bg-porcelain">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 pb-16 pt-28 md:px-10 md:pb-24 md:pt-36 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:pb-20">
        <div>
          <p
            style={{ "--d": 0 } as React.CSSProperties}
            className="enter text-eyebrow text-titanium"
          >
            Three dentists · One calm clinic
          </p>

          <h1
            style={{ "--d": 1 } as React.CSSProperties}
            className="enter mt-6 font-display text-hero leading-[0.95] text-navy"
          >
            {clinic.nameLines[0]}
            <span className="block font-display italic text-slate">
              {clinic.nameLines[1]}
            </span>
          </h1>

          <p
            style={{ "--d": 2 } as React.CSSProperties}
            className="enter mt-6 max-w-xl font-display text-xl italic leading-relaxed text-slate md:text-2xl"
          >
            {clinic.tagline}
          </p>
          <p
            style={{ "--d": 2 } as React.CSSProperties}
            className="enter mt-4 max-w-lg text-[15px] leading-relaxed text-slate"
          >
            General, orthodontic and surgical care under one roof — with clear
            costs before treatment begins.
          </p>

          <div
            style={{ "--d": 3 } as React.CSSProperties}
            className="enter mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <Link
              href="/appointment"
              className="inline-flex items-center justify-center rounded-pill bg-teal px-7 py-4 text-porcelain transition-[background-color] duration-200 ease-seat hover:bg-teal-deep active:scale-[0.98]"
            >
              {navigation.cta.label}
            </Link>
            <a
              href={telUrl}
              className="inline-flex items-center justify-center gap-2.5 rounded-pill border border-teal/50 px-7 py-4 text-teal-deep transition-[background-color,border-color] duration-200 ease-seat hover:bg-teal-soft/50 active:scale-[0.98]"
            >
              <Phone strokeWidth={1.5} size={18} aria-hidden="true" />
              <span dir="ltr">{clinic.phoneDisplay}</span>
            </a>
          </div>

          <p
            style={{ "--d": 4 } as React.CSSProperties}
            className="enter mt-10 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-titanium/15 pt-6 text-sm text-slate"
          >
            <Link
              href="/treatments"
              className="text-teal-deep underline decoration-teal/30 underline-offset-4 transition-colors duration-200 ease-seat hover:decoration-teal"
            >
              Browse all treatments
            </Link>
            <span aria-hidden="true" className="text-titanium">·</span>
            <span>{clinic.hours.weekdays}</span>
            <span aria-hidden="true" className="text-titanium">·</span>
            <span>{clinic.hours.saturday}</span>
          </p>
        </div>

        <figure
          style={{ "--d": 2 } as React.CSSProperties}
          className="enter-fade relative lg:pl-4"
        >
          <div className="hero-float overflow-hidden rounded-[1.125rem] bg-bone shadow-[3px_5px_30px_rgba(15,37,64,0.12)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/clinic/room.webp"
              alt="Bright treatment room with dental chair and monitor"
              width={1200}
              height={800}
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          <figcaption className="mt-4 flex items-center justify-between gap-4 text-sm text-slate">
            <span>The treatment room — quiet, unhurried.</span>
            <span className="shrink-0 text-titanium">
              Open {clinic.hours.weekdays.split("·")[1]?.trim() ?? "08:30–17:00"}
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
