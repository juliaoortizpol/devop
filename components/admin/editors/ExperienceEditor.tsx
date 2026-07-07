import type { LocaleContent } from "@/lib/content";
import type { LocaleUpdater } from "../adminTypes";
import { updateRole } from "../contentUpdaters";
import { Field, TextArea } from "../FormControls";

interface ExperienceEditorProps {
  content: LocaleContent;
  onChange: LocaleUpdater;
}

export function ExperienceEditor({
  content,
  onChange,
}: ExperienceEditorProps) {
  return (
    <div className="space-y-md">
      {content.home.experience.roles.map((role, index) => (
        <div
          className="rounded-lg border border-outline-variant/20 bg-surface-container p-md"
          key={`${role.company}-${index}`}
        >
          <div className="mb-md grid grid-cols-1 gap-md md:grid-cols-2">
            <Field
              label="Title"
              onChange={(value) =>
                onChange((current) => updateRole(current, index, { title: value }))
              }
              value={role.title}
            />
            <Field
              label="Company"
              onChange={(value) =>
                onChange((current) => updateRole(current, index, { company: value }))
              }
              value={role.company}
            />
            <Field
              label="Period"
              onChange={(value) =>
                onChange((current) => updateRole(current, index, { period: value }))
              }
              value={role.period}
            />
            <Field
              label="Skills"
              onChange={(value) =>
                onChange((current) =>
                  updateRole(current, index, {
                    skills: value
                      .split(",")
                      .map((item) => item.trim())
                      .filter(Boolean),
                  })
                )
              }
              value={role.skills.join(", ")}
            />
          </div>
          <TextArea
            label="Description"
            onChange={(value) =>
              onChange((current) =>
                updateRole(current, index, { description: value })
              )
            }
            value={role.description}
          />
        </div>
      ))}
    </div>
  );
}
