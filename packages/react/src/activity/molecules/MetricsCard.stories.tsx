import type { Meta, StoryObj } from '@storybook/react';
import { MetricsCard } from './MetricsCard';

const meta: Meta<typeof MetricsCard> = {
  title: 'FumbleBot/Admin/MetricsCard',
  component: MetricsCard,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="p-6 bg-discord-background-primary max-w-xs">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MetricsCard>;

const CommandIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

export const Default: Story = {
  args: {
    title: 'Commands Used',
    value: 1234,
    icon: <CommandIcon />,
  },
};

export const WithSubtitle: Story = {
  args: {
    title: 'Dice Rolls',
    value: 5678,
    subtitle: 'Avg: 10.5',
    icon: <CommandIcon />,
  },
};

export const WithTrendUp: Story = {
  args: {
    title: 'Active Users',
    value: 42,
    trend: {
      direction: 'up',
      value: '+12% from last week',
    },
    icon: <CommandIcon />,
  },
};

export const WithTrendDown: Story = {
  args: {
    title: 'Response Time',
    value: '250ms',
    trend: {
      direction: 'down',
      value: '-15% from last week',
    },
    icon: <CommandIcon />,
  },
};

export const Loading: Story = {
  args: {
    title: 'Commands Used',
    value: 0,
    isLoading: true,
  },
};

export const NoIcon: Story = {
  args: {
    title: 'Total Sessions',
    value: 89,
    subtitle: 'This month',
  },
};
