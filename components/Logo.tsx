import Image from "next/image";
import Link from "next/link";

type Variant = "mark" | "full";

export default function Logo({
  variant = "mark",
  className = "",
  priority = false,
  showWordmark = true,
}: {
  variant?: Variant;
  className?: string;
  priority?: boolean;
  /** Only applies to the "mark" variant: render the text wordmark beside the emblem */
  showWordmark?: boolean;
}) {
  if (variant === "full") {
    return (
      <Link
        href="/"
        aria-label="High Tide Travel home"
        className={`inline-flex items-center ${className}`}
      >
        <Image
          src="/logo.png"
          alt="High Tide Travel"
          width={1024}
          height={1024}
          priority={priority}
          className="h-24 w-24 rounded-2xl"
        />
      </Link>
    );
  }

  return (
    <Link
      href="/"
      aria-label="High Tide Travel home"
      className={`group inline-flex items-center gap-2.5 ${className}`}
    >
      <Image
        src="/logo-mark.png"
        alt="High Tide Travel"
        width={400}
        height={400}
        priority={priority}
        className="h-10 w-10 rounded-xl ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-105 sm:h-11 sm:w-11"
      />
      {showWordmark && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-base font-bold tracking-tight text-white sm:text-lg">
            High Tide
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-sky-accent">
            Travel
          </span>
        </span>
      )}
    </Link>
  );
}
