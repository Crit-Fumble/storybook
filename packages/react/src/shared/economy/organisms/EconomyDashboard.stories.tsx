import type { Meta, StoryObj } from '@storybook/react';
import { EconomyDashboard } from './EconomyDashboard';

const meta: Meta<typeof EconomyDashboard> = {
  title: 'Shared/Economy/Organisms/EconomyDashboard',
  component: EconomyDashboard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Economy dashboard showing both currency types:

**Crit-Coins** (Store Credit):
- Purchased by users ($0.80-$1.00 per CC depending on package)
- Used for tipping creators
- Displayed in purple/primary color

**Story Credits** (Earned Currency):
- Earned from tips (1 CC tipped = 0.75 SC earned)
- Can be cashed out (1 SC = $1.00 USD with 2% processing fee)
- Can be used to purchase Crit-Coins
- Displayed in gold color

The dashboard tracks both balances separately along with lifetime statistics.
        `,
      },
    },
  },
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
