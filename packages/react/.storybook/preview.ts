import type { Preview } from '@storybook/react';
import '../src/styles.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'cfg-dark',
      values: [
        { name: 'cfg-dark', value: '#1a1a2e' },
        { name: 'cfg-darker', value: '#0f0f1a' },
        { name: 'cfg-secondary', value: '#16213e' },
        { name: 'cfg-floating', value: '#1f1f3a' },
        { name: 'light', value: '#ffffff' },
      ],
    },
    options: {
      storySort: {
        order: ['Shared', ['Atoms', 'Molecules', 'Desktop', 'Economy'], 'Web', 'Activity'],
      },
    },
  },
};

export default preview;
