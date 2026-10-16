// Bundles each public entry the way a consumer app would (React external, minified,
// code-split) and fails if any entry's *initial* JS exceeds its gzip budget.
// Lazily-loaded chunks (Motion's animation features) are reported separately.
// Run after `pnpm build`.
import { build } from 'esbuild';
import { gzipSync } from 'node:zlib';

// Initial-JS budgets (gzip, kB) = measured + ~10% headroom. Note ~8.6 kB of every entry is
// tailwind-merge, a shared baseline paid once per app, not per component.
const budgetsKb = {
  mascot: 10.5,
  spinner: 11,
  input: 12,
  card: 13,
  button: 13.5,
  switch: 17.5,
  accordion: 21,
  toast: 26.5,
  dialog: 27,
  select: 46,
  index: 62,
  tokens: 2,
};

let failed = false;
const rows = [];
for (const [entry, budget] of Object.entries(budgetsKb)) {
  const result = await build({
    stdin: { contents: `export * from './dist/${entry}.js';`, resolveDir: process.cwd() },
    bundle: true,
    minify: true,
    splitting: true,
    outdir: 'size-out',
    write: false,
    format: 'esm',
    platform: 'browser',
    logLevel: 'silent',
    external: ['react', 'react-dom', 'react/jsx-runtime'],
    define: { 'process.env.NODE_ENV': '"production"' },
  });
  const kb = (file) => gzipSync(file.contents).length / 1024;
  const [initial, ...lazy] = [...result.outputFiles].sort(
    (a, b) => Number(b.path.endsWith('stdin.js')) - Number(a.path.endsWith('stdin.js')),
  );
  const gzip = kb(initial);
  const lazyKb = lazy.reduce((sum, file) => sum + kb(file), 0);
  const ok = gzip <= budget;
  failed ||= !ok;
  rows.push({
    entry,
    'initial gzip (kB)': gzip.toFixed(1),
    'lazy gzip (kB)': lazyKb ? lazyKb.toFixed(1) : '–',
    'budget (kB)': budget,
    ok: ok ? '✓' : '✗ OVER',
  });
}
console.table(rows);
if (failed) process.exit(1);
