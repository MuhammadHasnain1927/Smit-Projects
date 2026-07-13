function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1" aria-label={`Rated ${rating} out of 5`}>
      <svg viewBox="0 0 20 20" className="h-4 w-4 fill-gray-800" aria-hidden="true">
        <path d="M10 1.5l2.59 5.25 5.79.84-4.19 4.09.99 5.77L10 14.6l-5.18 2.85.99-5.77L1.62 7.6l5.79-.84L10 1.5z" />
      </svg>
      <span className="text-sm text-gray-700">{rating.toFixed(1)}</span>
    </div>
  )
}

export default StarRating
