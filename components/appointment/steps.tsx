import { type ReactNode } from "react";
import {
  CategoryIcon,
  categoryColor,
} from "@/components/ui/icons";
import { treatments } from "@/content/treatments";
import { doctors } from "@/content/doctors";
import {
  stateEntries,
  treatmentLabel,
  doctorLabel,
  wizardHref,
  buildMessage,
  type WizardState,
} from "@/lib/wizard";
import DetailsFields from "@/components/appointment/DetailsFields";
import WizardDateField from "@/components/appointment/WizardDateField";
import { clinic } from "@/content/clinic";
import { telUrl, whatsappUrl } from "@/lib/links";

function HiddenState({ state }: { state: WizardState }) {
  return (
    <>
      {stateEntries(state).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}
    </>
  );
}

function StepHeading({ children }: { children: string }) {
  return (
    <h2
      data-step-heading
      tabIndex={-1}
      className="font-display text-section-heading text-navy focus:outline-none"
    >
      {children}
    </h2>
  );
}

const cardClass =
  "block cursor-pointer rounded-card border border-titanium/25 bg-porcelain p-5 transition-[transform,border-color,background-color] duration-200 ease-seat peer-checked:border-teal peer-checked:bg-teal-soft peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-teal";

function RadioCard({
  name,
  value,
  checked,
  required,
  className = "",
  children,
}: {
  name: string;
  value: string;
  checked: boolean;
  required?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label className="block cursor-pointer">
      <input
        type="radio"
        name={name}
        value={value}
        defaultChecked={checked}
        required={required}
        className="peer sr-only"
      />
      <span className={`${cardClass} ${className}`}>{children}</span>
    </label>
  );
}

function ContinueButton() {
  return (
    <button
      type="submit"
      className="rounded-pill bg-teal px-7 py-4 font-semibold text-porcelain transition-[transform,background-color,border-color] duration-200 ease-seat hover:bg-teal-deep active:scale-[0.98]"
    >
      Continue
    </button>
  );
}

function BackLink({ state, step }: { state: WizardState; step: number }) {
  return (
    <a
      href={wizardHref(state, step)}
      className="rounded-pill border border-teal/50 px-6 py-4 text-teal-deep transition-[background-color,border-color] hover:bg-teal-soft/50 duration-200 ease-seat active:scale-[0.98]"
    >
      Back
    </a>
  );
}

function TreatmentStep({ state }: { state: WizardState }) {
  return (
    <form method="get" action="/appointment" className="grid gap-8">
      <HiddenState state={{ ...state, treatment: undefined }} />
      <input type="hidden" name="step" value="2" />
      <StepHeading>What can we help with?</StepHeading>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {treatments.map((treatment) => (
          <RadioCard
            key={treatment.slug}
            name="treatment"
            value={treatment.slug}
            checked={state.treatment === treatment.slug}
          >
            <span
              className={`block ${categoryColor[treatment.colorKey]}`}
            >
              <CategoryIcon name={treatment.iconKey} />
            </span>
            <span className="mt-3 block font-display text-card-heading text-navy">
              {treatment.title}
            </span>
            <span className="mt-1.5 block text-sm leading-relaxed text-slate">
              {treatment.blurb}
            </span>
          </RadioCard>
        ))}
      </div>

      <RadioCard
        name="treatment"
        value="unsure"
        checked={state.treatment === "unsure"}
        className="border-teal bg-teal-soft/60"
      >
        <span className="block font-display text-card-heading text-navy">
          I&apos;m not sure
        </span>
        <span className="mt-1.5 block text-sm leading-relaxed text-slate">
          Not sure what you need? That&apos;s completely fine — request a
          consultation and we&apos;ll guide you.
        </span>
      </RadioCard>

      <div>
        <ContinueButton />
      </div>
    </form>
  );
}

