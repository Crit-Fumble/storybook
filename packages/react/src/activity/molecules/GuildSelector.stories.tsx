import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { GuildSelector } from './GuildSelector';
import type { Guild } from '@crit-fumble/core/types';

const meta: Meta<typeof GuildSelector> = {
  title: 'Activity/Molecules/GuildSelector',
  component: GuildSelector,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof GuildSelector>;

const sampleGuilds: Guild[] = [
  { id: '1', name: "Dragon's Lair Gaming", icon: null, owner: false, permissions: '0' },
  { id: '2', name: 'Critical Hit Club', icon: null, owner: true, permissions: '8' },
  { id: '3', name: 'Dice & Dragons', icon: null, owner: false, permissions: '0' },
];

export const Default: Story = {
  args: {
    guilds: sampleGuilds,
    selectedGuildId: null,
    onChange: () => {},
  },
};

export const WithSelection: Story = {
  args: {
    guilds: sampleGuilds,
    selectedGuildId: '2',
    onChange: () => {},
  },
};

export const Interactive: Story = {
  render: () => {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    return (
      <div>
        <GuildSelector
          guilds={sampleGuilds}
          selectedGuildId={selectedId}
          onChange={setSelectedId}
        />
        <p className="text-cfg-text-muted text-sm mt-2">
          Selected: {selectedId ? sampleGuilds.find(g => g.id === selectedId)?.name : 'None'}
        </p>
      </div>
    );
  },
};

export const SingleGuild: Story = {
  args: {
    guilds: [{ id: '1', name: 'My Only Server', icon: null, owner: true, permissions: '8' }],
    selectedGuildId: null,
    onChange: () => {},
  },
};

export const ManyGuilds: Story = {
  args: {
    guilds: [
      { id: '1', name: 'Server Alpha', icon: null, owner: false, permissions: '0' },
      { id: '2', name: 'Server Beta', icon: null, owner: true, permissions: '8' },
      { id: '3', name: 'Server Gamma', icon: null, owner: false, permissions: '0' },
      { id: '4', name: 'Server Delta', icon: null, owner: false, permissions: '0' },
      { id: '5', name: 'Server Epsilon', icon: null, owner: false, permissions: '0' },
      { id: '6', name: 'Server Zeta', icon: null, owner: false, permissions: '0' },
    ],
    selectedGuildId: null,
    onChange: () => {},
  },
};
