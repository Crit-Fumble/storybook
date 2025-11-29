import type { Meta, StoryObj } from '@storybook/react';
import { SessionMessageList } from './SessionMessageList';
import type { SessionMessage } from '@crit-fumble/core/types';

const meta: Meta<typeof SessionMessageList> = {
  title: 'FumbleBot/Sessions/SessionMessageList',
  component: SessionMessageList,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="p-6 bg-discord-background-primary max-w-2xl">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SessionMessageList>;

const now = new Date();
const minutesAgo = (mins: number) => new Date(now.getTime() - mins * 60000);

const sampleMessages: SessionMessage[] = [
  {
    id: '1',
    sessionId: 'session-1',
    discordId: 'user-1',
    characterId: 'char-1',
    content: 'I approach the tavern door cautiously, hand on my sword hilt.',
    messageType: 'ic',
    discordMessageId: null,
    timestamp: minutesAgo(1),
  },
  {
    id: '2',
    sessionId: 'session-1',
    discordId: 'user-2',
    characterId: null,
    content: 'The door creaks open, revealing a dimly lit interior...',
    messageType: 'narration',
    discordMessageId: null,
    timestamp: minutesAgo(2),
  },
  {
    id: '3',
    sessionId: 'session-1',
    discordId: 'user-1',
    characterId: null,
    content: 'Do I see anyone inside?',
    messageType: 'ooc',
    discordMessageId: null,
    timestamp: minutesAgo(3),
  },
  {
    id: '4',
    sessionId: 'session-1',
    discordId: 'user-1',
    characterId: 'char-1',
    content: '1d20+5 = 18 (Perception)',
    messageType: 'roll',
    discordMessageId: null,
    timestamp: minutesAgo(4),
  },
  {
    id: '5',
    sessionId: 'session-1',
    discordId: 'user-2',
    characterId: null,
    content: 'Session started. Welcome to the Curse of Strahd!',
    messageType: 'system',
    discordMessageId: null,
    timestamp: minutesAgo(30),
  },
];

const characterNames: Record<string, string> = {
  'char-1': 'Thorin Ironforge',
};

const userNames: Record<string, string> = {
  'user-1': 'DungeonMaster42',
  'user-2': 'Game Master',
};

export const Default: Story = {
  args: {
    messages: sampleMessages,
    characterNames,
    userNames,
  },
};

export const Loading: Story = {
  args: {
    messages: [],
    isLoading: true,
  },
};

export const Empty: Story = {
  args: {
    messages: [],
  },
};

export const WithLoadMore: Story = {
  args: {
    messages: sampleMessages.slice(0, 3),
    characterNames,
    userNames,
    hasMore: true,
    onLoadMore: () => alert('Load more clicked'),
  },
};

export const LoadingMore: Story = {
  args: {
    messages: sampleMessages.slice(0, 3),
    characterNames,
    userNames,
    hasMore: true,
    isLoading: true,
    onLoadMore: () => {},
  },
};

export const OnlyIC: Story = {
  args: {
    messages: sampleMessages.filter((m) => m.messageType === 'ic'),
    characterNames,
    userNames,
  },
};

export const MixedTypes: Story = {
  args: {
    messages: sampleMessages,
    characterNames,
    userNames,
  },
};
