import ProductCard from './ProductCard.jsx'
import EmptyState from './EmptyState.jsx'

function ProductGrid({ products, onReset }) {
  if (products.length === 0) {
    return <EmptyState onReset={onReset} />
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductGrid
