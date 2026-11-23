import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/dictionary";
import { consultantPath } from "@/lib/consultant-content";

type NavLinkLabels = Dictionary["nav"]["links"];

interface NavLinksProps {
  links: NavLinkLabels;
  lang: Locale;
}

export function NavLinks({ links, lang }: NavLinksProps) {
  const navItems = [
    { label: links.experience, href: "#experience" },
    { label: links.skills, href: "#arsenal" },
    { label: links.projects, href: "#projects" },
    { label: links.blog, href: "#blog" },
  ];

  return (
    <div className="dev-nav-links absolute inset-x-0 top-full grid grid-cols-3 items-center gap-x-2 border-b border-surface-container-high bg-surface px-gutter font-label-sm text-label-sm sm:grid-cols-5 lg:static lg:flex lg:gap-sm lg:border-0 lg:bg-transparent lg:px-0">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="inline-flex min-h-11 items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors"
        >
          {item.label}
        </Link>
      ))}
      <Link
        href={consultantPath(lang)}
        className="inline-flex min-h-11 items-center justify-center text-primary underline underline-offset-4 transition-colors hover:text-primary-container"
      >
        {lang === "es" ? "Consultoría" : "Consulting"}
      </Link>
    </div>
  );
}
