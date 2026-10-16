import { ChibiToastProvider } from '@chibi-ui/react/toast';
import type { Metadata, Viewport } from 'next';
import { Fredoka, Outfit } from 'next/font/google';
import type { ReactNode } from 'react';
import { InlineScript } from '@/components/inline-script';
import { SiteFooter, SiteHeader } from '@/components/site-header';
import { site } from '@/lib/site';
import { themeScript } from '@/lib/theme-script';
import './globals.css';

// Self-hosted at build time: no runtime requests to Google, no layout shift (size-adjust).
const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-fredoka',
  display: 'swap',
});
const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: { default: `${site.name} · Kawaii React components`, template: `%s · ${site.name}` },
  description: site.description,
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7fcfa' },
    { media: '(prefers-color-scheme: dark)', color: '#121715' },
  ],
  colorScheme: 'light dark',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      data-chibi-theme="system"
      className={`${fredoka.variable} ${outfit.variable}`}
      suppressHydrationWarning
    >
      <head>
        <InlineScript html={themeScript} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-50 rounded-full bg-chibi-primary px-4 py-2 font-semibold text-chibi-primary-fg focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <ChibiToastProvider>
          <SiteHeader />
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </ChibiToastProvider>
      </body>
    </html>
  );
}
