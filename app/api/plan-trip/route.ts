import { NextRequest } from "next/server";
import { TRIP_PLAN_SCHEMA, type TripInput } from "@/lib/trip";

// Cloudflare Pages (next-on-pages) requires the edge runtime for route handlers.
export const runtime = "edge";

// Claude model — see https://platform.claude.com/docs/en/about-claude/models
// Swap to "claude-sonnet-4-6" for lower cost/latency if you prefer.
const MODEL = "claude-opus-4-7";
const ANTHROPIC_URL = "https://api.anthropic.com/v1/messages";

const SYSTEM_PROMPT = `You are the trip-planning assistant for High Tide Travel, a brand focused on maximizing travel rewards (points, miles, and credit card strategy).

Given a traveler's trip parameters and their points/miles inventory, produce a concrete, tailored plan. Be specific and realistic, but understand that all prices and award costs you provide are ESTIMATES — the user will click through to live booking sites to confirm.

Rules:
- Provide exactly 3 flight options: a mix that fits the route and the traveler's vibe (e.g., a points-optimal option, a nonstop/convenience option, and a value/cash option). Use realistic airlines that actually serve the route. cashEstUsd = estimated round-trip cash price per traveler in USD. pointsEst = estimated round-trip award cost in the most relevant program the traveler holds (or the best transfer-partner option); set pointsEst to 0 only if no sensible award option exists. pointsProgram = the program name (e.g., "United MileagePlus", "Amex MR → ANA").
- Provide exactly 3 hotel options near the destination matching the vibe. cashPerNightUsd = estimated nightly cash rate. pointsPerNight = estimated nightly award cost in a relevant program (0 if the property is cash-only / Airbnb-style). pointsProgram = e.g., "World of Hyatt", "Marriott Bonvoy", or "Cash / Airbnb".
- Tailor everything to the vibe notes (pace, interests, constraints like "morning flights" or "no more than 2 stops").
- Prioritize programs and transfer partners the traveler actually listed in their inventory. If their balance is low for a redemption, say so in notes.
- Provide at least 5 activities tailored to the destination and vibe.
- considerations: give practical, destination-specific guidance for rental car, travel insurance, TSA PreCheck/Global Entry relevance, lounge access at the DEPARTURE airport, and any destination-specific tips.
- Keep every notes/description field to 1-2 tight sentences. No markdown, no emojis.
- Never invent specific flight numbers or exact bookable fares — keep numbers as round estimates.`;

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

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return Response.json(
      {
        error:
          "Trip planner is not configured. Set the ANTHROPIC_API_KEY environment variable (Cloudflare Pages → Settings → Environment variables, and .env.local for local dev).",
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
    return Response.json(
      { error: "A destination is required." },
      { status: 400 }
    );
  }

  const payload = {
    model: MODEL,
    max_tokens: 8000,
    system: [
      {
        type: "text",
        text: SYSTEM_PROMPT,
        cache_control: { type: "ephemeral" },
      },
    ],
    messages: [{ role: "user", content: buildUserMessage(input) }],
    output_config: {
      effort: "medium",
      format: { type: "json_schema", schema: TRIP_PLAN_SCHEMA },
    },
  };

  let res: Response;
  try {
    res = await fetch(ANTHROPIC_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(payload),
    });
  } catch {
    return Response.json(
      { error: "Could not reach the planning service. Please try again." },
      { status: 502 }
    );
  }

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error("Anthropic API error", res.status, detail);
    const msg =
      res.status === 401
        ? "The configured API key was rejected. Check ANTHROPIC_API_KEY."
        : res.status === 429
        ? "The planner is rate-limited right now. Please try again in a moment."
        : "The planning service returned an error. Please try again.";
    return Response.json({ error: msg }, { status: 502 });
  }

  const data = (await res.json()) as {
    content?: { type: string; text?: string }[];
  };
  const textBlock = data.content?.find((b) => b.type === "text");
  if (!textBlock?.text) {
    return Response.json(
      { error: "The planner returned an empty response. Please try again." },
      { status: 502 }
    );
  }

  let plan: unknown;
  try {
    plan = JSON.parse(textBlock.text);
  } catch {
    return Response.json(
      { error: "The planner returned malformed data. Please try again." },
      { status: 502 }
    );
  }

  return Response.json({ plan });
}
