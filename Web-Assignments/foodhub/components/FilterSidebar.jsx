"use client";

import { SlidersHorizontal } from "lucide-react";

const priceRanges = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under Rs. 500", min: 0, max: 500 },
  { label: "Rs. 500 – 1000", min: 500, max: 1000 },
  { label: "Rs. 1000+", min: 1000, max: Infinity },
];

export default function FilterSidebar({
  categories,
  activeCategory,
  setActiveCategory,
  activePrice,
  setActivePrice,
  minRating,
  setMinRating,
}) {
  return (
    <aside className="flex w-full flex-col gap-6 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 lg:sticky lg:top-24 lg:w-64">
      <div className="flex items-center gap-2 font-display text-lg text-charcoal">
        <SlidersHorizontal className="h-4 w-4" /> Filters
      </div>

      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-wide text-charcoal/50">
          Category
        </p>
        <div className="flex flex-col gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-2 text-left text-sm font-semibold transition ${
                activeCategory === cat
                  ? "bg-chili text-cream"
                  : "bg-charcoal/5 text-charcoal/70 hover:bg-charcoal/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-wide text-charcoal/50">
          Price
        </p>
        <div className="flex flex-col gap-2">
          {priceRanges.map((range) => (
            <button
              key={range.label}
              onClick={() => setActivePrice(range)}
              className={`rounded-full px-4 py-2 text-left text-sm font-semibold transition ${
                activePrice.label === range.label
                  ? "bg-mustard text-charcoal"
                  : "bg-charcoal/5 text-charcoal/70 hover:bg-charcoal/10"
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-wide text-charcoal/50">
          Minimum Rating
        </p>
        <div className="flex gap-2">
          {[0, 3, 4, 4.5].map((rating) => (
            <button
              key={rating}
              onClick={() => setMinRating(rating)}
              className={`flex-1 rounded-full px-2 py-2 text-xs font-bold transition ${
                minRating === rating
                  ? "bg-charcoal text-cream"
                  : "bg-charcoal/5 text-charcoal/70 hover:bg-charcoal/10"
              }`}
            >
              {rating === 0 ? "Any" : `${rating}+`}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}

export { priceRanges };
