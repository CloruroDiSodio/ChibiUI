/**
 * WCAG 2.x relative-luminance contrast helpers.
 * Used by the token test-suite to guarantee AA compliance of every semantic pairing.
 */

const HEX_RE = /^#([0-9a-f]{6})$/i;

function channel(value: number): number {
  const c = value / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

export function relativeLuminance(hex: string): number {
  const match = HEX_RE.exec(hex);
  if (!match?.[1]) {
    throw new Error(`Expected a 6-digit hex colour, received "${hex}"`);
  }
  const int = Number.parseInt(match[1], 16);
  const r = (int >> 16) & 0xff;
  const g = (int >> 8) & 0xff;
  const b = int & 0xff;
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

/** Returns the WCAG contrast ratio (1 – 21) between two hex colours. */
export function contrastRatio(foreground: string, background: string): number {
  const l1 = relativeLuminance(foreground);
  const l2 = relativeLuminance(background);
  const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (hi + 0.05) / (lo + 0.05);
}

/** WCAG AA thresholds. */
export const AA = {
  /** Body text (< 18pt / < 14pt bold). */
  text: 4.5,
  /** Large text and non-text UI (borders, focus indicators, icons). */
  ui: 3,
} as const;
