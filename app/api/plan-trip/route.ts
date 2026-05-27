import { getRequestContext } from "@cloudflare/next-on-pages";
import { TRIP_PLAN_SCHEMA, type TripInput } from "@/lib/trip";
import { transferReferenceText } from "@/data/transferPartners";
import { cardReferenceText } from "@/data/cards";

// Cloudflare Pages (next-on-pages) requires the edge runtime for route handlers.
export const runtime = "edge";

// Cloudflare Workers AI model. Runs on your Cloudflare account's free daily
// allowance — no API key, no separate bill. Swap for "@cf/meta/llama-3.1-8b-instruct"
// for faster/cheaper (more free headroom, lower quality) generation.
const MODEL = "@cf/meta/llama-3.3-70b-instruct-fp8-fast";

const SYSTEM_PROMPT = `You are the trip-planning assistant for High Tide Travel, a brand focused on maximizing travel rewards (points, miles, and credit card strategy).

Given a traveler's trip parameters, the credit cards they hold, their elite status/perks, and their points/miles balances, produce a concrete, tailored plan. All prices and award costs are ESTIMATES — the user clicks through to confirm live prices, and checks award SPACE on seats.aero / point.me / Roame.

Use the reference data below for ACCURATE transfer ratios, alliances, and card earning rates. Do not contradict it.

${transferReferenceText()}

${cardReferenceText()}

Rules:
- Provide exactly 3 flight options that fit the route and vibe (e.g. a points-optimal option, a nonstop/convenience option, a value/cash option) using realistic airlines that actually serve the route. cashEstUsd = estimated round-trip cash price per traveler (USD). pointsEst = estimated round-trip award cost in the most relevant program the traveler can access (0 only if no sensible award option). pointsProgram = program name.
- bestWaysToBook (per flight): identify the alliance of the operating airline, then recommend the BEST transfer partner the traveler can reach (from their cards' currencies, per the reference) to book it — favoring alliance sweet spots (e.g. Aeroplan/Avianca/Turkish for Star Alliance incl. United; Alaska/Avios/Asia Miles for oneworld incl. American; Flying Blue/Virgin Atlantic for SkyTeam incl. Delta). Name the transfer (e.g. "Transfer Chase UR -> Air Canada Aeroplan 1:1"). End with: "Check award space on seats.aero, point.me, or Roame." If they hold the operating airline's own miles or a co-branded card, mention that too.
- cardToUse (per flight AND per hotel): from the cards the traveler listed, pick the one that earns the most for THAT purchase if paying cash. Prefer a co-branded card for its own brand (e.g. a Hilton card for Hilton stays). Otherwise use the highest category multiplier from the reference (e.g. Amex Platinum 5x flights; Chase Sapphire Reserve 4x hotels / 8x via Chase Travel). State the card + multiplier in one short phrase. If they listed no usable card, say "Any travel card you have."
- Provide exactly 3 hotel options near the destination matching the vibe. cashPerNightUsd = nightly cash rate. pointsPerNight = nightly award cost (0 if cash-only / Airbnb). pointsProgram = e.g. "World of Hyatt", "Marriott Bonvoy", "Cash / Airbnb". Factor in any elite status they listed (e.g. Hyatt Globalist -> suite upgrades, free breakfast).
- Provide at least 5 activities tailored to the destination and vibe.
- considerations: practical guidance for rentalCar, travelInsurance, preCheckGlobalEntry, loungeAccess (at the DEPARTURE airport), destinationTips.
- cardStrategy.dining = which of THEIR cards to use for dining/everyday spend on this trip + multiplier (e.g. "Amex Gold — 4x at restaurants"). cardStrategy.upsell = ONE card they did NOT list that would shine on this trip and why, phrased as a soft suggestion (e.g. "Don't have the Amex Gold? Its 4x dining would boost a foodie trip like this."). If their wallet is already ideal, set upsell to a brief affirmation.
- Honor elite status & perks they listed (e.g. Southwest Companion Pass -> a companion flies for taxes; airline status -> free bags/upgrades).
- Keep every field to 1-2 short sentences. No markdown, no emojis. Round-number estimates only; never invent exact fares or flight numbers.

Respond with ONLY a single minified JSON object (no markdown, no code fences, no prose) of exactly this shape:
{"summary":string,"flights":[{"airline":string,"routeNote":string,"cashEstUsd":number,"pointsProgram":string,"pointsEst":number,"notes":string,"bestWaysToBook":string,"cardToUse":string}],"hotels":[{"name":string,"area":string,"cashPerNightUsd":number,"pointsProgram":string,"pointsPerNight":number,"notes":string,"cardToUse":string}],"activities":[{"title":string,"description":string}],"considerations":{"rentalCar":string,"travelInsurance":string,"preCheckGlobalEntry":string,"loungeAccess":string,"destinationTips":string},"cardStrategy":{"dining":string,"upsell":string}}`;

