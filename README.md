# ChibiUI 🐱

**Serious components, adorably dressed.** ChibiUI is an open-source React 19 component library. It pairs enterprise engineering (accessibility, strict typing, design tokens, performance budgets) with a soft pastel, kawaii look.

| Package                               | Description                                                 |
| ------------------------------------- | ----------------------------------------------------------- |
| [`@chibi-ui/react`](./packages/react) | The component library, with its tokens, tests and Storybook |
| [`docs`](./apps/docs)                 | Next.js (App Router) docs site with live playgrounds        |

## Components

| Component                                             | Built on        | Highlights                                                                                              |
| ----------------------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------- |
| `ChibiButton`                                         | Radix Slot      | `primary` · `secondary` · `ghost` · `kawaii` (bounce), loading with spinner or mascot, icons, `asChild` |
| `ChibiCard` + Header/Title/Description/Content/Footer | Radix Slot      | `elevated` · `outlined` · `interactive` with hover lift and pointer tilt + glare                        |
| `ChibiToastProvider` / `useChibiToast`                | Radix Toast     | success/warning/error/info with mascot moods, actions, update-in-place, spring motion                   |
| `ChibiDialog` + parts                                 | Radix Dialog    | Pastel glass backdrop, elastic pop-in, focus trap, Esc / outside click                                  |
| `ChibiAccordion` + parts                              | Radix Accordion | CSS height animation, rotating chevron or twitching cat ears, configurable heading level                |
| `ChibiInput`                                          | native          | Static or floating label, description, linked errors, adornments                                        |
| `ChibiSelect` + Item/Group/Label/Separator            | Radix Select    | Labelled combobox, native form submission, `ref` → trigger for RHF focus                                |
| `ChibiSwitch`                                         | Radix Switch    | Mochi sleeps when off and wakes when on, so state doesn't rely on colour                                |
| `ChibiSpinner`, `ChibiMascot`                         | SVG             | Ring or bobbing mascot loader, six mascot moods                                                         |

Every form control works with **react-hook-form + Zod**. `register()` works for inputs and `Controller` for Select and Switch. An end-to-end test covers this.

## Quick start

```bash
pnpm add @chibi-ui/react
```

```tsx
import '@chibi-ui/react/styles.css'; // or the Tailwind v4 path, see the docs
import { ChibiButton } from '@chibi-ui/react/button';

export default function Page() {
  return <ChibiButton variant="kawaii">Hello, Mochi!</ChibiButton>;
}
```

## Developing

Requires **Node ≥ 22.18** (`.nvmrc` pins 24 LTS) and pnpm 10 (via Corepack).

```bash
corepack enable
pnpm install
pnpm dev               # library in watch mode + docs at http://localhost:3000
pnpm storybook         # component workbench at http://localhost:6006
pnpm test              # unit + axe tests (Vitest, jsdom)
pnpm test:e2e          # Playwright: axe in light/dark, keyboard flows, headers (run `pnpm build` first)
pnpm size              # per-entry bundle budgets (run after building the library)
pnpm lint && pnpm typecheck
```

## Architecture

```
packages/react/
  src/tokens/tokens.ts      ← single source of truth (palette, semantic roles, radii, shadows, motion)
  scripts/build-tokens.ts   → src/styles/tokens.css  (CSS variables + Tailwind @theme mapping)
  src/styles/theme.css      keyframes + scoped reset   → dist/theme.css   (for Tailwind users)
  src/styles/index.css      Tailwind entry, no preflight → dist/styles.css (precompiled)
  src/components/<name>/    component · index · tests · stories
apps/docs/                  Next.js 16 App Router, statically generated
```

### Key decisions

- **Tokens are generated, not hand-written.** `tokens.ts` produces the CSS variables, and the same object drives a unit test that checks every foreground/background pairing the components actually render against WCAG AA (4.5:1 for text, 3:1 for borders and focus rings) in both themes. A second test fails if `tokens.css` is out of date.
- **Themes are attribute-scoped.** Set `data-chibi-theme="light" | "dark" | "system"` on any element, so a dark card can sit on a light page. Tailwind utilities read the variables at runtime through `@theme inline`.
- **No global CSS side effects.** The precompiled stylesheet omits Tailwind's preflight. A tiny `:where([data-chibi])` reset normalises only ChibiUI elements, so dropping the library into an existing app restyles nothing.
- **RSC-ready output.** Every component chunk starts with `"use client"`, while `@chibi-ui/react/tokens` stays a plain module you can import on the server. (tsup's `treeshake` option was turned off on purpose: its Rollup pass strips the directive.)
- **Radix for behaviour, Motion for feel.** Exit animations use `forceMount` + `AnimatePresence` on the Radix parts. Swipe offsets go to an inner element through inherited CSS variables, so they never fight Motion's transforms.
- **`ref` is a prop (React 19).** No `forwardRef` wrappers. Select forwards `ref` to its trigger so form libraries can focus it.

## Quality

### Accessibility

- Radix primitives supply the WAI-ARIA patterns. **axe-core** runs in every component's unit tests, and again in a real browser over every docs page in light and dark mode, including real colour contrast.
- Focus indicators use `outline`, so they survive Windows forced-colours mode. Loading buttons keep focus (`aria-disabled` + `aria-busy`), and the default `type="button"` prevents accidental form submits.
- Field errors are linked with `aria-describedby`, set `aria-invalid`, and sit in a polite live region. Errors pair an icon with text, so they don't rely on colour.
- `prefers-reduced-motion` removes transform animations (spinners slow down rather than stop, since they convey progress). `prefers-reduced-transparency` replaces the dialog's glass blur with a solid backdrop.
- Development-only warnings fire when an icon-only button, input, select or switch has no accessible name.

### Performance

Measured by `pnpm size` (initial JS, minified + gzipped, React external), with budgets enforced in CI:

| Entry       | Initial | Lazy | Entry      | Initial |    Lazy |
| ----------- | ------: | ---: | ---------- | ------: | ------: |
| `mascot`    |  9.6 kB |    – | `toast`    | 23.8 kB | 32.4 kB |
| `button`    | 12.2 kB |    – | `dialog`   | 24.2 kB | 32.4 kB |
| `switch`    | 15.7 kB |    – | `select`   | 41.7 kB |       – |
| `accordion` | 19.2 kB |    – | full index | 56.7 kB | 32.4 kB |

About 8.6 kB of every entry is `tailwind-merge`, a shared baseline paid once per app. Motion's animation features are lazy-loaded through `LazyMotion`, which cut Dialog's and Toast's initial JS by about 57%. The card tilt writes CSS variables on animation frames, so pointer moves never re-render React. The docs site is fully static, with fonts self-hosted by `next/font`.

### Security

- Code snippets are highlighted by a ~1 kB tokenizer that renders React text nodes, so there is no `dangerouslySetInnerHTML`. User-typed playground values can't inject HTML (covered by an e2e test).
- The theme pre-paint script validates `localStorage` against an allowlist before touching the DOM (also covered by a test).
- The docs site sends a CSP with no third-party origins, plus `frame-ancestors 'none'`, `object-src 'none'`, HSTS, `nosniff`, a strict Referrer-Policy, a Permissions-Policy and COOP, and drops `X-Powered-By`. The site is statically generated, so it follows Next.js' _without nonces_ guidance: inline scripts are allowed (`'unsafe-inline'`) and every other directive is locked down. A nonce would force dynamic rendering on every request.
- CI runs with `contents: read` permissions, and Dependabot tracks npm and GitHub Actions updates.

## License

[MIT](./LICENSE)