function DoctorStep({ state }: { state: WizardState }) {
  const covering =
    state.treatment && state.treatment !== "unsure"
      ? doctors.filter((d) =>
          (treatments
            .find((t) => t.slug === state.treatment)
            ?.doctorIds as readonly string[] | undefined
          )?.includes(d.id),
        )
      : doctors;
  const list = covering.length > 0 ? covering : doctors;

  return (
    <form method="get" action="/appointment" className="grid gap-8">
      <HiddenState state={{ ...state, doctor: undefined }} />
      <input type="hidden" name="step" value="3" />
      <StepHeading>Preferred dentist</StepHeading>
      <p className="max-w-2xl text-slate">
        {state.treatment && state.treatment !== "unsure"
          ? `These dentists cover ${treatmentLabel(state.treatment)}.`
          : "Any of our dentists can help at a consultation."}
      </p>

      <fieldset className="grid gap-4 sm:grid-cols-2">
        <legend className="sr-only">Preferred dentist</legend>
        {list.map((doctor) => (
          <RadioCard
            key={doctor.id}
            name="doctor"
            value={doctor.id}
            checked={state.doctor === doctor.id}
          >
            <span className="block font-display text-card-heading text-navy">
              {doctor.name}
            </span>
            <span className="mt-1 block text-sm text-slate">{doctor.role}</span>
          </RadioCard>
        ))}
        <RadioCard name="doctor" value="any" checked={state.doctor === "any"}>
          <span className="block font-display text-card-heading text-navy">
            No preference
          </span>
          <span className="mt-1 block text-sm text-slate">
            We&apos;ll match you with the right dentist.
          </span>
        </RadioCard>
      </fieldset>

      <div className="flex flex-wrap gap-4">
        <ContinueButton />
        <BackLink state={state} step={1} />
      </div>
    </form>
  );
}

function TimeStep({
  state,
  raw,
  errors,
  dateMin,
  dateMax,
}: {
  state: WizardState;
  raw: { date: string };
  errors: { day?: string; time?: string; date?: string };
  dateMin: string;
  dateMax: string;
}) {
  const dayErrorId = "wizard-day-error";
  const timeErrorId = "wizard-time-error";
  return (
    <form method="get" action="/appointment" className="grid gap-8">
      <HiddenState
        state={{ ...state, day: undefined, time: undefined, date: undefined }}
      />
      <input type="hidden" name="step" value="4" />
      <StepHeading>Preferred time</StepHeading>
      <p aria-live="polite" className="sr-only">
        {errors.day || errors.time || errors.date
          ? [errors.day, errors.time, errors.date].filter(Boolean).join(" ")
          : ""}
      </p>

      <fieldset
        className="grid max-w-xl gap-3 sm:grid-cols-2"
        aria-describedby={errors.day ? dayErrorId : undefined}
      >
        <legend className="text-eyebrow text-titanium">
          Part of the week <span className="normal-case text-slate">(required)</span>
        </legend>
        {(["weekday", "weekend"] as const).map((value, i) => (
          <RadioCard
            key={value}
            name="day"
            value={value}
            checked={state.day === value}
            required={i === 0}
          >
            <span className="block font-semibold text-navy">
              {value === "weekday" ? "A weekday" : "A weekend"}
            </span>
          </RadioCard>
        ))}
      </fieldset>
      {errors.day ? (
        <p id={dayErrorId} className="-mt-4 text-sm text-red-700">
          {errors.day}
        </p>
      ) : null}

      <fieldset
        className="grid max-w-xl gap-3 sm:grid-cols-2"
        aria-describedby={errors.time ? timeErrorId : undefined}
      >
        <legend className="text-eyebrow text-titanium">
          Time of day <span className="normal-case text-slate">(required)</span>
        </legend>
        {(["morning", "afternoon"] as const).map((value, i) => (
          <RadioCard
            key={value}
            name="time"
            value={value}
            checked={state.time === value}
            required={i === 0}
          >
            <span className="block font-semibold text-navy">
              {value === "morning" ? "Morning" : "Afternoon"}
            </span>
          </RadioCard>
        ))}
      </fieldset>
      {errors.time ? (
        <p id={timeErrorId} className="-mt-4 text-sm text-red-700">
          {errors.time}
        </p>
      ) : null}

      <WizardDateField
        defaultDate={raw.date}
        min={dateMin}
        max={dateMax}
        serverError={errors.date}
        dayPref={state.day}
      />

      <div className="flex flex-wrap gap-4">
        <ContinueButton />
        <BackLink state={state} step={2} />
      </div>
    </form>
  );
}

function DetailsStep({
  state,
  raw,
  errors,
}: {
  state: WizardState;
  raw: { name: string; phone: string; note: string };
  errors: { name?: string; phone?: string; note?: string };
}) {
  return (
    <form method="get" action="/appointment" className="grid gap-8">
      <HiddenState
        state={{ ...state, name: undefined, phone: undefined, note: undefined }}
      />
      <input type="hidden" name="step" value="5" />
      <StepHeading>Your details</StepHeading>

      <DetailsFields
        defaultName={raw.name}
        defaultPhone={raw.phone}
        defaultNote={raw.note}
        serverErrors={errors}
      />

      <div className="flex flex-wrap gap-4">
        <ContinueButton />
        <BackLink state={state} step={3} />
      </div>
    </form>
  );
}

