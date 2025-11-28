import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from './EmptyState';

const meta: Meta<typeof EmptyState> = {
  title: 'Shared/Molecules/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  args: {
    title: 'No items found',
    description: 'There are no items to display at this time.',
  },
};

export const WithAction: Story = {
  args: {
    title: 'No campaigns yet',
    description: 'Create your first campaign to get started.',
    actionLabel: 'Create Campaign',
    onAction: () => alert('Create campaign clicked!'),
  },
};

export const CustomIcon: Story = {
  args: {
    icon: '🎲',
    title: 'No dice rolls',
    description: 'Roll some dice to see your history here.',
  },
};

export const NoCampaigns: Story = {
  args: {
    icon: '🏰',
    title: 'No campaigns',
    description: 'You haven\'t joined any campaigns yet.',
    actionLabel: 'Browse Campaigns',
    onAction: () => {},
  },
};

export const NoPlayers: Story = {
  args: {
    icon: '👥',
    title: 'No players yet',
    description: 'Invite players to join your campaign.',
    actionLabel: 'Invite Players',
    onAction: () => {},
  },
};

export const ErrorState: Story = {
  args: {
    icon: '❌',
    title: 'Something went wrong',
    description: 'We couldn\'t load the data. Please try again.',
    actionLabel: 'Retry',
    onAction: () => {},
  },
};
