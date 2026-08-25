import Link from "next/link";
import Image from "next/image";
import { Phone } from "lucide-react";
import NavActiveLink from "@/components/layout/NavActiveLink";
import { navigation } from "@/content/navigation";
import { telUrl } from "@/lib/links";

export default function Header() {
  return (
    <div className="fixed inset-x-0 top-0 z-40 px-4 pt-3 md:px-6 md:pt-4">
      <header className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 rounded-card border border-porcelain/60 bg-porcelain/70 px-4 backdrop-blur-xl md:gap-5 md:px-6">
        <Link
          href="/"
          aria-label="NOVA Dental — home"
          className="flex shrink-0 items-center gap-2.5"
        >
          <Image
            src="/logo.png"
            alt=""
            width={44}
            height={44}
            className="h-11 w-11 rounded-[0.6875rem]"
          />
          <span className="font-display text-lg leading-none text-navy md:text-xl">
            NOVA
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-5 lg:flex">
          {navigation.nav.map((link) => (
            <NavActiveLink key={link.href} href={link.href} label={link.label} />
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={telUrl}
            aria-label="Call the clinic"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-[0.6875rem] border border-teal/50 px-3 text-teal-deep transition-[background-color,border-color] duration-200 ease-seat hover:bg-teal-soft/50 sm:px-4"
          >
            <Phone strokeWidth={1.5} size={18} aria-hidden="true" />
            <span className="hidden text-sm md:inline">Call</span>
          </a>
          <Link
            href={navigation.cta.href}
            className="inline-flex h-11 items-center justify-center rounded-[0.6875rem] bg-teal px-4 text-sm text-porcelain transition-[background-color] duration-200 ease-seat hover:bg-teal-deep md:px-5"
          >
            <span>{navigation.cta.short}</span>
          </Link>
        </div>
      </header>
    </div>
  );
}
