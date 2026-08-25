import Link from "next/link";
import Image from "next/image";
import { clinic } from "@/content/clinic";
import { navigation } from "@/content/navigation";
import { whatsappUrl } from "@/lib/links";

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width={size} height={size} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width={size} height={size} aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width={size} height={size} aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4V8h4v1a6 6 0 0 1 2-1z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="border-t border-titanium/15 bg-navy-deep/95 backdrop-blur-xl text-porcelain">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20">
        <div className="grid gap-12 md:grid-cols-3 md:gap-10">
          <div>
            <div className="inline-block rounded-card bg-porcelain p-4">
              <div className="flex items-center gap-3">
                <Image
                  src="/logo.png"
                  alt=""
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-[0.6875rem]"
                />
                <div>
                  <p className="font-display text-xl leading-none text-navy">
                    {clinic.nameLines[0]}
                  </p>
                  <p className="mt-1 text-sm text-slate">
                    {clinic.nameLines[1]}
                  </p>
                </div>
              </div>
            </div>
            <p className="mt-5 max-w-xs text-sm text-porcelain/60">
              {clinic.tagline}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-porcelain/50">
              Explore
            </p>
            <ul className="mt-4 grid gap-1">
              {navigation.footer.explore.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="-mx-4 inline-block px-4 py-3 text-sm text-porcelain/70 transition-colors duration-200 ease-seat hover:text-porcelain"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-porcelain/50">
              Contact
            </p>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block py-3 text-porcelain transition-colors duration-200 ease-seat hover:text-porcelain/80"
            >
              Message us on WhatsApp
            </a>
            <p className="mt-4 text-lg text-porcelain" dir="ltr">
              {clinic.phoneDisplay}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-porcelain/70">
              {clinic.hours.weekdays}
              <br />
              {clinic.hours.saturday}
              <br />
              {clinic.hours.closed}
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-porcelain/15 pt-7 text-xs text-porcelain/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {clinic.name}. A design concept — not a real clinic.
          </p>
          {navigation.footer.legal.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-block px-2 py-4 underline underline-offset-4 transition-colors duration-200 ease-seat hover:text-porcelain"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <p className="mt-4 flex flex-wrap items-center gap-3 text-xs text-porcelain/40">
          <span>
            Built by{" "}
            <a
              href="https://instagram.com/choaibhamoud"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-porcelain/60 underline underline-offset-4 transition-colors duration-200 ease-seat hover:text-porcelain"
            >
              Choaib Hamoud
            </a>
          </span>
          <span className="flex items-center gap-2">
            <a
              href="https://instagram.com/choaibhamoud"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram — @choaibhamoud"
              className="inline-flex h-9 w-9 items-center justify-center rounded-[0.5rem] border border-porcelain/15 text-porcelain/40 transition-colors duration-200 ease-seat hover:border-porcelain/40 hover:text-porcelain"
            >
              <InstagramIcon size={16} />
            </a>
            <a
              href="https://www.facebook.com/h001000000"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="inline-flex h-9 w-9 items-center justify-center rounded-[0.5rem] border border-porcelain/15 text-porcelain/40 transition-colors duration-200 ease-seat hover:border-porcelain/40 hover:text-porcelain"
            >
              <FacebookIcon size={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/choaibhamoud/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex h-9 w-9 items-center justify-center rounded-[0.5rem] border border-porcelain/15 text-porcelain/40 transition-colors duration-200 ease-seat hover:border-porcelain/40 hover:text-porcelain"
            >
              <LinkedInIcon size={16} />
            </a>
          </span>
        </p>
      </div>
    </footer>
  );
}



