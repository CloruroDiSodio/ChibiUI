# @chibi-ui/react

Accessible, strictly typed React 19 components with a playful pastel (kawaii) design language. Behaviour comes from Radix UI and motion from Motion.

```bash
pnpm add @chibi-ui/react
```

## Styles

**Any stack.** Import the precompiled stylesheet once. It has no global reset, so it won't restyle your app:

```ts
import '@chibi-ui/react/styles.css';
```

**Tailwind CSS v4.** Share one stylesheet and use the tokens yourself:

```css
@import 'tailwindcss';
@import '@chibi-ui/react/theme.css';
@source "../node_modules/@chibi-ui/react/dist";
```

## Usage

Import from per-component entry points so you only ship what you use:

```tsx
import { ChibiButton } from '@chibi-ui/react/button';
import { ChibiToastProvider, useChibiToast } from '@chibi-ui/react/toast';
```

Entry points: `button`, `card`, `toast`, `dialog`, `accordion`, `input`, `select`, `switch`, `spinner`, `mascot`, `tokens`. The root export re-exports everything.

Every component is a client module (`"use client"`), so you can render it straight from React Server Components. `@chibi-ui/react/tokens` is plain data and is safe to import on the server.

## Theming

Set `data-chibi-theme="light" | "dark" | "system"` on any element, and override any `--chibi-*` variable:

```css
:root {
  --chibi-primary: #b7ebd3;
  --chibi-radius-lg: 2rem;
}
```

Use `contrastRatio()` and `AA` from `@chibi-ui/react/tokens` to check your overrides against WCAG AA.

## License

MIT
