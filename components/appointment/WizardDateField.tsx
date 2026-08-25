"use client";

import { useState } from "react";
import { validateDate } from "@/lib/field-schemas";

export default function WizardDateField({
  defaultDate,
  min,
  max,
  serverError,
  dayPref,
}: {
  defaultDate: string;
  min: string;
  max: string;
  serverError?: string;
  dayPref?: "weekday" | "weekend";
}) {
  const [error, setError] = useState(serverError);

  const helper =
    dayPref === "weekday"
      ? `Optional — pick a weekday between ${min} and ${max}.`
      : dayPref === "weekend"
        ? `Optional — pick a Saturday or Sunday between ${min} and ${max}.`
        : `Optional — pick a date within the next 7 days (${min} – ${max}).`;

  const blur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value) {
      setError(undefined);
      return;
    }
    const day = document.querySelector<HTMLInputElement>(
      'input[name="day"]:checked',
    )?.value as "weekday" | "weekend" | undefined;
    const message = validateDate(value, day, min);
    setError(message);
    if (message) {
      const live = document.getElementById("wizard-date-live");
      if (live) live.textContent = message;
    }
  };

  return (
    <div>
      <label htmlFor="wizard-date" className="text-eyebrow text-titanium">
        A specific date{" "}
        <span className="normal-case text-slate">(optional)</span>
      </label>
      <input
        id="wizard-date"
        type="date"
        name="date"
        min={min}
        max={max}
        defaultValue={defaultDate}
        onBlur={blur}
        aria-invalid={error ? true : undefined}
        aria-describedby={
          error ? "wizard-date-error wizard-date-hint" : "wizard-date-hint"
        }
        className="mt-3 w-full rounded-card border border-titanium/25 bg-porcelain px-4 py-3.5 text-navy transition-[border-color] duration-200 ease-seat focus:border-teal focus:outline-none"
      />
      <p id="wizard-date-hint" className="mt-2 text-sm leading-relaxed text-slate">
        {helper}
      </p>
      {error ? (
        <p id="wizard-date-error" className="mt-1 text-sm text-red-700">
          {error}
        </p>
      ) : null}
      <p id="wizard-date-live" aria-live="polite" className="sr-only" />
    </div>
  );
}
