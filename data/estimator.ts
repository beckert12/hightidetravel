// Trip cost + points estimation model for the Points Tool.
// All assumptions live here so they're easy to tune later.
// These are deliberately simple, transparent placeholders — not real pricing.

import { pointValues, type PointCurrency } from "./pointValues";
import { cards } from "./cards";

export type TripType = "luxury" | "economy" | "resort" | "airbnb";

export const tripTypes: {
  id: TripType;
  label: string;
  description: string;
  icon: string;
}[] = [
  {
    id: "luxury",
    label: "Luxury / Business Class",
    description: "Lie-flat seats and premium hotels. Maximize transfer partners.",
    icon: "🥂",
  },
  {
    id: "economy",
    label: "Economy / Value",
    description: "Get there for less and stretch every point as far as possible.",
    icon: "🎒",
  },
  {
    id: "resort",
    label: "Hotel / Resort",
    description: "Focus the budget on an aspirational stay with elite perks.",
    icon: "🏝️",
  },
  {
    id: "airbnb",
    label: "Airbnb / Cash Stays",
    description: "Flexible lodging paid in cash, points best used for flights.",
    icon: "🏡",
  },
];

// Per-traveler round-trip airfare assumption by trip type (USD).
const FLIGHT_CASH: Record<TripType, number> = {
  luxury: 3800,
  economy: 650,
  resort: 900,
  airbnb: 750,
};

// Per-room, per-night lodging assumption by trip type (USD).
const LODGING_CASH_PER_NIGHT: Record<TripType, number> = {
  luxury: 650,
  economy: 130,
  resort: 420,
  airbnb: 180,
};

export type EstimatorInput = {
  origin: string;
  destination: string;
  nights: number;
  travelers: number;
  currencyIds: string[];
  tripType: TripType;
};

export type CurrencyEstimate = {
  currency: PointCurrency;
  pointsNeeded: number;
  cpp: number;
  recommendation: string;
  earningCard?: { name: string; applyUrl: string };
  isBestValue: boolean;
};

export type EstimateResult = {
  cashCost: number;
  flightCost: number;
  lodgingCost: number;
  rooms: number;
  perCurrency: CurrencyEstimate[];
};

export function estimateTrip(input: EstimatorInput): EstimateResult {
  const nights = Math.max(1, input.nights || 1);
  const travelers = Math.max(1, input.travelers || 1);
  const rooms = Math.ceil(travelers / 2);

  const flightCost = FLIGHT_CASH[input.tripType] * travelers;
  const lodgingCost = LODGING_CASH_PER_NIGHT[input.tripType] * nights * rooms;
  const cashCost = Math.round(flightCost + lodgingCost);

  const selected = pointValues.filter((p) =>
    input.currencyIds.includes(p.id)
  );

  // Best value = highest cents-per-point among the selected currencies.
  const bestCpp = selected.reduce((max, p) => Math.max(max, p.cpp), 0);

  const perCurrency: CurrencyEstimate[] = selected.map((currency) => {
    const dollarPerPoint = currency.cpp / 100;
    const pointsNeeded = Math.round(cashCost / dollarPerPoint);
    const earning = cards.find((c) => c.pointsCurrency === currency.id);
    return {
      currency,
      pointsNeeded,
      cpp: currency.cpp,
      recommendation: currency.recommendation,
      earningCard: earning
        ? { name: earning.name, applyUrl: earning.applyUrl }
        : undefined,
      isBestValue: currency.cpp === bestCpp && bestCpp > 0,
    };
  });

  // Sort best value first.
  perCurrency.sort((a, b) => b.cpp - a.cpp);

  return { cashCost, flightCost, lodgingCost, rooms, perCurrency };
}

export function formatPoints(n: number): string {
  return n.toLocaleString("en-US");
}

export function formatUsd(n: number): string {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}
