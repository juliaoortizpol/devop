import { NextResponse, type NextRequest } from "next/server";
import {
  getContent,
  isLocale,
  saveContent,
  type PortfolioContent,
} from "@/lib/content";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const content = await getContent();
  const locale = request.nextUrl.searchParams.get("lang");

  if (!locale) {
    return NextResponse.json(content);
  }

  if (!isLocale(locale)) {
    return NextResponse.json(
      { error: `Unsupported locale "${locale}".` },
      { status: 400 }
    );
  }

  return NextResponse.json(content[locale]);
}

export async function PUT(request: NextRequest) {
  if (!canWriteContent(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const content = (await request.json()) as PortfolioContent;
    await saveContent(content);

    return NextResponse.json({ ok: true, content });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Invalid content payload.";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}

function canWriteContent(request: NextRequest) {
  const adminKey = process.env.CONTENT_ADMIN_KEY;

  if (adminKey && request.headers.get("x-content-admin-key") === adminKey) {
    return true;
  }

  if (isAdminAuthorized(request)) {
    return true;
  }

  return !adminKey && process.env.NODE_ENV !== "production";
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
