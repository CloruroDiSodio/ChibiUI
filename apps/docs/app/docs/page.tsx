import type { Metadata } from 'next';
import { CodeBlock } from '@/components/code-block';
import { PageHeader, Section } from '@/components/prose';

export const metadata: Metadata = { title: 'Getting started' };

export default function GettingStartedPage() {
  return (
    <article>
      <PageHeader eyebrow="Guide" title="Getting started">
        Install the package, add the styles, and render your first component. This takes about two
        minutes.
      </PageHeader>

      <Section id="install" title="1. Install">
        <p className="m-0">
          ChibiUI requires React 19. Radix primitives and Motion come bundled as dependencies.
        </p>
        <CodeBlock title="Terminal" code="pnpm add @chibi-ui/react" />
      </Section>

      <Section id="styles" title="2. Add the styles">
        <p className="m-0">
          <strong>Option A: precompiled CSS.</strong> Works with any stack. It contains only the
          utilities the components use and <em>no global reset</em>, so it won’t restyle your app.
        </p>
        <CodeBlock title="app/layout.tsx" code={`import '@chibi-ui/react/styles.css';`} />
        <p className="m-0">
          <strong>Option B: Tailwind CSS v4.</strong> Import the theme and let Tailwind scan the
          package. Your app then shares one stylesheet, and you can use the tokens yourself (for
          example <code>bg-chibi-primary</code>).
        </p>
        <CodeBlock
          title="globals.css"
          code={`@import "tailwindcss";
@import "@chibi-ui/react/theme.css";
@source "../node_modules/@chibi-ui/react/dist";`}
        />
      </Section>

      <Section id="usage" title="3. Use a component">
        <p className="m-0">
          Import from per-component entry points to keep bundles small. Each one is marked{' '}
          <code>&quot;use client&quot;</code>, so you can render it directly from React Server
          Components.
        </p>
        <CodeBlock
          title="app/page.tsx"
          code={`import { ChibiButton } from '@chibi-ui/react/button';

export default function Page() {
  return <ChibiButton variant="kawaii">Hello, Mochi!</ChibiButton>;
}`}
        />
      </Section>

      <Section id="toasts" title="4. (Optional) Enable toasts">
        <p className="m-0">
          Mount <code>ChibiToastProvider</code> once near the root, then call{' '}
          <code>useChibiToast()</code> anywhere below it.
        </p>
        <CodeBlock
          title="app/layout.tsx"
          code={`import { ChibiToastProvider } from '@chibi-ui/react/toast';

<body>
  <ChibiToastProvider>{children}</ChibiToastProvider>
</body>`}
        />
      </Section>

      <Section id="fonts" title="5. (Optional) Fonts">
        <p className="m-0">
          The tokens ask for <em>Fredoka</em> (display) and <em>Outfit</em> (body), and fall back to
          rounded system fonts. The library never loads fonts itself. Self-host them, for example
          with <code>next/font</code>, and point the tokens at them:
        </p>
        <CodeBlock
          title="globals.css"
          code={`:root {
  --chibi-font-display: var(--font-fredoka), ui-rounded, system-ui, sans-serif;
  --chibi-font-body: var(--font-outfit), system-ui, sans-serif;
}`}
        />
      </Section>

      <Section id="principles" title="Quality guarantees">
        <ul className="m-0 flex flex-col gap-2 pl-5">
          <li>
            WAI-ARIA patterns come from Radix UI, and every component is checked with axe-core in
            unit tests.
          </li>
          <li>
            Every semantic colour pairing is verified against WCAG AA (4.5:1 for text, 3:1 for UI)
            in CI.
          </li>
          <li>
            Motion respects <code>prefers-reduced-motion</code>, and glass effects respect{' '}
            <code>prefers-reduced-transparency</code>.
          </li>
          <li>Focus rings are outlines, so they stay visible in Windows forced-colours mode.</li>
          <li>
            TypeScript runs in strict mode with zero <code>any</code>, and every component exports
            its <code>Chibi*Props</code> type.
          </li>
        </ul>
      </Section>
    </article>
  );
}
