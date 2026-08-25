import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import FaqDetails from "@/components/ui/FaqDetails";
import { faqGroups } from "@/content/faq";
import { clinic } from "@/content/clinic";
import { faqSchema } from "@/lib/schema";
import { breadcrumbSchema } from "@/lib/breadcrumb";
import { telUrl, whatsappUrl } from "@/lib/links";

export const metadata: Metadata = {
  
  alternates: { canonical: "/faq" },
  title: "FAQ",
  description:
    "Short answers about appointments, costs, treatment, children's care, and the practical details of visiting NOVA Dental.",
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: "/" },
              { name: "FAQ", url: "/faq" },
            ]),
          ),
        }}
      />
      <PageHeader
        eyebrow="Questions"
        title="Frequently asked questions"
        lede="Grouped answers on visits, treatments, families, and practical matters. If yours isn't here, call or message us — the contact details are at the bottom of every page."
      />

      <div className="mx-auto max-w-3xl px-6 pb-24 md:px-10">
        {faqGroups.map((group) => (
          <section key={group.id} className="mt-12 first:mt-0">
            <h2 className="font-display text-[1.5rem] text-navy">
              {group.title}
            </h2>
            <div className="mt-4 border-t border-titanium/15">
              {group.questions.map((item) => (
                <FaqDetails key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          </section>
        ))}

        <div className="mt-14 rounded-card border border-titanium/15 bg-bone/40 p-6 md:p-8">
          <h2 className="font-display text-card-heading text-navy">
            Still have a question?
          </h2>
          <p className="mt-2 text-slate">
            Call{" "}
            <a
              href={telUrl}
              className="font-semibold text-navy underline underline-offset-4 transition-colors duration-200 ease-seat hover:text-teal-deep"
              dir="ltr"
            >
              {clinic.phoneDisplay}
            </a>{" "}
            during opening hours, or{" "}
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-navy underline underline-offset-4 transition-colors duration-200 ease-seat hover:text-teal-deep"
            >
              send us a WhatsApp message
            </a>
            . We reply during opening hours.
          </p>
        </div>
      </div>
    </>
  );
}
