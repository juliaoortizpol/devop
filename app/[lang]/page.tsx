import { notFound } from "next/navigation";
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

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-background text-foreground">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          {home.eyebrow}
        </p>
      </div>

      <div className="relative z-[-1] flex place-items-center">
        <h1 className="text-4xl font-bold md:text-6xl text-center">
          {home.headline}
        </h1>
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
        {/* We will inject sections here later */}
      </div>
    </main>
  );
}
