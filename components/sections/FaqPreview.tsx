import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import FaqDetails from "@/components/ui/FaqDetails";
import { faqGroups } from "@/content/faq";

const picks = [
  faqGroups[0].questions[0],
  faqGroups[0].questions[1],
  faqGroups[3].questions[0],
  faqGroups[2].questions[0],
];

export default function FaqPreview() {
  return (
    <section className="border-b border-titanium/15 bg-bone/40">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="reveal-left">
            <SectionHeading
              eyebrow="Questions"
              title="Your worry, probably answered"
              intro="Four of the questions we hear most — the full set is on the FAQ page."
            />
            <Link
              href="/faq"
              className="mt-8 inline-block rounded-pill border border-teal/50 px-7 py-4 text-teal-deep hover:bg-teal-soft/50 transition-[transform,border-color] duration-200 ease-seat active:scale-[0.98]"
            >
              Read all questions
            </Link>
          </div>

          <div className="reveal-right border-t border-titanium/20">
            {picks.map((item, i) => (
              <div key={item.q} style={{ "--i": i } as React.CSSProperties}>
                <FaqDetails q={item.q} a={item.a} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
