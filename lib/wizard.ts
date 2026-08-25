import { z } from "zod";
import { treatments } from "@/content/treatments";
import { doctors } from "@/content/doctors";
import {
  nameRule,
  phoneRule,
  noteRule,
} from "@/lib/field-schemas";

const treatmentValues = [
  ...treatments.map((t) => t.slug),
  "unsure",
] as const;

const doctorValues = [
  ...doctors.map((d) => d.id),
  "any",
] as const;

export const stepTitles = [
  "What can we help with?",
  "Preferred dentist",
  "Preferred time",
  "Your details",
  "Review",
] as const;

export const wizardSchema = z.object({
  treatment: z.enum(treatmentValues).optional().catch(undefined),
  doctor: z.enum(doctorValues).optional().catch(undefined),
  day: z.enum(["weekday", "weekend"]).optional().catch(undefined),
  time: z.enum(["morning", "afternoon"]).optional().catch(undefined),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional()
    .catch(undefined),
  name: z
    .string()
    .trim()
    .min(nameRule.min, nameRule.message)
    .max(nameRule.max, nameRule.message)
    .optional()
    .catch(undefined),
  phone: z
    .string()
    .transform((v) => v.replace(/[\s.-]/g, ""))
    .pipe(z.string().regex(phoneRule.pattern, phoneRule.message))
    .optional()
    .catch(undefined),
  note: z
    .string()
    .trim()
    .max(noteRule.max, noteRule.message)
    .optional()
    .catch(undefined)
    .transform((v) => v || undefined),
  step: z.coerce.number().int().min(1).max(5).optional().catch(undefined),
});

export type WizardState = z.infer<typeof wizardSchema>;

const fields = [
  "treatment",
  "doctor",
  "day",
  "time",
  "date",
  "name",
  "phone",
  "note",
] as const;

export function resolveStep(s: WizardState): number {
  if (!s.treatment) return 1;
  if (!s.doctor) return 2;
  if (!s.day || !s.time) return 3;
  if (!s.name || !s.phone) return 4;
  return 5;
}

export function stateEntries(s: WizardState): [string, string][] {
  return fields.flatMap((f) => (s[f] ? [[f, String(s[f])]] : []));
}

export function wizardHref(s: WizardState, step: number): string {
  const sp = new URLSearchParams(stateEntries(s));
  sp.set("step", String(step));
  return `/appointment?${sp.toString()}`;
}

export function treatmentLabel(slug: string | undefined): string {
  if (!slug || slug === "unsure") return "Not sure yet — consultation";
  return treatments.find((t) => t.slug === slug)?.title ?? "Consultation";
}

export function doctorLabel(id: string | undefined): string {
  if (!id || id === "any") return "No preference";
  return doctors.find((d) => d.id === id)?.name ?? "No preference";
}

export function buildMessage(s: WizardState): string {
  const when = [s.day, s.time].filter(Boolean).join(", ");
  const whenLine = s.date
    ? when
      ? `${when} — ${s.date}`
      : s.date
    : when;

  const lines = [
    "Hello NOVA Dental,",
    "I'd like to request an appointment.",
    "",
    `Treatment: ${treatmentLabel(s.treatment)}`,
    `Dentist: ${doctorLabel(s.doctor)}`,
    `Preferred time: ${whenLine || "No preference"}`,
    `Name: ${s.name ?? "-"}`,
    `Phone: ${s.phone ?? "-"}`,
  ];
  if (s.note) lines.push(`Note: ${s.note}`);
  return lines.join("\n");
}
