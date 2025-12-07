import type { Meta, StoryObj } from '@storybook/react';
import { EconomyDashboard } from './EconomyDashboard';

const meta: Meta<typeof EconomyDashboard> = {
  title: 'Shared/Economy/Organisms/EconomyDashboard',
  component: EconomyDashboard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof EconomyDashboard>;

export const Default: Story = {
  args: {
    stats: {
      critCoins: 1250,
      storyCredits: 45,
      totalEarned: 5000,
      totalSpent: 3750,
      pendingPayouts: 500,
    },
  },
};

export const NewUser: Story = {
  args: {
    stats: {
      critCoins: 0,
      storyCredits: 0,
      totalEarned: 0,
      totalSpent: 0,
      pendingPayouts: 0,
    },
  },
};

export const HighEarner: Story = {
  args: {
    stats: {
      critCoins: 25000,
      storyCredits: 350,
      totalEarned: 100000,
      totalSpent: 75000,
      pendingPayouts: 5000,
    },
  },
};

export const WithoutDetailedStats: Story = {
  args: {
    stats: {
      critCoins: 1250,
      storyCredits: 45,
      totalEarned: 5000,
      totalSpent: 3750,
      pendingPayouts: 500,
    },
    showDetailedStats: false,
  },
};
