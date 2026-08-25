import Link from "next/link";
import BackToTop from "@/components/ui/BackToTop";

export default function PageHeader({
  eyebrow,
  title,
  lede,
  showHome = true,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  showHome?: boolean;
}) {
  return (
    <div className="mx-auto max-w-6xl px-6 pb-14 pt-28 md:px-10 md:pb-20 md:pt-40 ">
      {showHome ? (
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-xs text-slate">
          <Link href="/" className="inline-flex items-center gap-1 rounded-pill px-2 py-1 transition-colors hover:bg-bone hover:text-navy">
            <span aria-hidden="true">‹</span> Home
          </Link>
          <span aria-hidden="true" className="text-titanium">/</span>
          <span className="font-semibold text-navy">{title}</span>
        </nav>
      ) : null}
      <p className="text-eyebrow text-titanium">{eyebrow}</p>
      <h1 className="mt-4 font-display text-page-title text-navy">{title}</h1>
      {lede ? <p className="mt-5 max-w-2xl text-slate">{lede}</p> : null}
      <BackToTop />
    </div>
  );
}
