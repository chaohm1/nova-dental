export default function SectionHeading({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-eyebrow text-titanium">{eyebrow}</p>
      <h2 className="mt-4 font-display text-section-heading text-navy">
        {title}
      </h2>
      {intro ? <p className="mt-5 text-slate">{intro}</p> : null}
    </div>
  );
}
