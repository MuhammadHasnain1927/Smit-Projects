import StarRating from './StarRating.jsx'

function ProductCard({ product }) {
  const { image, title, description, price, category, rating } = product

  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
      <div className="h-44 w-full overflow-hidden sm:h-48">
        <img src={image} alt={title} loading="lazy" className="h-full w-full object-cover" />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="w-fit rounded border border-gray-300 px-2 py-0.5 text-xs text-gray-600">
          {category}
        </span>
        <h3 className="text-base font-semibold text-gray-900">{title}</h3>
        <p className="text-sm leading-relaxed text-gray-600 line-clamp-3">{description}</p>

        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="text-base font-semibold text-gray-900">Rs {price}</span>
          <StarRating rating={rating} />
        </div>

        <button
          type="button"
          className="mt-2 w-full rounded border border-gray-300 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100"
        >
          Add to order
        </button>
      </div>
    </article>
  )
}

export default ProductCard
