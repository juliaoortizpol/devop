import Link from "next/link";
import { getDictionary, type Locale } from "@/lib/dictionary";
import { NavActions } from "./NavActions";
import { NavLinks } from "./NavLinks";
import { ScrollNavWrapper } from "./ScrollNavWrapper";

interface NavbarProps {
  lang: Locale;
}

export function Navbar({ lang }: NavbarProps) {
  const { logo, links, actions } = getDictionary(lang).nav;
  const alternateLang = lang === "en" ? "es" : "en";

  return (
    <ScrollNavWrapper>
      <div className="flex justify-between items-center max-w-container-max mx-auto px-gutter h-full">
        <Link
          href={`/${lang}`}
          className="font-display-lg text-display-lg-mobile bg-gradient-to-r from-primary to-tertiary bg-clip-text text-transparent transition-transform duration-200 hover:scale-105"
        >
          {logo}
        </Link>

        <NavLinks links={links} />

        <NavActions
          actions={actions}
          currentLang={lang}
          alternateLang={alternateLang}
        />
      </div>
    </ScrollNavWrapper>
  );
}
