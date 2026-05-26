import type { CreditCard } from "@/data/cards";

// Determines whether to use light or dark text on the card face based on the
// gradient. Light/metallic faces get dark text; dark faces get light text.
const LIGHT_FACE_IDS = new Set(["amex-platinum", "amex-gold"]);

function ContactlessIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M8 6c2.5 2 2.5 10 0 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M12 4c3.5 2.8 3.5 13.2 0 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M16 2.5C20 5.8 20 18.2 16 21.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export default function CardFace({
  card,
  className = "",
}: {
  card: CreditCard;
  className?: string;
}) {
  const light = LIGHT_FACE_IDS.has(card.id);
  const ink = light ? "text-black/80" : "text-white";
  const inkSoft = light ? "text-black/50" : "text-white/65";

  return (
    <div
      className={`relative aspect-[1.586/1] w-full overflow-hidden rounded-xl bg-gradient-to-br ${card.faceGradient} shadow-card ring-1 ring-black/10 ${className}`}
    >
      {/* finish sheen */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/15 via-transparent to-black/15" />
      <div className="absolute -left-1/3 top-0 h-full w-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="relative flex h-full flex-col justify-between p-3 sm:p-4">
        {/* top row: issuer + contactless */}
        <div className="flex items-start justify-between">
          <p className={`text-[9px] font-semibold uppercase tracking-[0.18em] sm:text-[10px] ${inkSoft}`}>
            {card.issuer}
          </p>
          <ContactlessIcon className={`h-3.5 w-3.5 ${inkSoft}`} />
        </div>

        {/* chip */}
        <div className="flex items-center gap-2">
          <div className="h-5 w-7 rounded-[4px] bg-gradient-to-br from-yellow-200/95 to-yellow-500/95 ring-1 ring-black/10 sm:h-6 sm:w-8">
            <div className="mx-auto mt-1 h-3 w-3 rounded-[2px] border border-black/15 sm:mt-1.5" />
          </div>
        </div>

        {/* bottom: name + network */}
        <div className="flex items-end justify-between gap-2">
          <p className={`max-w-[72%] text-[11px] font-bold leading-tight sm:text-sm ${ink}`}>
            {card.name}
          </p>
          {card.network && (
            <span className={`text-[10px] font-bold italic tracking-tight sm:text-xs ${ink}`}>
              {card.network}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
