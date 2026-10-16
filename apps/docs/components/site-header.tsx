import { ChibiMascot } from '@chibi-ui/react/mascot';
import Link from 'next/link';
import { site } from '@/lib/site';
import { GithubIcon } from './icons';
import { ThemeToggle } from './theme-toggle';

const navLink =
  'rounded-full px-3 py-1.5 font-chibi-display font-semibold text-chibi-fg no-underline transition-colors hover:bg-chibi-ghost-hover';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-chibi-border bg-chibi-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-chibi-display text-xl font-semibold text-chibi-fg no-underline"
        >
          <ChibiMascot mood="happy" className="size-8 text-chibi-ring" />
          {site.name}
        </Link>
        <nav aria-label="Main" className="flex items-center gap-1 sm:gap-2">
          <Link href="/docs" className={navLink}>
            Docs
          </Link>
          <Link href="/docs/button" className={`${navLink} hidden sm:inline-block`}>
            Components
          </Link>
          {site.storybookUrl && (
            <a href={site.storybookUrl} className={`${navLink} hidden md:inline-block`}>
              Storybook
            </a>
          )}
          {site.repoUrl && (
            <a
              href={site.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex size-9 items-center justify-center rounded-full text-chibi-fg hover:bg-chibi-ghost-hover"
            >
              <GithubIcon className="size-5" />
              <span className="sr-only">GitHub repository (opens in a new tab)</span>
            </a>
          )}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t-2 border-chibi-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-8 text-sm text-chibi-fg-muted sm:flex-row sm:px-6">
        <p className="m-0">Built with care, Radix UI and a lot of pastel. MIT licensed.</p>
        <p className="m-0 flex items-center gap-1.5">
          <ChibiMascot mood="wink" className="size-5" /> Mochi says hi!
        </p>
      </div>
    </footer>
  );
}
