import Image from "next/image";
import type { LocaleContent, Tone } from "@/lib/content";
import { cn } from "@/lib/utils";

interface PortfolioHomeProps {
  content: LocaleContent["home"];
}

const toneText: Record<Tone, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  tertiary: "text-tertiary",
  muted: "text-on-surface-variant",
};

const toneBorder: Record<Tone, string> = {
  primary: "hover:border-primary/40",
  secondary: "hover:border-secondary/40",
  tertiary: "hover:border-tertiary/40",
  muted: "hover:border-outline/40",
};

const toneHoverText: Record<Tone, string> = {
  primary: "group-hover:text-primary",
  secondary: "group-hover:text-secondary",
  tertiary: "group-hover:text-tertiary",
  muted: "group-hover:text-on-surface",
};

const iconLabels = {
  spark: "AI",
  database: "DB",
  mobile: "RN",
  architecture: "CI",
};

export function PortfolioHome({ content }: PortfolioHomeProps) {
  return (
    <main className="mt-16 overflow-x-hidden bg-background text-on-background">
      <HeroSection content={content.hero} />
      <ExperienceSection content={content.experience} />
      <SkillsSection content={content.skills} />
      <ProjectsAndWritingSection
        projects={content.projects}
        writing={content.writing}
      />
      <ContactSection content={content.cta} />
      <PortfolioFooter content={content.footer} />
    </main>
  );
}

