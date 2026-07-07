import type { Tone } from "@/lib/content";

export const toneText: Record<Tone, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  tertiary: "text-tertiary",
  muted: "text-on-surface-variant",
};

export const toneBorder: Record<Tone, string> = {
  primary: "hover:border-primary/40",
  secondary: "hover:border-secondary/40",
  tertiary: "hover:border-tertiary/40",
  muted: "hover:border-outline/40",
};

export const toneHoverText: Record<Tone, string> = {
  primary: "group-hover:text-primary",
  secondary: "group-hover:text-secondary",
  tertiary: "group-hover:text-tertiary",
  muted: "group-hover:text-on-surface",
};

export const iconLabels = {
  spark: "AI",
  database: "DB",
  mobile: "RN",
  architecture: "CI",
};
