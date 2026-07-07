import Image from "next/image";
import type { LocaleContent } from "@/lib/content";
import { cn } from "@/lib/utils";
import { GlassPanel } from "./primitives";
import { toneBorder, toneHoverText, toneText } from "./portfolioStyles";

interface ProjectsAndWritingSectionProps {
  projects: LocaleContent["home"]["projects"];
  writing: LocaleContent["home"]["writing"];
}

export function ProjectsAndWritingSection({
  projects,
  writing,
}: ProjectsAndWritingSectionProps) {
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
