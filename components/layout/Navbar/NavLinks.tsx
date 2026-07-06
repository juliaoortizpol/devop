import Link from "next/link";
import type { Dictionary } from "@/lib/dictionary";

type NavLinkLabels = Dictionary["nav"]["links"];

interface NavLinksProps {
  links: NavLinkLabels;
}

export function NavLinks({ links }: NavLinksProps) {
  const navItems = [
    { label: links.experience, href: "#experience" },
    { label: links.skills, href: "#arsenal" },
    { label: links.projects, href: "#projects" },
    { label: links.blog, href: "#blog" },
  ];

  return (
    <div className="hidden md:flex gap-md items-center font-label-sm text-label-sm">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-on-surface-variant hover:text-on-surface transition-colors"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
