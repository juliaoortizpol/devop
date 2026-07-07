import type { AdminSection } from "./adminTypes";

export const adminSections: Array<{
  id: AdminSection;
  title: string;
  description: string;
  icon: string;
  tone: string;
}> = [
  {
    id: "hero",
    title: "Hero & Profile",
    description: "Main brand and identity strings",
    icon: "ID",
    tone: "text-primary bg-primary/10",
  },
  {
    id: "experience",
    title: "Experience Timeline",
    description: "Professional career path",
    icon: "XP",
    tone: "text-secondary bg-secondary/10",
  },
  {
    id: "skills",
    title: "Technical Arsenal",
    description: "Skills and tech stacks",
    icon: "SK",
    tone: "text-tertiary bg-tertiary/10",
  },
  {
    id: "contact",
    title: "Contact & Footer",
    description: "CTA, links, and footer copy",
    icon: "CT",
    tone: "text-primary bg-primary/10",
  },
  {
    id: "json",
    title: "Raw JSON",
    description: "Advanced full-content editor",
    icon: "{}",
    tone: "text-on-surface-variant bg-surface-container-high",
  },
];
