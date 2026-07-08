import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { getDictionary, isLocale, locales, type Locale } from "@/lib/dictionary";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const icons: Metadata["icons"] = {
  icon: "/icon.svg",
  shortcut: "/icon.svg",
};

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://devjop.vercel.app");

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

  if (!isLocale(lang)) {
    return {};
  }

  const { metadata } = await getDictionary(lang);
  const ogImage = `/api/og?lang=${lang}`;

  return {
    ...metadata,
    metadataBase: new URL(siteUrl),
    icons,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      images: [
        {
          alt: metadata.title,
          height: 630,
          url: ogImage,
          width: 1200,
        },
      ],
      locale: lang,
      siteName: "JAOP. Portfolio",
      type: "website",
      url: `/${lang}`,
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.description,
      images: [ogImage],
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  return (
    <html
      lang={lang}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <Navbar lang={lang as Locale} />
        {children}
      </body>
    </html>
  );
}
