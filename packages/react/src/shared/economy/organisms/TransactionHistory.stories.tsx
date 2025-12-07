import type { Meta, StoryObj } from '@storybook/react';
import { TransactionHistory } from './TransactionHistory';
import { CritCoin } from '../atoms/CritCoin';
import { StoryCredit } from '../atoms/StoryCredit';

const meta: Meta<typeof TransactionHistory> = {
  title: 'Shared/Economy/Organisms/TransactionHistory',
  component: TransactionHistory,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TransactionHistory>;

const sampleTransactions = [
  {
    id: '1',
    type: 'tip_received' as const,
    amount: 25,
    currency: 'crit-coins' as const,
    currencyIcon: <CritCoin size="sm" />,
    description: 'Tip from player for great session',
    timestamp: new Date('2024-12-01T10:30:00'),
    from: 'PlayerJohn',
    status: 'completed' as const,
  },
  {
    id: '2',
    type: 'earned' as const,
    amount: 100,
    currency: 'crit-coins' as const,
    currencyIcon: <CritCoin size="sm" />,
    description: 'Monthly subscription payment',
    timestamp: new Date('2024-12-01T00:00:00'),
    status: 'completed' as const,
  },
  {
    id: '3',
    type: 'tip_sent' as const,
    amount: 10,
    currency: 'crit-coins' as const,
    currencyIcon: <CritCoin size="sm" />,
    description: 'Tipped amazing dungeon master',
    timestamp: new Date('2024-11-30T15:45:00'),
    to: 'DMSarah',
    status: 'completed' as const,
  },
  {
    id: '4',
    type: 'purchase' as const,
    amount: 5,
    currency: 'story-credits' as const,
    currencyIcon: <StoryCredit size="sm" />,
    description: 'Purchased adventure module',
    timestamp: new Date('2024-11-29T12:00:00'),
    status: 'completed' as const,
  },
  {
    id: '5',
    type: 'payout' as const,
    amount: 500,
    currency: 'crit-coins' as const,
    currencyIcon: <CritCoin size="sm" />,
    description: 'Payout to PayPal',
    timestamp: new Date('2024-11-28T09:00:00'),
    status: 'pending' as const,
  },
];

export const Default: Story = {
  args: {
    transactions: sampleTransactions,
  },
};

export const Empty: Story = {
  args: {
    transactions: [],
  },
};

export const Loading: Story = {
  args: {
    transactions: [],
    isLoading: true,
  },
};

export const SingleTransaction: Story = {
  args: {
    transactions: [sampleTransactions[0]],
  },
};
