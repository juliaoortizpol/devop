import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/dictionary";

type NavActionLabels = Dictionary["nav"]["actions"];

interface NavActionsProps {
  actions: NavActionLabels;
  currentLang: Locale;
  alternateLang: Locale;
}

export function NavActions({
  actions,
  currentLang,
  alternateLang,
}: NavActionsProps) {
  return (
    <div className="flex items-center gap-sm">
      <div className="flex gap-xs mr-sm border-r border-outline-variant/30 pr-sm items-center">
        <Link
          href={alternateLang === "es" ? "/dev" : "/dev/en"}
          className="text-label-sm font-label-sm text-on-surface-variant hover:text-primary transition-colors px-2"
          aria-label={`Switch language to ${alternateLang.toUpperCase()}`}
          hrefLang={alternateLang}
        >
          {currentLang.toUpperCase()}
        </Link>
      </div>
      <a
        className="px-md py-xs bg-primary text-on-primary rounded-lg font-label-sm hover:scale-105 transition-all duration-200 shadow-sm hover:bg-primary-container"
        download
        href={actions.resumeHref}
      >
        {actions.resume}
      </a>
    </div>
  );
}
