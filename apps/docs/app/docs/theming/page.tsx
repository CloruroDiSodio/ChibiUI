import {
  AA,
  contrastRatio,
  darkColors,
  lightColors,
  palette,
  type SemanticColors,
} from '@chibi-ui/react/tokens';
import type { Metadata } from 'next';
import { CodeBlock } from '@/components/code-block';
import { PageHeader, Section } from '@/components/prose';

export const metadata: Metadata = { title: 'Theming & tokens' };

const kebab = (value: string) => value.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);

const pairs: { fg: keyof SemanticColors; bg: keyof SemanticColors; label: string; min: number }[] =
  [
    { fg: 'fg', bg: 'bg', label: 'Body text', min: AA.text },
    { fg: 'fgMuted', bg: 'surface', label: 'Muted text', min: AA.text },
    { fg: 'primaryFg', bg: 'primary', label: 'Primary button', min: AA.text },
    { fg: 'secondaryFg', bg: 'secondary', label: 'Secondary button', min: AA.text },
    { fg: 'kawaiiFg', bg: 'kawaiiTo', label: 'Kawaii button', min: AA.text },
    { fg: 'successFg', bg: 'successSoft', label: 'Success toast', min: AA.text },
    { fg: 'warningFg', bg: 'warningSoft', label: 'Warning toast', min: AA.text },
    { fg: 'dangerFg', bg: 'dangerSoft', label: 'Error toast', min: AA.text },
    { fg: 'infoFg', bg: 'infoSoft', label: 'Info toast', min: AA.text },
    { fg: 'borderStrong', bg: 'surface', label: 'Input border', min: AA.ui },
    { fg: 'ring', bg: 'bg', label: 'Focus ring', min: AA.ui },
    { fg: 'accent', bg: 'bg', label: 'Brand icons', min: AA.ui },
    { fg: 'fg', bg: 'highlight', label: 'Highlighted text', min: AA.text },
  ];

function ContrastTable({ name, colors }: { name: string; colors: SemanticColors }) {
  return (
    <div
      tabIndex={0}
      role="region"
      aria-label={`${name} theme contrast`}
      className="overflow-x-auto rounded-chibi-lg border-2 border-chibi-border"
    >
      <table className="w-full min-w-[30rem] border-collapse text-left text-sm">
        <caption className="bg-chibi-surface-muted px-4 py-2.5 text-left font-chibi-display font-semibold">
          {name} theme
        </caption>
        <thead>
          <tr className="border-b border-chibi-border">
            <th scope="col" className="px-4 py-2">
              Usage
            </th>
            <th scope="col" className="px-4 py-2">
              Sample
            </th>
            <th scope="col" className="px-4 py-2">
              Ratio
            </th>
            <th scope="col" className="px-4 py-2">
              Requirement
            </th>
          </tr>
        </thead>
        <tbody>
          {pairs.map(({ fg, bg, label, min }) => {
            const ratio = contrastRatio(colors[fg], colors[bg]);
            return (
              <tr key={label} className="border-t border-chibi-border">
                <th scope="row" className="px-4 py-2 font-medium">
                  {label}
                </th>
                <td className="px-4 py-2">
                  {min === AA.ui ? (
                    // UI pairs (3:1) are only valid for non-text, so the sample is a boundary.
                    <span
                      aria-hidden="true"
                      className="inline-block h-7 w-12 rounded-full border-[3px]"
                      style={{ backgroundColor: colors[bg], borderColor: colors[fg] }}
                    />
                  ) : (
                    <span
                      className="inline-flex rounded-full border px-3 py-1 font-semibold"
                      style={{
                        color: colors[fg],
                        backgroundColor: colors[bg],
                        borderColor: colors[fg],
                      }}
                    >
                      Aa
                    </span>
                  )}
                </td>
                <td className="px-4 py-2 font-mono">{ratio.toFixed(2)}:1</td>
                <td className="px-4 py-2">
                  {ratio >= min ? '✅' : '❌'} {min}:1 {min === AA.ui ? '(UI)' : '(text)'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default function ThemingPage() {
  return (
    <article>
      <PageHeader eyebrow="Guide" title="Theming & tokens">
        Every colour, radius, shadow and easing curve is a CSS variable generated from one
        TypeScript source. That source is also exported, so you can use the tokens in charts or
        emails.
      </PageHeader>

      <Section id="switching" title="Light, dark & scoped themes">
        <p className="m-0">
          Set <code>data-chibi-theme</code> to <code>light</code>, <code>dark</code> or{' '}
          <code>system</code> on any element. Themes are scoped, so a dark card can sit on a light
          page.
        </p>
        <CodeBlock
          code={`<html data-chibi-theme="system">
  …
  <section data-chibi-theme="dark">Always dark in here</section>
</html>`}
        />
      </Section>

      <Section id="customising" title="Customising">
        <p className="m-0">Override semantic tokens anywhere in your CSS:</p>
        <CodeBlock
          title="globals.css"
          code={`:root {
  --chibi-primary: #fcc9d8;      /* pink buttons */
  --chibi-primary-hover: #f6a8c0;
  --chibi-radius-lg: 2rem;       /* extra round */
}`}
        />
        <p className="m-0">
          Run the contrast check against your overrides with the exported helper, for example in a
          unit test:
        </p>
        <CodeBlock
          code={`import { AA, contrastRatio } from '@chibi-ui/react/tokens';

expect(contrastRatio('#121715', '#fcc9d8')).toBeGreaterThanOrEqual(AA.text);`}
        />
      </Section>

      <Section id="contrast" title="Contrast report">
        <p className="m-0">
          This page computes the report at build time from <code>@chibi-ui/react/tokens</code>,
          which is a plain, server-safe module. The same pairs are enforced in CI.
        </p>
        <div className="grid gap-6 xl:grid-cols-2">
          <ContrastTable name="Light" colors={lightColors} />
          <ContrastTable name="Dark" colors={darkColors} />
        </div>
      </Section>

      <Section id="palette" title="Palette">
        <div className="flex flex-col gap-4">
          {Object.entries(palette).map(([name, scale]) => (
            <div key={name}>
              <h3 className="mb-2 text-base font-semibold capitalize">{name}</h3>
              <ul className="m-0 grid list-none grid-cols-5 gap-2 p-0 sm:grid-cols-11">
                {Object.entries(scale).map(([step, hex]) => (
                  <li key={step} className="flex flex-col gap-1 text-xs">
                    <span
                      aria-hidden="true"
                      className="h-10 rounded-chibi-sm border border-chibi-border"
                      style={{ backgroundColor: hex }}
                    />
                    <span className="font-mono">{step}</span>
                    <span className="font-mono text-chibi-fg-muted">{hex}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="m-0 text-sm text-chibi-fg-muted">
          Raw palette steps are exposed as{' '}
          <code>
            --chibi-{'{name}'}-{'{step}'}
          </code>
          . Components only use the semantic tokens, for example{' '}
          {Object.keys(lightColors)
            .slice(0, 4)
            .map((role) => `--chibi-${kebab(role)}`)
            .join(', ')}
          …
        </p>
      </Section>
    </article>
  );
}
