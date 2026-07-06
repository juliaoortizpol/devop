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

  if (!adminKey) {
    return process.env.NODE_ENV !== "production";
  }

  return request.headers.get("x-content-admin-key") === adminKey;
}
