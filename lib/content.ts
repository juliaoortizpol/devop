import { promises as fs } from "node:fs";
import path from "node:path";

export const locales = ["en", "es"] as const;
export const defaultLocale = "en";

export type Locale = (typeof locales)[number];

export interface PortfolioContent {
  en: LocaleContent;
  es: LocaleContent;
}

export interface LocaleContent {
  metadata: {
    title: string;
    description: string;
  };
  nav: {
    logo: string;
    links: {
      experience: string;
      skills: string;
      projects: string;
      blog: string;
    };
    actions: {
      resume: string;
      sourceCode: string;
    };
  };
  home: {
    eyebrow: string;
    headline: string;
  };
}

const contentFilePath = path.join(process.cwd(), "data", "content.json");

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export async function getContent(): Promise<PortfolioContent> {
  const file = await fs.readFile(contentFilePath, "utf8");
  const content = JSON.parse(file) as unknown;

  assertPortfolioContent(content);

  return content;
}

export async function getDictionary(locale: Locale): Promise<LocaleContent> {
  const content = await getContent();

  return content[locale];
}

export async function saveContent(content: PortfolioContent) {
  assertPortfolioContent(content);

  await fs.writeFile(contentFilePath, `${JSON.stringify(content, null, 2)}\n`);
}

function assertPortfolioContent(value: unknown): asserts value is PortfolioContent {
  if (!isRecord(value)) {
    throw new Error("Content must be an object.");
  }

  for (const locale of locales) {
    const localeContent = value[locale];

    if (!isRecord(localeContent)) {
      throw new Error(`Missing content for locale "${locale}".`);
    }

    const metadata = localeContent.metadata;
    const nav = localeContent.nav;
    const home = localeContent.home;

    if (!isRecord(metadata) || !isRecord(nav) || !isRecord(home)) {
      throw new Error(`Invalid content sections for locale "${locale}".`);
    }

    assertString(metadata.title, "metadata.title", locale);
    assertString(metadata.description, "metadata.description", locale);
    assertString(nav.logo, "nav.logo", locale);

    if (!isRecord(nav.links) || !isRecord(nav.actions)) {
      throw new Error(`Invalid nav content for locale "${locale}".`);
    }

    assertString(nav.links.experience, "nav.links.experience", locale);
    assertString(nav.links.skills, "nav.links.skills", locale);
    assertString(nav.links.projects, "nav.links.projects", locale);
    assertString(nav.links.blog, "nav.links.blog", locale);
    assertString(nav.actions.resume, "nav.actions.resume", locale);
    assertString(nav.actions.sourceCode, "nav.actions.sourceCode", locale);
    assertString(home.eyebrow, "home.eyebrow", locale);
    assertString(home.headline, "home.headline", locale);
  }
}

function assertString(
  value: unknown,
  pathName: string,
  locale: Locale
): asserts value is string {
  if (typeof value !== "string") {
    throw new Error(`"${pathName}" must be a string for locale "${locale}".`);
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
