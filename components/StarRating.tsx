import { StarIcon } from "./icons";

export default function StarRating({
  rating,
  className = "",
}: {
  rating: number;
  className?: string;
}) {
  const rounded = Math.round(rating * 2) / 2;
  return (
    <div
      className={`flex items-center gap-1.5 ${className}`}
      aria-label={`${rating} out of 5 stars`}
    >
      <div className="relative flex">
        {/* base (empty) */}
        <div className="flex text-white/15">
          {[0, 1, 2, 3, 4].map((i) => (
            <StarIcon key={i} className="h-4 w-4" />
          ))}
        </div>
        {/* filled overlay */}
        <div
          className="absolute inset-0 flex overflow-hidden text-gold"
          style={{ width: `${(rounded / 5) * 100}%` }}
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <StarIcon key={i} className="h-4 w-4 flex-none" />
          ))}
        </div>
      </div>
      <span className="text-xs font-semibold text-white/70">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}
