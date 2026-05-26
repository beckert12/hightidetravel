import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import NewsletterForm from "@/components/NewsletterForm";
import { SpotifyIcon, ApplePodcastsIcon, YouTubeIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "The Podcast",
  description:
    "High Tide Travel is a podcast about traveling the world on points, miles, and smart credit card strategy. Subscribe to know when the first episode drops.",
  alternates: { canonical: "/podcast" },
  openGraph: {
    title: "The Podcast · High Tide Travel",
    description:
      "A podcast about traveling the world on points, miles, and smart credit card strategy.",
    url: "https://hightidetravel.co/podcast",
  },
};

const platforms = [
  { label: "Spotify", Icon: SpotifyIcon, href: "#spotify" },
  { label: "Apple Podcasts", Icon: ApplePodcastsIcon, href: "#apple" },
  { label: "YouTube", Icon: YouTubeIcon, href: "#youtube" },
];

export default function PodcastPage() {
  return (
    <>
      <PageHeader
        eyebrow="The Podcast · Coming Soon"
        title="Traveling the world on points & miles"
        subtitle="High Tide Travel is a podcast about traveling the world on points, miles, and smart credit card strategy."
      />

      <div className="container-page py-14 sm:py-20">
        {/* Subscribe + platforms */}
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <Reveal>
            <div className="card-surface p-7 sm:p-9">
              <h2 className="font-display text-2xl font-bold text-white">
                Be first in line
              </h2>
              <p className="mt-2 text-white/60">
                Drop your email and we&apos;ll let you know the moment episode one
                goes live.
              </p>
              <div className="mt-6">
                <NewsletterForm variant="notify" />
              </div>

              <div className="mt-8">
                <p className="text-sm font-medium text-white/50">
                  Follow on your favorite platform
                </p>
                <div className="mt-3 flex flex-wrap gap-3">
                  {platforms.map(({ label, Icon, href }) => (
                    <a
                      key={label}
                      href={href}
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/80 transition hover:border-sky-accent hover:text-white"
                    >
                      <Icon className="h-5 w-5" />
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative mx-auto w-full max-w-sm">
              <div className="card-surface aspect-square rounded-3xl bg-hero-gradient p-8">
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <span className="flex h-24 w-24 items-center justify-center rounded-full bg-tide-gradient text-5xl shadow-glow">
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
          </Reveal>
        </div>

        {/* Episodes */}
        <div className="mt-20">
          <Reveal>
            <h2 className="section-title">Episodes</h2>
            <p className="mt-2 text-white/55">
              The feed is warming up. Here&apos;s what&apos;s on deck.
            </p>
          </Reveal>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Reveal>
              <div className="card-surface flex h-full flex-col items-start justify-between gap-6 p-6">
                <span className="rounded-full bg-sky-accent/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sky-accent">
                  Episode 01
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-white">
                    First episode dropping soon
                  </h3>
                  <p className="mt-2 text-sm text-white/55">
                    We&apos;re recording now. Subscribe above and you&apos;ll be the
                    first to hear it.
                  </p>
                </div>
                <span className="text-xs font-medium text-white/35">
                  Coming soon
                </span>
              </div>
            </Reveal>

            {[2, 3].map((n) => (
              <Reveal key={n} delay={n * 0.08}>
                <div className="flex h-full min-h-[200px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 p-6 text-center">
                  <span className="text-3xl opacity-40">🌊</span>
                  <p className="mt-3 text-sm text-white/40">
                    Episode {String(n).padStart(2, "0")} — on the way
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
