import type { Metadata } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { consultantContent, consultantPath } from "@/lib/consultant-content";
import { isLocale, locales } from "@/lib/dictionary";
import "../consultant.css";

const inter = localFont({
  src: "../../fonts/inter.ttf",
  display: "swap",
  variable: "--font-inter",
  weight: "100 900",
});
export const dynamic = "force-dynamic";
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const c = consultantContent[lang];
  const image = `/api/og/consultor?lang=${lang}`;
  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL ?? "https://devjop.vercel.app",
    ),
    title: c.title,
    description: c.description,
    icons: { icon: "/consultant-icon.svg" },
    alternates: {
      canonical: consultantPath(lang),
      languages: {
        es: "/consultor",
        en: "/consultor/en",
        "x-default": "/consultor",
      },
    },
    openGraph: {
      title: c.title,
      description: c.description,
      type: "website",
      siteName: "Julio Ortiz Pol",
      locale: lang === "es" ? "es_DO" : "en_US",
      url: consultantPath(lang),
      images: [{ url: image, width: 1200, height: 630, alt: c.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: c.title,
      description: c.description,
      images: [image],
    },
  };
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return (
    <html lang={lang} className={inter.variable}>
      <body className="consultant-site">{children}</body>
    </html>
  );
}
