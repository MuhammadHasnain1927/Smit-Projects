const RATING_OPTIONS = [
  { label: "All ratings", value: 0 },
  { label: "4 & above", value: 4 },
  { label: "3 & above", value: 3 },
  { label: "2 & above", value: 2 },
  { label: "1 & above", value: 1 },
];

function RatingFilter({ minRating, onChange }) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-semibold text-gray-900">
        Rating
      </legend>
      <div className="flex flex-col gap-2">
        {RATING_OPTIONS.map((option) => (
          <label
            key={option.value}
            className="flex cursor-pointer items-center gap-2 text-sm text-gray-700"
          >
            <input
              type="radio"
              name="rating"
              value={option.value}
              checked={minRating === option.value}
              onChange={() => onChange(option.value)}
              className="h-4 w-4 accent-gray-800"
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default RatingFilter;
