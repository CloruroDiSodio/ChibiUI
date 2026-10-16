'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Route } from 'next';

export interface NavItem {
  href: Route;
  label: string;
}

export function DocsNav({ sections }: { sections: { title: string; items: NavItem[] }[] }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Documentation">
      {sections.map((section) => (
        <div key={section.title} className="mb-6">
          <h2 className="mb-2 px-3 text-xs font-semibold tracking-wider text-chibi-fg-muted uppercase">
            {section.title}
          </h2>
          <ul className="m-0 flex list-none flex-col gap-0.5 p-0">
            {section.items.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className="block rounded-full px-3 py-1.5 text-chibi-fg no-underline transition-colors hover:bg-chibi-ghost-hover aria-[current=page]:bg-chibi-primary aria-[current=page]:font-semibold aria-[current=page]:text-chibi-primary-fg"
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
