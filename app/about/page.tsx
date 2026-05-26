import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "About",
  description:
    "High Tide Travel is a podcast and content brand for the points and miles obsessed. Learn about our mission to make premium travel accessible through smart credit card strategy.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About · High Tide Travel",
    description:
      "A podcast and content brand making premium travel accessible through points and miles.",
    url: "https://hightidetravel.co/about",
  },
};

const reasons = [
  {
    title: "Premium travel, smaller price tag",
    body: "A lie-flat seat to Tokyo can cost $8,000 in cash — or a transferable points balance you built from everyday spend. Points collapse that gap.",
    icon: "✈️",
  },
  {
    title: "Your spending already earns it",
    body: "Rent, groceries, dining, and travel can all earn points with the right cards. You're leaving free trips on the table by paying with the wrong one.",
    icon: "💳",
  },
  {
    title: "Flexibility beats loyalty",
    body: "Transferable currencies like Amex MR and Chase UR let you pivot to whichever airline or hotel has the best deal — no single-program lock-in.",
    icon: "🔄",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="We turn everyday spend into extraordinary trips"
        subtitle="High Tide Travel is a podcast and content brand for the points and miles obsessed — and the curious beginners who want in."
      />

      <div className="container-page py-14 sm:py-20">
        {/* Host bio */}
        <section className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <Reveal>
            <div className="relative mx-auto w-full max-w-sm">
              {/* Image slot — drop a host photo at /public/host.jpg and swap in next/image */}
              <div className="card-surface flex aspect-[4/5] items-center justify-center rounded-3xl bg-hero-gradient">
                <div className="text-center text-white/40">
                  <span className="text-5xl">🧳</span>
                  <p className="mt-3 text-sm">Host photo</p>
                  <p className="text-xs text-white/30">
                    (add /public/host.jpg)
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="eyebrow">Meet your host</p>
            <h2 className="section-title mt-3">Your guide to the high tide</h2>
            <div className="mt-4 space-y-4 text-white/70">
              <p>
                [Placeholder bio] Hi, I&apos;m the voice behind High Tide Travel.
                After years of chasing welcome bonuses, decoding transfer
                partners, and booking flights I never thought I could afford, I
                started this brand to make points travel approachable for
                everyone.
              </p>
              <p>
                [Placeholder bio] When I&apos;m not crunching cents-per-point, you&apos;ll
                find me hunting award space, reviewing lounges, and planning the
                next big trip. This is where I share everything I&apos;ve learned —
                no gatekeeping.
              </p>
            </div>
          </Reveal>
        </section>

        {/* Mission */}
        <section className="mt-20">
          <Reveal>
            <div className="card-surface relative overflow-hidden p-8 sm:p-12">
              <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
              <div className="relative max-w-3xl">
                <p className="eyebrow">Our mission</p>
                <h2 className="mt-3 font-display text-2xl font-bold leading-snug text-white sm:text-3xl">
                  Make the world&apos;s best travel accessible to anyone willing to
                  be a little strategic about how they spend.
                </h2>
                <p className="mt-4 text-white/65">
                  We cut through the noise of the points and miles world with
                  honest reviews, clear strategy, and tools that actually help you
                  book. No hype, no jargon — just smarter travel.
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Why points travel */}
        <section className="mt-20">
          <Reveal>
            <p className="eyebrow">Why points travel?</p>
            <h2 className="section-title mt-3">
              The case for playing the points game
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {reasons.map((r, i) => (
              <Reveal key={r.title} delay={i * 0.1}>
                <div className="card-surface h-full p-7">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-tide-gradient text-2xl">
                    {r.icon}
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold text-white">
                    {r.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    {r.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-20">
          <Reveal>
            <div className="rounded-3xl border border-white/10 bg-hero-gradient p-8 text-center sm:p-12">
              <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
                Ready to ride the high tide?
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-white/65">
                Join the newsletter for card strategy, award deals, and the
                podcast launch.
              </p>
              <div className="mx-auto mt-6 max-w-md">
                <NewsletterForm variant="newsletter" />
              </div>
            </div>
          </Reveal>
        </section>
      </div>
    </>
  );
}
