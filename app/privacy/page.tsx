import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "What this site collects (almost nothing), where a request goes, and why there is nothing to opt out of.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Privacy"
        title="Privacy, in plain words"
        lede="This site has no accounts, no database, and nothing to opt out of."
      />
      <div className="mx-auto max-w-2xl px-6 pb-24 md:px-10">
        <div className="grid gap-9 border-t border-titanium/15 pt-10">
          <section>
            <h2 className="font-display text-card-heading text-navy">
              What we collect
            </h2>
            <p className="mt-2 text-slate">
              Nothing is stored on this website. There are no cookies, no
              analytics, no tracking scripts, and no server that keeps what
              you type. The appointment request is a static page — it cannot
              remember you.
            </p>
          </section>
          <section>
            <h2 className="font-display text-card-heading text-navy">
              Where your answers live
            </h2>
            <p className="mt-2 text-slate">
              The request form keeps your answers in the page&apos;s address
              (the URL). That is what lets the back button step backwards
              through the request and lets it work with JavaScript turned
              off — but it also means your name, phone number, and note are
              visible in your browser history, and in the link if you copy
              it. Don&apos;t share the link of a filled-in request with
              anyone you wouldn&apos;t show the message to. Your browser
              history is yours to clear.
            </p>
          </section>
          <section>
            <h2 className="font-display text-card-heading text-navy">
              What happens when you send
            </h2>
            <p className="mt-2 text-slate">
              Nothing leaves your device until you choose to send. On the
              review step, &quot;Continue on WhatsApp&quot; opens WhatsApp on
              your own device with the message already written. Nothing is
              transmitted by this website — you press send, and the
              conversation then lives in your WhatsApp chat, under
              WhatsApp&apos;s own terms.
            </p>
          </section>
          <section>
            <h2 className="font-display text-card-heading text-navy">
              The map
            </h2>
            <p className="mt-2 text-slate">
              This template ships a labelled placeholder instead of a map. If
              a clinic licenses it and adds a map, the map loads only when it
              scrolls into view and is served by Google under their own
              terms — until then, no map service is contacted at all.
            </p>
          </section>
          <section>
            <h2 className="font-display text-card-heading text-navy">
              About this site
            </h2>
            <p className="mt-2 text-slate">
              NOVA Dental is a design concept. It is not a real clinic, no
              appointments are taken, and no real patient information exists
              anywhere on it.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
