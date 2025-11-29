import type { Meta, StoryObj } from '@storybook/react';
import { AdminDashboardPage } from './AdminDashboardPage';

const meta: Meta<typeof AdminDashboardPage> = {
  title: 'FumbleBot/Pages/AdminDashboardPage',
  component: AdminDashboardPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof AdminDashboardPage>;

export const Default: Story = {
  args: {
    username: 'DungeonMaster42',
    userId: 'user-123',
    guildId: 'guild-456',
    onShowSettings: () => alert('Show settings'),
    onShowActivityHub: () => alert('Show activity hub'),
  },
};

export const NoGuild: Story = {
  args: {
    username: 'DungeonMaster42',
    userId: 'user-123',
    guildId: null,
    onShowSettings: () => alert('Show settings'),
    onShowActivityHub: () => alert('Show activity hub'),
  },
};

export const MinimalActions: Story = {
  args: {
    username: 'PlayerOne',
    userId: 'user-789',
    guildId: 'guild-456',
  },
};

// Note: This page fetches data from APIs, so in Storybook
// it will show loading states or empty states depending on
// network conditions.
