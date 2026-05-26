"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import type { CreditCard } from "@/data/cards";
import CardFace from "./CardFace";
import StarRating from "./StarRating";

function formatFee(fee: number) {
  return fee === 0 ? "No annual fee" : `$${fee.toLocaleString()}/yr`;
}

type CardTileProps = {
  card: CreditCard;
  compareEnabled?: boolean;
  selected?: boolean;
  onToggleCompare?: (id: string) => void;
  disabledCompare?: boolean;
};

const CardTile = forwardRef<HTMLDivElement, CardTileProps>(function CardTile(
  {
    card,
    compareEnabled = false,
    selected = false,
    onToggleCompare,
    disabledCompare = false,
  },
  ref
) {
  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`card-surface flex flex-col p-5 transition-colors ${
        selected ? "ring-2 ring-sky-accent" : "hover:border-white/25"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <CardFace card={card} className="w-32 sm:w-36" />
        <StarRating rating={card.rating} />
      </div>

      <div className="mt-5 flex-1">
        <h3 className="font-display text-lg font-semibold text-white">
          {card.name}
        </h3>
        <p className="text-sm text-white/50">{card.issuer}</p>

        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-lg bg-white/5 px-3 py-2">
            <p className="text-[11px] uppercase tracking-wide text-white/40">
              Annual Fee
            </p>
            <p className="font-semibold text-white">{formatFee(card.annualFee)}</p>
          </div>
          <div className="rounded-lg bg-white/5 px-3 py-2">
            <p className="text-[11px] uppercase tracking-wide text-white/40">
              Welcome Bonus
            </p>
            <p className="font-semibold text-gold">
              {card.welcomeBonus.split(" ").slice(0, 2).join(" ")}
            </p>
          </div>
        </div>

        <p className="mt-3 text-sm text-white/60">{card.welcomeBonus}</p>

        <ul className="mt-4 space-y-2">
          {card.perks.map((perk) => (
            <li key={perk} className="flex gap-2 text-sm text-white/75">
              <span className="mt-1 flex h-1.5 w-1.5 flex-none rounded-full bg-sky-accent" />
              {perk}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <a
          href={card.applyUrl}
          className="btn-primary flex-1 text-center"
          target="_blank"
          rel="noopener noreferrer"
        >
          Apply Now
        </a>
        <a href={card.applyUrl} className="btn-secondary">
          Learn More
        </a>
      </div>

      {compareEnabled && (
        <label
          className={`mt-4 flex cursor-pointer items-center gap-2.5 rounded-lg border border-white/10 px-3 py-2.5 text-sm transition ${
            selected
              ? "border-sky-accent/50 bg-sky-accent/10 text-white"
              : disabledCompare
              ? "cursor-not-allowed opacity-40"
              : "text-white/70 hover:border-white/25"
          }`}
        >
          <input
            type="checkbox"
            checked={selected}
            disabled={disabledCompare && !selected}
            onChange={() => onToggleCompare?.(card.id)}
            className="h-4 w-4 accent-sky-accent"
          />
          {selected ? "Selected to compare" : "Add to compare"}
        </label>
      )}
    </motion.article>
  );
});

export default CardTile;
