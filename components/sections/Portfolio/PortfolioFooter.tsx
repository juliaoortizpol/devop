import type { LocaleContent } from "@/lib/content";

interface PortfolioFooterProps {
  content: LocaleContent["home"]["footer"];
}

export function PortfolioFooter({ content }: PortfolioFooterProps) {
  return (
    <footer className="w-full border-t border-outline-variant/20 bg-surface py-xl">
      <div className="mx-auto flex max-w-container-max flex-col items-center gap-md px-gutter">
        <div className="font-label-sm text-label-sm font-bold text-on-surface">
          JAOP.
        </div>
        <div className="flex gap-md text-on-surface-variant">
          {content.links.map((link) => (
            <a
              className="font-body-md text-body-md transition-colors hover:text-primary"
              href={link.href}
              key={link.label}
            >
              {link.label}
            </a>
          ))}
        </div>
        <p className="text-center font-body-md text-body-md text-on-surface-variant opacity-80 transition-opacity hover:opacity-100">
          {content.copyright}
        </p>
      </div>
    </footer>
  );
}
