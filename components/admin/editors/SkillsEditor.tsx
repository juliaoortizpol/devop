import type { LocaleContent } from "@/lib/content";
import type { LocaleUpdater } from "../adminTypes";
import { Field, TextArea } from "../FormControls";

interface SkillsEditorProps {
  content: LocaleContent;
  onChange: LocaleUpdater;
}

export function SkillsEditor({ content, onChange }: SkillsEditorProps) {
  return (
    <div className="space-y-md">
      <Field
        label="Section Title"
        onChange={(value) =>
          onChange((current) => ({
            ...current,
            home: {
              ...current.home,
              skills: { ...current.home.skills, title: value },
            },
          }))
        }
        value={content.home.skills.title}
      />
      <TextArea
        label="Section Description"
        onChange={(value) =>
          onChange((current) => ({
            ...current,
            home: {
              ...current.home,
              skills: { ...current.home.skills, description: value },
            },
          }))
        }
        value={content.home.skills.description}
      />
      <div className="grid grid-cols-1 gap-md md:grid-cols-2">
        {content.home.skills.categories.map((category, index) => (
          <Field
            key={category.title}
            label={category.title}
            onChange={(value) =>
              onChange((current) => {
                const categories = [...current.home.skills.categories];
                categories[index] = {
                  ...categories[index],
                  skills: value
                    .split(",")
                    .map((item) => item.trim())
                    .filter(Boolean),
                };
                return {
                  ...current,
                  home: {
                    ...current.home,
                    skills: { ...current.home.skills, categories },
                  },
                };
              })
            }
            value={category.skills.join(", ")}
          />
        ))}
      </div>
    </div>
  );
}
