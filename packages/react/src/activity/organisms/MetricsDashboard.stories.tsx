import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MetricsDashboard } from './MetricsDashboard';
import type { MetricsData, MetricsPeriod } from './MetricsDashboard';

const meta: Meta<typeof MetricsDashboard> = {
  title: 'FumbleBot/Admin/MetricsDashboard',
  component: MetricsDashboard,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="p-6 bg-discord-background-primary min-h-[600px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MetricsDashboard>;

const sampleData: MetricsData = {
  commandUsage: {
    total: 12543,
    topCommands: [
      { command: 'roll', count: 4521 },
      { command: 'campaign', count: 2103 },
      { command: 'character', count: 1876 },
      { command: 'help', count: 1243 },
      { command: 'initiative', count: 987 },
      { command: 'npc', count: 654 },
      { command: 'loot', count: 432 },
      { command: 'spell', count: 321 },
      { command: 'monster', count: 234 },
      { command: 'session', count: 172 },
    ],
  },
  diceStats: {
    totalRolls: 45678,
    crits: 2312,
    fumbles: 2287,
    average: 10.47,
  },
  activeSessions: 7,
  activeCampaigns: 12,
  activeUsers: 89,
};

function InteractiveDashboard() {
  const [period, setPeriod] = useState<MetricsPeriod>('7d');

  return (
    <MetricsDashboard
      data={sampleData}
      period={period}
      onPeriodChange={setPeriod}
    />
  );
}

export const Default: Story = {
  render: () => <InteractiveDashboard />,
};

export const Loading: Story = {
  args: {
    period: '7d',
    onPeriodChange: () => {},
    isLoading: true,
  },
};

export const EmptyData: Story = {
  args: {
    data: {
      commandUsage: { total: 0, topCommands: [] },
      diceStats: { totalRolls: 0, crits: 0, fumbles: 0, average: 0 },
      activeSessions: 0,
      activeCampaigns: 0,
      activeUsers: 0,
    },
    period: '24h',
    onPeriodChange: () => {},
  },
};

export const HighActivity: Story = {
  args: {
    data: {
      commandUsage: {
        total: 125430,
        topCommands: [
          { command: 'roll', count: 45210 },
          { command: 'campaign', count: 21030 },
          { command: 'character', count: 18760 },
        ],
      },
      diceStats: {
        totalRolls: 456780,
        crits: 23120,
        fumbles: 22870,
        average: 10.52,
      },
      activeSessions: 42,
      activeCampaigns: 156,
      activeUsers: 1234,
    },
    period: '30d',
    onPeriodChange: () => {},
  },
};
