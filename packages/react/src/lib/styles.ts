/**
 * Shared class recipes.
 *
 * Focus is drawn with `outline` (not box-shadow rings) so it remains visible in
 * Windows High Contrast / forced-colors mode, and only for keyboard focus.
 */
export const focusRing =
  'outline-offset-2 focus-visible:outline-3 focus-visible:outline-solid focus-visible:outline-chibi-ring';

/** Same recipe, for composite widgets whose focusable child lives inside the styled box. */
export const focusWithinRing =
  'has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-solid has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-chibi-ring';
