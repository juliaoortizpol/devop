"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface HomeLogoLinkProps {
  href: string;
  label: string;
}

export function HomeLogoLink({ href, label }: HomeLogoLinkProps) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      onClick={() => {
        if (pathname === href) {
          window.history.replaceState(null, "", href);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }}
      className="font-display-lg text-display-lg-mobile bg-gradient-to-r from-primary to-tertiary bg-clip-text text-transparent transition-transform duration-200 hover:scale-105"
    >
      {label}
    </Link>
  );
}
