import { ChibiButton } from '@chibi-ui/react/button';
import { ChibiMascot } from '@chibi-ui/react/mascot';
import Link from 'next/link';
import { CodeBlock } from '@/components/code-block';
import { HomeShowcase } from '@/components/home-showcase';
import { ArrowRightIcon } from '@/components/icons';

const features = [
  {
    title: 'Accessible by default',
    body: 'Built on Radix primitives. Every component is axe-tested, and every colour pairing is checked against WCAG AA in CI.',
    mood: 'happy',
  },
  {
    title: 'Strictly typed',
    body: 'TypeScript strict mode, zero `any`, and an exported Chibi*Props interface for every component.',
    mood: 'curious',
  },
  {
    title: 'Themeable tokens',
    body: 'Semantic CSS variables generated from one source, with light and dark themes and scoped overrides.',
    mood: 'wink',
  },
  {
    title: 'Tree-shakable',
    body: 'Per-component entry points and a precompiled stylesheet with no global reset. You only ship what you import.',
    mood: 'sleepy',
  },
] as const;

export default function HomePage() {
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60rem_30rem_at_20%_-10%,var(--chibi-mint-200),transparent),radial-gradient(40rem_24rem_at_90%_10%,var(--chibi-blue-200),transparent)] opacity-60 dark:opacity-20"
        />
        <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 pt-20 pb-16 text-center sm:px-6">
          <ChibiMascot mood="happy" className="size-20 text-chibi-ring" />
          <h1 className="m-0 text-5xl leading-tight font-semibold tracking-tight sm:text-6xl">
            Serious components,
            <br />
            {/* --chibi-ring is contrast-tested (>= 3:1, large text) against the page in both themes. */}
            <span className="text-chibi-ring">adorably dressed.</span>
          </h1>
          <p className="m-0 max-w-2xl text-lg text-chibi-fg-muted">
            ChibiUI is an open-source React 19 component library. It pairs enterprise rigour
            (accessibility, strict types, design tokens) with a soft pastel, kawaii look.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <ChibiButton asChild size="lg" variant="kawaii" rightIcon={<ArrowRightIcon />}>
              <Link href="/docs">Get started</Link>
            </ChibiButton>
            <ChibiButton asChild size="lg" variant="ghost">
              <Link href="/docs/button">Browse components</Link>
            </ChibiButton>
          </div>
          <CodeBlock
            title="Install"
            code="pnpm add @chibi-ui/react"
            className="w-full max-w-md text-left"
          />
        </div>
      </section>

      <section aria-labelledby="showcase-heading" className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <h2 id="showcase-heading" className="mb-6 text-3xl font-semibold">
          Try it live
        </h2>
        <HomeShowcase />
      </section>

      <section
        aria-labelledby="features-heading"
        className="mx-auto max-w-6xl px-4 pt-8 pb-20 sm:px-6"
      >
        <h2 id="features-heading" className="mb-6 text-3xl font-semibold">
          Why ChibiUI?
        </h2>
        <ul className="m-0 grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <li
              key={feature.title}
              className="flex flex-col gap-3 rounded-chibi-lg border-2 border-chibi-border bg-chibi-surface p-6"
            >
              <ChibiMascot mood={feature.mood} className="size-10 text-chibi-ring" />
              <h3 className="m-0 text-xl font-semibold">{feature.title}</h3>
              <p className="m-0 text-chibi-fg-muted">{feature.body}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
