import type { Meta, StoryObj } from '@storybook/react';
import { CampaignMemberCard } from './CampaignMemberCard';

const meta = {
  title: 'Activity/Molecules/CampaignMemberCard',
  component: CampaignMemberCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    role: {
      control: 'select',
      options: ['gm', 'player', 'spectator'],
    },
    onRoleChange: { action: 'roleChanged' },
    onRemove: { action: 'removed' },
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CampaignMemberCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GameMaster: Story = {
  args: {
    discordId: '123456789',
    username: 'DungeonMaster42',
    role: 'gm',
    avatarUrl: 'https://i.pravatar.cc/150?u=gm',
    joinedAt: '2024-01-15',
  },
};

export const Player: Story = {
  args: {
    discordId: '987654321',
    username: 'DragonSlayer',
    role: 'player',
    avatarUrl: 'https://i.pravatar.cc/150?u=player',
    joinedAt: '2024-02-20',
    foundryUserId: 'foundry-123',
  },
};

export const Spectator: Story = {
  args: {
    discordId: '555555555',
    username: 'SilentWatcher',
    role: 'spectator',
    avatarUrl: 'https://i.pravatar.cc/150?u=spectator',
    joinedAt: '2024-03-10',
  },
};

export const CurrentUser: Story = {
  args: {
    discordId: '111111111',
    username: 'YourUsername',
    role: 'player',
    avatarUrl: 'https://i.pravatar.cc/150?u=you',
    joinedAt: '2024-01-01',
    isCurrentUser: true,
  },
};

export const WithFoundryLink: Story = {
  args: {
    discordId: '222222222',
    username: 'LinkedPlayer',
    role: 'player',
    avatarUrl: 'https://i.pravatar.cc/150?u=linked',
    joinedAt: '2024-02-01',
    foundryUserId: 'foundry-user-abc',
  },
};

export const WithManagement: Story = {
  args: {
    discordId: '333333333',
    username: 'ManagedPlayer',
    role: 'player',
    avatarUrl: 'https://i.pravatar.cc/150?u=managed',
    joinedAt: '2024-02-15',
    canManage: true,
    onRoleChange: (newRole) => console.log('Role changed to:', newRole),
    onRemove: () => console.log('Remove clicked'),
  },
};

export const ManagementLoading: Story = {
  args: {
    discordId: '444444444',
    username: 'LoadingPlayer',
    role: 'player',
    avatarUrl: 'https://i.pravatar.cc/150?u=loading',
    canManage: true,
    onRoleChange: () => {},
    onRemove: () => {},
    isLoading: true,
  },
};

export const NoAvatar: Story = {
  args: {
    discordId: '666666666',
    username: 'NoAvatarUser',
    role: 'player',
    joinedAt: '2024-03-01',
  },
};

export const AllRoles: StoryObj<typeof CampaignMemberCard> = {
  render: () => (
    <div className="space-y-4 w-80">
      <CampaignMemberCard
        discordId="1"
        username="GameMaster"
        role="gm"
        avatarUrl="https://i.pravatar.cc/150?u=gm1"
        joinedAt="2024-01-01"
      />
      <CampaignMemberCard
        discordId="2"
        username="Player"
        role="player"
        avatarUrl="https://i.pravatar.cc/150?u=player1"
        joinedAt="2024-01-15"
        foundryUserId="linked"
      />
      <CampaignMemberCard
        discordId="3"
        username="Spectator"
        role="spectator"
        avatarUrl="https://i.pravatar.cc/150?u=spectator1"
        joinedAt="2024-02-01"
      />
    </div>
  ),
};
