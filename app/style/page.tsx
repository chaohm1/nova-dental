import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import TokenGrid from "@/components/style/TokenGrid";
import {
  CategoryIcon,
  categoryColor,
  categoryIcons,
  stepIcons,
  whyIcons,
} from "@/components/ui/icons";
import { stepTitles } from "@/lib/wizard";
import type { CategoryKey } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Style",
  description:
    "The design-system reference for the NOVA Dental template: colours, type scale, buttons, cards, forms, icons, and motion.",
  robots: { index: false },
};

const neutrals: { token: string; usage: string }[] = [
  { token: "--color-porcelain", usage: "Page background. Warm white, not paper." },
  { token: "--color-bone", usage: "Alternating section background (often /40)." },
  { token: "--color-navy", usage: "Every heading, on every surface." },
  { token: "--color-navy-deep", usage: "Footer and dark CTA bands." },
  { token: "--color-slate", usage: "Body copy — 5.75:1 on porcelain." },
  { token: "--color-titanium", usage: "Eyebrows, hairlines, micro-labels ONLY. 3.05:1 — the spec's one standing exception." },
  { token: "--color-ink", usage: "Default text colour." },
];

const accent: { token: string; usage: string }[] = [
  { token: "--color-teal", usage: "Primary actions, active states, focus rings. 5.51:1 under white text." },
  { token: "--color-teal-deep", usage: "Hover and pressed states." },
  { token: "--color-teal-soft", usage: "Tinted surfaces and selected radio cards." },
];

