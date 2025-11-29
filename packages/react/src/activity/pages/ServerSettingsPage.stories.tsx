import type { Meta, StoryObj } from '@storybook/react';
import { ServerSettingsPage } from './ServerSettingsPage';

const meta: Meta<typeof ServerSettingsPage> = {
  title: 'Activity/Pages/ServerSettingsPage',
  component: ServerSettingsPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof ServerSettingsPage>;

export const Default: Story = {
  args: {
    guildId: 'guild-456',
    onBack: () => alert('Back clicked'),
  },
};

export const NoGuild: Story = {
  args: {
    guildId: null,
    onBack: () => alert('Back clicked'),
  },
};

// Note: This page fetches data from APIs, so in Storybook
// it will show loading states or empty states depending on
// network conditions. The tab panels will be populated when
// the APIs respond.
