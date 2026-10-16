import type { Route } from 'next';
import type { ReactNode } from 'react';
import { DocsNav, type NavItem } from '@/components/docs-nav';
import { components } from '@/lib/registry';

const sections: { title: string; items: NavItem[] }[] = [
  {
    title: 'Guides',
    items: [
      { href: '/docs', label: 'Getting started' },
      { href: '/docs/theming', label: 'Theming & tokens' },
    ],
  },
  {
    title: 'Components',
    items: components.map((c) => ({ href: `/docs/${c.slug}` as Route, label: c.name })),
  },
];

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[13rem_1fr] lg:gap-12 lg:py-12">
      <aside className="lg:sticky lg:top-24 lg:self-start">
        {/* Native disclosure on small screens: keyboard and screen-reader friendly without JS. */}
        <details className="group rounded-chibi-lg border-2 border-chibi-border bg-chibi-surface lg:hidden">
          <summary className="cursor-pointer list-none px-4 py-3 font-chibi-display font-semibold">
            <span
              aria-hidden="true"
              className="mr-2 inline-block transition-transform group-open:rotate-90"
            >
              ▸
            </span>
            Menu
          </summary>
          <div className="px-1 pb-2">
            <DocsNav sections={sections} />
          </div>
        </details>
        <div className="hidden lg:block">
          <DocsNav sections={sections} />
        </div>
      </aside>
      <main id="main" tabIndex={-1} className="min-w-0 outline-none">
        {children}
      </main>
    </div>
  );
}
