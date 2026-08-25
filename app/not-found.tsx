import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-start px-6 pb-28 pt-24 md:px-10 md:pt-32">
      <p className="text-eyebrow text-titanium">404</p>
      <h1 className="mt-4 font-display text-page-title text-navy">
        This page doesn&apos;t exist.
      </h1>
      <p className="mt-5 max-w-xl text-slate">
        The link may be old or mistyped. Everything about the clinic is one
        click away.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          href="/"
          className="rounded-pill bg-teal px-6 py-4 font-semibold text-porcelain transition-[transform,background-color] duration-200 ease-seat hover:bg-teal-deep active:scale-[0.98]"
        >
          Back to the homepage
        </Link>
        <Link
          href="/treatments"
          className="rounded-pill border border-titanium/40 px-6 py-4 font-semibold text-navy transition-[transform,border-color] duration-200 ease-seat active:scale-[0.98]"
        >
          Browse treatments
        </Link>
      </div>
    </div>
  );
}
