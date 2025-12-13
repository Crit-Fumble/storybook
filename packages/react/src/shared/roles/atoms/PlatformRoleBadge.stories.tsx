import type { Meta, StoryObj } from '@storybook/react';
import { PlatformRoleBadge } from './PlatformRoleBadge';
import { getAllPlatformRoles } from '../types';

const meta: Meta<typeof PlatformRoleBadge> = {
  title: 'Shared/Roles/PlatformRoleBadge',
  component: PlatformRoleBadge,
  tags: ['autodocs'],
  argTypes: {
    role: {
      control: 'select',
      options: ['gamer', 'player', 'trusted_player', 'game_master', 'assistant_gm', 'spectator', 'storyteller', 'worldbuilder', 'creator', 'developer', 'admin'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof PlatformRoleBadge>;

export const Default: Story = {
  args: {
    role: 'player',
  },
};

export const Gamer: Story = {
  args: {
    role: 'gamer',
  },
};

export const Player: Story = {
  args: {
    role: 'player',
  },
};

export const TrustedPlayer: Story = {
  args: {
    role: 'trusted_player',
  },
};

export const GameMaster: Story = {
  args: {
    role: 'game_master',
  },
};

export const AssistantGM: Story = {
  args: {
    role: 'assistant_gm',
  },
};

export const Spectator: Story = {
  args: {
    role: 'spectator',
  },
};

export const Storyteller: Story = {
  args: {
    role: 'storyteller',
  },
};

export const Worldbuilder: Story = {
  args: {
    role: 'worldbuilder',
  },
};

export const Creator: Story = {
  args: {
    role: 'creator',
  },
};

export const Developer: Story = {
  args: {
    role: 'developer',
  },
};

export const Admin: Story = {
  args: {
    role: 'admin',
  },
};

export const SmallSize: Story = {
  args: {
    role: 'game_master',
    size: 'sm',
  },
};

export const MediumSize: Story = {
  args: {
    role: 'game_master',
    size: 'md',
  },
};

export const LargeSize: Story = {
  args: {
    role: 'game_master',
    size: 'lg',
  },
};

export const IconOnly: Story = {
  args: {
    role: 'admin',
    showLabel: false,
    showIcon: true,
  },
};

export const LabelOnly: Story = {
  args: {
    role: 'admin',
    showLabel: true,
    showIcon: false,
  },
};

export const AllRoles: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      {getAllPlatformRoles().map((config) => (
        <PlatformRoleBadge key={config.key} role={config.key} />
      ))}
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <PlatformRoleBadge role="game_master" size="sm" />
      <PlatformRoleBadge role="game_master" size="md" />
      <PlatformRoleBadge role="game_master" size="lg" />
    </div>
  ),
};

export const DisplayVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <span className="text-cfg-text-muted w-24">Icon + Label:</span>
        <PlatformRoleBadge role="creator" showIcon showLabel />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-cfg-text-muted w-24">Icon only:</span>
        <PlatformRoleBadge role="creator" showIcon showLabel={false} />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-cfg-text-muted w-24">Label only:</span>
        <PlatformRoleBadge role="creator" showIcon={false} showLabel />
      </div>
    </div>
  ),
};
