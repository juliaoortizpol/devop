import { getDictionary, type Locale } from "@/lib/dictionary";
import { HomeLogoLink } from "./HomeLogoLink";
import { NavActions } from "./NavActions";
import { NavLinks } from "./NavLinks";
import { ScrollNavWrapper } from "./ScrollNavWrapper";

interface NavbarProps {
  lang: Locale;
}

export async function Navbar({ lang }: NavbarProps) {
  const { logo, links, actions } = (await getDictionary(lang)).nav;
  const alternateLang = lang === "en" ? "es" : "en";

  return (
    <ScrollNavWrapper>
      <div className="flex justify-between items-center max-w-container-max mx-auto px-gutter h-full">
        <HomeLogoLink href={`/${lang}`} label={logo} />

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
