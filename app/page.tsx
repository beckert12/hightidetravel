import Link from "next/link";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import CardTile from "@/components/CardTile";
import NewsletterForm from "@/components/NewsletterForm";
import { featuredCards } from "@/data/cards";

const steps = [
  {
    n: "01",
    title: "Pick your card",
    body: "Compare the best travel rewards cards and match a welcome bonus to your next trip.",
    icon: "💳",
  },
  {
    n: "02",
    title: "Earn points",
    body: "Put everyday spend on the right card and stack transferable points and miles fast.",
    icon: "📈",
  },
  {
    n: "03",
    title: "Book your trip",
    body: "Redeem through the best transfer partners and fly further for a fraction of cash.",
    icon: "✈️",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* How it works */}
      <section id="how-it-works" className="container-page py-20 sm:py-28">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">How it works</p>
          <h2 className="section-title mt-3">
            Three steps to your next free flight
          </h2>
          <p className="mt-4 text-white/60">
            We make travel rewards simple. No jargon, no fluff — just a clear path
            from sign-up bonus to seat 1A.
          </p>
        </Reveal>

        <div className="relative mt-14 grid gap-6 md:grid-cols-3">
          <div className="absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-sky-accent/30 to-transparent md:block" />
          {steps.map((step, i) => (
            <Reveal key={step.n} delay={i * 0.12} className="relative">
              <div className="card-surface h-full p-7">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-tide-gradient text-2xl">
                    {step.icon}
                  </span>
                  <span className="font-display text-3xl font-bold text-white/10">
                    {step.n}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Featured cards */}
      <section className="border-y border-white/10 bg-navy-900/50">
        <div className="container-page py-20 sm:py-28">
          <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div className="max-w-xl">
              <p className="eyebrow">Featured cards</p>
              <h2 className="section-title mt-3">Start with a proven winner</h2>
              <p className="mt-4 text-white/60">
                Hand-picked cards that deliver the best mix of welcome bonus,
                everyday earning, and travel perks.
              </p>
            </div>
            <Link href="/credit-cards" className="btn-secondary whitespace-nowrap">
              View all cards →
            </Link>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {featuredCards.map((card, i) => (
              <Reveal key={card.id} delay={i * 0.1}>
                <CardTile card={card} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Podcast teaser + newsletter */}
      <section
        id="newsletter"
        className="container-page py-20 sm:py-28"
      >
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-hero-gradient p-8 sm:p-14">
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-sky-accent/15 blur-3xl" />
            <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="eyebrow">The Podcast · Coming Soon</p>
                <h2 className="section-title mt-3">
                  Travel the world on points &amp; miles
                </h2>
                <p className="mt-4 max-w-lg text-white/70">
                  High Tide Travel is launching a podcast about smart credit card
                  strategy and award travel. Be the first to know when episode one
                  drops — and get our newsletter with the latest card offers.
                </p>
                <div className="mt-8 max-w-md">
                  <NewsletterForm variant="notify" />
                  <p className="mt-3 text-xs text-white/40">
                    No spam. Just points, miles, and the occasional flight deal.
                  </p>
                </div>
              </div>

              <div className="relative mx-auto w-full max-w-sm">
                <div className="card-surface aspect-square rounded-3xl bg-navy-900/60 p-8">
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <span className="flex h-20 w-20 items-center justify-center rounded-full bg-tide-gradient text-4xl shadow-glow">
                      🎙️
                    </span>
                    <p className="mt-6 font-display text-2xl font-bold text-white">
                      High Tide Travel
                    </p>
                    <p className="mt-1 text-sm text-sky-accent">The Podcast</p>
                    <span className="mt-6 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gold">
                      Coming Soon
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
