import Link from "next/link";
import Logo from "./Logo";
import {
  InstagramIcon,
  TikTokIcon,
  SpotifyIcon,
  ApplePodcastsIcon,
} from "./icons";

const footerNav = [
  {
    title: "Explore",
    links: [
      { href: "/credit-cards", label: "Credit Cards" },
      { href: "/traveltool", label: "Trip Planner" },
      { href: "/podcast", label: "Podcast" },
      { href: "/about", label: "About" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/credit-cards", label: "Best Travel Cards" },
      { href: "/traveltool", label: "AI Trip Planner" },
      { href: "/#how-it-works", label: "How It Works" },
      { href: "/#newsletter", label: "Newsletter" },
    ],
  },
];

const socials = [
  { href: "https://instagram.com", label: "Instagram", Icon: InstagramIcon },
  { href: "https://tiktok.com", label: "TikTok", Icon: TikTokIcon },
  { href: "https://spotify.com", label: "Spotify", Icon: SpotifyIcon },
  {
    href: "https://podcasts.apple.com",
    label: "Apple Podcasts",
    Icon: ApplePodcastsIcon,
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy-900">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="space-y-4">
            <Logo variant="full" />
            <p className="max-w-xs text-sm leading-relaxed text-white/55">
              Travel more, spend less. Smart credit card strategy, points
              optimization, and trip planning — ride the high tide.
            </p>
            <div className="flex items-center gap-3 pt-1">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:border-sky-accent hover:text-sky-accent"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {footerNav.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white/40">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 transition hover:text-sky-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/40">
              The Brand
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-white/55">
              High Tide Travel is a podcast and content brand for the points and
              miles obsessed.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/40 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} High Tide Travel. All rights reserved.</p>
          <p className="max-w-xl leading-relaxed">
            Card details are illustrative placeholders. Always verify current
            terms with the issuer. Some links may be affiliate links.
          </p>
        </div>
      </div>
    </footer>
  );
}
