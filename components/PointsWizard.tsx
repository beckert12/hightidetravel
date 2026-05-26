"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { pointValues } from "@/data/pointValues";
import {
  estimateTrip,
  tripTypes,
  type TripType,
  type EstimateResult,
} from "@/data/estimator";
import PointsResults from "./PointsResults";

const STEPS = ["Trip details", "Your points", "Trip style"];

const stepVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
};

export default function PointsWizard() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);

  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [nights, setNights] = useState(5);
  const [travelers, setTravelers] = useState(2);
  const [currencyIds, setCurrencyIds] = useState<string[]>([]);
  const [tripType, setTripType] = useState<TripType | null>(null);

  const [result, setResult] = useState<EstimateResult | null>(null);

  const totalSteps = STEPS.length;
  const progress = result ? 100 : ((step + 1) / totalSteps) * 100;

  function go(next: number) {
    setDir(next > step ? 1 : -1);
    setStep(next);
  }

  function toggleCurrency(id: string) {
    setCurrencyIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  const canNext =
    step === 0
      ? destination.trim().length > 0 && nights > 0 && travelers > 0
      : step === 1
      ? currencyIds.length > 0
      : tripType !== null;

  function handleSubmit() {
    if (!tripType) return;
    const r = estimateTrip({
      origin,
      destination,
      nights,
      travelers,
      currencyIds,
      tripType,
    });
    setResult(r);
  }

  function reset() {
    setResult(null);
    setStep(0);
    setDir(-1);
  }

  if (result && tripType) {
    return (
      <PointsResults
        result={result}
        destination={destination}
        origin={origin}
        nights={nights}
        travelers={travelers}
        onReset={reset}
      />
    );
  }

  return (
    <div className="card-surface overflow-hidden">
      {/* Progress */}
      <div className="border-b border-white/10 p-5 sm:p-7">
        <div className="flex items-center justify-between text-xs font-medium text-white/50">
          {STEPS.map((label, i) => (
            <span
              key={label}
              className={i <= step ? "text-sky-accent" : ""}
            >
              {i + 1}. {label}
            </span>
          ))}
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-tide-gradient"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </div>

      <div className="relative min-h-[360px] p-5 sm:p-8">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={step}
            custom={dir}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {step === 0 && (
              <div className="space-y-6">
                <StepHeading
                  title="Where are you headed?"
                  sub="Tell us about the trip you want to take on points."
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Origin (optional)">
                    <input
                      className="input-field"
                      placeholder="e.g. New York (JFK)"
                      value={origin}
                      onChange={(e) => setOrigin(e.target.value)}
                    />
                  </Field>
                  <Field label="Destination">
                    <input
                      className="input-field"
                      placeholder="e.g. Tokyo (HND)"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                    />
                  </Field>
                  <Field label="Trip length (nights)">
                    <Stepper
                      value={nights}
                      min={1}
                      max={30}
                      onChange={setNights}
                    />
                  </Field>
                  <Field label="Travelers">
                    <Stepper
                      value={travelers}
                      min={1}
                      max={10}
                      onChange={setTravelers}
                    />
                  </Field>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-6">
                <StepHeading
                  title="Which points do you have?"
                  sub="Select every currency you're earning — we'll estimate each one."
                />
                <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                  {pointValues.map((p) => {
                    const checked = currencyIds.includes(p.id);
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => toggleCurrency(p.id)}
                        className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition ${
                          checked
                            ? "border-sky-accent bg-sky-accent/10 text-white"
                            : "border-white/10 bg-white/[0.03] text-white/70 hover:border-white/25"
                        }`}
                      >
                        <span>
                          <span className="block font-semibold">
                            {p.shortName}
                          </span>
                          <span className="text-xs text-white/40">
                            {p.cpp.toFixed(1)} cpp
                          </span>
                        </span>
                        <span
                          className={`flex h-5 w-5 items-center justify-center rounded-md border text-xs ${
                            checked
                              ? "border-sky-accent bg-sky-accent text-navy"
                              : "border-white/25"
                          }`}
                        >
                          {checked ? "✓" : ""}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <p className="text-xs text-white/40">
                  {currencyIds.length} selected
                </p>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <StepHeading
                  title="What kind of trip?"
                  sub="This shapes the cost estimate and which redemptions we recommend."
                />
                <div className="grid gap-3 sm:grid-cols-2">
                  {tripTypes.map((t) => {
                    const active = tripType === t.id;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setTripType(t.id)}
                        className={`flex items-start gap-4 rounded-xl border p-4 text-left transition ${
                          active
                            ? "border-gold bg-gold/10"
                            : "border-white/10 bg-white/[0.03] hover:border-white/25"
                        }`}
                      >
                        <span className="text-2xl">{t.icon}</span>
                        <span>
                          <span className="block font-semibold text-white">
                            {t.label}
                          </span>
                          <span className="mt-0.5 block text-xs text-white/55">
                            {t.description}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer nav */}
      <div className="flex items-center justify-between border-t border-white/10 p-5 sm:p-7">
        <button
          onClick={() => go(Math.max(0, step - 1))}
          disabled={step === 0}
          className="btn-ghost disabled:cursor-not-allowed disabled:opacity-30"
        >
          ← Back
        </button>

        {step < totalSteps - 1 ? (
          <button
            onClick={() => canNext && go(step + 1)}
            disabled={!canNext}
            className="btn-primary disabled:cursor-not-allowed disabled:opacity-40"
          >
            Continue →
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!canNext}
            className="btn-primary disabled:cursor-not-allowed disabled:opacity-40"
          >
            See my estimate ✨
          </button>
        )}
      </div>
    </div>
  );
}

function StepHeading({ title, sub }: { title: string; sub: string }) {
  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-white">{title}</h2>
      <p className="mt-1 text-sm text-white/55">{sub}</p>
    </div>
  );
}

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

function Stepper({
  value,
  min,
  max,
  onChange,
}: {
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        className="flex h-11 w-11 flex-none items-center justify-center rounded-xl border border-white/15 text-lg text-white transition hover:border-sky-accent hover:text-sky-accent"
      >
        −
      </button>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        onChange={(e) => {
          const v = parseInt(e.target.value, 10);
          if (Number.isNaN(v)) return;
          onChange(Math.min(max, Math.max(min, v)));
        }}
        className="input-field w-full text-center"
      />
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        className="flex h-11 w-11 flex-none items-center justify-center rounded-xl border border-white/15 text-lg text-white transition hover:border-sky-accent hover:text-sky-accent"
      >
        +
      </button>
    </div>
  );
}
