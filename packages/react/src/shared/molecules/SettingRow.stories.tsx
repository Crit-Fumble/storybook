import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SettingRow, SettingToggleRow, SettingSelectRow } from './SettingRow';
import { Button } from '../atoms';

const meta: Meta<typeof SettingRow> = {
  title: 'Shared/Molecules/SettingRow',
  component: SettingRow,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SettingRow>;

export const Basic: Story = {
  args: {
    label: 'Setting Label',
    description: 'A description of what this setting does.',
    children: <Button size="sm">Action</Button>,
  },
};

export const WithToggle: Story = {
  render: () => {
    const [enabled, setEnabled] = useState(false);
    return (
      <SettingToggleRow
        label="Enable Notifications"
        description="Receive notifications when players join your campaign."
        checked={enabled}
        onChange={setEnabled}
      />
    );
  },
};

export const WithSelect: Story = {
  render: () => {
    const [value, setValue] = useState('medium');
    return (
      <SettingSelectRow
        label="Dice Roll Visibility"
        description="Choose who can see dice rolls."
        value={value}
        onChange={setValue}
        options={[
          { value: 'all', label: 'Everyone' },
          { value: 'medium', label: 'GM and Player' },
          { value: 'private', label: 'GM Only' },
        ]}
      />
    );
  },
};

export const SettingsGroup: Story = {
  render: () => {
    const [notifications, setNotifications] = useState(true);
    const [sounds, setSounds] = useState(false);
    const [theme, setTheme] = useState('dark');

    return (
      <div className="space-y-2">
        <SettingToggleRow
          label="Push Notifications"
          description="Enable push notifications for important events."
          checked={notifications}
          onChange={setNotifications}
        />
        <SettingToggleRow
          label="Sound Effects"
          description="Play sounds for dice rolls and events."
          checked={sounds}
          onChange={setSounds}
        />
        <SettingSelectRow
          label="Theme"
          description="Choose your preferred color theme."
          value={theme}
          onChange={setTheme}
          options={[
            { value: 'dark', label: 'Dark' },
            { value: 'light', label: 'Light' },
            { value: 'auto', label: 'System' },
          ]}
        />
      </div>
    );
  },
};
