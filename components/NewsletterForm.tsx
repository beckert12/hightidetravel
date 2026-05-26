"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Variant = "newsletter" | "notify";

export default function NewsletterForm({
  variant = "newsletter",
  className = "",
}: {
  variant?: Variant;
  className?: string;
}) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const cta = variant === "notify" ? "Notify Me" : "Subscribe";
  const placeholder =
    variant === "notify" ? "you@email.com" : "Enter your email";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!valid) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    // Placeholder: wire up to your ESP (ConvertKit, Beehiiv, Mailchimp) later.
    setSubmitted(true);
  }

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 rounded-xl border border-sky-accent/40 bg-sky-accent/10 px-5 py-4 text-sm text-white"
          >
            <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-sky-accent text-navy">
              ✓
            </span>
            You&apos;re on the list. We&apos;ll be in touch when the tide rolls in.
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 sm:flex-row"
            noValidate
          >
            <div className="flex-1">
              <label htmlFor={`email-${variant}`} className="sr-only">
                Email address
              </label>
              <input
                id={`email-${variant}`}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={placeholder}
                className="input-field"
                autoComplete="email"
              />
            </div>
            <button type="submit" className="btn-primary whitespace-nowrap">
              {cta}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
      {error && !submitted && (
        <p className="mt-2 text-sm text-gold">{error}</p>
      )}
    </div>
  );
}
