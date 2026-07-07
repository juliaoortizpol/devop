import type { LocaleContent } from "@/lib/content";
import { cn } from "@/lib/utils";
import { GlassPanel, SectionTitle, TagList } from "./primitives";
import { toneText } from "./portfolioStyles";

interface ExperienceSectionProps {
  content: LocaleContent["home"]["experience"];
}

export function ExperienceSection({ content }: ExperienceSectionProps) {
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
