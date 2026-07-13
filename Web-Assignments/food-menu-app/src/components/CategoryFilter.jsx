const CATEGORIES = ['All', 'Burger', 'Pizza', 'Shawarma']

function CategoryFilter({ selectedCategory, onChange }) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-semibold text-gray-900">Category</legend>
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((category) => {
          const isActive = selectedCategory === category
          return (
            <button
              key={category}
              type="button"
              onClick={() => onChange(category)}
              aria-pressed={isActive}
              className={`rounded border px-3 py-1.5 text-sm ${
                isActive
                  ? 'border-gray-900 bg-gray-900 text-white'
                  : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}

export default CategoryFilter
