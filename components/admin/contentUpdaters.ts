import type { LocaleContent } from "@/lib/content";

export function updateRole(
  content: LocaleContent,
  index: number,
  patch: Partial<LocaleContent["home"]["experience"]["roles"][number]>
) {
  const roles = [...content.home.experience.roles];
  roles[index] = { ...roles[index], ...patch };

  return {
    ...content,
    home: {
      ...content.home,
      experience: {
        ...content.home.experience,
        roles,
      },
    },
  };
}
