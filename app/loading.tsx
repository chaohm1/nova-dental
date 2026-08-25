export default function Loading() {
  return (
    <div
      aria-hidden="true"
      className="mx-auto max-w-6xl px-6 pt-20 md:px-10 md:pt-28"
    >
      <div className="h-3 w-24 rounded-pill bg-bone" />
      <div className="mt-7 h-12 w-2/3 max-w-lg rounded-card bg-bone" />
      <div className="mt-5 h-4 w-full max-w-md rounded-pill bg-bone/70" />
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-44 rounded-card bg-bone/60" />
        ))}
      </div>
    </div>
  );
}
