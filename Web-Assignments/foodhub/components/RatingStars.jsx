import { Star } from "lucide-react";

export default function RatingStars({ rating = 0, size = 14 }) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="flex items-center gap-0.5">
      {stars.map((star) => (
        <Star
          key={star}
          size={size}
          className={
            star <= Math.round(rating)
              ? "fill-mustard text-mustard"
              : "fill-transparent text-char-700/30"
          }
          strokeWidth={1.5}
        />
      ))}
      <span className="ml-1 text-xs font-semibold text-char-700/70">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}
