import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming';

const cfgTheme = create({
  base: 'dark',

  // Brand
  brandTitle: 'Crit-Fumble Gaming',
  brandUrl: 'https://crit-fumble.com',
  brandImage: '/img/cfg-logo.jpg',
  brandTarget: '_blank',

  // CFG Color Palette
  colorPrimary: '#7a4599', // cfg-accent
  colorSecondary: '#552e66', // cfg-primary

  // UI
  appBg: '#0f0f1a', // cfg-background-tertiary
  appContentBg: '#1a1a2e', // cfg-background-primary
  appBorderColor: '#3a3a5a', // cfg-border
  appBorderRadius: 8,

  // Text colors
  textColor: '#e8e8f0', // cfg-text-normal
  textInverseColor: '#1a1a2e',
  textMutedColor: '#9090a8', // cfg-text-muted

  // Toolbar default and active colors
  barTextColor: '#9090a8',
  barSelectedColor: '#7a4599',
  barBg: '#16213e', // cfg-background-secondary

  // Form colors
  inputBg: '#1a1a2e',
  inputBorder: '#3a3a5a',
  inputTextColor: '#e8e8f0',
  inputBorderRadius: 4,
});

addons.setConfig({
  theme: cfgTheme,
});
