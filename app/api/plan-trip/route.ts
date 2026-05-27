import { getRequestContext } from "@cloudflare/next-on-pages";
import { TRIP_PLAN_SCHEMA, type TripInput } from "@/lib/trip";

// Cloudflare Pages (next-on-pages) requires the edge runtime for route handlers.
export const runtime = "edge";

// Cloudflare Workers AI model. Runs on your Cloudflare account's free daily
// allowance — no API key, no separate bill. Swap for "@cf/meta/llama-3.1-8b-instruct"
// for faster/cheaper (more free headroom, lower quality) generation.
const MODEL = "@cf/meta/llama-3.3-70b-instruct-fp8-fast";

const SYSTEM_PROMPT = `You are the trip-planning assistant for High Tide Travel, a brand focused on maximizing travel rewards (points, miles, and credit card strategy).

Given a traveler's trip parameters and their points/miles inventory, produce a concrete, tailored plan. Be specific and realistic, but understand that all prices and award costs are ESTIMATES — the user will click through to live booking sites to confirm.

Rules:
- Provide exactly 3 flight options that fit the route and vibe (e.g. a points-optimal option, a nonstop/convenience option, and a value/cash option) using realistic airlines that actually serve the route. cashEstUsd = estimated round-trip cash price per traveler (USD). pointsEst = estimated round-trip award cost in the most relevant program the traveler holds (0 only if no sensible award option). pointsProgram = program name (e.g. "United MileagePlus", "Amex MR -> ANA").
- Provide exactly 3 hotel options near the destination matching the vibe. cashPerNightUsd = estimated nightly cash rate. pointsPerNight = estimated nightly award cost (0 if cash-only / Airbnb-style). pointsProgram = e.g. "World of Hyatt", "Marriott Bonvoy", or "Cash / Airbnb".
- Prioritize programs the traveler actually listed. Tailor everything to the vibe notes.
- Provide at least 5 activities tailored to the destination and vibe.
- considerations: practical guidance for rentalCar, travelInsurance, preCheckGlobalEntry, loungeAccess (at the DEPARTURE airport), and destinationTips.
- Keep every notes/description field to 1-2 short sentences. No markdown, no emojis. Use round-number estimates; never invent exact fares or flight numbers.

Respond with ONLY a single minified JSON object (no markdown, no code fences, no prose) of exactly this shape:
{"summary":string,"flights":[{"airline":string,"routeNote":string,"cashEstUsd":number,"pointsProgram":string,"pointsEst":number,"notes":string}],"hotels":[{"name":string,"area":string,"cashPerNightUsd":number,"pointsProgram":string,"pointsPerNight":number,"notes":string}],"activities":[{"title":string,"description":string}],"considerations":{"rentalCar":string,"travelInsurance":string,"preCheckGlobalEntry":string,"loungeAccess":string,"destinationTips":string}}`;

function buildUserMessage(input: TripInput): string {
  return [
    `Departure airport: ${input.origin || "(not specified)"}`,
    `Destination: ${input.destination}`,
    `Travel window: ${input.startDate || "?"} to ${input.endDate || "?"}`,
    `Trip length: ${input.tripLengthDays} day(s)`,
    `Vibe / trip notes: ${input.vibe || "(none given)"}`,
    `Points & miles inventory: ${input.pointsInventory || "(none given)"}`,
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
    return Response.json(
      { error: "The planning service returned an error. Please try again." },
      { status: 502 }
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
