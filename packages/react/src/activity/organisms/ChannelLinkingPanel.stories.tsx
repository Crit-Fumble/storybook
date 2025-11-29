import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ChannelLinkingPanel } from './ChannelLinkingPanel';
import type { ChannelLinks, DiscordChannel } from '../types';

const meta: Meta<typeof ChannelLinkingPanel> = {
  title: 'FumbleBot/Settings/ChannelLinkingPanel',
  component: ChannelLinkingPanel,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="p-6 bg-discord-background-primary min-h-[700px] max-w-3xl">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ChannelLinkingPanel>;

const sampleChannels: DiscordChannel[] = [
  { id: '1', name: 'general', type: 0 },
  { id: '2', name: 'in-character', type: 0 },
  { id: '3', name: 'out-of-character', type: 0 },
  { id: '4', name: 'dice-rolls', type: 0 },
  { id: '5', name: 'gm-notes', type: 0 },
  { id: '6', name: 'announcements', type: 0 },
  { id: '7', name: 'Voice Lobby', type: 2 },
  { id: '8', name: 'Game Table', type: 2 },
];

const emptyLinks: ChannelLinks = {
  ic: '',
  ooc: '',
  dice: '',
  gm: '',
  announce: '',
  voice: '',
};

const partialLinks: ChannelLinks = {
  ic: '2',
  ooc: '3',
  dice: '',
  gm: '',
  announce: '',
  voice: '',
};

const fullLinks: ChannelLinks = {
  ic: '2',
  ooc: '3',
  dice: '4',
  gm: '5',
  announce: '6',
  voice: '8',
};

export const Empty: Story = {
  args: {
    channelLinks: emptyLinks,
    channels: sampleChannels,
    onChange: () => {},
    onSave: () => {},
  },
};

export const PartiallyLinked: Story = {
  args: {
    channelLinks: partialLinks,
    channels: sampleChannels,
    onChange: () => {},
    onSave: () => {},
  },
};

export const FullyLinked: Story = {
  args: {
    channelLinks: fullLinks,
    channels: sampleChannels,
    onChange: () => {},
    onSave: () => {},
  },
};

export const WithRefresh: Story = {
  args: {
    channelLinks: partialLinks,
    channels: sampleChannels,
    onChange: () => {},
    onSave: () => {},
    onRefresh: () => alert('Refreshing channels...'),
  },
};

export const Saving: Story = {
  args: {
    channelLinks: fullLinks,
    channels: sampleChannels,
    onChange: () => {},
    onSave: () => {},
    isSaving: true,
  },
};

export const NoChannels: Story = {
  args: {
    channelLinks: emptyLinks,
    channels: [],
    onChange: () => {},
    onSave: () => {},
  },
};

// Interactive story
function InteractiveChannelLinking() {
  const [links, setLinks] = useState<ChannelLinks>(partialLinks);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('Channel links saved!');
    }, 1500);
  };

  return (
    <ChannelLinkingPanel
      channelLinks={links}
      channels={sampleChannels}
      onChange={setLinks}
      onSave={handleSave}
      onRefresh={() => alert('Refreshing channels...')}
      isSaving={isSaving}
    />
  );
}

export const Interactive: Story = {
  render: () => <InteractiveChannelLinking />,
};
