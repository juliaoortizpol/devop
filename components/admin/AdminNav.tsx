import Link from "next/link";
import type { SaveStatus } from "./adminTypes";

interface AdminNavProps {
  onSave: () => void;
  status: SaveStatus;
}

export function AdminNav({ onSave, status }: AdminNavProps) {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-surface-container-lowest/70 shadow-[0_0_40px_-10px_rgba(129,140,248,0.15)] backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-container-max items-center justify-between px-gutter">
        <div className="flex items-center gap-md">
          <span className="font-display-lg text-display-lg-mobile bg-gradient-to-r from-primary to-tertiary bg-clip-text text-transparent">
            JAOP.
          </span>
          <span className="hidden h-6 w-px bg-outline-variant/30 md:block" />
          <h1 className="hidden font-headline-md text-headline-md text-on-surface md:block">
            Portfolio Management
          </h1>
        </div>
        <div className="flex items-center gap-sm">
          <Link
            className="hidden items-center gap-xs rounded-lg border border-outline-variant/30 px-md py-2 text-label-sm font-label-sm text-on-surface-variant transition-all hover:border-primary/50 hover:text-on-surface md:flex"
            href="/en"
          >
            Back to Site
          </Link>
          <button
            className="rounded-lg bg-gradient-to-r from-primary to-primary-container px-lg py-2 text-label-sm font-label-sm text-on-primary shadow-[0_0_20px_-5px_rgba(207,188,255,0.4)] transition-transform duration-200 hover:scale-[1.02] disabled:cursor-wait disabled:opacity-70"
            disabled={status === "saving"}
            onClick={onSave}
            type="button"
          >
            {status === "saving" ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </nav>
  );
}
