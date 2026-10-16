/** Optional external links, configured at build time (never hard-coded guesses). */
export const site = {
  name: 'ChibiUI',
  description:
    'An accessible, strictly-typed React component library with a playful pastel design language.',
  repoUrl: process.env.NEXT_PUBLIC_REPO_URL,
  storybookUrl: process.env.NEXT_PUBLIC_STORYBOOK_URL,
} as const;
