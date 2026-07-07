import type { LocaleContent } from "@/lib/content";
import { ContactSection } from "./ContactSection";
import { ExperienceSection } from "./ExperienceSection";
import { HeroSection } from "./HeroSection";
import { PortfolioFooter } from "./PortfolioFooter";
import { ProjectsAndWritingSection } from "./ProjectsAndWritingSection";
import { SkillsSection } from "./SkillsSection";

interface PortfolioHomeProps {
  content: LocaleContent["home"];
}

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
