import type { LocaleContent } from "@/lib/content";
import { cn } from "@/lib/utils";
import { GlassPanel, TagList } from "./primitives";
import { iconLabels, toneText } from "./portfolioStyles";

interface SkillsSectionProps {
  content: LocaleContent["home"]["skills"];
}

export function SkillsSection({ content }: SkillsSectionProps) {
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
