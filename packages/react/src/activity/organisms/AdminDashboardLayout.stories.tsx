import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AdminDashboardLayout } from './AdminDashboardLayout';
import { MetricsDashboard } from './MetricsDashboard';
import { PromptPartialList } from './PromptPartialList';
import { ActivityFeed } from './ActivityFeed';
import { AdminSettingsPanel } from './AdminSettingsPanel';
import type { MetricsData, MetricsPeriod } from './MetricsDashboard';
import type { PromptPartial } from '../molecules/PromptPartialCard';
import type { ActivityItem } from './ActivityFeed';
import type { AdminSettings } from './AdminSettingsPanel';

const meta: Meta<typeof AdminDashboardLayout> = {
  title: 'FumbleBot/Admin/AdminDashboardLayout',
  component: AdminDashboardLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof AdminDashboardLayout>;

// Sample data
const sampleMetrics: MetricsData = {
  commandUsage: {
    total: 12543,
    topCommands: [
      { command: 'roll', count: 4521 },
      { command: 'campaign', count: 2103 },
      { command: 'character', count: 1876 },
      { command: 'help', count: 1243 },
      { command: 'initiative', count: 987 },
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

const samplePartials: PromptPartial[] = [
  {
    id: '1',
    name: 'Fantasy RPG Style',
    targetType: 'channel',
    targetId: 'ch-1',
    targetName: 'game-room',
    content: 'You are a helpful fantasy game master.',
    priority: 10,
    isEnabled: true,
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-15'),
  },
  {
    id: '2',
    name: 'DM Instructions',
    targetType: 'role',
    targetId: 'role-1',
    targetName: 'Dungeon Master',
    content: 'Provide DM-specific guidance.',
    priority: 20,
    isEnabled: true,
    createdAt: new Date('2024-03-05'),
    updatedAt: new Date('2024-03-16'),
  },
];

const now = new Date();
const minutesAgo = (mins: number) => new Date(now.getTime() - mins * 60000);

const sampleActivities: ActivityItem[] = [
  {
    id: '1',
    type: 'dice_roll',
    userId: 'user-1',
    username: 'DungeonMaster42',
    channelId: 'ch-1',
    channelName: 'game-room',
    data: { expression: '1d20+5', result: 18 },
    timestamp: minutesAgo(2),
  },
  {
    id: '2',
    type: 'command',
    userId: 'user-2',
    username: 'PlayerOne',
    channelId: 'ch-1',
    channelName: 'game-room',
    data: { command: 'roll' },
    timestamp: minutesAgo(5),
  },
  {
    id: '3',
    type: 'session_start',
    userId: 'user-1',
    username: 'DungeonMaster42',
    channelId: 'ch-2',
    channelName: 'campaign-chat',
    data: { campaignName: 'Curse of Strahd' },
    timestamp: minutesAgo(30),
  },
];

const defaultSettings: AdminSettings = {
  botEnabled: true,
  aiEnabled: true,
  diceEnabled: true,
  defaultSystemPrompt: 'You are a helpful tabletop RPG assistant.',
  maxMessageLength: 2000,
  cooldownSeconds: 5,
  allowedChannelIds: [],
  blockedUserIds: [],
};

// Interactive full dashboard
function InteractiveDashboard() {
  const [period, setPeriod] = useState<MetricsPeriod>('7d');
  const [settings, setSettings] = useState<AdminSettings>(defaultSettings);

  return (
    <AdminDashboardLayout
      serverName="Adventurer's Guild"
      serverIcon="https://cdn.discordapp.com/embed/avatars/0.png"
      onBack={() => alert('Go back')}
      dashboardContent={
        <MetricsDashboard
          data={sampleMetrics}
          period={period}
          onPeriodChange={setPeriod}
        />
      }
      promptsContent={
        <PromptPartialList
          partials={samplePartials}
          onSelect={(p) => alert(`Selected: ${p.name}`)}
          onToggleEnabled={(p, e) => alert(`${p.name}: ${e}`)}
          onDelete={(p) => alert(`Delete: ${p.name}`)}
          onCreate={() => alert('Create new')}
        />
      }
      activityContent={
        <ActivityFeed
          activities={sampleActivities}
          hasMore={true}
          onLoadMore={() => alert('Load more')}
        />
      }
      settingsContent={
        <AdminSettingsPanel
          settings={settings}
          channels={[
            { id: 'ch-1', name: 'general' },
            { id: 'ch-2', name: 'game-room' },
          ]}
          onSave={setSettings}
        />
      }
    />
  );
}

export const Default: Story = {
  render: () => <InteractiveDashboard />,
};

export const DashboardTab: Story = {
  args: {
    serverName: 'Test Server',
    initialTab: 'dashboard',
    onBack: () => {},
    dashboardContent: (
      <MetricsDashboard
        data={sampleMetrics}
        period="7d"
        onPeriodChange={() => {}}
      />
    ),
    promptsContent: <div>Prompts</div>,
    activityContent: <div>Activity</div>,
    settingsContent: <div>Settings</div>,
  },
};

export const PromptsTab: Story = {
  args: {
    serverName: 'Test Server',
    initialTab: 'prompts',
    onBack: () => {},
    dashboardContent: <div>Dashboard</div>,
    promptsContent: (
      <PromptPartialList
        partials={samplePartials}
        onCreate={() => {}}
      />
    ),
    activityContent: <div>Activity</div>,
    settingsContent: <div>Settings</div>,
  },
};

export const ActivityTab: Story = {
  args: {
    serverName: 'Test Server',
    initialTab: 'activity',
    onBack: () => {},
    dashboardContent: <div>Dashboard</div>,
    promptsContent: <div>Prompts</div>,
    activityContent: <ActivityFeed activities={sampleActivities} />,
    settingsContent: <div>Settings</div>,
  },
};

export const SettingsTab: Story = {
  args: {
    serverName: 'Test Server',
    initialTab: 'settings',
    onBack: () => {},
    dashboardContent: <div>Dashboard</div>,
    promptsContent: <div>Prompts</div>,
    activityContent: <div>Activity</div>,
    settingsContent: (
      <AdminSettingsPanel
        settings={defaultSettings}
        channels={[]}
        onSave={() => {}}
      />
    ),
  },
};

export const NoBackButton: Story = {
  args: {
    serverName: 'Standalone View',
    dashboardContent: <div className="text-discord-text-normal">Dashboard content here</div>,
    promptsContent: <div>Prompts</div>,
    activityContent: <div>Activity</div>,
    settingsContent: <div>Settings</div>,
  },
};

export const LongServerName: Story = {
  args: {
    serverName: 'The Ultimate Tabletop Gaming Community Server',
    onBack: () => {},
    dashboardContent: <div>Dashboard</div>,
    promptsContent: <div>Prompts</div>,
    activityContent: <div>Activity</div>,
    settingsContent: <div>Settings</div>,
  },
};
