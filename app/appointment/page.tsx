import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import WizardChrome from "@/components/appointment/WizardChrome";
import { StepContent } from "@/components/appointment/steps";
import { clinic } from "@/content/clinic";
import { telUrl } from "@/lib/links";
import { breadcrumbSchema } from "@/lib/breadcrumb";
import {
  resolveStep,
  stepTitles,
  wizardSchema,
} from "@/lib/wizard";
import {
  validateName,
  validatePhone,
  validateNote,
  validateDate,
  addDays,
} from "@/lib/field-schemas";

export const metadata: Metadata = {
  title: "Request an appointment",
  alternates: { canonical: "/appointment" },
  description:
    "Request an appointment in about a minute. Your request opens as a ready-made WhatsApp message — nothing is stored on this website.",
};

function rawString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

export default async function AppointmentPage({
  searchParams,
}: PageProps<"/appointment">) {
  const raw = await searchParams;
  const state = wizardSchema.parse(raw);
  const today = new Date().toISOString().slice(0, 10);
  const dateMax = addDays(today, 7);
  const step = state.step ?? resolveStep(state);

  const rawDetails = {
    name: rawString(raw.name),
    phone: rawString(raw.phone),
    note: rawString(raw.note),
    date: rawString(raw.date),
  };

  const timeAttempted = state.step !== undefined && state.step > 3;
  const dayCheck = state.day ? undefined : "Choose a day preference.";
  const timeCheck = state.time ? undefined : "Choose a time preference.";
  const timeErrors =
    timeAttempted && (dayCheck || timeCheck) ? { day: dayCheck, time: timeCheck } : {};

  const detailsAttempted = state.step !== undefined && state.step > 4;
  const checks = {
    name: validateName(rawDetails.name),
    phone: validatePhone(rawDetails.phone),
    note: validateNote(rawDetails.note),
  };
  const detailsErrors = detailsAttempted
    ? {
        name: checks.name,
        phone: checks.phone,
        note: rawDetails.note === "" ? undefined : checks.note,
      }
    : {};
  const detailsValid = !checks.name && !checks.phone && !checks.note;

  const dateError =
    state.date && state.day && state.time
      ? validateDate(state.date, state.day, today)
      : undefined;
  const dateInvalid = Boolean(state.date && (dateError || !state.day || !state.time));
  const effectiveState = dateInvalid ? { ...state, date: undefined } : state;

  const effectiveStep = timeErrors.day || timeErrors.time
    ? 3
    : detailsAttempted && !detailsValid
      ? 4
      : dateError
        ? 3
        : step;

  const serverErrors = {
    ...detailsErrors,
    ...timeErrors,
    date: effectiveStep === 3 ? dateError : undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: "/" },
              { name: "Request an appointment", url: "/appointment" },
            ]),
          ),
        }}
      />

      <PageHeader
        eyebrow="Appointments"
        title="Request an appointment"
        lede="Five short steps, about a minute. Your answers open as a ready-made WhatsApp message — nothing is stored on this website, and you can call instead at any point."
      />

      <div className="mx-auto max-w-6xl px-6 pb-24 md:px-10">
        <div className="mx-auto max-w-3xl">
          <WizardChrome step={effectiveStep} title={stepTitles[effectiveStep - 1]}>
            <StepContent
              step={effectiveStep}
              state={effectiveState}
              raw={rawDetails}
              errors={serverErrors}
              dateMin={today}
              dateMax={dateMax}
            />
          </WizardChrome>

          <p className="mt-12 border-t border-titanium/15 pt-6 text-sm text-slate">
            Rather talk than type? Call{" "}
            <a
              href={telUrl}
              className="font-semibold text-navy underline underline-offset-4 transition-colors duration-200 ease-seat hover:text-teal-deep"
              dir="ltr"
            >
              {clinic.phoneDisplay}
            </a>{" "}
            during opening hours — the phone works exactly as well as the form.
          </p>
        </div>
      </div>
    </>
  );
}
