import type { Meta, StoryObj } from '@storybook/react';
import { ChannelKBPanel } from './ChannelKBPanel';

const meta = {
  title: 'Activity/Organisms/ChannelKBPanel',
  component: ChannelKBPanel,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    guildId: { control: 'text' },
    apiBaseUrl: { control: 'text' },
  },
} satisfies Meta<typeof ChannelKBPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    guildId: '1234567890',
    apiBaseUrl: '',
  },
};

export const WithMockData: Story = {
  args: {
    guildId: '1234567890',
    apiBaseUrl: '',
  },
  parameters: {
    mockData: [
      {
        url: '/api/admin/guilds/1234567890/channel-kb',
        method: 'GET',
        status: 200,
        response: {
          sources: [
            {
              id: '1',
              guildId: '1234567890',
              channelId: '111',
              channelName: 'house-rules',
              channelType: 'forum',
              name: 'House Rules',
              description: 'Our custom D&D 5e house rules',
              category: 'rules',
              syncEnabled: true,
              syncThreads: true,
              syncPinned: true,
              maxMessages: 100,
              createdBy: 'user1',
              createdAt: new Date('2024-01-01'),
              updatedAt: new Date('2024-01-15'),
              lastSyncAt: new Date('2024-01-15T10:30:00'),
              lastSyncStatus: 'success',
              lastSyncError: null,
            },
            {
              id: '2',
              guildId: '1234567890',
              channelId: '222',
              channelName: 'session-notes',
              channelType: 'text',
              name: 'Session Notes',
              description: 'Notes from our campaign sessions',
              category: 'session-notes',
              syncEnabled: true,
              syncThreads: false,
              syncPinned: true,
              maxMessages: 200,
              createdBy: 'user1',
              createdAt: new Date('2024-01-02'),
              updatedAt: new Date('2024-01-14'),
              lastSyncAt: new Date('2024-01-14T18:00:00'),
              lastSyncStatus: 'success',
              lastSyncError: null,
            },
            {
              id: '3',
              guildId: '1234567890',
              channelId: '333',
              channelName: 'world-lore',
              channelType: 'forum',
              name: 'World Lore',
              description: 'Lore and background for our campaign world',
              category: 'lore',
              syncEnabled: false,
              syncThreads: true,
              syncPinned: true,
              maxMessages: 500,
              createdBy: 'user2',
              createdAt: new Date('2024-01-03'),
              updatedAt: new Date('2024-01-10'),
              lastSyncAt: new Date('2024-01-10T12:00:00'),
              lastSyncStatus: 'error',
              lastSyncError: 'Channel not accessible',
            },
          ],
          count: 3,
        },
      },
      {
        url: '/api/admin/guilds/1234567890/channels',
        method: 'GET',
        status: 200,
        response: {
          channels: [
            { id: '111', name: 'house-rules', type: 'forum', category: 'Campaign', isConfigured: true },
            { id: '222', name: 'session-notes', type: 'text', category: 'Campaign', isConfigured: true },
            { id: '333', name: 'world-lore', type: 'forum', category: 'Campaign', isConfigured: true },
            { id: '444', name: 'character-sheets', type: 'forum', category: 'Campaign', isConfigured: false },
            { id: '555', name: 'general', type: 'text', category: 'General', isConfigured: false },
            { id: '666', name: 'announcements', type: 'text', category: 'General', isConfigured: false },
          ],
          count: 6,
        },
      },
    ],
  },
};
