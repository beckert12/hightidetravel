"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { CreditCard } from "@/data/cards";
import StarRating from "./StarRating";

function formatFee(fee: number) {
  return fee === 0 ? "$0" : `$${fee.toLocaleString()}`;
}

export default function CompareBar({
  cards,
  onRemove,
  onClear,
  open,
  onToggleOpen,
}: {
  cards: CreditCard[];
  onRemove: (id: string) => void;
  onClear: () => void;
  open: boolean;
  onToggleOpen: () => void;
}) {
  const hasCards = cards.length > 0;

  return (
    <AnimatePresence>
      {hasCards && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 30 }}
          className="fixed inset-x-0 bottom-0 z-40"
        >
          <div className="container-page pb-4">
            <div className="overflow-hidden rounded-2xl border border-white/15 bg-navy-900/95 shadow-card backdrop-blur-xl">
              {/* header row */}
              <div className="flex items-center justify-between gap-4 px-5 py-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-white">
                    Compare ({cards.length}/3)
                  </span>
                  <div className="hidden gap-2 sm:flex">
                    {cards.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => onRemove(c.id)}
                        className="group flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs text-white/80 transition hover:bg-white/15"
                      >
                        {c.name.split(" ").slice(0, 2).join(" ")}
                        <span className="text-white/40 group-hover:text-white">
                          ✕
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={onToggleOpen}
                    className="btn-primary px-5 py-2 text-xs"
                  >
                    {open ? "Hide comparison" : "Compare side by side"}
                  </button>
                  <button
                    onClick={onClear}
                    className="btn-ghost px-3 py-2 text-xs"
                  >
                    Clear
                  </button>
                </div>
              </div>

              {/* expanded comparison */}
              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden border-t border-white/10"
                  >
                    <div className="max-h-[55vh] overflow-y-auto p-5">
                      <div
                        className="grid gap-4"
                        style={{
                          gridTemplateColumns: `repeat(${cards.length}, minmax(0, 1fr))`,
                        }}
                      >
                        {cards.map((c) => (
                          <div
                            key={c.id}
                            className="card-surface flex flex-col gap-3 p-4"
                          >
                            <div>
                              <h4 className="font-display text-base font-semibold text-white">
                                {c.name}
                              </h4>
                              <p className="text-xs text-white/50">{c.issuer}</p>
                            </div>
                            <StarRating rating={c.rating} />
                            <Row label="Annual fee" value={formatFee(c.annualFee)} />
                            <Row label="Welcome bonus" value={c.welcomeBonus} />
                            <div>
                              <p className="text-[11px] uppercase tracking-wide text-white/40">
                                Key perks
                              </p>
                              <ul className="mt-1 space-y-1">
                                {c.perks.map((p) => (
                                  <li
                                    key={p}
                                    className="flex gap-1.5 text-xs text-white/70"
                                  >
                                    <span className="mt-1 h-1 w-1 flex-none rounded-full bg-sky-accent" />
                                    {p}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <a
                              href={c.applyUrl}
                              className="btn-primary mt-auto w-full py-2 text-xs"
                            >
                              Apply Now
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-wide text-white/40">{label}</p>
      <p className="text-sm text-white/85">{value}</p>
    </div>
  );
}
