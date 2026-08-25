import { ViewTransition } from "react";
import Link from "next/link";
import type { Doctor } from "@/content/doctors";
import { categoryTint } from "@/components/ui/icons";

export default function DoctorCard({
  doctor,
  href = "/team",
}: {
  doctor: Doctor;
  href?: string;
}) {
  return (
    <ViewTransition
      name={`doctor-${doctor.id}`}
      share="morph"
      default="none"
    >
      <Link
        href={href}
        className="group block h-full rounded-card border border-titanium/15 bg-porcelain p-6 transition-transform duration-300 ease-seat active:scale-[0.98] md:p-7"
      >
      <div
        className={`flex h-24 w-24 items-center justify-center rounded-card ${categoryTint[doctor.colorKey]}`}
      >
        <span className="font-display text-[4rem] leading-none text-navy">
          {doctor.initials}
        </span>
      </div>
      <h3 className="mt-6 font-display text-card-heading text-navy">
        {doctor.name}
      </h3>
      <p className="mt-1 text-sm text-slate">{doctor.role}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {doctor.focusAreas.map((area) => (
          <li
            key={area}
            className="rounded-pill border border-titanium/30 px-3 py-1 text-xs text-slate"
          >
            {area}
          </li>
        ))}
      </ul>
      </Link>
    </ViewTransition>
  );
}