const categories: { token: string; usage: string }[] = [
  { token: "--color-cat-general", usage: "General dentistry." },
  { token: "--color-cat-pediatric", usage: "Children's dentistry. Note the live ratio: fails 4.5:1 as text — identity use only." },
  { token: "--color-cat-ortho", usage: "Orthodontics." },
  { token: "--color-cat-restorative", usage: "Restorative dentistry." },
  { token: "--color-cat-implant", usage: "Dental implants." },
  { token: "--color-cat-aesthetic", usage: "Aesthetic dentistry. Also fails 4.5:1 as text — borders and icons carry it." },
  { token: "--color-cat-surgery", usage: "Oral surgery." },
];

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-16 first:mt-0">
      <h2 className="font-display text-[1.5rem] text-navy">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export default function StylePage() {
  return (
    <>
      <PageHeader
        eyebrow="Reference"
        title="Style"
        lede="The living design system. Swatch values and contrast ratios are read from the compiled CSS custom properties at view time — if a token changes, this page changes with it."
      />

      <div className="mx-auto max-w-6xl px-6 pb-24 md:px-10">
        <Section title="Colour — neutral spine">
          <TokenGrid tokens={neutrals} />
        </Section>

        <Section title="Colour — accent">
          <TokenGrid tokens={accent} />
        </Section>

        <Section title="Colour — category identities (restricted use)">
          <p className="mb-6 max-w-2xl text-slate">
            Seven identities for dots, icon strokes, borders, and 8% tints.
            Never large fills, never small text — the live ratios below are
            the proof: two of the seven fail AA as text, which is why the
            rule exists.
          </p>
          <TokenGrid tokens={categories} />
        </Section>

        <Section title="Type scale (real utility classes)">
          <div className="grid gap-8">
            <div>
              <p className="text-eyebrow text-titanium">text-eyebrow</p>
              <p className="mt-2 font-display text-hero text-navy">text-hero</p>
              <p className="mt-4 font-display text-page-title text-navy">
                text-page-title
              </p>
              <p className="mt-4 font-display text-section-heading text-navy">
                text-section-heading
              </p>
              <p className="mt-4 font-display text-card-heading text-navy">
                text-card-heading
              </p>
              <p className="mt-4 text-slate">
                Body — 1.0625rem base, line-height 1.7. Seventeen pixels is
                the floor, not the target.
              </p>
              <p className="mt-2 text-sm text-slate">
                Small — 0.875rem for captions and meta.
              </p>
            </div>
          </div>
        </Section>

        <Section title="Shape and elevation">
          <p className="mb-6 max-w-2xl text-slate">
            No shadows anywhere. Elevation comes from surface change
            (porcelain → bone → navy) and hairline borders. The single
            exception: one soft shadow under photography, never on cards,
            buttons, or text.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-card border border-titanium/15 bg-porcelain p-5">
              hairline card — rounded-card
            </div>
            <div className="rounded-card border border-titanium/30 bg-bone p-5">
              surface shift — bone
            </div>
            <div className="rounded-pill border border-titanium/15 bg-porcelain px-5 py-3">
              rounded-pill (CTAs only)
            </div>
            <div className="rounded-card border border-dashed border-titanium/50 bg-bone p-5">
              dashed placeholder border
            </div>
          </div>
        </Section>

        <Section title="Motion — durations are tokens, hover to see">
          <p className="mb-6 max-w-2xl text-slate">
            One ease for everything: <code className="font-mono text-navy">--ease-seat</code>{" "}
            (cubic-bezier(0.16, 1, 0.3, 1)). Nothing bounces. Only transform
            and opacity are ever animated; <code className="font-mono text-navy">transition-all</code>{" "}
            is banned. Hover each dot:
          </p>
          <div className="flex items-center gap-8">
            {(["--dur-fast", "--dur-base", "--dur-slow"] as const).map((d) => (
              <div key={d} className="text-center">
                <div className="h-12 w-12 rounded-pill bg-teal transition-transform ease-seat hover:translate-x-16" style={{ transitionDuration: `var(${d})` }} />
                <p className="mt-2 font-mono text-xs text-slate">{d}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-2xl text-sm text-slate">
            Scroll reveals are CSS scroll-driven animations
            (animation-timeline: view()) with an IntersectionObserver
            fallback; always-running animations (the old shimmer and
            marquee) were deleted, not replaced.
          </p>
        </Section>

        <Section title="Buttons and links">
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              className="rounded-pill bg-teal px-7 py-4 font-semibold text-porcelain transition-[transform,background-color,border-color] duration-200 ease-seat hover:bg-teal-deep active:scale-[0.98]"
            >
              Primary (hover / press me)
            </button>
            <button
              type="button"
              className="rounded-pill border border-teal/50 px-7 py-4 text-teal-deep hover:bg-teal-soft/50 transition-[transform,border-color] duration-200 ease-seat active:scale-[0.98]"
            >
              Secondary
            </button>
            <a
              href="/style"
              className="font-semibold text-teal underline underline-offset-4 transition-colors duration-200 ease-seat hover:text-teal-deep"
            >
              Inline text link
            </a>
            <button
              type="button"
              className="rounded-pill bg-teal px-7 py-4 font-semibold text-porcelain opacity-55"
            >
              Pending (form[data-pending])
            </button>
          </div>
          <p className="mt-4 max-w-2xl text-sm text-slate">
            Every interactive element is at least 44×44px and shows the
            global teal :focus-visible ring under keyboard. Press state is
            active:scale-[0.98]; hover shifts surface or border, never
            shadow.
          </p>
        </Section>

        <Section title="Form controls">
          <div className="grid max-w-xl gap-5">
            <div>
              <label htmlFor="style-input" className="mb-2 block text-eyebrow text-titanium">
                Text input (label, never placeholder-as-label)
              </label>
              <input
                id="style-input"
                type="text"
                className="w-full rounded-card border border-titanium/25 bg-porcelain px-4 py-3.5 text-navy transition-[border-color] duration-200 ease-seat focus:border-teal focus:shadow-[0_0_0_3px_rgba(23,114,107,0.12)] focus:outline-none"
              />
            </div>
            <fieldset className="grid gap-3 sm:grid-cols-2">
              <legend className="text-eyebrow text-titanium">Radio card (peer pattern)</legend>
              {["Selected by default", "The other option"].map((label, i) => (
                <label key={label} className="block cursor-pointer">
                  <input
                    type="radio"
                    name="style-radio"
                    defaultChecked={i === 0}
                    className="peer sr-only"
                  />
                  <span className="block cursor-pointer rounded-card border border-titanium/25 bg-porcelain p-5 transition-[transform,border-color,background-color] duration-200 ease-seat peer-checked:border-teal peer-checked:bg-teal-soft peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-teal">
                    <span className="block font-semibold text-navy">{label}</span>
                  </span>
                </label>
              ))}
            </fieldset>
          </div>
        </Section>

        <Section title="Icon set (lucide, strokeWidth 1.5)">
          <p className="mb-6 max-w-2xl text-slate">
            Resolved from string keys in content through lookup maps —
            content files stay pure data. Decorative icons are aria-hidden.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <p className="text-eyebrow text-titanium">Categories</p>
              <div className="mt-3 flex flex-wrap gap-4">
                {(Object.keys(categoryIcons) as CategoryKey[]).map((key) => (
                  <div key={key} className="text-center">
                    <span className={categoryColor[key]}>
                      <CategoryIcon name={key} />
                    </span>
                    <p className="mt-1 font-mono text-[0.65rem] text-slate">{key}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-eyebrow text-titanium">Why-Nova</p>
              <div className="mt-3 flex flex-wrap gap-4 text-navy">
                {Object.entries(whyIcons).map(([key, Icon]) => (
                  <span key={key} title={key} className="border border-titanium/20 rounded-card p-2">
                    <Icon strokeWidth={1.5} size={24} aria-hidden="true" />
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-eyebrow text-titanium">Visit steps</p>
              <div className="mt-3 flex flex-wrap gap-4 text-navy">
                {Object.entries(stepIcons).map(([key, Icon]) => (
                  <span key={key} title={key} className="border border-titanium/20 rounded-card p-2">
                    <Icon strokeWidth={1.5} size={24} aria-hidden="true" />
                  </span>
                ))}
              </div>
            </div>
          </div>
          <p className="mt-6 max-w-2xl text-sm text-slate">
            Wizard step titles, for reference: {stepTitles.join(" · ")}.
          </p>
        </Section>

        <Section title="Deliberate absences">
          <ul className="grid max-w-3xl gap-3 text-slate">
            <li>
              <strong className="text-navy">No icon library beyond lucide</strong>
              {" "}— line-art at strokeWidth 1.5 reads calmer than solid glyphs, and it tree-shakes to ~2KB for the set used.
            </li>
            <li>
              <strong className="text-navy">No UI kit, no CSS-in-JS</strong>
              {" "}— the design is bespoke; Tailwind v4 CSS-first tokens are the single source of truth and this page reads them live.
            </li>
            <li>
              <strong className="text-navy">Category colours never decorate</strong>
              {" "}— seven hues restricted to identity: dots, strokes, borders, 8% tints. Headings stay navy; two of the seven fail AA as text and the live swatches above show it.
            </li>
            <li>
              <strong className="text-navy">Titanium stays in its exception</strong>
              {" "}— 3.05:1 confines it to eyebrows and micro-labels. Interactive text was darkened to slate in the accessibility pass. Darkening eyebrows further is a one-token change, deliberately not taken while the spec holds.
            </li>
            <li>
              <strong className="text-navy">No always-running animation</strong>
              {" "}— the original shimmer (background-position repaint loop) and marquee were deleted in Phase 0 and never replaced. Nothing on the site moves without input or scroll.
            </li>
            <li>
              <strong className="text-navy">No database, no booking system, no analytics, no address</strong>
              {" "}— requests end in WhatsApp; the map is a labelled placeholder; nothing tracks. A licensing clinic adds an address and the LocalBusiness schema warning disappears.
            </li>
            <li>
              <strong className="text-navy">No per-category or per-doctor routes</strong>
              {" "}— seven thin pages fragment SEO; one deep page each with anchors is the honest size of the content.
            </li>
          </ul>
        </Section>
      </div>
    </>
  );
}
