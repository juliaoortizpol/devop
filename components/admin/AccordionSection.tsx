import { cn } from "@/lib/utils";

interface AccordionSectionProps {
  children: React.ReactNode;
  description: string;
  icon: string;
  isOpen: boolean;
  onToggle: () => void;
  title: string;
  tone: string;
}

export function AccordionSection({
  children,
  description,
  icon,
  isOpen,
  onToggle,
  title,
  tone,
}: AccordionSectionProps) {
  return (
    <section className="overflow-hidden rounded-xl border border-outline-variant/10 bg-surface-container-lowest/70 backdrop-blur-xl">
      <button
        className="group flex w-full items-center justify-between p-md text-left transition-colors hover:bg-white/5"
        onClick={onToggle}
        type="button"
      >
        <div className="flex items-center gap-md">
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-lg text-label-sm font-label-sm",
              tone
            )}
          >
            {icon}
          </div>
          <div>
            <h2 className="font-headline-md text-[18px] text-on-surface">
              {title}
            </h2>
            <p className="text-label-sm font-label-sm text-on-surface-variant">
              {description}
            </p>
          </div>
        </div>
        <span
          className={cn(
            "text-on-surface-variant transition-transform duration-300",
            isOpen && "rotate-180"
          )}
        >
          v
        </span>
      </button>
      {isOpen ? (
        <div className="border-t border-outline-variant/10 bg-surface-container-low/50 p-md">
          {children}
        </div>
      ) : null}
    </section>
  );
}
