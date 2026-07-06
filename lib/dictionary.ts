import dictionary from "@/data/dict.json";

export const locales = ["en", "es"] as const;
export const defaultLocale = "en";

export type Locale = (typeof locales)[number];
export type Dictionary = (typeof dictionary)[Locale];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionary[locale];
}
