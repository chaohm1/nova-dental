"use client";

import { LazyMotion, domAnimation, m, useReducedMotion } from "motion/react";
import { AnimatePresence } from "motion/react";
import { useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";

export default function WizardChrome({
  step,
  title,
  children,
}: {
  step: number;
  title: string;
  children: ReactNode;
}) {
  const reduce = useReducedMotion();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [prevStep, setPrevStep] = useState(step);

  if (prevStep !== step) {
    setPrevStep(step);
  }
  const dir = step >= prevStep ? 1 : -1;

  const focusHeading = () => {
    const container = containerRef.current;
    if (!container) return;
    let tries = 0;
    const poll = () => {
      const heading = container.querySelector<HTMLElement>("[data-step-heading]");
      if (heading) {
        heading.focus({ preventScroll: true });
        return;
      }
      if (tries++ < 30) requestAnimationFrame(poll);
    };
    requestAnimationFrame(poll);
  };

  const intercept = (href: string) => {
    if (/^\/appointment\?/.test(href)) {
      router.push(href);
      return true;
    }
    return false;
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <p aria-live="polite" className="sr-only">
        Step {step} of 5: {title}
      </p>

      <p className="text-eyebrow text-titanium">
        Step {step} of 5 — {title}
      </p>

      <div
        ref={containerRef}
        onSubmitCapture={(event) => {
          const form = event.target as HTMLFormElement;
          if (form.method.toLowerCase() !== "get") return;
          event.preventDefault();
          form.dataset.pending = "true";
          const params = new URLSearchParams();
          new FormData(form).forEach((value, key) => {
            const v = String(value);
            if (v !== "") params.set(key, v);
          });
          router.push(`/appointment?${params.toString()}`);
        }}
        onClickCapture={(event) => {
          const anchor = (event.target as HTMLElement).closest("a");
          if (!anchor) return;
          const href = anchor.getAttribute("href");
          if (!href || anchor.target === "_blank") return;
          if (intercept(href)) event.preventDefault();
        }}
      >
        <AnimatePresence
          mode="wait"
          initial={false}
          onExitComplete={focusHeading}
        >
          <m.div
            key={step}
            initial={
              reduce
                ? { opacity: 0 }
                : { opacity: 0, x: 24 * dir }
            }
            animate={
              reduce
                ? { opacity: 1, transition: { duration: 0 } }
                : {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
                  }
            }
            exit={
              reduce
                ? { opacity: 0, transition: { duration: 0 } }
                : {
                    opacity: 0,
                    x: -24 * dir,
                    transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
                  }
            }
          >
            {children}
          </m.div>
        </AnimatePresence>
      </div>
    </LazyMotion>
  );
}
