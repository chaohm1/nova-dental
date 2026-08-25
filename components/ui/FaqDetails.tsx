export default function FaqDetails({ q, a }: { q: string; a: string }) {
  return (
    <details className="group border-b border-titanium/15 py-3">
      <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-2 [&::-webkit-details-marker]:hidden">
        <span className="font-semibold text-navy transition-colors duration-200 ease-seat group-hover:text-teal-deep">
          {q}
        </span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          aria-hidden="true"
          className="mt-1 h-4 w-4 shrink-0 text-titanium transition-transform duration-300 ease-seat group-open:rotate-45"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
      </summary>
      <p className="max-w-xl pt-3 text-sm leading-relaxed text-slate">{a}</p>
    </details>
  );
}
