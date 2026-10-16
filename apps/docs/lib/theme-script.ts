/** Storage key for the user's colour-scheme preference. */
export const THEME_STORAGE_KEY = 'chibi-theme';
export const THEMES = ['light', 'dark', 'system'] as const;
export type Theme = (typeof THEMES)[number];

export const isTheme = (value: unknown): value is Theme =>
  typeof value === 'string' && (THEMES as readonly string[]).includes(value);

/**
 * Runs before first paint to apply the stored theme (no flash of the wrong theme).
 * The stored value is validated against an allowlist before touching the DOM.
 */
export const themeScript = `(function(){try{var t=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});if(${JSON.stringify(THEMES)}.indexOf(t)!==-1){document.documentElement.setAttribute("data-chibi-theme",t)}}catch(e){}})();`;
