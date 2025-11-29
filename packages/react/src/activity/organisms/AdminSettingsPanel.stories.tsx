import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AdminSettingsPanel } from './AdminSettingsPanel';
import type { AdminSettings, ChannelOption } from './AdminSettingsPanel';

const meta: Meta<typeof AdminSettingsPanel> = {
  title: 'FumbleBot/Admin/AdminSettingsPanel',
  component: AdminSettingsPanel,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="p-6 bg-discord-background-primary min-h-[800px] max-w-2xl">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AdminSettingsPanel>;

const defaultSettings: AdminSettings = {
  botEnabled: true,
  aiEnabled: true,
  diceEnabled: true,
  defaultSystemPrompt: 'You are a helpful tabletop RPG assistant. Help players with rules questions, dice rolling, and campaign management.',
  maxMessageLength: 2000,
  cooldownSeconds: 5,
  allowedChannelIds: [],
  blockedUserIds: [],
};

const sampleChannels: ChannelOption[] = [
  { id: 'ch-1', name: 'general' },
  { id: 'ch-2', name: 'game-room' },
  { id: 'ch-3', name: 'dice-rolling' },
  { id: 'ch-4', name: 'campaign-chat' },
  { id: 'ch-5', name: 'off-topic' },
];

function InteractiveSettings() {
  const [settings, setSettings] = useState<AdminSettings>(defaultSettings);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (newSettings: AdminSettings) => {
    setIsSaving(true);
    setTimeout(() => {
      setSettings(newSettings);
      setIsSaving(false);
      alert('Settings saved!');
    }, 1000);
  };

  return (
    <AdminSettingsPanel
      settings={settings}
      channels={sampleChannels}
      onSave={handleSave}
      isSaving={isSaving}
    />
  );
}

export const Default: Story = {
  render: () => <InteractiveSettings />,
};

export const AllFeaturesDisabled: Story = {
  args: {
    settings: {
      ...defaultSettings,
      botEnabled: false,
      aiEnabled: false,
      diceEnabled: false,
    },
    channels: sampleChannels,
    onSave: () => {},
  },
};

export const WithChannelRestrictions: Story = {
  args: {
    settings: {
      ...defaultSettings,
      allowedChannelIds: ['ch-2', 'ch-3'],
    },
    channels: sampleChannels,
    onSave: () => {},
  },
};

export const HighRateLimits: Story = {
  args: {
    settings: {
      ...defaultSettings,
      cooldownSeconds: 30,
      maxMessageLength: 500,
    },
    channels: sampleChannels,
    onSave: () => {},
  },
};

export const Saving: Story = {
  args: {
    settings: defaultSettings,
    channels: sampleChannels,
    onSave: () => {},
    isSaving: true,
  },
};

export const NoChannels: Story = {
  args: {
    settings: defaultSettings,
    channels: [],
    onSave: () => {},
  },
};
