import Reveal from "./Reveal";

export default function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-hero-gradient">
      <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-sky-accent/15 blur-3xl" />
      <div className="container-page relative py-16 sm:py-20">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 max-w-2xl text-lg text-white/70">{subtitle}</p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
