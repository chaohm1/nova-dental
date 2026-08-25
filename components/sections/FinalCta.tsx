import Link from "next/link";
import { navigation } from "@/content/navigation";

export default function FinalCta() {
  return (
    <section className="bg-navy-deep">
      <div className="reveal mx-auto flex max-w-6xl flex-col items-start gap-8 px-6 py-20 md:flex-row md:items-center md:justify-between md:px-10 md:py-24">
        <h2 className="max-w-xl font-display text-section-heading text-porcelain">
          Ready when you are.
        </h2>
        <Link
          href={navigation.cta.href}
          className="shrink-0 rounded-pill bg-teal px-8 py-4 font-semibold text-porcelain transition-[transform,background-color,border-color] duration-200 ease-seat hover:bg-teal-deep active:scale-[0.98]"
        >
          {navigation.cta.label}
        </Link>
      </div>
    </section>
  );
}
