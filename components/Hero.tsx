"use client";

import Link from "next/link";
import { motion } from "framer-motion";

// Direct-prop reveal (reliable on first paint) with a per-element delay for stagger.
const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero-gradient">
      {/* decorative waves */}
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -right-32 top-10 h-96 w-96 rounded-full bg-sky-accent/10 blur-3xl" />
        <div className="absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />
      </div>

      <div className="container-page relative grid gap-12 py-20 sm:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-32">
        <div>
          <motion.span
            {...fadeUp(0)}
            className="inline-flex items-center gap-2 rounded-full border border-sky-accent/30 bg-sky-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-sky-accent"
          >
            Points · Miles · Smart Travel
          </motion.span>

          <motion.h1
            {...fadeUp(0.1)}
            className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Travel More.{" "}
            <span className="text-gold">Spend Less.</span>
            <br />
            Ride the High Tide.
          </motion.h1>

          <motion.p
            {...fadeUp(0.2)}
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/70"
          >
            Your guide to travel rewards credit cards, points optimization, and
            unforgettable trips — plus the podcast that turns everyday spend into
            first-class adventures.
          </motion.p>

          <motion.div {...fadeUp(0.3)} className="mt-9 flex flex-wrap gap-4">
            <Link href="/credit-cards" className="btn-primary">
              Explore Credit Cards
            </Link>
            <Link href="/podcast" className="btn-secondary">
              Listen to the Podcast
            </Link>
          </motion.div>

          <motion.div
            {...fadeUp(0.4)}
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-white/50"
          >
            <span>
              <strong className="text-white">9</strong> top cards reviewed
            </span>
            <span>
              <strong className="text-white">11</strong> points currencies tracked
            </span>
            <span>
              <strong className="text-white">∞</strong> trips unlocked
            </span>
          </motion.div>
        </div>

        {/* Floating card stack */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative mx-auto hidden h-80 w-full max-w-md lg:block"
        >
          <div className="absolute left-1/2 top-1/2 h-64 w-96 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-tide-gradient opacity-30 blur-2xl" />
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-6 top-10 aspect-[1.586/1] w-72 rotate-[-8deg] rounded-2xl bg-gradient-to-br from-royal via-royal-light to-sky-accent p-5 shadow-card"
          >
            <div className="h-8 w-11 rounded-md bg-gradient-to-br from-yellow-200 to-yellow-500" />
            <p className="mt-12 text-sm font-semibold tracking-wider text-white/90">
              HIGH TIDE REWARDS
            </p>
            <p className="text-xs text-white/60">•••• •••• •••• 2048</p>
          </motion.div>
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute right-2 top-28 aspect-[1.586/1] w-72 rotate-[7deg] rounded-2xl bg-gradient-to-br from-navy-900 via-navy to-royal p-5 shadow-card ring-1 ring-gold/30"
          >
            <div className="h-8 w-11 rounded-md bg-gradient-to-br from-yellow-200 to-yellow-500" />
            <p className="mt-12 text-sm font-semibold tracking-wider text-gold">
              PLATINUM TIER
            </p>
            <p className="text-xs text-white/60">•••• •••• •••• 8801</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
