import type { CreditCard } from "@/data/cards";

export default function CardFace({
  card,
  className = "",
}: {
  card: CreditCard;
  className?: string;
}) {
  return (
    <div
      className={`relative aspect-[1.586/1] w-full overflow-hidden rounded-xl bg-gradient-to-br ${card.faceGradient} shadow-card ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10" />
      <div className="absolute left-4 top-4 h-7 w-9 rounded-md bg-gradient-to-br from-yellow-200/90 to-yellow-500/90 ring-1 ring-black/10" />
      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider text-black/50">
            {card.issuer}
          </p>
          <p className="max-w-[10rem] text-sm font-bold leading-tight text-black/80">
            {card.name}
          </p>
        </div>
        <div className="text-right text-[10px] font-semibold uppercase tracking-wide text-black/40">
          High Tide
        </div>
      </div>
    </div>
  );
}
