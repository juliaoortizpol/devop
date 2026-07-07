"use client";

import { useMemo, useState } from "react";
import type { Locale, LocaleContent, PortfolioContent } from "@/lib/content";
import { cn } from "@/lib/utils";
import { AccordionSection } from "./AccordionSection";
import { AdminNav } from "./AdminNav";
import { adminSections } from "./adminSections";
import type { AdminSection, SaveStatus } from "./adminTypes";
import {
  ContactEditor,
  ExperienceEditor,
  HeroEditor,
  RawJsonEditor,
  SkillsEditor,
} from "./editors";

interface AdminPanelProps {
  initialContent: PortfolioContent;
}

export function AdminPanel({ initialContent }: AdminPanelProps) {
  const [content, setContent] = useState(initialContent);
  const [locale, setLocale] = useState<Locale>("en");
  const [openSection, setOpenSection] = useState<AdminSection>("hero");
  const [jsonDraft, setJsonDraft] = useState(() =>
    JSON.stringify(initialContent, null, 2)
  );
  const [status, setStatus] = useState<SaveStatus>("idle");
  const [message, setMessage] = useState("");

  const localeContent = content[locale];
  const hasJsonDrift = useMemo(
    () => jsonDraft !== JSON.stringify(content, null, 2),
    [content, jsonDraft]
  );

  function updateLocale(updater: (current: LocaleContent) => LocaleContent) {
    setContent((current) => {
      const next = {
        ...current,
        [locale]: updater(current[locale]),
      };
      setJsonDraft(JSON.stringify(next, null, 2));
      setStatus("idle");
      setMessage("");
      return next;
    });
  }

  async function saveContent(nextContent = content) {
    setStatus("saving");
    setMessage("Saving content...");

    try {
      const response = await fetch("/api/content", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nextContent),
      });
      const payload = (await response.json()) as
        | { ok: true; content: PortfolioContent }
        | { error: string };

      if (!response.ok || !("ok" in payload)) {
        throw new Error("error" in payload ? payload.error : "Save failed.");
      }

      setContent(payload.content);
      setJsonDraft(JSON.stringify(payload.content, null, 2));
      setStatus("saved");
      setMessage("Content saved.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Save failed.");
    }
  }

  function applyJsonDraft() {
    try {
      const parsed = JSON.parse(jsonDraft) as PortfolioContent;
      setContent(parsed);
      setStatus("idle");
      setMessage("JSON applied locally. Save to persist it.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Invalid JSON.");
    }
  }

  return (
    <main className="min-h-screen bg-background pb-xl pt-16 text-on-background">
      <AdminNav onSave={() => saveContent()} status={status} />
      <div className="mx-auto max-w-[900px] px-gutter py-lg">
        <MobileHeader />

        <div className="mb-md flex flex-wrap items-center justify-between gap-sm">
          <LocaleTabs locale={locale} onChange={setLocale} />
          <StatusMessage message={message} status={status} />
        </div>

        <div className="space-y-md">
          {adminSections.map((section) => (
            <AccordionSection
              description={section.description}
              icon={section.icon}
              isOpen={openSection === section.id}
              key={section.id}
              onToggle={() =>
                setOpenSection(openSection === section.id ? "hero" : section.id)
              }
              title={section.title}
              tone={section.tone}
            >
              <AdminSectionEditor
                content={localeContent}
                hasJsonDrift={hasJsonDrift}
                jsonDraft={jsonDraft}
                onApplyJson={applyJsonDraft}
                onJsonChange={setJsonDraft}
                onLocaleChange={updateLocale}
                section={section.id}
              />
            </AccordionSection>
          ))}
        </div>
      </div>
      <footer className="border-t border-outline-variant/20 py-lg text-center">
        <p className="font-label-sm text-label-sm text-on-surface">
          JAOP. ADMIN PANEL
        </p>
      </footer>
    </main>
  );
}

function AdminSectionEditor({
  content,
  hasJsonDrift,
  jsonDraft,
  onApplyJson,
  onJsonChange,
  onLocaleChange,
  section,
}: {
  content: LocaleContent;
  hasJsonDrift: boolean;
  jsonDraft: string;
  onApplyJson: () => void;
  onJsonChange: (value: string) => void;
  onLocaleChange: (updater: (current: LocaleContent) => LocaleContent) => void;
  section: AdminSection;
}) {
  if (section === "hero") {
    return <HeroEditor content={content} onChange={onLocaleChange} />;
  }

  if (section === "experience") {
    return <ExperienceEditor content={content} onChange={onLocaleChange} />;
  }

  if (section === "skills") {
    return <SkillsEditor content={content} onChange={onLocaleChange} />;
  }

  if (section === "contact") {
    return <ContactEditor content={content} onChange={onLocaleChange} />;
  }

  return (
    <RawJsonEditor
      hasJsonDrift={hasJsonDrift}
      onApply={onApplyJson}
      onChange={onJsonChange}
      value={jsonDraft}
    />
  );
}

function MobileHeader() {
  return (
    <div className="mb-lg md:hidden">
      <h1 className="mb-xs font-headline-md text-headline-md text-on-surface">
        Portfolio Management
      </h1>
      <p className="text-body-md text-on-surface-variant">
        Update your digital identity and technical presence.
      </p>
    </div>
  );
}

function LocaleTabs({
  locale,
  onChange,
}: {
  locale: Locale;
  onChange: (locale: Locale) => void;
}) {
  return (
    <div className="flex rounded-lg border border-outline-variant/30 bg-surface-container-low p-1">
      {(["en", "es"] as Locale[]).map((item) => (
        <button
          className={cn(
            "rounded-md px-md py-2 text-label-sm font-label-sm transition-colors",
            locale === item
              ? "bg-primary text-on-primary"
              : "text-on-surface-variant hover:text-on-surface"
          )}
          key={item}
          onClick={() => onChange(item)}
          type="button"
        >
          {item.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

function StatusMessage({
  message,
  status,
}: {
  message: string;
  status: SaveStatus;
}) {
  if (!message) {
    return null;
  }

  return (
    <p
      className={cn(
        "text-label-sm font-label-sm",
        status === "error" ? "text-error" : "text-on-surface-variant"
      )}
    >
      {message}
    </p>
  );
}
