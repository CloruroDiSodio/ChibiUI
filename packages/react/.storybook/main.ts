import tailwindcss from '@tailwindcss/vite';
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: { name: '@storybook/react-vite', options: {} },
  // Serves favicon.svg (Mochi), which Storybook picks up automatically.
  staticDirs: ['./public'],
  core: { disableTelemetry: true },
  typescript: {
    // Generates prop tables / controls from the exported `Chibi*Props` interfaces.
    reactDocgen: 'react-docgen-typescript',
  },
  async viteFinal(viteConfig) {
    viteConfig.plugins = [...(viteConfig.plugins ?? []), tailwindcss()];
    return viteConfig;
  },
};

export default config;
