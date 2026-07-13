function EmptyState({ onReset }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-gray-300 py-20 text-center">
      <p className="text-base font-medium text-gray-900">No products match these filters</p>
      <p className="text-sm text-gray-500">Try widening the price range or clearing a filter.</p>
      <button
        type="button"
        onClick={onReset}
        className="mt-2 rounded border border-gray-300 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100"
      >
        Reset filters
      </button>
    </div>
  )
}

export default EmptyState
