import type { Meta, StoryObj } from '@storybook/react';
import { CharacterCard } from './CharacterCard';

const meta = {
  title: 'Activity/Molecules/CharacterCard',
  component: CharacterCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['pc', 'npc', 'familiar', 'companion', 'monster'],
    },
    onClick: { action: 'clicked' },
    onEdit: { action: 'edit' },
    onDelete: { action: 'delete' },
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CharacterCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PlayerCharacter: Story = {
  args: {
    name: 'Thorin Ironforge',
    type: 'pc',
    ownerName: 'John',
    avatarUrl: 'https://i.pravatar.cc/150?u=thorin',
    isActive: true,
    lastSyncedAt: new Date(Date.now() - 5 * 60000),
  },
};

export const NPC: Story = {
  args: {
    name: 'Galadriel the Wise',
    type: 'npc',
    avatarUrl: 'https://i.pravatar.cc/150?u=galadriel',
    isActive: true,
    lastSyncedAt: new Date(Date.now() - 2 * 3600000),
  },
};

export const Familiar: Story = {
  args: {
    name: 'Shadow',
    type: 'familiar',
    ownerName: 'Sarah',
    avatarUrl: 'https://i.pravatar.cc/150?u=shadow',
    isActive: true,
  },
};

export const Companion: Story = {
  args: {
    name: 'Barkley',
    type: 'companion',
    ownerName: 'Mike',
    isActive: true,
  },
};

export const Monster: Story = {
  args: {
    name: 'Ancient Red Dragon',
    type: 'monster',
    isActive: true,
  },
};

export const RetiredCharacter: Story = {
  args: {
    name: 'Sir Reginald',
    type: 'pc',
    ownerName: 'Tom',
    avatarUrl: 'https://i.pravatar.cc/150?u=reginald',
    isActive: false,
    isRetired: true,
    lastSyncedAt: new Date(Date.now() - 30 * 86400000),
  },
};

export const InactiveCharacter: Story = {
  args: {
    name: 'Elara Moonwhisper',
    type: 'pc',
    ownerName: 'Emily',
    isActive: false,
    lastSyncedAt: new Date(Date.now() - 7 * 86400000),
  },
};

export const WithActions: Story = {
  args: {
    name: 'Ragnar Blackmane',
    type: 'pc',
    ownerName: 'Dave',
    avatarUrl: 'https://i.pravatar.cc/150?u=ragnar',
    isActive: true,
    onEdit: () => console.log('Edit clicked'),
    onDelete: () => console.log('Delete clicked'),
  },
};

export const Clickable: Story = {
  args: {
    name: 'Clickable Character',
    type: 'pc',
    ownerName: 'User',
    isActive: true,
    onClick: () => console.log('Card clicked'),
  },
};

export const Loading: Story = {
  args: {
    name: 'Loading Character',
    type: 'pc',
    ownerName: 'User',
    isActive: true,
    onEdit: () => {},
    onDelete: () => {},
    isLoading: true,
  },
};

export const NoAvatar: Story = {
  args: {
    name: 'Mystery Figure',
    type: 'npc',
    isActive: true,
  },
};

export const AllTypes: StoryObj<typeof CharacterCard> = {
  render: () => (
    <div className="space-y-4 w-80">
      <CharacterCard name="Player Character" type="pc" ownerName="Player" isActive />
      <CharacterCard name="Non-Player Character" type="npc" isActive />
      <CharacterCard name="Wizard's Familiar" type="familiar" ownerName="Wizard" isActive />
      <CharacterCard name="Animal Companion" type="companion" ownerName="Ranger" isActive />
      <CharacterCard name="Goblin Boss" type="monster" isActive />
    </div>
  ),
};
