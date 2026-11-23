import { NextResponse, type NextRequest } from "next/server";

const adminRealm = "JAOP Portfolio Admin";

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

  // Public entry points use Spanish; explicit /en URLs retain English.
  if (pathname === "/") {
    request.nextUrl.pathname = "/consultor";
    return NextResponse.redirect(request.nextUrl, 308);
  }

  // Preserve old links, query strings and browser-carried fragments.
  const legacy = pathname.match(/^\/(en|es)(\/.*)?$/);
  if (legacy) {
    request.nextUrl.pathname = `/dev${legacy[1] === "en" ? "/en" : ""}${legacy[2] ?? ""}`;
    return NextResponse.redirect(request.nextUrl, 308);
  }
  if (pathname === "/dev/es" || pathname === "/consultor/es") {
    request.nextUrl.pathname = pathname.replace(/\/es$/, "");
    return NextResponse.redirect(request.nextUrl, 308);
  }
  if (pathname === "/dev" || pathname === "/consultor") {
    request.nextUrl.pathname = `${pathname}/es`;
    return NextResponse.rewrite(request.nextUrl);
  }
  return NextResponse.next();
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
