import { cn } from "@/lib/utils";

export function GlassPanel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-surface-container/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-xl",
        className
      )}
    >
      {children}
    </div>
  );
}

export function TagList({ tags, large = false }: { tags: string[]; large?: boolean }) {
  return (
    <div className="flex flex-wrap gap-xs">
      {tags.map((tag) => (
        <span
          className={cn(
            "rounded-full border border-outline-variant/20 bg-secondary-container/30 text-on-surface",
            large ? "px-sm py-1.5 text-body-md" : "px-xs py-1 text-label-sm"
          )}
          key={tag}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

export function SectionTitle({
  title,
  icon,
}: {
  title: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="mb-xl flex items-center gap-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>
      <h2 className="font-display-lg text-display-lg-mobile text-on-surface">
        {title}
      </h2>
    </div>
  );
}
