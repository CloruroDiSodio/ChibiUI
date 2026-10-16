// @vitest-environment node
import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { palette } from './tokens';

/**
 * Components must style themselves with semantic tokens (which adapt per theme), never raw
 * palette steps (which look identical in light and dark). A raw `mint-100` glare, for
 * example, bleached text on dark cards. axe can't see that (gradients on pseudo-elements
 * are "needs review"), so this static guard is what prevents regressions.
 */
const ALLOWED: Record<string, string[]> = {
  // Mochi's blush is intentionally identical in both themes.
  'mascot/mascot.tsx': ['chibi-pink-300'],
};

const componentsDir = fileURLToPath(new URL('../components', import.meta.url));
const rawPalette = new RegExp(`chibi-(?:${Object.keys(palette).join('|')})-\\d+`, 'g');

function sourceFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return sourceFiles(path);
    return /\.tsx?$/.test(entry.name) && !/\.(test|stories)\.tsx?$/.test(entry.name) ? [path] : [];
  });
}

describe('components use semantic tokens', () => {
  it.each(sourceFiles(componentsDir).map((path) => [relative(componentsDir, path), path]))(
    '%s has no raw palette colours',
    (name, path) => {
      const found = [...readFileSync(path, 'utf8').matchAll(rawPalette)].map((m) => m[0]);
      const allowed = ALLOWED[name] ?? [];
      expect(found.filter((token) => !allowed.includes(token))).toEqual([]);
    },
  );
});
