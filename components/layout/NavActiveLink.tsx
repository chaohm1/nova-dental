"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

export default function NavActiveLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative px-3 py-3 text-sm after:absolute after:inset-x-3 after:bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-teal after:transition-transform after:duration-200 after:ease-seat hover:after:scale-x-100",
        !active && "text-slate hover:text-navy",
        active && "text-navy after:scale-x-100",
      )}
    >
      {label}
    </Link>
  );
}
