import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, locales } from "@/lib/dictionary";

function getPreferredLocale(request: NextRequest) {
  const acceptLanguage = request.headers.get("accept-language");

  if (!acceptLanguage) {
    return defaultLocale;
  }

  const preferredLocales = acceptLanguage
    .split(",")
    .map((value) => value.split(";")[0]?.trim().toLowerCase())
    .filter(Boolean);

  return (
    preferredLocales.find((locale) => isLocale(locale)) ??
    preferredLocales
      .map((locale) => locale.split("-")[0])
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
