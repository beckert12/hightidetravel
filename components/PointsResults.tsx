"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  formatPoints,
  formatUsd,
  type EstimateResult,
} from "@/data/estimator";

export default function PointsResults({
  result,
  destination,
  origin,
  nights,
  travelers,
  onReset,
}: {
  result: EstimateResult;
  destination: string;
  origin: string;
  nights: number;
  travelers: number;
  onReset: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Summary */}
      <div className="card-surface overflow-hidden">
        <div className="bg-hero-gradient p-6 sm:p-8">
          <p className="eyebrow">Your estimate</p>
          <h2 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
            {origin ? `${origin} → ` : ""}
            {destination || "Your trip"}
          </h2>
          <p className="mt-1 text-sm text-white/60">
            {nights} {nights === 1 ? "night" : "nights"} ·{" "}
            {travelers} {travelers === 1 ? "traveler" : "travelers"} ·{" "}
            {result.rooms} {result.rooms === 1 ? "room" : "rooms"}
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <Stat label="Est. cash cost" value={formatUsd(result.cashCost)} accent />
            <Stat label="Flights" value={formatUsd(result.flightCost)} />
            <Stat label="Lodging" value={formatUsd(result.lodgingCost)} />
          </div>
        </div>
      </div>

      {/* Per-currency */}
      <div>
        <h3 className="font-display text-xl font-semibold text-white">
          What it costs in points
        </h3>
        <p className="mt-1 text-sm text-white/55">
          Based on the cash value of your trip and our cents-per-point
          valuations. Best value is highlighted.
        </p>

        <div className="mt-5 space-y-3">
          {result.perCurrency.map((est, i) => (
            <motion.div
              key={est.currency.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className={`card-surface p-5 ${
                est.isBestValue ? "ring-1 ring-gold/50" : ""
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-display text-lg font-semibold text-white">
                      {est.currency.name}
                    </h4>
                    {est.isBestValue && (
                      <span className="rounded-full bg-gold/15 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-gold">
                        Best value
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">
                    {est.recommendation}
                  </p>
                  {est.earningCard && (
                    <p className="mt-2 text-xs text-white/45">
                      Earn it with{" "}
                      <Link
                        href="/credit-cards"
                        className="font-semibold text-sky-accent hover:underline"
                      >
                        {est.earningCard.name}
                      </Link>
                    </p>
                  )}
                </div>

                <div className="flex flex-none gap-6 text-right">
                  <div>
                    <p className="text-[11px] uppercase tracking-wide text-white/40">
                      Points needed
                    </p>
                    <p className="font-display text-xl font-bold text-white">
                      {formatPoints(est.pointsNeeded)}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wide text-white/40">
                      Value
                    </p>
                    <p className="font-display text-xl font-bold text-sky-accent">
                      {est.cpp.toFixed(1)}¢
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button onClick={onReset} className="btn-secondary">
          ↺ Start over
        </button>
        <Link href="/credit-cards" className="btn-primary">
          Find a card to earn these points →
        </Link>
      </div>

      <p className="text-xs leading-relaxed text-white/40">
        Estimates are illustrative and based on simplified, editable assumptions
        (see <code className="text-white/60">/data/estimator.ts</code> and{" "}
        <code className="text-white/60">/data/pointValues.ts</code>). Real award
        pricing varies by route, dates, and availability.
      </p>
    </motion.div>
  );
}

function Stat({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-navy-900/40 p-4">
      <p className="text-[11px] uppercase tracking-wide text-white/40">{label}</p>
      <p
        className={`mt-1 font-display text-2xl font-bold ${
          accent ? "text-gold" : "text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
