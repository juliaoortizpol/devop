import { promises as fs } from "node:fs";
import path from "node:path";

export const locales = ["en", "es"] as const;
export const defaultLocale = "en";

export type Locale = (typeof locales)[number];
export type Tone = "primary" | "secondary" | "tertiary" | "muted";

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
    hero: {
      availability: string;
      name: string;
      summary: Array<{
        text: string;
        tone?: Tone;
      }>;
      primaryCta: string;
      secondaryCta: string;
      stats: Array<{
        value: string;
        label: string;
        tone: Tone;
      }>;
    };
    experience: {
      title: string;
      roles: Array<{
        title: string;
        company: string;
        period: string;
        description: string;
        skills: string[];
        tone: Tone;
      }>;
    };
    skills: {
      title: string;
      description: string;
      categories: Array<{
        title: string;
        icon: "spark" | "database" | "mobile" | "architecture";
        tone: Tone;
        skills: string[];
      }>;
    };
    projects: {
      title: string;
      items: Array<{
        category: string;
        title: string;
        description: string;
        image: string;
        imageAlt: string;
        cta: string;
        tone: Tone;
      }>;
    };
    writing: {
      title: string;
      archiveCta: string;
      items: Array<{
        date: string;
        readTime: string;
        title: string;
        description: string;
        cta: string;
        tone: Tone;
      }>;
    };
    cta: {
      headlinePrefix: string;
      headlineEmphasis: string;
      primaryCta: string;
      socialLinks: Array<{
        label: string;
        href: string;
      }>;
    };
    footer: {
      links: Array<{
        label: string;
        href: string;
      }>;
      copyright: string;
    };
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

    assertString(getAt(localeContent, ["metadata", "title"]), "metadata.title", locale);
    assertString(
      getAt(localeContent, ["metadata", "description"]),
      "metadata.description",
      locale
    );
    assertString(getAt(localeContent, ["nav", "logo"]), "nav.logo", locale);
    assertString(
      getAt(localeContent, ["nav", "links", "experience"]),
      "nav.links.experience",
      locale
    );
    assertString(getAt(localeContent, ["nav", "links", "skills"]), "nav.links.skills", locale);
    assertString(
      getAt(localeContent, ["nav", "links", "projects"]),
      "nav.links.projects",
      locale
    );
    assertString(getAt(localeContent, ["nav", "links", "blog"]), "nav.links.blog", locale);
    assertString(
      getAt(localeContent, ["nav", "actions", "resume"]),
      "nav.actions.resume",
      locale
    );
    assertString(
      getAt(localeContent, ["nav", "actions", "sourceCode"]),
      "nav.actions.sourceCode",
      locale
    );
    assertString(
      getAt(localeContent, ["home", "hero", "availability"]),
      "home.hero.availability",
      locale
    );
    assertString(getAt(localeContent, ["home", "hero", "name"]), "home.hero.name", locale);
    assertArray(
      getAt(localeContent, ["home", "hero", "summary"]),
      "home.hero.summary",
      locale
    );
    assertString(
      getAt(localeContent, ["home", "hero", "primaryCta"]),
      "home.hero.primaryCta",
      locale
    );
    assertString(
      getAt(localeContent, ["home", "hero", "secondaryCta"]),
      "home.hero.secondaryCta",
      locale
    );
    assertArray(getAt(localeContent, ["home", "hero", "stats"]), "home.hero.stats", locale);
    assertString(
      getAt(localeContent, ["home", "experience", "title"]),
      "home.experience.title",
      locale
    );
    assertArray(
      getAt(localeContent, ["home", "experience", "roles"]),
      "home.experience.roles",
      locale
    );
    assertString(getAt(localeContent, ["home", "skills", "title"]), "home.skills.title", locale);
    assertString(
      getAt(localeContent, ["home", "skills", "description"]),
      "home.skills.description",
      locale
    );
    assertArray(
      getAt(localeContent, ["home", "skills", "categories"]),
      "home.skills.categories",
      locale
    );
    assertString(
      getAt(localeContent, ["home", "projects", "title"]),
      "home.projects.title",
      locale
    );
    assertArray(
      getAt(localeContent, ["home", "projects", "items"]),
      "home.projects.items",
      locale
    );
    assertString(
      getAt(localeContent, ["home", "writing", "title"]),
      "home.writing.title",
      locale
    );
    assertString(
      getAt(localeContent, ["home", "writing", "archiveCta"]),
      "home.writing.archiveCta",
      locale
    );
    assertArray(
      getAt(localeContent, ["home", "writing", "items"]),
      "home.writing.items",
      locale
    );
    assertString(
      getAt(localeContent, ["home", "cta", "headlinePrefix"]),
      "home.cta.headlinePrefix",
      locale
    );
    assertString(
      getAt(localeContent, ["home", "cta", "headlineEmphasis"]),
      "home.cta.headlineEmphasis",
      locale
    );
    assertString(
      getAt(localeContent, ["home", "cta", "primaryCta"]),
      "home.cta.primaryCta",
      locale
    );
    assertArray(
      getAt(localeContent, ["home", "cta", "socialLinks"]),
      "home.cta.socialLinks",
      locale
    );
    assertArray(getAt(localeContent, ["home", "footer", "links"]), "home.footer.links", locale);
    assertString(
      getAt(localeContent, ["home", "footer", "copyright"]),
      "home.footer.copyright",
      locale
    );
  }
}

function getAt(value: Record<string, unknown>, pathName: string[]) {
  return pathName.reduce<unknown>((current, key) => {
    if (!isRecord(current)) {
      return undefined;
    }

    return current[key];
  }, value);
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

function assertArray(
  value: unknown,
  pathName: string,
  locale: Locale
): asserts value is unknown[] {
  if (!Array.isArray(value)) {
    throw new Error(`"${pathName}" must be an array for locale "${locale}".`);
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
