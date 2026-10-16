/**
 * ChibiUI design tokens — the single source of truth.
 *
 * `scripts/build-tokens.ts` compiles this file into `src/styles/tokens.css`
 * (CSS custom properties), and `tokens.test.ts` verifies every semantic
 * foreground/background pairing against WCAG AA.
 */

export const palette = {
  /** Powdery pink */
  pink: {
    50: '#fff5f8',
    100: '#ffe4ec',
    200: '#fcc9d8',
    300: '#f6a8c0',
    400: '#ec84a5',
    500: '#d95f87',
    600: '#b8436b',
    700: '#933353',
    800: '#6c263e',
    900: '#47192a',
  },
  /** Sugar-paper blue */
  blue: {
    50: '#f3f8fd',
    100: '#e0eefa',
    200: '#c5dcf2',
    300: '#a3c5e8',
    400: '#7ea9d8',
    500: '#5b8bc4',
    600: '#446fa6',
    700: '#355685',
    800: '#273f62',
    900: '#1a2a42',
  },
  /** Butter yellow */
  yellow: {
    50: '#fffbeb',
    100: '#fff4c7',
    200: '#ffe99a',
    300: '#fbdb73',
    400: '#f2c84b',
    500: '#d9a82a',
    600: '#a87d14',
    700: '#7d5c10',
    800: '#574011',
    900: '#36280c',
  },
  /** Mint green */
  mint: {
    50: '#f0fbf6',
    100: '#d9f5e8',
    200: '#b7ebd3',
    300: '#8ddcb9',
    400: '#63c79c',
    500: '#3fa97e',
    600: '#2d8664',
    700: '#23674e',
    800: '#1b4b3a',
    900: '#123227',
  },
  /** Lavender */
  lavender: {
    50: '#f8f5ff',
    100: '#ede6ff',
    200: '#dccffd',
    300: '#c6b3f7',
    400: '#a990ec',
    500: '#8b6fdc',
    600: '#6f53bf',
    700: '#563f97',
    800: '#3e2e6c',
    900: '#281e46',
  },
  /** Strawberry coral (used for danger states) */
  coral: {
    50: '#fff4f2',
    100: '#ffe2dc',
    200: '#ffc6ba',
    300: '#fca592',
    400: '#f2806a',
    500: '#dc5a43',
    600: '#b8402c',
    700: '#8f3123',
    800: '#66241a',
    900: '#421811',
  },
  /** Cool slate neutrals with a hint of mint */
  ink: {
    50: '#f8fbfa',
    100: '#eef3f2',
    200: '#dce5e3',
    300: '#c3cfcc',
    400: '#9aa9a5',
    500: '#778783',
    600: '#56635f',
    700: '#3e4946',
    800: '#2a3331',
    900: '#1b2220',
    950: '#121715',
  },
} as const;

export type PaletteName = keyof typeof palette;

const { blue, yellow, mint, coral, ink } = palette;

/** Semantic colour roles. Components consume ONLY these, never the raw palette. */
export interface SemanticColors {
  bg: string;
  surface: string;
  surfaceMuted: string;
  fg: string;
  fgMuted: string;
  border: string;
  borderStrong: string;
  ring: string;
  overlay: string;

  primary: string;
  primaryHover: string;
  primaryFg: string;
  secondary: string;
  secondaryHover: string;
  secondaryFg: string;
  ghostHover: string;
  kawaiiFrom: string;
  kawaiiTo: string;
  kawaiiFg: string;

  successSoft: string;
  successBorder: string;
  successFg: string;
  warningSoft: string;
  warningBorder: string;
  warningFg: string;
  dangerSoft: string;
  dangerBorder: string;
  dangerFg: string;
  infoSoft: string;
  infoBorder: string;
  infoFg: string;
}

export const lightColors: SemanticColors = {
  bg: '#f7fcfa',
  surface: '#ffffff',
  surfaceMuted: ink[100],
  fg: ink[900],
  fgMuted: ink[600],
  border: ink[200],
  borderStrong: ink[500],
  ring: mint[700],
  overlay: 'rgb(183 235 211 / 0.35)',

  primary: mint[300],
  primaryHover: mint[400],
  primaryFg: ink[950],
  secondary: blue[200],
  secondaryHover: blue[300],
  secondaryFg: ink[950],
  ghostHover: mint[100],
  kawaiiFrom: mint[200],
  kawaiiTo: blue[200],
  kawaiiFg: ink[950],

  successSoft: mint[100],
  successBorder: mint[300],
  successFg: mint[800],
  warningSoft: yellow[100],
  warningBorder: yellow[300],
  warningFg: yellow[800],
  dangerSoft: coral[100],
  dangerBorder: coral[300],
  dangerFg: coral[700],
  infoSoft: blue[100],
  infoBorder: blue[300],
  infoFg: blue[800],
};

export const darkColors: SemanticColors = {
  bg: ink[950],
  surface: ink[900],
  surfaceMuted: ink[800],
  fg: ink[50],
  fgMuted: ink[300],
  border: ink[700],
  borderStrong: ink[500],
  ring: mint[300],
  overlay: 'rgb(18 23 21 / 0.55)',

  primary: mint[300],
  primaryHover: mint[200],
  primaryFg: ink[950],
  secondary: blue[300],
  secondaryHover: blue[200],
  secondaryFg: ink[950],
  ghostHover: ink[800],
  kawaiiFrom: mint[300],
  kawaiiTo: blue[300],
  kawaiiFg: ink[950],

  successSoft: mint[900],
  successBorder: mint[700],
  successFg: mint[100],
  warningSoft: yellow[900],
  warningBorder: yellow[700],
  warningFg: yellow[100],
  dangerSoft: coral[900],
  dangerBorder: coral[700],
  dangerFg: coral[200],
  infoSoft: blue[900],
  infoBorder: blue[700],
  infoFg: blue[100],
};

export const radius = {
  sm: '0.75rem',
  md: '1rem',
  lg: '1.5rem',
  full: '9999px',
} as const;

export const shadows = {
  light: {
    sm: '0 1px 2px 0 rgb(45 134 100 / 0.08), 0 2px 6px -1px rgb(45 134 100 / 0.12)',
    md: '0 2px 4px -1px rgb(45 134 100 / 0.08), 0 8px 20px -6px rgb(45 134 100 / 0.22)',
    lg: '0 4px 8px -2px rgb(139 111 220 / 0.10), 0 18px 40px -12px rgb(45 134 100 / 0.32)',
    pop: `0 4px 0 0 ${mint[400]}`,
  },
  dark: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.35)',
    md: '0 2px 4px -1px rgb(0 0 0 / 0.4), 0 8px 20px -6px rgb(0 0 0 / 0.55)',
    lg: '0 4px 8px -2px rgb(0 0 0 / 0.45), 0 18px 40px -12px rgb(141 220 185 / 0.18)',
    pop: `0 4px 0 0 ${mint[600]}`,
  },
} as const;

export const fonts = {
  display: '"Fredoka", "Nunito", ui-rounded, "Hiragino Maru Gothic ProN", system-ui, sans-serif',
  body: '"Outfit", "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
} as const;

export const motion = {
  easeBounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  easeOut: 'cubic-bezier(0.22, 1, 0.36, 1)',
  durationFast: '150ms',
  durationBase: '250ms',
  durationSlow: '400ms',
} as const;

export const tokens = {
  palette,
  colors: { light: lightColors, dark: darkColors },
  radius,
  shadows,
  fonts,
  motion,
} as const;

export type ChibiTokens = typeof tokens;