function HeroSection({ content }: { content: LocaleContent["home"]["hero"] }) {
  return (
    <section className="relative flex min-h-[860px] items-center justify-center overflow-hidden px-gutter py-xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(207,188,255,0.14),transparent_34%),linear-gradient(180deg,rgba(20,18,24,0),#0f0d13_92%)]" />
      <div className="relative z-10 mx-auto flex max-w-container-max flex-col items-center text-center">
        <div className="mb-sm inline-flex items-center gap-xs rounded-full border border-outline-variant/30 bg-surface-container-highest/50 px-xs py-1 text-label-sm font-label-sm text-primary">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          {content.availability}
        </div>

        <h1 className="mb-md max-w-5xl text-5xl font-extrabold leading-none text-on-surface md:text-7xl">
          {content.name}
        </h1>

        <p className="mx-auto mb-lg max-w-2xl text-body-lg font-body-lg text-on-surface-variant">
          {content.summary.map((segment, index) => (
            <span
              className={segment.tone ? cn(toneText[segment.tone], "font-semibold") : undefined}
              key={`${segment.text}-${index}`}
            >
              {segment.text}
            </span>
          ))}
        </p>

        <div className="mb-xl flex w-full flex-col justify-center gap-md sm:w-auto sm:flex-row">
          <a
            className="rounded-xl bg-gradient-to-r from-primary to-primary-container px-lg py-sm text-center font-headline-md text-on-primary shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-primary/40"
            href="#contact"
          >
            {content.primaryCta}
          </a>
          <a
            className="rounded-xl border border-outline-variant bg-surface/30 px-lg py-sm text-center font-headline-md text-on-surface backdrop-blur-sm transition-all duration-300 hover:border-primary"
            href="#projects"
          >
            {content.secondaryCta}
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

function ExperienceSection({
  content,
}: {
  content: LocaleContent["home"]["experience"];
}) {
  return (
    <section className="bg-surface-container-lowest py-xl" id="experience">
      <div className="mx-auto max-w-container-max px-gutter">
        <SectionTitle title={content.title} accent="TERM" />
        <div className="relative space-y-xl">
          <div className="absolute bottom-4 left-[19px] top-4 w-px bg-gradient-to-b from-primary to-transparent opacity-30" />
          {content.roles.map((role) => (
            <article className="relative pl-xl" key={`${role.company}-${role.period}`}>
              <div className="absolute left-0 top-1 z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary bg-surface-container text-label-sm font-label-sm text-primary">
                WK
              </div>
              <GlassPanel className="p-md transition-transform duration-300 hover:scale-[1.01]">
                <div className="mb-xs flex flex-wrap items-start justify-between gap-xs">
                  <h3 className={cn("font-headline-md", toneText[role.tone])}>
                    {role.title}
                  </h3>
                  <span className="font-label-sm text-on-surface-variant">
                    {role.period}
                  </span>
                </div>
                <p className="mb-sm font-headline-md text-on-surface">{role.company}</p>
                <p className="mb-md max-w-3xl text-on-surface-variant">
                  {role.description}
                </p>
                <TagList tags={role.skills} />
              </GlassPanel>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillsSection({ content }: { content: LocaleContent["home"]["skills"] }) {
  return (
    <section className="py-xl" id="arsenal">
      <div className="mx-auto max-w-container-max px-gutter">
        <div className="mb-xl text-center">
          <h2 className="mb-xs font-display-lg text-display-lg-mobile text-on-surface md:text-display-lg">
            {content.title}
          </h2>
          <p className="font-body-lg text-on-surface-variant">{content.description}</p>
        </div>
        <div className="grid grid-cols-1 gap-md md:grid-cols-2">
          {content.categories.map((category) => (
            <GlassPanel className="p-lg" key={category.title}>
              <div className="mb-md flex items-center gap-sm">
                <span
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-lg bg-surface-container-high text-label-sm font-label-sm",
                    toneText[category.tone]
                  )}
                >
                  {iconLabels[category.icon]}
                </span>
                <h3 className="font-headline-md text-on-surface">
                  {category.title}
                </h3>
              </div>
              <TagList tags={category.skills} large />
            </GlassPanel>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectsAndWritingSection({
  projects,
  writing,
}: {
  projects: LocaleContent["home"]["projects"];
  writing: LocaleContent["home"]["writing"];
}) {
  return (
    <section className="bg-surface-container-low py-xl" id="projects">
      <div className="mx-auto max-w-container-max px-gutter">
        <div className="grid grid-cols-1 gap-xl lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="mb-lg font-display-lg text-display-lg-mobile text-on-surface">
              {projects.title}
            </h2>
            <div className="space-y-md">
              {projects.items.map((project) => (
                <GlassPanel
                  className={cn(
                    "group overflow-hidden transition-all duration-500 hover:-translate-y-2",
                    toneBorder[project.tone]
                  )}
                  key={project.title}
                >
                  <div className="relative aspect-video w-full overflow-hidden">
                    <Image
                      alt={project.imageAlt}
                      className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-100"
                      fill
                      sizes="(min-width: 1024px) 58vw, 100vw"
                      src={project.image}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />
                  </div>
                  <div className="p-lg">
                    <p className={cn("mb-xs text-label-sm font-label-sm uppercase", toneText[project.tone])}>
                      {project.category}
                    </p>
                    <h3 className="mb-xs font-headline-md text-on-surface">
                      {project.title}
                    </h3>
                    <p className="mb-md text-on-surface-variant">
                      {project.description}
                    </p>
                    <a
                      className={cn("font-label-sm hover:underline", toneText[project.tone])}
                      href="#"
                    >
                      {project.cta} →
                    </a>
                  </div>
                </GlassPanel>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5" id="blog">
            <h2 className="mb-lg font-display-lg text-display-lg-mobile text-on-surface">
              {writing.title}
            </h2>
            <div className="space-y-sm">
              {writing.items.map((article) => (
                <a
                  className={cn(
                    "group block rounded-2xl border border-outline-variant/10 p-md transition-all duration-300 hover:bg-surface-container-high/50",
                    toneBorder[article.tone]
                  )}
                  href="#"
                  key={article.title}
                >
                  <div className="mb-xs flex items-center gap-sm text-label-sm font-label-sm text-on-surface-variant">
                    <span>{article.date}</span>
                    <span className="h-1 w-1 rounded-full bg-outline-variant" />
                    <span>{article.readTime}</span>
                  </div>
                  <h3
                    className={cn(
                      "mb-xs font-headline-md text-on-surface transition-colors",
                      toneHoverText[article.tone]
                    )}
                  >
                    {article.title}
                  </h3>
                  <p className="mb-md line-clamp-2 text-body-md text-on-surface-variant">
                    {article.description}
                  </p>
                  <span className={cn("font-label-sm", toneText[article.tone])}>
                    {article.cta} →
                  </span>
                </a>
              ))}
              <div className="pt-md">
                <a
                  className="block w-full rounded-xl border border-dashed border-outline-variant py-sm text-center text-on-surface-variant transition-all duration-300 hover:border-primary hover:text-primary"
                  href="#"
                >
                  {writing.archiveCta}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection({ content }: { content: LocaleContent["home"]["cta"] }) {
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

function PortfolioFooter({
  content,
}: {
  content: LocaleContent["home"]["footer"];
}) {
  return (
    <footer className="w-full border-t border-outline-variant/20 bg-surface py-xl">
      <div className="mx-auto flex max-w-container-max flex-col items-center gap-md px-gutter">
        <div className="font-label-sm text-label-sm font-bold text-on-surface">
          JAOP.
        </div>
        <div className="flex gap-md text-on-surface-variant">
          {content.links.map((link) => (
            <a
              className="font-body-md text-body-md transition-colors hover:text-primary"
              href={link.href}
              key={link.label}
            >
              {link.label}
            </a>
          ))}
        </div>
        <p className="text-center font-body-md text-body-md text-on-surface-variant opacity-80 transition-opacity hover:opacity-100">
          {content.copyright}
        </p>
      </div>
    </footer>
  );
}

function SectionTitle({ title, accent }: { title: string; accent: string }) {
  return (
    <div className="mb-xl flex items-center gap-sm">
      <div className="rounded-lg bg-primary/10 p-xs text-label-sm font-label-sm text-primary">
        {accent}
      </div>
      <h2 className="font-display-lg text-display-lg-mobile text-on-surface">
        {title}
      </h2>
    </div>
  );
}

function GlassPanel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-surface-container/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-xl",
        className
      )}
    >
      {children}
    </div>
  );
}

function TagList({ tags, large = false }: { tags: string[]; large?: boolean }) {
  return (
    <div className="flex flex-wrap gap-xs">
      {tags.map((tag) => (
        <span
          className={cn(
            "rounded-full border border-outline-variant/20 bg-secondary-container/30 text-on-surface",
            large ? "px-sm py-1.5 text-body-md" : "px-xs py-1 text-label-sm"
          )}
          key={tag}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
