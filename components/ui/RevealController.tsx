"use client";

import { useEffect } from "react";

const SELECTOR = ".reveal, .reveal-up, .reveal-left, .reveal-right, .reveal-scale, .reveal-blur, .reveal-line, .reveal-stagger > *";

export default function RevealController() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!document.querySelector(SELECTOR)) return;

    document.documentElement.classList.add("reveal-io");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          } else {
            entry.target.classList.remove("is-visible");
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" },
    );

    for (const target of document.querySelectorAll<HTMLElement>(SELECTOR)) {
      observer.observe(target);
    }

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("reveal-io");
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    let interval: ReturnType<typeof setInterval> | undefined;
    const cleanups: (() => void)[] = [];

    const realign = () => {
      if (!location.hash) return;
      const id = decodeURIComponent(location.hash.slice(1));
      const target = id ? document.getElementById(id) : null;
      if (!target) return;

      let userScrolled = false;
      const mark = () => { userScrolled = true; };
      window.addEventListener("wheel", mark, { passive: true, once: true });
      window.addEventListener("touchmove", mark, { passive: true, once: true });
      window.addEventListener("keydown", mark, { passive: true, once: true });
      cleanups.push(() => {
        window.removeEventListener("wheel", mark);
        window.removeEventListener("touchmove", mark);
        window.removeEventListener("keydown", mark);
      });

      let last = -1;
      let stable = 0;
      let elapsed = 0;
      interval = setInterval(() => {
        elapsed += 100;
        const y = window.scrollY;
        if (Math.abs(y - last) < 1) stable++; else stable = 0;
        last = y;
        if (stable < 3 && elapsed < 3000 && !userScrolled) return;
        if (interval) clearInterval(interval);
        if (userScrolled) return;
        document.fonts.ready.then(() => {
          if (cancelled || userScrolled) return;
          if (location.hash !== `#${id}`) return;
          const htmlStyle = getComputedStyle(document.documentElement);
          const targetStyle = getComputedStyle(target);
          const expected =
            parseFloat(htmlStyle.scrollPaddingTop) +
            parseFloat(targetStyle.scrollMarginTop);
          const actual = target.getBoundingClientRect().top;
          if (Math.abs(actual - expected) > 4) {
            target.scrollIntoView({ block: "start", behavior: "instant" });
          }
        });
      }, 100);
    };

    realign();
    window.addEventListener("hashchange", realign);
    return () => {
      cancelled = true;
      if (interval) clearInterval(interval);
      cleanups.forEach((fn) => fn());
      window.removeEventListener("hashchange", realign);
    };
  }, []);

  return null;
}
