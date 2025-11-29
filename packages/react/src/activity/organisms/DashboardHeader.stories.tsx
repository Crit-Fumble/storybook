import type { Meta, StoryObj } from '@storybook/react';
import { DashboardHeader } from './DashboardHeader';

const meta: Meta<typeof DashboardHeader> = {
  title: 'FumbleBot/Dashboard/DashboardHeader',
  component: DashboardHeader,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="p-6 bg-discord-background-primary">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DashboardHeader>;

export const Admin: Story = {
  args: {
    title: 'Campaign Dashboard',
    username: 'DungeonMaster42',
    userRole: 'admin',
    onActivityHub: () => alert('Activity Hub clicked'),
    onSettings: () => alert('Settings clicked'),
    onChat: () => alert('Chat clicked'),
  },
};

export const GameMaster: Story = {
  args: {
    title: 'Session Control',
    username: 'GMLinda',
    userRole: 'gm',
    onActivityHub: () => alert('Activity Hub clicked'),
    onSettings: () => alert('Settings clicked'),
    onChat: () => alert('Chat clicked'),
  },
};

export const Player: Story = {
  args: {
    title: 'Campaign View',
    username: 'PlayerOne',
    userRole: 'player',
    onChat: () => alert('Chat clicked'),
  },
};

export const WithUnreadMessages: Story = {
  args: {
    title: 'Campaign Dashboard',
    username: 'DungeonMaster42',
    userRole: 'admin',
    onActivityHub: () => alert('Activity Hub clicked'),
    onSettings: () => alert('Settings clicked'),
    onChat: () => alert('Chat clicked'),
    hasUnreadMessages: true,
  },
};

export const MinimalActions: Story = {
  args: {
    title: 'View Only Mode',
    username: 'Viewer',
    userRole: 'player',
  },
};

export const AllActions: Story = {
  args: {
    title: 'Full Control',
    username: 'AdminUser',
    userRole: 'admin',
    onActivityHub: () => {},
    onSettings: () => {},
    onChat: () => {},
    hasUnreadMessages: false,
  },
};
