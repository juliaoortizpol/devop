import type { LocaleContent } from "@/lib/content";

export type AdminSection = "hero" | "experience" | "skills" | "contact" | "json";
export type SaveStatus = "idle" | "saving" | "saved" | "error";

export type LocaleUpdater = (
  updater: (current: LocaleContent) => LocaleContent
) => void;
