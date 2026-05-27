// Transfer-partner + airline-alliance reference data.
// Source: dailydrop.com transfer-partners cheat sheet (verified May 2026).
// Used to ground the Trip Planner's "best ways to book" recommendations so the
// AI uses real transfer ratios and alliances instead of guessing.
//
// Currency ids match `pointsCurrency` in data/cards.ts.

export type Alliance = "Star Alliance" | "oneworld" | "SkyTeam" | "none";

export type TransferPartner = {
  program: string;
  ratio: string; // e.g. "1:1"
  type: "airline" | "hotel";
  alliance?: Alliance; // airlines only
};

export const transferPartners: Record<string, TransferPartner[]> = {
  "amex-mr": [
    { program: "Air France/KLM Flying Blue", ratio: "1:1", type: "airline", alliance: "SkyTeam" },
    { program: "Delta SkyMiles", ratio: "1:1", type: "airline", alliance: "SkyTeam" },
    { program: "Aeromexico Rewards", ratio: "1:1.6", type: "airline", alliance: "SkyTeam" },
    { program: "ANA Mileage Club", ratio: "1:1", type: "airline", alliance: "Star Alliance" },
    { program: "Qantas Frequent Flyer", ratio: "1:1", type: "airline", alliance: "oneworld" },
    { program: "Virgin Atlantic Flying Club", ratio: "1:1", type: "airline", alliance: "none" },
    { program: "Etihad Guest", ratio: "1:1", type: "airline", alliance: "none" },
    { program: "Marriott Bonvoy", ratio: "1:1", type: "hotel" },
    { program: "Hilton Honors", ratio: "1:2", type: "hotel" },
    { program: "Choice Privileges", ratio: "1:1", type: "hotel" },
  ],
  "chase-ur": [
    { program: "United MileagePlus", ratio: "1:1", type: "airline", alliance: "Star Alliance" },
    { program: "Air Canada Aeroplan", ratio: "1:1", type: "airline", alliance: "Star Alliance" },
    { program: "Air France/KLM Flying Blue", ratio: "1:1", type: "airline", alliance: "SkyTeam" },
    { program: "British Airways Avios", ratio: "1:1", type: "airline", alliance: "oneworld" },
    { program: "Iberia Avios", ratio: "1:1", type: "airline", alliance: "oneworld" },
    { program: "Aer Lingus Avios", ratio: "1:1", type: "airline", alliance: "oneworld" },
    { program: "Virgin Atlantic Flying Club", ratio: "1:1", type: "airline", alliance: "none" },
    { program: "JetBlue TrueBlue", ratio: "1:1", type: "airline", alliance: "none" },
    { program: "Southwest Rapid Rewards", ratio: "1:1", type: "airline", alliance: "none" },
    { program: "World of Hyatt", ratio: "1:1", type: "hotel" },
    { program: "Marriott Bonvoy", ratio: "1:1", type: "hotel" },
    { program: "IHG One Rewards", ratio: "1:1", type: "hotel" },
  ],
  capone: [
    { program: "Air Canada Aeroplan", ratio: "1:1", type: "airline", alliance: "Star Alliance" },
    { program: "Avianca LifeMiles", ratio: "1:1", type: "airline", alliance: "Star Alliance" },
    { program: "Turkish Airlines Miles&Smiles", ratio: "1:1", type: "airline", alliance: "Star Alliance" },
    { program: "Air France/KLM Flying Blue", ratio: "1:1", type: "airline", alliance: "SkyTeam" },
    { program: "Aeromexico Rewards", ratio: "1:1", type: "airline", alliance: "SkyTeam" },
    { program: "British Airways Avios", ratio: "1:1", type: "airline", alliance: "oneworld" },
    { program: "Cathay Pacific Asia Miles", ratio: "1:1", type: "airline", alliance: "oneworld" },
    { program: "Qantas Frequent Flyer", ratio: "1:1", type: "airline", alliance: "oneworld" },
    { program: "Emirates Skywards", ratio: "2:1.5", type: "airline", alliance: "none" },
    { program: "Accor Live Limitless", ratio: "2:1", type: "hotel" },
    { program: "Wyndham Rewards", ratio: "1:1", type: "hotel" },
    { program: "Choice Privileges", ratio: "1:1", type: "hotel" },
  ],
  "citi-ty": [
    { program: "Avianca LifeMiles", ratio: "1:1", type: "airline", alliance: "Star Alliance" },
    { program: "Turkish Airlines Miles&Smiles", ratio: "1:1", type: "airline", alliance: "Star Alliance" },
    { program: "Air France/KLM Flying Blue", ratio: "1:1", type: "airline", alliance: "SkyTeam" },
    { program: "Cathay Pacific Asia Miles", ratio: "1:1", type: "airline", alliance: "oneworld" },
    { program: "British Airways Avios", ratio: "1:1", type: "airline", alliance: "oneworld" },
    { program: "Qatar Avios", ratio: "1:1", type: "airline", alliance: "oneworld" },
    { program: "Virgin Atlantic Flying Club", ratio: "1:1", type: "airline", alliance: "none" },
    { program: "Choice Privileges", ratio: "1:2", type: "hotel" },
    { program: "Wyndham Rewards", ratio: "1:1", type: "hotel" },
  ],
  bilt: [
    { program: "United MileagePlus", ratio: "1:1", type: "airline", alliance: "Star Alliance" },
    { program: "Air Canada Aeroplan", ratio: "1:1", type: "airline", alliance: "Star Alliance" },
    { program: "Air France/KLM Flying Blue", ratio: "1:1", type: "airline", alliance: "SkyTeam" },
    { program: "British Airways Avios", ratio: "1:1", type: "airline", alliance: "oneworld" },
    { program: "Cathay Pacific Asia Miles", ratio: "1:1", type: "airline", alliance: "oneworld" },
    { program: "Virgin Atlantic Flying Club", ratio: "1:1", type: "airline", alliance: "none" },
    { program: "Emirates Skywards", ratio: "1:1", type: "airline", alliance: "none" },
    { program: "Southwest Rapid Rewards", ratio: "1:1", type: "airline", alliance: "none" },
    { program: "World of Hyatt", ratio: "1:1", type: "hotel" },
    { program: "Marriott Bonvoy", ratio: "1:1", type: "hotel" },
    { program: "Hilton Honors", ratio: "1:1", type: "hotel" },
    { program: "IHG One Rewards", ratio: "1:1", type: "hotel" },
  ],
};