function buildUserMessage(input: TripInput): string {
  return [
    `Departure airport: ${input.origin || "(not specified)"}`,
    `Destination: ${input.destination}`,
    `Travel window: ${input.startDate || "?"} to ${input.endDate || "?"}`,
    `Trip length: ${input.tripLengthDays} day(s)`,
    `Vibe / trip notes: ${input.vibe || "(none given)"}`,
    `Credit cards held: ${input.cards || "(none given)"}`,
    `Elite status & perks: ${input.status || "(none given)"}`,
    `Points & miles balances: ${input.pointsInventory || "(none given)"}`,
  ].join("\n");
}

type WorkersAI = {
  run: (model: string, opts: unknown) => Promise<{ response?: unknown }>;
};

function extractJson(raw: string): unknown {
  const fenced = raw.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = fenced ? fenced[1] : raw;
  const start = candidate.indexOf("{");
  const end = candidate.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("No JSON object found");
  return JSON.parse(candidate.slice(start, end + 1));
}

function classifyError(err: unknown): {
  status: number;
  error: string;
  capacity?: boolean;
} {
  const msg = (err instanceof Error ? err.message : String(err)).toLowerCase();
  // Daily free Neuron allowance exhausted.
  if (/(neuron|daily|quota|exceed|out of|limit)/.test(msg)) {
    return {
      status: 429,
      capacity: true,
      error:
        "We've reached today's free planning limit. The Trip Planner resets daily (around midnight UTC) — please check back tomorrow.",
    };
  }
  // Model temporarily overloaded / transient rate limit.
  if (/(capacity|overload|3040|too many|rate|unavailable|busy|429|503)/.test(msg)) {
    return {
      status: 503,
      capacity: true,
      error:
        "The planner is busy right now. Give it a minute and try again.",
    };
  }
  return {
    status: 502,
    error: "The planning service returned an error. Please try again.",
  };
}

async function generate(ai: WorkersAI, messages: unknown[]) {
  // Prefer schema-constrained output; fall back to a plain run if the model
  // (or Workers AI version) rejects response_format.
  try {
    return await ai.run(MODEL, {
      messages,
      max_tokens: 4096,
      response_format: { type: "json_schema", json_schema: TRIP_PLAN_SCHEMA },
    });
  } catch {
    return await ai.run(MODEL, { messages, max_tokens: 4096 });
  }
}

export async function POST(req: Request) {
  let env: { AI?: WorkersAI } | undefined;
  try {
    env = getRequestContext().env as { AI?: WorkersAI };
  } catch {
    env = undefined;
  }
  const ai = env?.AI;
  if (!ai) {
    return Response.json(
      {
        error:
          "AI is not available. Add a Workers AI binding named 'AI' to this Pages project (Cloudflare → Settings → Functions → Bindings), then redeploy. (Locally, run via `npm run pages:dev`.)",
      },
      { status: 503 }
    );
  }

  let input: TripInput;
  try {
    input = (await req.json()) as TripInput;
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }
  if (!input.destination || !input.destination.trim()) {
    return Response.json({ error: "A destination is required." }, { status: 400 });
  }

  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    { role: "user", content: buildUserMessage(input) },
  ];

  let out: { response?: unknown };
  try {
    out = await generate(ai, messages);
  } catch (err) {
    console.error("Workers AI error", err);
    const c = classifyError(err);
    return Response.json(
      { error: c.error, capacity: c.capacity ?? false },
      { status: c.status }
    );
  }

  let plan: unknown;
  try {
    const r = out?.response;
    if (r && typeof r === "object") plan = r;
    else if (typeof r === "string") plan = extractJson(r);
    else throw new Error("Empty response");
  } catch {
    return Response.json(
      { error: "The planner returned malformed data. Please try again." },
      { status: 502 }
    );
  }

  return Response.json({ plan });
}
