interface FieldProps {
  label: string;
  onChange: (value: string) => void;
  value: string;
}

export function Field({ label, onChange, value }: FieldProps) {
  return (
    <label className="block space-y-xs">
      <span className="font-label-sm text-label-sm text-outline">{label}</span>
      <input
        className="w-full rounded-lg border border-outline-variant/30 bg-surface-container-highest px-md py-3 text-on-surface outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
        onChange={(event) => onChange(event.target.value)}
        type="text"
        value={value}
      />
    </label>
  );
}

export function TextArea({ label, onChange, value }: FieldProps) {
  return (
    <label className="block space-y-xs">
      <span className="font-label-sm text-label-sm text-outline">{label}</span>
      <textarea
        className="w-full rounded-lg border border-outline-variant/30 bg-surface-container-highest px-md py-3 text-on-surface outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
        onChange={(event) => onChange(event.target.value)}
        rows={3}
        value={value}
      />
    </label>
  );
}
