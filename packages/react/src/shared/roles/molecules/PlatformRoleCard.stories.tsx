import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { PlatformRoleCard } from './PlatformRoleCard';
import { getAllPlatformRoles } from '../types';

const meta: Meta<typeof PlatformRoleCard> = {
  title: 'Shared/Roles/PlatformRoleCard',
  component: PlatformRoleCard,
  tags: ['autodocs'],
  argTypes: {
    role: {
      control: 'select',
      options: ['gamer', 'player', 'trusted_player', 'game_master', 'assistant_gm', 'spectator', 'storyteller', 'worldbuilder', 'creator', 'developer', 'admin'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof PlatformRoleCard>;

export const Default: Story = {
  args: {
    role: 'player',
  },
};

export const Selected: Story = {
  args: {
    role: 'game_master',
    selected: true,
  },
};

export const Disabled: Story = {
  args: {
    role: 'admin',
    disabled: true,
  },
};

export const Compact: Story = {
  args: {
    role: 'creator',
    compact: true,
  },
};

export const CompactSelected: Story = {
  args: {
    role: 'creator',
    compact: true,
    selected: true,
  },
};

export const Interactive: Story = {
  render: function InteractiveCard() {
    const [selected, setSelected] = useState(false);
    return (
      <PlatformRoleCard
        role="developer"
        selected={selected}
        onClick={() => setSelected(!selected)}
      />
    );
  },
};

export const AllRoles: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
      {getAllPlatformRoles().map((config) => (
        <PlatformRoleCard key={config.key} role={config.key} />
      ))}
    </div>
  ),
};

export const AllRolesCompact: Story = {
  render: () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-w-4xl">
      {getAllPlatformRoles().map((config) => (
        <PlatformRoleCard key={config.key} role={config.key} compact />
      ))}
    </div>
  ),
};

export const SelectionExample: Story = {
  render: function SelectionDemo() {
    const [selectedRoles, setSelectedRoles] = useState<string[]>(['player']);
    const roles = getAllPlatformRoles();

    const toggleRole = (roleKey: string) => {
      setSelectedRoles(prev =>
        prev.includes(roleKey)
          ? prev.filter(r => r !== roleKey)
          : [...prev, roleKey]
      );
    };

    return (
      <div className="space-y-4">
        <p className="text-cfg-text-muted">
          Selected: {selectedRoles.length > 0 ? selectedRoles.join(', ') : 'None'}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
          {roles.map((config) => (
            <PlatformRoleCard
              key={config.key}
              role={config.key}
              selected={selectedRoles.includes(config.key)}
              onClick={() => toggleRole(config.key)}
            />
          ))}
        </div>
      </div>
    );
  },
};

export const StateComparison: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <div>
        <h3 className="text-cfg-text-muted mb-2">Normal</h3>
        <PlatformRoleCard role="storyteller" />
      </div>
      <div>
        <h3 className="text-cfg-text-muted mb-2">Selected</h3>
        <PlatformRoleCard role="storyteller" selected />
      </div>
      <div>
        <h3 className="text-cfg-text-muted mb-2">Disabled</h3>
        <PlatformRoleCard role="storyteller" disabled />
      </div>
      <div>
        <h3 className="text-cfg-text-muted mb-2">Compact</h3>
        <PlatformRoleCard role="storyteller" compact />
      </div>
      <div>
        <h3 className="text-cfg-text-muted mb-2">Compact Selected</h3>
        <PlatformRoleCard role="storyteller" compact selected />
      </div>
    </div>
  ),
};
