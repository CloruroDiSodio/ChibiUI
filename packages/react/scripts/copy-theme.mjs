// Publishes the raw (uncompiled) theme for consumers who run Tailwind v4 themselves.
// tokens.css is inlined so the published theme.css has no relative imports.
import { readFileSync, writeFileSync } from 'node:fs';

const src = new URL('../src/styles/', import.meta.url);
const tokens = readFileSync(new URL('tokens.css', src), 'utf8');
const theme = readFileSync(new URL('theme.css', src), 'utf8').replace(
  /@import\s+["']\.\/tokens\.css["'];?\n/,
  `${tokens}\n`,
);
writeFileSync(new URL('../dist/theme.css', import.meta.url), theme);
console.log('✿ dist/theme.css written');
