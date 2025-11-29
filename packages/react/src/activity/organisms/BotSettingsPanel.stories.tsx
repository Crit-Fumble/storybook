import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BotSettingsPanel } from './BotSettingsPanel';
import type { BotSettings } from '../types';

const meta: Meta<typeof BotSettingsPanel> = {
  title: 'FumbleBot/Settings/BotSettingsPanel',
  component: BotSettingsPanel,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="p-6 bg-discord-background-primary min-h-[600px] max-w-2xl">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof BotSettingsPanel>;

const defaultSettings: BotSettings = {
  autoLogIC: true,
  defaultMode: 'ic',
  diceNotify: true,
  autoSession: false,
  reminderTime: 60,
};

export const Default: Story = {
  args: {
    settings: defaultSettings,
    onChange: () => {},
    onSave: () => {},
    onReset: () => {},
  },
};

export const AllEnabled: Story = {
  args: {
    settings: {
      autoLogIC: true,
      defaultMode: 'ooc',
      diceNotify: true,
      autoSession: true,
      reminderTime: 30,
    },
    onChange: () => {},
    onSave: () => {},
    onReset: () => {},
  },
};

export const Saving: Story = {
  args: {
    settings: defaultSettings,
    onChange: () => {},
    onSave: () => {},
    onReset: () => {},
    isSaving: true,
  },
};

// Interactive story with state
function InteractiveBotSettings() {
  const [settings, setSettings] = useState<BotSettings>(defaultSettings);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('Settings saved!');
    }, 1500);
  };

  const handleReset = () => {
    setSettings(defaultSettings);
  };

  return (
    <BotSettingsPanel
      settings={settings}
      onChange={setSettings}
      onSave={handleSave}
      onReset={handleReset}
      isSaving={isSaving}
    />
  );
}

export const Interactive: Story = {
  render: () => <InteractiveBotSettings />,
};
