import type { Preview } from '@storybook/react';
import '../src/styles.css';

// Mobile viewport definitions for testing
const mobileViewports = {
  samsungS22: {
    name: 'Samsung S22',
    styles: {
      width: '360px',
      height: '780px',
    },
    type: 'mobile' as const,
  },
  iphone13: {
    name: 'iPhone 13',
    styles: {
      width: '390px',
      height: '844px',
    },
    type: 'mobile' as const,
  },
  iphone13Mini: {
    name: 'iPhone 13 Mini',
    styles: {
      width: '375px',
      height: '812px',
    },
    type: 'mobile' as const,
  },
  discordActivity: {
    name: 'Discord Activity (Mobile)',
    styles: {
      width: '360px',
      height: '640px',
    },
    type: 'mobile' as const,
  },
};

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
    viewport: {
      viewports: mobileViewports,
    },
    options: {
      storySort: {
        order: ['Shared', ['Atoms', 'Molecules', 'Desktop', 'Economy'], 'Web', 'Activity'],
      },
    },
  },
};

export default preview;
