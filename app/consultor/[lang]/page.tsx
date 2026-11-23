import { notFound } from "next/navigation";
import { ConsultantPage } from "@/components/consultant/ConsultantPage";
import { getDictionary, isLocale } from "@/lib/dictionary";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <ConsultantPage lang={lang} portfolio={await getDictionary(lang)} />;
}
