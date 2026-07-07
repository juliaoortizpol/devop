import type { LocaleContent } from "@/lib/content";
import type { LocaleUpdater } from "../adminTypes";
import { Field, TextArea } from "../FormControls";

interface HeroEditorProps {
  content: LocaleContent;
  onChange: LocaleUpdater;
}

export function HeroEditor({ content, onChange }: HeroEditorProps) {
  return (
    <div className="space-y-md">
      <div className="grid grid-cols-1 gap-md md:grid-cols-2">
        <Field
          label="Display Name"
          onChange={(value) =>
            onChange((current) => ({
              ...current,
              home: {
                ...current.home,
                hero: { ...current.home.hero, name: value },
              },
            }))
          }
          value={content.home.hero.name}
        />
        <Field
          label="Availability"
          onChange={(value) =>
            onChange((current) => ({
              ...current,
              home: {
                ...current.home,
                hero: { ...current.home.hero, availability: value },
              },
            }))
          }
          value={content.home.hero.availability}
        />
      </div>
      <TextArea
        label="Hero Summary"
        onChange={(value) =>
          onChange((current) => ({
            ...current,
            home: {
              ...current.home,
              hero: {
                ...current.home.hero,
                summary: [{ text: value }],
              },
            },
          }))
        }
        value={content.home.hero.summary.map((segment) => segment.text).join("")}
      />
      <div className="grid grid-cols-1 gap-md md:grid-cols-2">
        <Field
          label="Primary CTA"
          onChange={(value) =>
            onChange((current) => ({
              ...current,
              home: {
                ...current.home,
                hero: { ...current.home.hero, primaryCta: value },
              },
            }))
          }
          value={content.home.hero.primaryCta}
        />
        <Field
          label="Secondary CTA"
          onChange={(value) =>
            onChange((current) => ({
              ...current,
              home: {
                ...current.home,
                hero: { ...current.home.hero, secondaryCta: value },
              },
            }))
          }
          value={content.home.hero.secondaryCta}
        />
      </div>
      <div className="grid grid-cols-1 gap-md md:grid-cols-3">
        {content.home.hero.stats.map((stat, index) => (
          <Field
            key={`${stat.label}-${index}`}
            label={stat.label}
            onChange={(value) =>
              onChange((current) => {
                const stats = [...current.home.hero.stats];
                stats[index] = { ...stats[index], value };
                return {
                  ...current,
                  home: {
                    ...current.home,
                    hero: { ...current.home.hero, stats },
                  },
                };
              })
            }
            value={stat.value}
          />
        ))}
      </div>
    </div>
  );
}
