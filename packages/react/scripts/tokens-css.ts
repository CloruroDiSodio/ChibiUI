import {
  darkColors,
  fonts,
  lightColors,
  motion,
  palette,
  radius,
  shadows,
  type SemanticColors,
} from '../src/tokens/tokens';

const kebab = (value: string) => value.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`);

const decl = (name: string, value: string, indent = '  ') => `${indent}--chibi-${name}: ${value};`;

function semanticBlock(
  colors: SemanticColors,
  shadow: Record<string, string>,
  indent = '  ',
): string[] {
  return [
    ...Object.entries(colors).map(([role, value]) => decl(kebab(role), value, indent)),
    ...Object.entries(shadow).map(([size, value]) => decl(`shadow-${size}`, value, indent)),
  ];
}

/** Compiles `tokens.ts` into the CSS custom properties consumed by every component. */
export function generateTokensCss(): string {
  const root = [
    ...Object.entries(palette).flatMap(([name, scale]) =>
      Object.entries(scale).map(([step, value]) => decl(`${name}-${step}`, value)),
    ),
    ...Object.entries(radius).map(([size, value]) => decl(`radius-${size}`, value)),
    ...Object.entries(fonts).map(([role, value]) => decl(`font-${role}`, value)),
    ...Object.entries(motion).map(([key, value]) => decl(kebab(key), value)),
  ];

  // Tailwind v4 mapping. `inline` makes utilities reference the runtime variable,
  // so scoped theme switches (data-chibi-theme) work without recompiling.
  const themeMap = [
    ...Object.keys(lightColors).map(
      (role) => `  --color-chibi-${kebab(role)}: var(--chibi-${kebab(role)});`,
    ),
    ...Object.entries(palette).flatMap(([name, scale]) =>
      Object.keys(scale).map(
        (step) => `  --color-chibi-${name}-${step}: var(--chibi-${name}-${step});`,
      ),
    ),
    ...Object.keys(radius).map((size) => `  --radius-chibi-${size}: var(--chibi-radius-${size});`),
    ...Object.keys(shadows.light).map(
      (size) => `  --shadow-chibi-${size}: var(--chibi-shadow-${size});`,
    ),
    ...Object.keys(fonts).map((role) => `  --font-chibi-${role}: var(--chibi-font-${role});`),
    '  --ease-chibi-bounce: var(--chibi-ease-bounce);',
    '  --ease-chibi-out: var(--chibi-ease-out);',
  ];

  const dark = semanticBlock(darkColors, shadows.dark);
  const darkNested = semanticBlock(darkColors, shadows.dark, '    ');

  return [
    '/* AUTO-GENERATED from src/tokens/tokens.ts by scripts/build-tokens.ts. Do not edit by hand. */',
    '',
    ':root {',
    ...root,
    '}',
    '',
    ':root,',
    '[data-chibi-theme="light"] {',
    ...semanticBlock(lightColors, shadows.light),
    '}',
    '',
    '[data-chibi-theme="light"] {',
    '  color-scheme: light;',
    '}',
    '',
    '[data-chibi-theme="dark"] {',
    '  color-scheme: dark;',
    ...dark,
    '}',
    '',
    '@media (prefers-color-scheme: dark) {',
    '  [data-chibi-theme="system"] {',
    '    color-scheme: dark;',
    ...darkNested,
    '  }',
    '}',
    '',
    '@theme inline {',
    ...themeMap,
    '}',
    '',
  ].join('\n');
}
