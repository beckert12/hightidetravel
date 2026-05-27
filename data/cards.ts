// Seed credit card data. Edit freely — these objects drive the cards grid,
// comparison bar, and homepage featured strip. Affiliate links are placeholders.
//
// Benefit figures below were verified against issuer pages and reputable points
// sources in MAY 2026. Welcome bonuses and credits change frequently and vary by
// application channel — ALWAYS confirm against your live affiliate offer before
// treating these as published fact.

export type CardCategory =
  | "Best Overall"
  | "Travel"
  | "Hotel"
  | "Airline"
  | "No Annual Fee"
  | "Business";

export type CreditCard = {
  id: string;
  name: string;
  issuer: string;
  /** Annual fee in USD (0 = no annual fee) */
  annualFee: number;
  welcomeBonus: string;
  perks: string[];
  /** 1.0 - 5.0 */
  rating: number;
  categories: CardCategory[];
  /** Reward currency id (matches pointValues ids) this card earns, if any */
  pointsCurrency?: string;
  /** Placeholder affiliate / apply link */
  applyUrl: string;
  /** Short tagline for previews */
  tagline: string;
  /** Accent for the faux card face: tailwind gradient classes */
  faceGradient: string;
  /** Card network, shown on the faux card face */
  network?: string;
};

export const cardCategories: CardCategory[] = [
  "Best Overall",
  "Travel",
  "Hotel",
  "Airline",
  "No Annual Fee",
  "Business",
];

export const cards: CreditCard[] = [
  {
    id: "amex-platinum",
    name: "The Platinum Card",
    issuer: "American Express",
    annualFee: 895,
    welcomeBonus:
      "150,000 Membership Rewards points after $8,000 spend in 6 months",
    perks: [
      "Up to $600 in annual hotel credits (Fine Hotels + Resorts / The Hotel Collection)",
      "Centurion, Priority Pass & Delta Sky Club lounge access",
      "5x points on flights & prepaid hotels booked via Amex Travel",
    ],
    rating: 4.7,
    categories: ["Best Overall", "Travel"],
    pointsCurrency: "amex-mr",
    applyUrl: "#apply-amex-platinum",
    tagline: "The premium travel flagship.",
    faceGradient: "from-slate-200 via-slate-100 to-slate-400",
    network: "Amex",
  },
  {
    id: "amex-gold",
    name: "American Express Gold Card",
    issuer: "American Express",
    annualFee: 325,
    welcomeBonus:
      "Up to 100,000 Membership Rewards points after $8,000 spend in 6 months",
    perks: [
      "4x points at restaurants worldwide (up to $50k/yr)",
      "4x points at U.S. supermarkets (up to $25k/yr)",
      "$120 dining + $120 Uber Cash annual credits",
    ],
    rating: 4.7,
    categories: ["Travel", "Best Overall"],
    pointsCurrency: "amex-mr",
    applyUrl: "#apply-amex-gold",
    tagline: "The everyday points machine.",
    faceGradient: "from-yellow-200 via-amber-300 to-yellow-500",
    network: "Amex",
  },
  {
    id: "csp",
    name: "Chase Sapphire Preferred",
    issuer: "Chase",
    annualFee: 95,
    welcomeBonus: "75,000 Ultimate Rewards points after $5,000 spend in 3 months",
    perks: [
      "5x on travel booked via Chase Travel, 3x on dining & online groceries",
      "$50 annual Chase Travel hotel credit",
      "Strong trip cancellation & interruption protection",
    ],
    rating: 4.8,
    categories: ["Best Overall", "Travel"],
    pointsCurrency: "chase-ur",
    applyUrl: "#apply-csp",
    tagline: "The best first travel card.",
    faceGradient: "from-royal via-royal-light to-sky-accent",
    network: "Visa",
  },
  {
    id: "csr",
    name: "Chase Sapphire Reserve",
    issuer: "Chase",
    annualFee: 795,
    welcomeBonus: "75,000 Ultimate Rewards points after $5,000 spend in 3 months",
    perks: [
      "$300 annual travel credit + up to $500/yr in The Edit hotel credits",
      "Priority Pass & Chase Sapphire Lounge access",
      "8x on Chase Travel, 4x on flights & hotels booked direct",
    ],
    rating: 4.5,
    categories: ["Travel", "Best Overall"],
    pointsCurrency: "chase-ur",
    applyUrl: "#apply-csr",
    tagline: "Premium perks, transferable points.",
    faceGradient: "from-navy-900 via-navy to-royal",
    network: "Visa",
  },
  {
    id: "venture-x",
    name: "Capital One Venture X",
    issuer: "Capital One",
    annualFee: 395,
    welcomeBonus: "75,000 miles after $4,000 spend in 3 months",
    perks: [
      "$300 annual Capital One Travel credit",
      "10,000 anniversary bonus miles every year",
      "Priority Pass & Capital One Lounge access (guest access now limited)",
    ],
    rating: 4.6,
    categories: ["Travel", "Best Overall"],
    pointsCurrency: "capone",
    applyUrl: "#apply-venture-x",
    tagline: "Premium travel at a lower fee.",
    faceGradient: "from-slate-800 via-slate-600 to-slate-900",
    network: "Visa",
  },
  {
    id: "citi-strata",
    name: "Citi Strata Premier",
    issuer: "Citi",
    annualFee: 95,
    welcomeBonus: "60,000 ThankYou points after $4,000 spend in 3 months",
    perks: [
      "10x on hotels, car rentals & attractions via CitiTravel.com",
      "3x on air travel, dining, supermarkets, gas & EV charging",
      "$100 annual hotel credit on $500+ stays via Citi Travel",
    ],
    rating: 4.5,
    categories: ["Travel"],
    pointsCurrency: "citi-ty",
    applyUrl: "#apply-citi-strata",
    tagline: "Underrated transfer-partner gem.",
    faceGradient: "from-sky-accent via-royal-light to-royal",
    network: "Mastercard",
  },
  {
    id: "bilt",
    name: "Bilt Palladium Card",
    issuer: "Cardless / Column N.A.",
    annualFee: 495,
    welcomeBonus:
      "50,000 points + Bilt Gold status after $4,000 spend in 90 days, plus $300 Bilt Cash",
    perks: [
      "Earn points on rent & mortgage with no transaction fee",
      "$400 annual Bilt travel hotel credit + $200 Bilt Cash",
      "Priority Pass lounge access (up to 2 guests) & 2x on all spend",
    ],
    rating: 4.5,
    categories: ["Travel", "Best Overall"],
    pointsCurrency: "bilt",
    applyUrl: "#apply-bilt",
    tagline: "Premium rewards on rent & beyond.",
    faceGradient: "from-slate-600 via-slate-800 to-zinc-900",
    network: "Mastercard",
  },
  {
    id: "hilton-aspire",
    name: "Hilton Honors Aspire",
    issuer: "American Express",
    annualFee: 550,
    welcomeBonus: "175,000 Hilton Honors points after $6,000 spend in 6 months",
    perks: [
      "Complimentary Hilton Diamond status",
      "$400 Hilton resort credit + $200 airline flight credit annually",
      "Free Night Reward each card anniversary",
    ],
    rating: 4.5,
    categories: ["Hotel"],
    pointsCurrency: "hilton",
    applyUrl: "#apply-hilton-aspire",
    tagline: "Top-tier Hilton status & credits.",
    faceGradient: "from-sky-accent via-cyan-500 to-blue-700",
    network: "Amex",
  },
  {
    id: "marriott-brilliant",
    name: "Marriott Bonvoy Brilliant",
    issuer: "American Express",
    annualFee: 650,
    welcomeBonus:
      "100,000 Bonvoy points after $6,000 spend in 6 months (+50,000 after $2,000 more)",
    perks: [
      "Complimentary Marriott Platinum Elite status",
      "$300 annual dining credit ($25/month)",
      "Annual Free Night Award (up to 85,000 points)",
    ],
    rating: 4.4,
    categories: ["Hotel"],
    pointsCurrency: "marriott",
    applyUrl: "#apply-marriott-brilliant",
    tagline: "Luxury Bonvoy stays & status.",
    faceGradient: "from-amber-700 via-orange-800 to-rose-900",
    network: "Amex",
  },
];

