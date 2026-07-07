import type { LocaleContent } from "@/lib/content";

interface ContactSectionProps {
  content: LocaleContent["home"]["cta"];
}

export function ContactSection({ content }: ContactSectionProps) {
  return (
    <section className="relative overflow-hidden py-xl" id="contact">
      <div className="relative z-10 mx-auto max-w-container-max px-gutter text-center">
        <h2 className="mx-auto mb-lg max-w-3xl font-display-lg text-display-lg-mobile text-on-surface md:text-display-lg">
          {content.headlinePrefix}{" "}
          <span className="bg-gradient-to-r from-primary to-tertiary bg-clip-text text-transparent">
            {content.headlineEmphasis}
          </span>
          ?
        </h2>
        <div className="flex flex-col justify-center gap-md sm:flex-row">
          <a
            className="rounded-full bg-primary px-xl py-sm font-headline-md text-on-primary shadow-2xl shadow-primary/30 transition-all duration-300 hover:scale-105"
            href={content.socialLinks[0]?.href ?? "#"}
          >
            {content.primaryCta}
          </a>
          <div className="flex justify-center gap-sm">
            {content.socialLinks.map((link) => (
              <a
                className="flex h-12 w-12 items-center justify-center rounded-full border border-outline-variant text-label-sm font-label-sm text-on-surface-variant transition-all duration-300 hover:border-primary hover:text-primary"
                href={link.href}
                key={link.label}
                title={link.label}
              >
                {link.label.slice(0, 2).toUpperCase()}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
