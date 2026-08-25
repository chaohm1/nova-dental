export default function PlaceholderBlock({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`flex items-center justify-center rounded-card border border-dashed border-titanium/50 bg-bone ${className}`}
    >
      <span className="px-4 text-center text-sm text-slate">{label}</span>
    </div>
  );
}
