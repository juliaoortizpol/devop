interface RawJsonEditorProps {
  hasJsonDrift: boolean;
  onApply: () => void;
  onChange: (value: string) => void;
  value: string;
}

export function RawJsonEditor({
  hasJsonDrift,
  onApply,
  onChange,
  value,
}: RawJsonEditorProps) {
  return (
    <div className="space-y-md">
      <textarea
        className="min-h-[520px] w-full rounded-lg border border-outline-variant/30 bg-surface-container-highest px-md py-3 font-code text-code text-on-surface outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
        onChange={(event) => onChange(event.target.value)}
        spellCheck={false}
        value={value}
      />
      <button
        className="rounded-lg border border-outline-variant/30 px-md py-2 text-label-sm font-label-sm text-on-surface-variant transition-colors hover:border-primary hover:text-primary"
        onClick={onApply}
        type="button"
      >
        {hasJsonDrift ? "Apply JSON Locally" : "JSON is synced"}
      </button>
    </div>
  );
}
