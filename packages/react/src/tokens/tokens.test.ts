// @vitest-environment node
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { generateTokensCss } from '../../scripts/tokens-css';
import { AA, contrastRatio } from './contrast';
import { darkColors, lightColors, type SemanticColors } from './tokens';

type Role = keyof SemanticColors;

/**
 * Every foreground/background combination actually rendered by a component.
 * `min` is the WCAG AA threshold for that usage.
 */
const pairs: readonly { fg: Role; bg: Role; min: number; usage: string }[] = [
  { fg: 'fg', bg: 'bg', min: AA.text, usage: 'body text on page' },
  { fg: 'fg', bg: 'surface', min: AA.text, usage: 'body text on cards/inputs' },
  { fg: 'fg', bg: 'surfaceMuted', min: AA.text, usage: 'text on muted surfaces' },
  { fg: 'fgMuted', bg: 'bg', min: AA.text, usage: 'descriptions on page' },
  { fg: 'fgMuted', bg: 'surface', min: AA.text, usage: 'descriptions / placeholders' },
  { fg: 'fgMuted', bg: 'surfaceMuted', min: AA.text, usage: 'muted text on muted surface' },
  { fg: 'primaryFg', bg: 'primary', min: AA.text, usage: 'primary button label' },
  { fg: 'primaryFg', bg: 'primaryHover', min: AA.text, usage: 'primary button hover' },
  { fg: 'secondaryFg', bg: 'secondary', min: AA.text, usage: 'secondary button label' },
  { fg: 'secondaryFg', bg: 'secondaryHover', min: AA.text, usage: 'secondary button hover' },
  { fg: 'fg', bg: 'ghostHover', min: AA.text, usage: 'ghost button hover' },
  { fg: 'kawaiiFg', bg: 'kawaiiFrom', min: AA.text, usage: 'kawaii gradient start' },
  { fg: 'kawaiiFg', bg: 'kawaiiTo', min: AA.text, usage: 'kawaii gradient end' },
  { fg: 'successFg', bg: 'successSoft', min: AA.text, usage: 'success toast' },
  { fg: 'warningFg', bg: 'warningSoft', min: AA.text, usage: 'warning toast' },
  { fg: 'dangerFg', bg: 'dangerSoft', min: AA.text, usage: 'error toast' },
  { fg: 'infoFg', bg: 'infoSoft', min: AA.text, usage: 'info toast' },
  { fg: 'dangerFg', bg: 'surface', min: AA.text, usage: 'field error message' },
  { fg: 'dangerFg', bg: 'bg', min: AA.text, usage: 'field error message on page' },
  { fg: 'borderStrong', bg: 'surface', min: AA.ui, usage: 'input / switch boundary' },
  { fg: 'borderStrong', bg: 'bg', min: AA.ui, usage: 'input boundary on page' },
  { fg: 'ring', bg: 'bg', min: AA.ui, usage: 'focus indicator on page' },
  { fg: 'ring', bg: 'surface', min: AA.ui, usage: 'focus indicator on surface' },
  { fg: 'dangerFg', bg: 'surface', min: AA.ui, usage: 'invalid input border' },
];

describe.each([
  ['light', lightColors],
  ['dark', darkColors],
] as const)('%s theme contrast', (_theme, colors) => {
  it.each(pairs)('$fg on $bg ($usage) meets $min:1', ({ fg, bg, min }) => {
    expect(contrastRatio(colors[fg], colors[bg])).toBeGreaterThanOrEqual(min);
  });
});

describe('generated CSS', () => {
  it('src/styles/tokens.css is up to date with tokens.ts (run `pnpm tokens`)', () => {
    const cssPath = fileURLToPath(new URL('../styles/tokens.css', import.meta.url));
    expect(readFileSync(cssPath, 'utf8')).toBe(generateTokensCss());
  });
});

describe('contrastRatio', () => {
  it('matches known reference values', () => {
    expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 5);
    expect(contrastRatio('#ffffff', '#ffffff')).toBe(1);
  });

  it('rejects non-hex input', () => {
    expect(() => contrastRatio('red', '#ffffff')).toThrow(/hex/);
  });
});
