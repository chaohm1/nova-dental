"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-start px-6 pb-28 pt-24 md:px-10 md:pt-32">
      <p className="text-eyebrow text-titanium">Error</p>
      <h1 className="mt-4 font-display text-page-title text-navy">
        Something went wrong.
      </h1>
      <p className="mt-5 max-w-xl text-slate">
        An unexpected error interrupted this page. Trying again usually fixes
        it, and nothing you entered has been stored anywhere.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 rounded-pill bg-teal px-6 py-4 font-semibold text-porcelain transition-[transform,background-color] duration-200 ease-seat hover:bg-teal-deep active:scale-[0.98]"
      >
        Try again
      </button>
    </div>
  );
}
