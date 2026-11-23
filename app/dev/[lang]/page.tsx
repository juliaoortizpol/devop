import { notFound } from "next/navigation";
import { PortfolioHome } from "@/components/sections/Portfolio";
import { getDictionary, isLocale } from "@/lib/dictionary";

export const dynamic = "force-dynamic";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  const { home } = await getDictionary(lang);

  return <PortfolioHome content={home} />;
}
