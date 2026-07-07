import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, locales } from "@/lib/dictionary";

function getPreferredLocale(request: NextRequest) {
  const acceptLanguage = request.headers.get("accept-language");

  if (!acceptLanguage) {
    return defaultLocale;
  }

  const preferredLocales = acceptLanguage
    .split(",")
    .map((value) => {
      const [language, ...directives] = value.split(";");
      const quality = directives
        .map((directive) => directive.trim())
        .find((directive) => directive.startsWith("q="))
        ?.replace("q=", "");

      return {
        language: language?.trim().toLowerCase() ?? "",
        quality: quality ? Number(quality) : 1,
      };
    })
    .filter(({ language, quality }) => language && quality > 0)
    .sort((a, b) => b.quality - a.quality);

  return (
    preferredLocales
      .map(({ language }) => language.split("-")[0])
      .find((locale) => isLocale(locale)) ??
    defaultLocale
  );
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  const locale = getPreferredLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|.*\\..*).*)"],
};
