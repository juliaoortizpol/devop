import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, locales } from "@/lib/dictionary";

const adminRealm = "JAOP Portfolio Admin";

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

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    if (!isAdminAuthorized(request)) {
      return new NextResponse("Authentication required.", {
        status: 401,
        headers: {
          "WWW-Authenticate": `Basic realm="${adminRealm}", charset="UTF-8"`,
        },
      });
    }

    return NextResponse.next();
  }

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

function isAdminAuthorized(request: NextRequest) {
  const credentials = getAdminCredentials();

  if (!credentials) {
    return false;
  }

  const authorization = request.headers.get("authorization");

  if (!authorization?.startsWith("Basic ")) {
    return false;
  }

  try {
    const decoded = atob(authorization.replace("Basic ", ""));
    const separatorIndex = decoded.indexOf(":");
    const username = decoded.slice(0, separatorIndex);
    const password = decoded.slice(separatorIndex + 1);

    return (
      username === credentials.username && password === credentials.password
    );
  } catch {
    return false;
  }
}

function getAdminCredentials() {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (username && password) {
    return { username, password };
  }

  if (process.env.NODE_ENV !== "production") {
    return { username: "admin", password: "admin" };
  }

  return null;
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|.*\\..*).*)"],
};
