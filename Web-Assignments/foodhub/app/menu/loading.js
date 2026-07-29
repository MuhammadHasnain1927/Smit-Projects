export default function MenuLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 h-24 w-full animate-pulse rounded-2xl bg-charcoal/10" />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-72 animate-pulse rounded-2xl bg-white shadow-sm ring-1 ring-black/5"
          >
            <div className="h-44 w-full rounded-t-2xl bg-charcoal/10" />
            <div className="space-y-2 p-4">
              <div className="h-3 w-1/3 rounded bg-charcoal/10" />
              <div className="h-4 w-2/3 rounded bg-charcoal/10" />
              <div className="h-3 w-full rounded bg-charcoal/10" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
