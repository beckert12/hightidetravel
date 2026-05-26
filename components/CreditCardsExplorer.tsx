"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { cards, cardCategories, type CardCategory } from "@/data/cards";
import CardTile from "./CardTile";
import CompareBar from "./CompareBar";

type Filter = "All" | CardCategory;

const MAX_COMPARE = 3;

export default function CreditCardsExplorer() {
  const [filter, setFilter] = useState<Filter>("All");
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);

  const filters: Filter[] = ["All", ...cardCategories];

  const visibleCards = useMemo(() => {
    if (filter === "All") return cards;
    return cards.filter((c) => c.categories.includes(filter));
  }, [filter]);

  const compareCards = useMemo(
    () =>
      compareIds
        .map((id) => cards.find((c) => c.id === id))
        .filter((c): c is (typeof cards)[number] => Boolean(c)),
    [compareIds]
  );

  function toggleCompare(id: string) {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= MAX_COMPARE) return prev;
      return [...prev, id];
    });
  }

  return (
    <div className="pb-40">
      {/* Filters */}
      <div className="sticky top-16 z-30 -mx-5 mb-10 bg-navy/80 px-5 py-4 backdrop-blur-md sm:top-20 sm:mx-0 sm:rounded-2xl sm:px-2">
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => {
            const active = f === filter;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition ${
                  active
                    ? "text-navy"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-full bg-gold"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative">{f}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid */}
      <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibleCards.map((card) => (
          <CardTile
            key={card.id}
            card={card}
            compareEnabled
            selected={compareIds.includes(card.id)}
            disabledCompare={compareIds.length >= MAX_COMPARE}
            onToggleCompare={toggleCompare}
          />
        ))}
      </motion.div>

      {visibleCards.length === 0 && (
        <p className="py-20 text-center text-white/50">
          No cards match this filter yet.
        </p>
      )}

      <CompareBar
        cards={compareCards}
        open={compareOpen}
        onToggleOpen={() => setCompareOpen((v) => !v)}
        onRemove={toggleCompare}
        onClear={() => {
          setCompareIds([]);
          setCompareOpen(false);
        }}
      />
    </div>
  );
}
