// Shared types, structured-output JSON schema, CPP logic, and deep-link
// builders for the AI Trip Planner. Pure functions only (safe on edge + client).

export type FlightOption = {
  airline: string;
  /** Airport codes with an arrow, e.g. "IAH→LIS" */
  route: string;
  routeNote: string;
  notes: string;
  /** Best seasonal cash estimate (range) */
  cashEstimate: string;
  /** Recommended points target to aim for (range) */
  pointsTarget: string;
  /** Best transfer-partner / alliance ways to book this as an award (multiple) */
  bestWaysToBook: string;
  /** Which of the traveler's own cards to use, + why */
  cardToUse: string;
};

export type HotelOption = {
  name: string;
  area: string;
  notes: string;
  /** Best seasonal cash estimate per night (range) */
  cashEstimate: string;
  /** Recommended points target per night (range) */
  pointsTarget: string;
  /** Which of the traveler's own cards to use, + why */
  cardToUse: string;
};

export type Activity = { title: string; description: string };

export type Considerations = {
  rentalCar: string;
  travelInsurance: string;
  preCheckGlobalEntry: string;
  loungeAccess: string;
  destinationTips: string;
};

export type CardStrategy = {
  /** Best card from their wallet for dining/everyday spend on the trip */
  dining: string;
  /** Soft nudge toward a card they don't have that would shine on this trip */
  upsell: string;
};

export type TripPlan = {
  summary: string;
  flights: FlightOption[];
  hotels: HotelOption[];
  activities: Activity[];
  considerations: Considerations;
  cardStrategy: CardStrategy;
};

export type TripInput = {
  origin: string;
  destination: string;
  startDate: string;
  endDate: string;
  tripLengthDays: number;
  vibe: string;
  cards: string;
  status: string;
  pointsInventory: string;
};

// JSON Schema for Claude's structured output (output_config.format).
// Note: structured outputs disallow numeric/array constraints — keep it to
// types + additionalProperties:false + required. Counts are enforced via the prompt.
export const TRIP_PLAN_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    summary: { type: "string" },
    flights: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          airline: { type: "string" },
          route: { type: "string" },
          routeNote: { type: "string" },
          notes: { type: "string" },
          cashEstimate: { type: "string" },
          pointsTarget: { type: "string" },
          bestWaysToBook: { type: "string" },
          cardToUse: { type: "string" },
        },
        required: [
          "airline",
          "route",
          "routeNote",
          "notes",
          "cashEstimate",
          "pointsTarget",
          "bestWaysToBook",
          "cardToUse",
        ],
      },
    },
    hotels: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          name: { type: "string" },
          area: { type: "string" },
          notes: { type: "string" },
          cashEstimate: { type: "string" },
          pointsTarget: { type: "string" },
          cardToUse: { type: "string" },
        },
        required: [
          "name",
          "area",
          "notes",
          "cashEstimate",
          "pointsTarget",
          "cardToUse",
        ],
      },
    },
    activities: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          title: { type: "string" },
          description: { type: "string" },
        },
        required: ["title", "description"],
      },
    },
    considerations: {
      type: "object",
      additionalProperties: false,
      properties: {
        rentalCar: { type: "string" },
        travelInsurance: { type: "string" },
        preCheckGlobalEntry: { type: "string" },
        loungeAccess: { type: "string" },
        destinationTips: { type: "string" },
      },
      required: [
        "rentalCar",
        "travelInsurance",
        "preCheckGlobalEntry",
        "loungeAccess",
        "destinationTips",
      ],
    },
    cardStrategy: {
      type: "object",
      additionalProperties: false,
      properties: {
        dining: { type: "string" },
        upsell: { type: "string" },
      },
      required: ["dining", "upsell"],
    },
  },
  required: [
    "summary",
    "flights",
    "hotels",
    "activities",
    "considerations",
    "cardStrategy",
  ],
} as const;

// ---- CPP (cents-per-point) verdict ------------------------------------------

export type CppTone = "great" | "fair" | "cash" | "none";

export type CppVerdict = {
  label: string;
  tone: CppTone;
  cpp: number | null;
};

/**
 * cents-per-point = (cash value in cents) / points.
 * >= 1.5  → Great redemption (green)
 * 1.0-1.5 → Fair (gold/yellow)
 * < 1.0   → Pay cash instead (red)
 */
export function evaluateCpp(cashUsd: number, points: number): CppVerdict {
  if (!points || points <= 0) {
    return { label: "Pay cash — no award option", tone: "cash", cpp: null };
  }
  if (!cashUsd || cashUsd <= 0) {
    return { label: "—", tone: "none", cpp: null };
  }
  const cpp = (cashUsd * 100) / points;
  if (cpp >= 1.5) return { label: "Great redemption", tone: "great", cpp };
  if (cpp >= 1.0) return { label: "Fair value", tone: "fair", cpp };
  return { label: "Pay cash instead", tone: "cash", cpp };
}

// ---- Deep links --------------------------------------------------------------

function enc(s: string) {
  return encodeURIComponent(s.trim());
}

const isIata = (s: string) => /^[A-Za-z]{3}$/.test(s.trim());

export function flightDeepLinks(
  origin: string,
  destination: string,
  startDate: string,
  endDate: string,
  airline?: string
): { label: string; url: string }[] {
  const links: { label: string; url: string }[] = [];

  const q =
    `flights from ${origin} to ${destination}` +
    (startDate ? ` on ${startDate}` : "") +
    (endDate ? ` returning ${endDate}` : "") +
    (airline ? ` on ${airline}` : "");
  links.push({
    label: "Google Flights",
    url: `https://www.google.com/travel/flights?q=${enc(q)}`,
  });

  if (isIata(origin) && isIata(destination) && startDate && endDate) {
    links.push({
      label: "Kayak",
      url: `https://www.kayak.com/flights/${origin.toUpperCase()}-${destination.toUpperCase()}/${startDate}/${endDate}`,
    });
  } else {
    links.push({
      label: "Skyscanner",
      url: `https://www.skyscanner.com/transport/flights/?adults=1&from=${enc(
        origin
      )}&to=${enc(destination)}`,
    });
  }

  return links;
}

export function hotelDeepLinks(
  name: string,
  destination: string
): { label: string; url: string }[] {
  return [
    {
      label: "Google Hotels",
      url: `https://www.google.com/travel/search?q=${enc(`${name} ${destination}`)}`,
    },
  ];
}

// Award-availability search tools (live award space + mileage pricing).
// These require their own logins; we link to the tools to check real space.
export const awardSearchTools: { label: string; url: string }[] = [
  { label: "seats.aero", url: "https://seats.aero" },
  { label: "point.me", url: "https://point.me" },
  { label: "Roame", url: "https://roame.travel" },
];

// ---- Formatting --------------------------------------------------------------

export function usd(n: number): string {
  if (!n || n <= 0) return "—";
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export function pts(n: number): string {
  if (!n || n <= 0) return "—";
  return `${n.toLocaleString("en-US")} pts`;
}
