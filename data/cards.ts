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
    name: "Bilt Card",
    issuer: "Cardless / Column N.A.",
    annualFee: 0,
    welcomeBonus: "No traditional welcome bonus — earn points on rent with no fees",
    perks: [
      "Pay rent (and now mortgage) with no transaction fee, earn points",
      "Bilt 2.0 lineup: Blue ($0), Obsidian ($95) & Palladium ($495) tiers",
      "Transfer to 15+ airline & hotel partners",
    ],
    rating: 4.3,
    categories: ["No Annual Fee", "Travel"],
    pointsCurrency: "bilt",
    applyUrl: "#apply-bilt",
    tagline: "Turn rent into award trips.",
    faceGradient: "from-zinc-700 via-zinc-900 to-black",
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
