import type { Preview } from '@storybook/react-vite';
import './storybook.css';

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'ChibiUI colour theme',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'light' },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme === 'dark' ? 'dark' : 'light';
      document.documentElement.dataset.chibiTheme = theme;
      return <Story />;
    },
  ],
  parameters: {
    layout: 'centered',
    controls: { expanded: true, matchers: { color: /(background|color)$/i } },
    docs: { codePanel: true },
    a11y: {
      // Fail the a11y panel (and test-runner) on violations rather than just warning.
      test: 'error',
    },
  },
  tags: ['autodocs'],
};

export default preview;
