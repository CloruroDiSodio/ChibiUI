import { defineConfig } from 'tsup';

const components = [
  'accordion',
  'button',
  'card',
  'dialog',
  'input',
  'mascot',
  'select',
  'spinner',
  'switch',
  'toast',
];

export default defineConfig([
  {
    // Interactive components: every output file is a client module for React Server Components.
    entry: {
      index: 'src/index.ts',
      ...Object.fromEntries(components.map((name) => [name, `src/components/${name}/index.ts`])),
    },
    format: ['esm'],
    target: 'es2022',
    dts: true,
    sourcemap: true,
    // Shared chunks are emitted once, so `@chibi-ui/react/button` pulls in only what it needs.
    // (No `treeshake: true`: its Rollup pass strips the "use client" directive. esbuild already
    // tree-shakes ESM.)
    splitting: true,
    clean: false, // the build script wipes dist once; two parallel configs cleaning would race.
    banner: { js: '"use client";' },
    external: ['react', 'react-dom', 'react/jsx-runtime'],
  },
  {
    // Plain data — must NOT be a client module, so it stays importable from server code.
    entry: { tokens: 'src/tokens/index.ts' },
    format: ['esm'],
    target: 'es2022',
    dts: true,
    sourcemap: true,
    clean: false,
  },
]);
