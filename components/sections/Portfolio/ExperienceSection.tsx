import type { LocaleContent } from "@/lib/content";
import { cn } from "@/lib/utils";
import { GlassPanel, SectionTitle, TagList } from "./primitives";
import { toneText } from "./portfolioStyles";

interface ExperienceSectionProps {
  content: LocaleContent["home"]["experience"];
}

enum ExperienceCompany {
  QikBancoDigital = "Qik Banco Digital",
  BairesDev = "Baires Dev",
  NexusGroup = "NEXUS GROUP",
}

export function ExperienceSection({ content }: ExperienceSectionProps) {
  return (
    <section className="bg-surface-container-lowest py-xl" id="experience">
      <div className="mx-auto max-w-container-max px-gutter">
        <SectionTitle title={content.title} icon={<TerminalIcon />} />
        <div className="relative space-y-xl">
          <div className="absolute bottom-4 left-[19px] top-4 w-px bg-gradient-to-b from-primary to-transparent opacity-30" />
          {content.roles.map((role, index) => {
            const accentTone =
              index === 0 ? "tertiary" : role.tone === "tertiary" ? "primary" : role.tone;

            return (
              <article className="relative pl-xl" key={`${role.company}-${role.period}`}>
                <div
                  className={cn(
                    "absolute left-0 top-1 z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 bg-surface-container text-label-sm font-label-sm",
                    accentTone === "tertiary"
                      ? "border-tertiary text-tertiary"
                      : "border-primary text-primary"
                  )}
                >
                  <CompanyIcon company={role.company} />
                </div>
                <ExperienceCard href={role.companyHref}>
                  <div className="mb-xs flex flex-wrap items-start justify-between gap-xs">
                    <h3 className={cn("font-headline-md", toneText[accentTone])}>
                      {role.title}
                    </h3>
                    <span className="font-label-sm text-on-surface-variant">
                      {role.period}
                    </span>
                  </div>
                  <p className="mb-sm font-headline-md text-on-surface">
                    {role.company}
                  </p>
                  <p className="mb-md max-w-3xl text-on-surface-variant">
                    {role.description}
                  </p>
                  <TagList tags={role.skills} />
                </ExperienceCard>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({
  children,
  href,
}: {
  children: React.ReactNode;
  href?: string;
}) {
  const className =
    "block p-md transition-transform duration-300 hover:scale-[1.01]";

  if (!href) {
    return <GlassPanel className={className}>{children}</GlassPanel>;
  }

  return (
    <a
      className={cn(
        className,
        "rounded-2xl border border-white/10 bg-surface-container/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-primary"
      )}
      href={href}
      rel="noreferrer"
      target="_blank"
    >
      {children}
    </a>
  );
}

function CompanyIcon({ company }: { company: string }) {
  switch (company) {
    case ExperienceCompany.QikBancoDigital:
      return <ShieldCodeIcon />;
    case ExperienceCompany.BairesDev:
      return <LayersIcon />;
    case ExperienceCompany.NexusGroup:
    default:
      return <TerminalIcon />;
  }
}

function TerminalIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="m7 8 4 4-4 4" />
      <path d="M13 16h4" />
      <rect height="18" rx="2" width="20" x="2" y="3" />
    </svg>
  );
}

function ShieldCodeIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m10 9-3 3 3 3" />
      <path d="m14 9 3 3-3 3" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="m12 2 10 5-10 5L2 7Z" />
      <path d="m2 17 10 5 10-5" />
      <path d="m2 12 10 5 10-5" />
    </svg>
  );
}
