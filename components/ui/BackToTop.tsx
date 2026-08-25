"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [mounted, setMounted] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 0) setMounted(true);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const footer = document.querySelector("footer");
    let observer: IntersectionObserver | undefined;
    if (footer) {
      observer = new IntersectionObserver(([entry]) => setFooterVisible(entry.isIntersecting));
      observer.observe(footer);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer?.disconnect();
    };
  }, []);

  const show = mounted && !footerVisible;

  if (!mounted) return null;

  return (
    <div
      className={`fixed bottom-6 end-6 z-30 transition-[opacity,transform] duration-[var(--dur-base)] ease-seat ${
        show
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2 opacity-0"
      }`}
      aria-hidden={!show}
    >
      <button
        type="button"
        tabIndex={show ? 0 : -1}
        onClick={() => {
          window.scrollTo({ top: 0 });
          document.getElementById("main")?.focus();
        }}
        aria-label="Back to top"
        className="flex h-12 w-12 items-center justify-center rounded-full border border-titanium/20 bg-porcelain text-navy transition-[background-color,border-color] duration-200 ease-seat hover:border-titanium/40 hover:bg-bone active:scale-[0.95]"
      >
        <ArrowUp strokeWidth={1.5} size={20} aria-hidden="true" />
      </button>
    </div>
  );
}
