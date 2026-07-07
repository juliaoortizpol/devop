import type { LocaleContent } from "@/lib/content";
import type { LocaleUpdater } from "../adminTypes";
import { Field, TextArea } from "../FormControls";

interface ContactEditorProps {
  content: LocaleContent;
  onChange: LocaleUpdater;
}

export function ContactEditor({ content, onChange }: ContactEditorProps) {
  return (
    <div className="space-y-md">
      <div className="grid grid-cols-1 gap-md md:grid-cols-2">
        <Field
          label="CTA Prefix"
          onChange={(value) =>
            onChange((current) => ({
              ...current,
              home: {
                ...current.home,
                cta: { ...current.home.cta, headlinePrefix: value },
              },
            }))
          }
          value={content.home.cta.headlinePrefix}
        />
        <Field
          label="CTA Emphasis"
          onChange={(value) =>
            onChange((current) => ({
              ...current,
              home: {
                ...current.home,
                cta: { ...current.home.cta, headlineEmphasis: value },
              },
            }))
          }
          value={content.home.cta.headlineEmphasis}
        />
      </div>
      <Field
        label="Primary CTA"
        onChange={(value) =>
          onChange((current) => ({
            ...current,
            home: {
              ...current.home,
              cta: { ...current.home.cta, primaryCta: value },
            },
          }))
        }
        value={content.home.cta.primaryCta}
      />
      <TextArea
        label="Footer Copyright"
        onChange={(value) =>
          onChange((current) => ({
            ...current,
            home: {
              ...current.home,
              footer: { ...current.home.footer, copyright: value },
            },
          }))
        }
        value={content.home.footer.copyright}
      />
    </div>
  );
}