export const featuredCardIds = ["csp", "amex-platinum", "venture-x"];

export const cardById = (id: string) => cards.find((c) => c.id === id);

export const featuredCards = featuredCardIds
  .map(cardById)
  .filter((c): c is CreditCard => Boolean(c));

// ---- Earning rates + co-brand (drives the Trip Planner's "which card to use"
// recommendations). Multipliers are points/$ in each category. `portal` = the
// issuer's own travel portal (Chase/Amex/Capital One/Citi Travel). `coBrand`
// flags airline/hotel cards that should win for that brand's purchases.
// Approximate current rates — edit freely.

export type CardEarn = {
  flights: number;
  hotels: number;
  dining: number;
  portal: number;
  other: number;
};

export type CardEarnInfo = {
  earn: CardEarn;
  coBrand?: { type: "airline" | "hotel"; program: string };
};

export const cardEarnRates: Record<string, CardEarnInfo> = {
  "amex-platinum": { earn: { flights: 5, hotels: 5, dining: 1, portal: 5, other: 1 } },
  "amex-gold": { earn: { flights: 3, hotels: 1, dining: 4, portal: 2, other: 1 } },
  csp: { earn: { flights: 2, hotels: 2, dining: 3, portal: 5, other: 1 } },
  csr: { earn: { flights: 4, hotels: 4, dining: 3, portal: 8, other: 1 } },
  "venture-x": { earn: { flights: 2, hotels: 2, dining: 2, portal: 10, other: 2 } },
  "citi-strata": { earn: { flights: 3, hotels: 3, dining: 3, portal: 10, other: 1 } },
  bilt: { earn: { flights: 2, hotels: 2, dining: 2, portal: 2, other: 2 } },
  "hilton-aspire": {
    earn: { flights: 7, hotels: 14, dining: 7, portal: 7, other: 3 },
    coBrand: { type: "hotel", program: "Hilton Honors" },
  },
  "marriott-brilliant": {
    earn: { flights: 3, hotels: 6, dining: 3, portal: 3, other: 2 },
    coBrand: { type: "hotel", program: "Marriott Bonvoy" },
  },
};

// Compact reference block injected into the planner prompt so card mentions in
// the user's free-text input map to accurate earning rates + currencies.
export function cardReferenceText(): string {
  const lines = ["KNOWN CARDS (earn rates points/$ — flights/hotels/dining/portal/other; currency; co-brand):"];
  for (const c of cards) {
    const info = cardEarnRates[c.id];
    if (!info) continue;
    const e = info.earn;
    const co = info.coBrand ? ` co-brand:${info.coBrand.program}` : "";
    lines.push(
      `- ${c.name} (${c.issuer}): ${e.flights}/${e.hotels}/${e.dining}/${e.portal}/${e.other}; currency:${c.pointsCurrency ?? "none"}${co}`
    );
  }
  return lines.join("\n");
}
