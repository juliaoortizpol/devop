import type { LocaleContent } from "@/lib/content";
import { cn } from "@/lib/utils";
import { GlassPanel } from "./primitives";
import { toneText } from "./portfolioStyles";

interface HeroSectionProps {
  content: LocaleContent["home"]["hero"];
}

export function HeroSection({ content }: HeroSectionProps) {
  return (
    <section className="relative flex min-h-[560px] items-center justify-center overflow-hidden px-gutter py-md md:min-h-[620px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(207,188,255,0.14),transparent_34%),linear-gradient(180deg,rgba(20,18,24,0),#0f0d13_92%)]" />
      <div className="relative z-10 mx-auto flex max-w-container-max flex-col items-center text-center">
        <div className="mb-sm inline-flex items-center gap-xs rounded-full border border-outline-variant/30 bg-surface-container-highest/50 px-xs py-1 text-label-sm font-label-sm text-primary">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          {content.availability}
        </div>

        <h1 className="mb-sm max-w-5xl text-5xl font-extrabold leading-none text-on-surface md:text-7xl">
          {content.name}
        </h1>

        <p className="mx-auto mb-md max-w-2xl text-body-lg font-body-lg text-on-surface-variant">
          {content.summary.map((segment, index) => (
            <span
              className={segment.tone ? cn(toneText[segment.tone], "font-semibold") : undefined}
              key={`${segment.text}-${index}`}
            >
              {segment.text}
            </span>
          ))}
        </p>

        <div className="mb-md flex w-full flex-col justify-center gap-md sm:w-auto sm:flex-row">
          <a
            className="rounded-xl bg-gradient-to-r from-primary to-primary-container px-lg py-sm text-center font-headline-md text-on-primary shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-primary/40"
            href="#contact"
          >
            {content.primaryCta}
          </a>
        </div>

        <div className="grid w-full max-w-4xl grid-cols-1 gap-md md:grid-cols-3">
          {content.stats.map((stat) => (
            <GlassPanel className="flex flex-col items-center p-md" key={stat.label}>
              <span className={cn("text-display-lg font-bold", toneText[stat.tone])}>
                {stat.value}
              </span>
              <span className="text-center text-label-sm font-label-sm uppercase text-on-surface-variant">
                {stat.label}
              </span>
            </GlassPanel>
          ))}
        </div>
      </div>
    </section>
  );
}
