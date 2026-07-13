function PriceFilter({ minPrice, maxPrice, value, onChange }) {
  return (
    <div>
      <label htmlFor="price" className="mb-2 block text-sm font-semibold text-gray-900">
        Price range
      </label>
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>Rs {minPrice}</span>
        <span className="font-medium text-gray-900">Up to Rs {value}</span>
      </div>
      <input
        id="price"
        type="range"
        min={minPrice}
        max={maxPrice}
        step={10}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label="Maximum price"
        className="mt-2 w-full accent-gray-800"
      />
      <div className="mt-1 flex justify-end text-xs text-gray-500">
        <span>Max Rs {maxPrice}</span>
      </div>
    </div>
  )
}

export default PriceFilter
