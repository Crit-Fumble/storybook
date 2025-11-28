import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { GuildSelector } from './GuildSelector';

const meta: Meta<typeof GuildSelector> = {
  title: 'Activity/Molecules/GuildSelector',
  component: GuildSelector,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof GuildSelector>;

const sampleGuilds = [
  { id: '1', name: 'Dragon\'s Lair Gaming' },
  { id: '2', name: 'Critical Hit Club' },
  { id: '3', name: 'Dice & Dragons' },
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
        <p className="text-discord-text-muted text-sm mt-2">
          Selected: {selectedId ? sampleGuilds.find(g => g.id === selectedId)?.name : 'None'}
        </p>
      </div>
    );
  },
};

export const SingleGuild: Story = {
  args: {
    guilds: [{ id: '1', name: 'My Only Server' }],
    selectedGuildId: null,
    onChange: () => {},
  },
};

export const ManyGuilds: Story = {
  args: {
    guilds: [
      { id: '1', name: 'Server Alpha' },
      { id: '2', name: 'Server Beta' },
      { id: '3', name: 'Server Gamma' },
      { id: '4', name: 'Server Delta' },
      { id: '5', name: 'Server Epsilon' },
      { id: '6', name: 'Server Zeta' },
    ],
    selectedGuildId: null,
    onChange: () => {},
  },
};
