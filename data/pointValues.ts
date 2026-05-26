// Hardcoded point/mile valuations in cents-per-point (cpp).
// Edit these values freely — they drive the Points Tool estimates.
// These are intentionally simple placeholders to be refined later.

export type PointCurrency = {
  id: string;
  name: string;
  shortName: string;
  /** Cents per point */
  cpp: number;
  type: "transferable" | "hotel" | "airline";
  /** Suggested card or transfer partner to maximize this currency */
  recommendation: string;
};

export const pointValues: PointCurrency[] = [
  {
    id: "amex-mr",
    name: "American Express Membership Rewards",
    shortName: "Amex MR",
    cpp: 2.0,
    type: "transferable",
    recommendation:
      "Transfer to ANA, Air Canada Aeroplan, or Virgin Atlantic for outsized premium-cabin value. Earn with the Amex Platinum or Gold.",
  },
  {
    id: "chase-ur",
    name: "Chase Ultimate Rewards",
    shortName: "Chase UR",
    cpp: 2.1,
    type: "transferable",
    recommendation:
      "Transfer to Hyatt for hotels or Air Canada/United for flights. Earn with the Sapphire Preferred or Reserve.",
  },
  {
    id: "capone",
    name: "Capital One Miles",
    shortName: "Cap One",
    cpp: 1.7,
    type: "transferable",
    recommendation:
      "Transfer to Air Canada Aeroplan or Turkish Airlines. Earn with the Venture X.",
  },
  {
    id: "citi-ty",
    name: "Citi ThankYou Points",
    shortName: "Citi TY",
    cpp: 1.8,
    type: "transferable",
    recommendation:
      "Transfer to Turkish Airlines or Virgin Atlantic. Earn with the Citi Strata Premier.",
  },
  {
    id: "bilt",
    name: "Bilt Rewards",
    shortName: "Bilt",
    cpp: 2.0,
    type: "transferable",
    recommendation:
      "Transfer to Hyatt or Turkish Airlines. Earn by paying rent (or mortgage) with the Bilt Card.",
  },
  {
    id: "hilton",
    name: "Hilton Honors",
    shortName: "Hilton",
    cpp: 0.6,
    type: "hotel",
    recommendation:
      "Best for aspirational Hilton properties (Waldorf, Conrad). Earn with the Hilton Honors Aspire.",
  },
  {
    id: "marriott",
    name: "Marriott Bonvoy",
    shortName: "Marriott",
    cpp: 0.8,
    type: "hotel",
    recommendation:
      "Use 5th-night-free awards and Bonvoy luxury brands. Earn with the Marriott Bonvoy Brilliant.",
  },
  {
    id: "united",
    name: "United MileagePlus",
    shortName: "United",
    cpp: 1.5,
    type: "airline",
    recommendation:
      "Strong for Star Alliance partner awards and Excursionist Perk routings.",
  },
  {
    id: "delta",
    name: "Delta SkyMiles",
    shortName: "Delta",
    cpp: 1.2,
    type: "airline",
    recommendation:
      "Best used for SkyTeam partner flights; watch for flash sales on domestic routes.",
  },
  {
    id: "american",
    name: "American AAdvantage",
    shortName: "American",
    cpp: 1.5,
    type: "airline",
    recommendation:
      "Excellent for oneworld partner premium cabins (Qatar Qsuite, JAL).",
  },
  {
    id: "southwest",
    name: "Southwest Rapid Rewards",
    shortName: "Southwest",
    cpp: 1.5,
    type: "airline",
    recommendation:
      "Best for domestic value plus the Companion Pass. Fixed-value redemptions.",
  },
];

export const pointValueById = (id: string) =>
  pointValues.find((p) => p.id === id);
