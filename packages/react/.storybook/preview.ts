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
      default: 'discord-dark',
      values: [
        { name: 'discord-dark', value: '#1e1f22' },
        { name: 'discord-secondary', value: '#2b2d31' },
        { name: 'discord-primary', value: '#313338' },
        { name: 'light', value: '#ffffff' },
      ],
    },
  },
};

export default preview;
