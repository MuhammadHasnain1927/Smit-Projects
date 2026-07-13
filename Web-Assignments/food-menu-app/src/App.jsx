import { useMemo, useState } from 'react'
import products from './data/products.js'
import FilterPanel from './components/FilterPanel.jsx'
import SortDropdown from './components/SortDropdown.jsx'
import ProductGrid from './components/ProductGrid.jsx'

const PRICE_BOUNDS = {
  min: Math.min(...products.map((p) => p.price)),
  max: Math.max(...products.map((p) => p.price)),
}

function App() {
  const [category, setCategory] = useState('All')
  const [priceValue, setPriceValue] = useState(PRICE_BOUNDS.max)
  const [minRating, setMinRating] = useState(0)
  const [sortBy, setSortBy] = useState('featured')
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const handleReset = () => {
    setCategory('All')
    setPriceValue(PRICE_BOUNDS.max)
    setMinRating(0)
    setSortBy('featured')
  }

  const visibleProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesCategory = category === 'All' || product.category === category
      const matchesPrice = product.price <= priceValue
      const matchesRating = product.rating >= minRating
      return matchesCategory && matchesPrice && matchesRating
    })

    switch (sortBy) {
      case 'price-asc':
        result = [...result].sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result = [...result].sort((a, b) => b.price - a.price)
        break
      case 'rating-asc':
        result = [...result].sort((a, b) => a.rating - b.rating)
        break
      case 'rating-desc':
        result = [...result].sort((a, b) => b.rating - a.rating)
        break
      default:
        break
    }

    return result
  }, [category, priceValue, minRating, sortBy])

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="border-b border-gray-200 px-4 py-6 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-1">
          <h1 className="text-2xl font-semibold text-gray-900 sm:text-3xl">Product Collection</h1>
          <p className="mt-1 text-sm text-gray-500">
            {visibleProducts.length} of {products.length} items shown
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-8">
        <div className="mb-4 flex items-center justify-between gap-3 lg:hidden">
          <button
            type="button"
            onClick={() => setIsFilterOpen((open) => !open)}
            aria-expanded={isFilterOpen}
            className="rounded border border-gray-300 px-4 py-2 text-sm font-medium text-gray-800"
          >
            {isFilterOpen ? 'Hide filters' : 'Show filters'}
          </button>
          <SortDropdown sortBy={sortBy} onChange={setSortBy} />
        </div>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          <FilterPanel
            isOpen={isFilterOpen}
            category={category}
            onCategoryChange={setCategory}
            minPrice={PRICE_BOUNDS.min}
            maxPrice={PRICE_BOUNDS.max}
            priceValue={priceValue}
            onPriceChange={setPriceValue}
            minRating={minRating}
            onRatingChange={setMinRating}
            onReset={handleReset}
          />

          <div className="flex-1">
            <div className="mb-4 hidden justify-end lg:flex">
              <SortDropdown sortBy={sortBy} onChange={setSortBy} />
            </div>

            <ProductGrid products={visibleProducts} onReset={handleReset} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
