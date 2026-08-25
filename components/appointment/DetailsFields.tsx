"use client";

import { useState } from "react";
import {
  validateName,
  validatePhone,
  validateNote,
} from "@/lib/field-schemas";

const flashTimers = new Map<string, ReturnType<typeof setTimeout>>();

const phoneHtmlPattern = "[0+][0-9\\s.-]{9,18}";
type FieldErrors = { name?: string; phone?: string; note?: string };
type FieldKey = "name" | "phone" | "note";
const FLASH_MS = 3500;

export default function DetailsFields({
  defaultName,
  defaultPhone,
  defaultNote,
  serverErrors,
}: {
  defaultName: string;
  defaultPhone: string;
  defaultNote: string;
  serverErrors: FieldErrors;
}) {
  const [errors, setErrors] = useState<FieldErrors>(serverErrors);
  const [noteLen, setNoteLen] = useState(defaultNote.length);
  const [announce, setAnnounce] = useState("");

  const flashError = (key: FieldKey, message: string | undefined) => {
    const existing = flashTimers.get(key);
    if (existing) clearTimeout(existing);
    setErrors((prev) => ({ ...prev, [key]: message }));
    if (message) {
      flashTimers.set(key, setTimeout(() => {
        setErrors((prev) => ({ ...prev, [key]: undefined }));
        flashTimers.delete(key);
      }, FLASH_MS));
    }
  };

  const editHandler = (key: FieldKey) => () => {
    const existing = flashTimers.get(key);
    if (existing) clearTimeout(existing);
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validateField = (field: FieldKey, value: string) => {
    if (field === "name") return validateName(value);
    if (field === "phone") return validatePhone(value);
    return validateNote(value);
  };

  const errorCount = Object.values(errors).filter(Boolean).length;

  const inputClass = (invalid: boolean) =>
    `w-full rounded-card border bg-porcelain px-4 py-3.5 text-navy transition-[border-color] duration-200 ease-seat focus:outline-none ${
      invalid
        ? "border-red-700 focus:border-red-700 focus:shadow-[0_0_0_3px_rgba(185,28,28,0.12)]"
        : "border-titanium/25 focus:border-teal focus:shadow-[0_0_0_3px_rgba(23,114,107,0.12)]"
    }`;

  const blurHandlers = {
    name: (e: React.FocusEvent<HTMLInputElement>) => {
      const msg = validateField("name", e.target.value);
      flashError("name", msg);
      if (msg) setAnnounce(`Name: ${msg}`);
    },
    phone: (e: React.FocusEvent<HTMLInputElement>) => {
      const msg = validateField("phone", e.target.value);
      flashError("phone", msg);
      if (msg) setAnnounce(`Phone: ${msg}`);
    },
    note: (e: React.FocusEvent<HTMLTextAreaElement>) => {
      const msg = validateField("note", e.target.value);
      flashError("note", msg);
      setNoteLen(e.target.value.length);
      if (msg) setAnnounce(`Note: ${msg}`);
    },
  };

  return (
    <div className="grid max-w-xl gap-6">
      <p aria-live="polite" className="sr-only">
        {announce ||
          (errorCount > 0
            ? `${errorCount} ${errorCount === 1 ? "field needs" : "fields need"} attention.`
            : "")}
      </p>

      <div className="rounded-card border border-teal/15 bg-teal-soft/40 px-4 py-3">
        <p className="text-sm leading-relaxed text-slate">
          Your answers stay in this page&apos;s address bar and are not stored
          on any server. They travel only to WhatsApp when you press send.{" "}
          <a
            href="/privacy"
            className="font-semibold text-teal underline underline-offset-4 hover:text-teal-deep"
          >
            Read the privacy note
          </a>
          .
        </p>
      </div>

      <div>
        <label
          htmlFor="wizard-name"
          className="mb-2 block text-eyebrow text-titanium"
        >
          Your name
        </label>
        <input
          id="wizard-name"
          type="text"
          name="name"
          required
          minLength={2}
          maxLength={60}
          autoComplete="name"
          defaultValue={defaultName}
          onBlur={blurHandlers.name}
          onInput={editHandler("name")}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "wizard-name-error" : undefined}
          className={inputClass(Boolean(errors.name))}
        />
        {errors.name ? (
          <p id="wizard-name-error" className="mt-2 text-sm text-red-700 transition-opacity duration-300">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div>
        <label
          htmlFor="wizard-phone"
          className="mb-2 block text-eyebrow text-titanium"
        >
          Your phone number
        </label>
        <input
          id="wizard-phone"
          type="tel"
          name="phone"
          required
          autoComplete="tel"
          inputMode="tel"
          pattern={phoneHtmlPattern}
          defaultValue={defaultPhone}
          onBlur={blurHandlers.phone}
          onInput={editHandler("phone")}
          aria-invalid={errors.phone ? true : undefined}
          aria-describedby={
            errors.phone ? "wizard-phone-error wizard-phone-hint" : "wizard-phone-hint"
          }
          className={inputClass(Boolean(errors.phone))}
          dir="ltr"
        />
        <p id="wizard-phone-hint" className="mt-2 text-sm leading-relaxed text-slate">
          So the clinic can call you back — 10 digits starting with 0, or
          +213 followed by 9 digits. It does not need to be a WhatsApp number.
        </p>
        {errors.phone ? (
          <p id="wizard-phone-error" className="mt-1 text-sm text-red-700 transition-opacity duration-300">
            {errors.phone}
          </p>
        ) : null}
      </div>

      <div>
        <label
          htmlFor="wizard-note"
          className="mb-2 block text-eyebrow text-titanium"
        >
          Anything we should know?{" "}
          <span className="normal-case">(optional)</span>
        </label>
        <textarea
          id="wizard-note"
          name="note"
          rows={3}
          maxLength={300}
          defaultValue={defaultNote}
          onBlur={blurHandlers.note}
          onInput={(e) => {
            setNoteLen(e.currentTarget.value.length);
            editHandler("note")();
          }}
          aria-invalid={errors.note ? true : undefined}
          aria-describedby={
            errors.note ? "wizard-note-error wizard-note-counter" : "wizard-note-counter"
          }
          className={inputClass(Boolean(errors.note))}
        />
        <p
          id="wizard-note-counter"
          className="mt-2 text-right text-xs text-slate"
          aria-hidden="true"
        >
          {noteLen}/300
        </p>
        {errors.note ? (
          <p id="wizard-note-error" className="-mt-4 text-sm text-red-700 transition-opacity duration-300">
            {errors.note}
          </p>
        ) : null}
      </div>
    </div>
  );
}

