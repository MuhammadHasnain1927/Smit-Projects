const SORT_OPTIONS = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Rating: Low to High', value: 'rating-asc' },
  { label: 'Rating: High to Low', value: 'rating-desc' },
]

function SortDropdown({ sortBy, onChange }) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort" className="whitespace-nowrap text-sm text-gray-700">
        Sort by
      </label>
      <select
        id="sort"
        value={sortBy}
        onChange={(e) => onChange(e.target.value)}
        className="rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SortDropdown
