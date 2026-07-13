import CategoryFilter from './CategoryFilter.jsx'
import PriceFilter from './PriceFilter.jsx'
import RatingFilter from './RatingFilter.jsx'

function FilterPanel({
  isOpen,
  category,
  onCategoryChange,
  minPrice,
  maxPrice,
  priceValue,
  onPriceChange,
  minRating,
  onRatingChange,
  onReset,
}) {
  return (
    <aside
      className={`${
        isOpen ? 'block' : 'hidden'
      } w-full shrink-0 rounded-lg border border-gray-200 bg-white p-5 lg:sticky lg:top-6 lg:block lg:w-72`}
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-900">Filters</h2>
        <button type="button" onClick={onReset} className="text-xs text-gray-500 underline-offset-2 hover:underline">
          Reset all
        </button>
      </div>

      <div className="flex flex-col gap-6">
        <CategoryFilter selectedCategory={category} onChange={onCategoryChange} />
        <div className="h-px bg-gray-200" />
        <PriceFilter minPrice={minPrice} maxPrice={maxPrice} value={priceValue} onChange={onPriceChange} />
        <div className="h-px bg-gray-200" />
        <RatingFilter minRating={minRating} onChange={onRatingChange} />
      </div>
    </aside>
  )
}

export default FilterPanel
