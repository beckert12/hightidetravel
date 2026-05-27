"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  evaluateCpp,
  flightDeepLinks,
  hotelDeepLinks,
  usd,
  pts,
  type CppTone,
  type TripInput,
  type TripPlan,
} from "@/lib/trip";

const TONE_STYLES: Record<CppTone, string> = {
  great: "bg-emerald-400/15 text-emerald-300 border-emerald-400/40",
  fair: "bg-gold/15 text-gold border-gold/40",
  cash: "bg-rose-500/15 text-rose-300 border-rose-400/40",
  none: "bg-white/10 text-white/50 border-white/15",
};

const emptyForm: TripInput = {
  origin: "",
  destination: "",
  startDate: "",
  endDate: "",
  tripLengthDays: 5,
  vibe: "",
  pointsInventory: "",
};

function CppBadge({ cashUsd, points }: { cashUsd: number; points: number }) {
  const v = evaluateCpp(cashUsd, points);
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${TONE_STYLES[v.tone]}`}
    >
      {v.cpp !== null && <span className="tabular-nums">{v.cpp.toFixed(2)}¢</span>}
      {v.label}
    </span>
  );
}

function Waves() {
  return (
    <svg
      viewBox="0 0 1200 80"
      preserveAspectRatio="none"
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 h-12 w-full text-sky-accent/20"
    >
      <path
        d="M0 40 C150 10 300 70 450 40 C600 10 750 70 900 40 C1050 10 1200 70 1200 40 L1200 80 L0 80 Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function TripPlanner() {
  const [form, setForm] = useState<TripInput>(emptyForm);
  const [submitted, setSubmitted] = useState<TripInput | null>(null);
  const [plan, setPlan] = useState<TripPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  function update<K extends keyof TripInput>(key: K, value: TripInput[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.destination.trim()) {
      setError("Please enter a destination.");
      return;
    }
    setError("");
    setLoading(true);
    setPlan(null);
    try {
      const res = await fetch("/api/plan-trip", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || "Something went wrong. Please try again.");
      } else {
        setPlan(data.plan as TripPlan);
        setSubmitted(form);
      }
    } catch {
      setError("Network error — please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleClear() {
    setForm(emptyForm);
    setPlan(null);
    setSubmitted(null);
    setError("");
  }

  async function handleCopy() {
    if (!plan || !submitted) return;
    const text = buildSummaryText(plan, submitted);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Couldn't copy to clipboard.");
    }
  }

  return (
    <div className="space-y-10">
      {/* ---- Form ---- */}
      <form
        onSubmit={handleSubmit}
        className="card-surface relative overflow-hidden p-6 sm:p-8"
      >
        <div className="relative">
          <p className="eyebrow">Plan a trip</p>
          <h2 className="mt-2 font-display text-2xl font-bold text-white">
            Tell us about your trip
          </h2>
          <p className="mt-1 text-sm text-white/55">
            Give us the basics and your points stash — we&apos;ll build a tailored
            plan with cash vs. points math.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Field label="Departure airport">
              <input
                className="input-field"
                placeholder="e.g. IAH"
                value={form.origin}
                onChange={(e) => update("origin", e.target.value)}
              />
            </Field>
            <Field label="Destination">
              <input
                className="input-field"
                placeholder="e.g. Lisbon (LIS)"
                value={form.destination}
                onChange={(e) => update("destination", e.target.value)}
              />
            </Field>
            <Field label="Earliest departure">
              <input
                type="date"
                className="input-field [color-scheme:dark]"
                value={form.startDate}
                onChange={(e) => update("startDate", e.target.value)}
              />
            </Field>
            <Field label="Latest return">
              <input
                type="date"
                className="input-field [color-scheme:dark]"
                value={form.endDate}
                onChange={(e) => update("endDate", e.target.value)}
              />
            </Field>
            <Field label="Trip length (days)">
              <input
                type="number"
                min={1}
                max={90}
                className="input-field"
                value={form.tripLengthDays}
                onChange={(e) =>
                  update("tripLengthDays", parseInt(e.target.value, 10) || 1)
                }
              />
            </Field>
          </div>

          <div className="mt-4 grid gap-4">
            <Field label="Vibe / trip notes">
              <textarea
                rows={2}
                className="input-field resize-none"
                placeholder="beach + relaxing, no more than 2 stops, prefer morning flights, foodie spots"
                value={form.vibe}
                onChange={(e) => update("vibe", e.target.value)}
              />
            </Field>
            <Field label="Points & miles you have">
              <textarea
                rows={2}
                className="input-field resize-none"
                placeholder="120k Chase UR, 80k Amex MR, 50k United miles, 60k Hyatt points"
                value={form.pointsInventory}
                onChange={(e) => update("pointsInventory", e.target.value)}
              />
            </Field>
          </div>

          {error && <p className="mt-4 text-sm text-rose-300">{error}</p>}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Planning your trip…" : "Plan my trip ✨"}
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="btn-ghost"
              disabled={loading}
            >
              Clear
            </button>
            <span className="text-xs text-white/40">
              Estimates only — click through to book & confirm live prices.
            </span>
          </div>
        </div>
        <Waves />
      </form>

      {/* ---- Loading ---- */}
      {loading && (
        <div className="card-surface flex flex-col items-center justify-center gap-3 p-12 text-center">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/15 border-t-sky-accent" />
          <p className="text-sm text-white/60">
            Charting your course — comparing flights, hotels, and points…
          </p>
        </div>
      )}

      {/* ---- Results ---- */}
      <AnimatePresence>
        {plan && submitted && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-10"
          >
            {/* summary */}
            <div className="card-surface overflow-hidden">
              <div className="bg-hero-gradient p-6 sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="eyebrow">Your trip plan</p>
                    <h2 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
                      {submitted.origin ? `${submitted.origin} → ` : ""}
                      {submitted.destination}
                    </h2>
                  </div>
                  <button onClick={handleCopy} className="btn-secondary">
                    {copied ? "✓ Copied" : "Copy Results"}
                  </button>
                </div>
                <p className="mt-3 max-w-3xl text-white/75">{plan.summary}</p>
              </div>
            </div>

            {/* flights */}
            <Section title="Flights" subtitle="Top 3 options for your route">
              <div className="grid gap-5 lg:grid-cols-3">
                {plan.flights.map((f, i) => (
                  <ResultCard key={i}>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="font-display text-lg font-semibold text-white">
                          {f.airline}
                        </h4>
                        <p className="text-xs text-white/50">{f.routeNote}</p>
                      </div>
                    </div>
                    <PriceRow
                      cashLabel="Cash (round-trip)"
                      cash={usd(f.cashEstUsd)}
                      pointsLabel={f.pointsProgram}
                      points={pts(f.pointsEst)}
                    />
                    <CppBadge cashUsd={f.cashEstUsd} points={f.pointsEst} />
                    {f.notes && (
                      <p className="text-sm text-white/60">{f.notes}</p>
                    )}
                    <LinkRow
                      links={flightDeepLinks(
                        submitted.origin,
                        submitted.destination,
                        submitted.startDate,
                        submitted.endDate,
                        f.airline
                      )}
                    />
                  </ResultCard>
                ))}
              </div>
            </Section>

            {/* hotels */}
            <Section title="Hotels" subtitle="Top 3 stays for your vibe">
              <div className="grid gap-5 lg:grid-cols-3">
                {plan.hotels.map((h, i) => (
                  <ResultCard key={i}>
                    <div>
                      <h4 className="font-display text-lg font-semibold text-white">
                        {h.name}
                      </h4>
                      <p className="text-xs text-white/50">{h.area}</p>
                    </div>
                    <PriceRow
                      cashLabel="Cash / night"
                      cash={usd(h.cashPerNightUsd)}
                      pointsLabel={h.pointsProgram}
                      points={pts(h.pointsPerNight)}
                    />
                    <CppBadge
                      cashUsd={h.cashPerNightUsd}
                      points={h.pointsPerNight}
                    />
                    {h.notes && (
                      <p className="text-sm text-white/60">{h.notes}</p>
                    )}
                    <LinkRow
                      links={hotelDeepLinks(h.name, submitted.destination)}
                    />
                  </ResultCard>
                ))}
              </div>
            </Section>

            {/* activities */}
            <Section title="Things to do" subtitle="Tailored to your notes">
              <div className="grid gap-4 sm:grid-cols-2">
                {plan.activities.map((a, i) => (
                  <div key={i} className="card-surface p-5">
                    <div className="flex gap-3">
                      <span className="flex h-7 w-7 flex-none items-center justify-center rounded-lg bg-tide-gradient text-sm font-bold text-navy">
                        {i + 1}
                      </span>
                      <div>
                        <h4 className="font-semibold text-white">{a.title}</h4>
                        <p className="mt-1 text-sm text-white/60">
                          {a.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* considerations */}
            <Section title="Other considerations" subtitle="Before you go">
              <div className="grid gap-4 sm:grid-cols-2">
                <Consideration label="Rental car" text={plan.considerations.rentalCar} />
                <Consideration
                  label="Travel insurance"
                  text={plan.considerations.travelInsurance}
                />
                <Consideration
                  label="TSA PreCheck / Global Entry"
                  text={plan.considerations.preCheckGlobalEntry}
                />
                <Consideration
                  label="Lounge access at departure"
                  text={plan.considerations.loungeAccess}
                />
                <div className="sm:col-span-2">
                  <Consideration
                    label="Destination tips"
                    text={plan.considerations.destinationTips}
                  />
                </div>
              </div>
            </Section>

            <div className="flex flex-wrap gap-3">
              <button onClick={handleCopy} className="btn-primary">
                {copied ? "✓ Copied to clipboard" : "Copy full trip summary"}
              </button>
              <button onClick={handleClear} className="btn-secondary">
                ↺ Plan another trip
              </button>
            </div>

            <p className="text-xs leading-relaxed text-white/40">
              All flight prices, hotel rates, and award costs are AI-generated
              estimates and will vary by date, availability, and fare class. Use
              the deep links to verify live pricing before booking. CPP =
              cents-per-point (cash value ÷ points). Above 1.5¢ is a great
              redemption; below 1.0¢, paying cash usually wins.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ---- small presentational helpers ------------------------------------------

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-white/70">
        {label}
      </span>
      {children}
    </label>
  );
}

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="mb-5">
        <h3 className="font-display text-xl font-semibold text-white">{title}</h3>
        <p className="text-sm text-white/50">{subtitle}</p>
      </div>
      {children}
    </section>
  );
}

function ResultCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="card-surface flex flex-col gap-3 p-5">{children}</div>
  );
}

function PriceRow({
  cashLabel,
  cash,
  pointsLabel,
  points,
}: {
  cashLabel: string;
  cash: string;
  pointsLabel: string;
  points: string;
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="rounded-lg bg-white/5 px-3 py-2">
        <p className="text-[11px] uppercase tracking-wide text-white/40">
          {cashLabel}
        </p>
        <p className="font-display font-bold text-white">{cash}</p>
      </div>
      <div className="rounded-lg bg-white/5 px-3 py-2">
        <p className="truncate text-[11px] uppercase tracking-wide text-white/40">
          {pointsLabel}
        </p>
        <p className="font-display font-bold text-sky-accent">{points}</p>
      </div>
    </div>
  );
}

function LinkRow({ links }: { links: { label: string; url: string }[] }) {
  return (
    <div className="mt-auto flex flex-wrap gap-2 pt-1">
      {links.map((l) => (
        <a
          key={l.label}
          href={l.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 transition hover:border-sky-accent hover:text-white"
        >
          {l.label} ↗
        </a>
      ))}
    </div>
  );
}

function Consideration({ label, text }: { label: string; text: string }) {
  return (
    <div className="card-surface h-full p-5">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-sky-accent">
        {label}
      </p>
      <p className="mt-1.5 text-sm text-white/70">{text}</p>
    </div>
  );
}

// ---- copy-to-clipboard text builder ----------------------------------------

function buildSummaryText(plan: TripPlan, input: TripInput): string {
  const lines: string[] = [];
  lines.push(`HIGH TIDE TRAVEL — TRIP PLAN`);
  lines.push(
    `${input.origin ? input.origin + " -> " : ""}${input.destination}`
  );
  lines.push(
    `Dates: ${input.startDate || "?"} to ${input.endDate || "?"} (${input.tripLengthDays} days)`
  );
  if (input.vibe) lines.push(`Vibe: ${input.vibe}`);
  lines.push("");
  lines.push(plan.summary);
  lines.push("");

  lines.push("FLIGHTS");
  plan.flights.forEach((f) => {
    const v = evaluateCpp(f.cashEstUsd, f.pointsEst);
    lines.push(
      `- ${f.airline} (${f.routeNote}): ${usd(f.cashEstUsd)} or ${pts(
        f.pointsEst
      )} ${f.pointsProgram} — ${v.cpp !== null ? v.cpp.toFixed(2) + "cpp, " : ""}${v.label}`
    );
    if (f.notes) lines.push(`    ${f.notes}`);
  });
  lines.push("");

  lines.push("HOTELS");
  plan.hotels.forEach((h) => {
    const v = evaluateCpp(h.cashPerNightUsd, h.pointsPerNight);
    lines.push(
      `- ${h.name} (${h.area}): ${usd(h.cashPerNightUsd)}/nt or ${pts(
        h.pointsPerNight
      )}/nt ${h.pointsProgram} — ${v.cpp !== null ? v.cpp.toFixed(2) + "cpp, " : ""}${v.label}`
    );
    if (h.notes) lines.push(`    ${h.notes}`);
  });
  lines.push("");

  lines.push("THINGS TO DO");
  plan.activities.forEach((a) => lines.push(`- ${a.title}: ${a.description}`));
  lines.push("");

  lines.push("OTHER CONSIDERATIONS");
  lines.push(`- Rental car: ${plan.considerations.rentalCar}`);
  lines.push(`- Travel insurance: ${plan.considerations.travelInsurance}`);
  lines.push(
    `- TSA PreCheck / Global Entry: ${plan.considerations.preCheckGlobalEntry}`
  );
  lines.push(`- Lounge access: ${plan.considerations.loungeAccess}`);
  lines.push(`- Destination tips: ${plan.considerations.destinationTips}`);
  lines.push("");
  lines.push("Estimates only — verify live prices before booking.");
  lines.push("Planned with High Tide Travel · hightidetravel.co");

  return lines.join("\n");
}