function ReviewStep({ state }: { state: WizardState }) {
  const rows = [
    { label: "Treatment", value: treatmentLabel(state.treatment), step: 1 },
    { label: "Dentist", value: doctorLabel(state.doctor), step: 2 },
    {
      label: "Preferred time",
      value:
        ([state.day, state.time].filter(Boolean).join(", ") ||
          "No preference") + (state.date ? ` — ${state.date}` : ""),
      step: 3,
    },
    { label: "Name", value: state.name ?? "Not provided yet", step: 4 },
    { label: "Phone", value: state.phone ?? "Not provided yet", step: 4 },
    ...(state.note ? [{ label: "Note", value: state.note, step: 4 }] : []),
  ];

  return (
    <div className="grid gap-8">
      <StepHeading>Review your request</StepHeading>

      <dl className="max-w-2xl divide-y divide-titanium/15 rounded-card border border-titanium/15 bg-porcelain">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-start justify-between gap-6 p-5"
          >
            <div>
              <dt className="text-eyebrow text-titanium">{row.label}</dt>
              <dd className="mt-1 text-navy">{row.value}</dd>
            </div>
            <a
              href={wizardHref(state, row.step)}
              className="inline-block shrink-0 py-3 text-sm font-semibold text-teal underline underline-offset-4 transition-colors duration-200 ease-seat hover:text-teal-deep"
            >
              Edit
            </a>
          </div>
        ))}
      </dl>

      <div className="rounded-card border border-titanium/15 bg-bone/30 p-5">
        <p className="text-xs uppercase tracking-widest text-titanium">
          Message preview — exactly as the clinic will receive it
        </p>
        <pre className="mt-3 whitespace-pre-wrap break-words rounded-card border border-titanium/15 bg-porcelain p-4 font-mono text-sm leading-relaxed text-navy">
          {buildMessage(state)}
        </pre>
      </div>

      <div className="max-w-2xl rounded-card bg-navy-deep p-6 md:p-8">
        <p className="font-display text-card-heading text-porcelain">
          Ready to send?
        </p>
        <p className="mt-3 text-sm leading-relaxed text-porcelain/70">
          Pressing send opens WhatsApp on this device with your request already
          written. Nothing is sent until you press send inside WhatsApp. If you
          don&apos;t use WhatsApp, call the clinic on{" "}
          <a
            href={telUrl}
            className="font-semibold text-porcelain underline underline-offset-4"
            dir="ltr"
          >
            {clinic.phoneDisplay}
          </a>{" "}
          during opening hours.
        </p>
        <a
          href={whatsappUrl(buildMessage(state))}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block rounded-pill bg-teal px-8 py-4 font-semibold text-porcelain transition-[transform,background-color,border-color] duration-200 ease-seat hover:bg-teal-deep active:scale-[0.98]"
        >
          Continue on WhatsApp
        </a>
        <p className="mt-5 text-sm text-porcelain/70">
          Prefer to talk? Call{" "}
          <a
            href={telUrl}
            className="font-semibold text-porcelain underline underline-offset-4"
            dir="ltr"
          >
            {clinic.phoneDisplay}
          </a>{" "}
          during opening hours.
        </p>
      </div>

      <div>
        <BackLink state={state} step={4} />
      </div>
    </div>
  );
}

export function StepContent({
  step,
  state,
  raw,
  errors,
  dateMin,
  dateMax,
}: {
  step: number;
  state: WizardState;
  raw: { name: string; phone: string; note: string; date: string };
  errors: {
    name?: string;
    phone?: string;
    note?: string;
    day?: string;
    time?: string;
    date?: string;
  };
  dateMin: string;
  dateMax: string;
}) {
  switch (step) {
    case 1:
      return <TreatmentStep state={state} />;
    case 2:
      return <DoctorStep state={state} />;
    case 3:
      return (
        <TimeStep
          state={state}
          raw={{ date: raw.date }}
          errors={errors}
          dateMin={dateMin}
          dateMax={dateMax}
        />
      );
    case 4:
      return <DetailsStep state={state} raw={raw} errors={errors} />;
    default:
      return <ReviewStep state={state} />;
  }
}