// Which alliance the major operating airlines belong to (for matching the
// airline that actually flies the route to a bookable partner program).
export const airlineAlliance: Record<string, Alliance> = {
  united: "Star Alliance",
  "air canada": "Star Alliance",
  lufthansa: "Star Alliance",
  ana: "Star Alliance",
  "all nippon": "Star Alliance",
  swiss: "Star Alliance",
  "turkish airlines": "Star Alliance",
  avianca: "Star Alliance",
  "american airlines": "oneworld",
  "british airways": "oneworld",
  "alaska airlines": "oneworld",
  "iberia": "oneworld",
  "cathay pacific": "oneworld",
  qantas: "oneworld",
  "japan airlines": "oneworld",
  qatar: "oneworld",
  finnair: "oneworld",
  delta: "SkyTeam",
  "air france": "SkyTeam",
  klm: "SkyTeam",
  korean: "SkyTeam",
  "virgin atlantic": "none",
  jetblue: "none",
  southwest: "none",
  emirates: "none",
};

// Sweet-spot booking programs by alliance — partners that frequently offer the
// best award rates / availability for that alliance's flights.
export const allianceSweetSpots: Record<Exclude<Alliance, "none">, string> = {
  "Star Alliance":
    "Air Canada Aeroplan and Avianca LifeMiles often price Star Alliance (incl. United) flights well; Turkish Miles&Smiles is excellent for United domestic.",
  oneworld:
    "Alaska Mileage Plan and British Airways/Iberia Avios (short-haul) often price oneworld (incl. American) flights well; Cathay Asia Miles for long-haul.",
  SkyTeam:
    "Air France/KLM Flying Blue (watch monthly Promo Rewards) and Virgin Atlantic often price SkyTeam (incl. Delta) flights far below Delta's own SkyMiles.",
};

// Compact reference block injected into the planner prompt.
export function transferReferenceText(): string {
  const lines: string[] = [];
  lines.push("TRANSFER PARTNERS (card currency -> program, ratio, alliance):");
  for (const [cur, partners] of Object.entries(transferPartners)) {
    const air = partners
      .filter((p) => p.type === "airline")
      .map((p) => `${p.program} ${p.ratio} [${p.alliance}]`)
      .join("; ");
    const hotel = partners
      .filter((p) => p.type === "hotel")
      .map((p) => `${p.program} ${p.ratio}`)
      .join("; ");
    lines.push(`- ${cur}: airlines: ${air}. hotels: ${hotel}.`);
  }
  lines.push("");
  lines.push("ALLIANCE SWEET SPOTS (best partner to book each alliance):");
  for (const [alliance, note] of Object.entries(allianceSweetSpots)) {
    lines.push(`- ${alliance}: ${note}`);
  }
  return lines.join("\n");
}
