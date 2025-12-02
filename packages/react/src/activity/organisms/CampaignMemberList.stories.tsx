import type { Meta, StoryObj } from '@storybook/react';
import { CampaignMemberList } from './CampaignMemberList';

const meta = {
  title: 'Activity/Organisms/CampaignMemberList',
  component: CampaignMemberList,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    onRoleChange: { action: 'roleChanged' },
    onRemove: { action: 'removed' },
    onInvite: { action: 'invite' },
  },
} satisfies Meta<typeof CampaignMemberList>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockMembers = [
  {
    discordId: '1',
    username: 'DungeonMaster42',
    role: 'gm' as const,
    avatarUrl: 'https://i.pravatar.cc/150?u=gm1',
    joinedAt: '2024-01-01',
    foundryUserId: 'foundry-gm',
  },
  {
    discordId: '2',
    username: 'DragonSlayer',
    role: 'player' as const,
    avatarUrl: 'https://i.pravatar.cc/150?u=player1',
    joinedAt: '2024-01-15',
    foundryUserId: 'foundry-1',
  },
  {
    discordId: '3',
    username: 'MagicUser99',
    role: 'player' as const,
    avatarUrl: 'https://i.pravatar.cc/150?u=player2',
    joinedAt: '2024-01-20',
    foundryUserId: 'foundry-2',
  },
  {
    discordId: '4',
    username: 'RogueOne',
    role: 'player' as const,
    avatarUrl: 'https://i.pravatar.cc/150?u=player3',
    joinedAt: '2024-02-01',
  },
  {
    discordId: '5',
    username: 'HealerPrime',
    role: 'player' as const,
    avatarUrl: 'https://i.pravatar.cc/150?u=player4',
    joinedAt: '2024-02-10',
    foundryUserId: 'foundry-4',
  },
  {
    discordId: '6',
    username: 'SilentWatcher',
    role: 'spectator' as const,
    avatarUrl: 'https://i.pravatar.cc/150?u=spectator1',
    joinedAt: '2024-02-15',
  },
];

export const Default: Story = {
  args: {
    members: mockMembers,
  },
};

export const WithCurrentUser: Story = {
  args: {
    members: mockMembers,
    currentUserId: '3',
  },
};

export const WithManagement: Story = {
  args: {
    members: mockMembers,
    currentUserId: '1',
    canManage: true,
    onRoleChange: (discordId, newRole) => console.log(`Change ${discordId} to ${newRole}`),
    onRemove: (discordId) => console.log(`Remove ${discordId}`),
    onInvite: () => console.log('Invite clicked'),
  },
};

export const LoadingMember: Story = {
  args: {
    members: mockMembers,
    canManage: true,
    onRoleChange: () => {},
    onRemove: () => {},
    loadingMemberId: '3',
  },
};

export const EmptyState: Story = {
  args: {
    members: [],
    canManage: true,
    onInvite: () => console.log('Invite clicked'),
  },
};

export const OnlyGMs: Story = {
  args: {
    members: [
      {
        discordId: '1',
        username: 'MainGM',
        role: 'gm' as const,
        avatarUrl: 'https://i.pravatar.cc/150?u=gm1',
        joinedAt: '2024-01-01',
      },
      {
        discordId: '2',
        username: 'CoGM',
        role: 'gm' as const,
        avatarUrl: 'https://i.pravatar.cc/150?u=gm2',
        joinedAt: '2024-01-05',
      },
    ],
  },
};

export const OnlyPlayers: Story = {
  args: {
    members: mockMembers.filter((m) => m.role === 'player'),
  },
};

export const SingleMember: Story = {
  args: {
    members: [mockMembers[0]],
  },
};

export const LargeGroup: Story = {
  args: {
    members: [
      ...mockMembers,
      {
        discordId: '7',
        username: 'Player7',
        role: 'player' as const,
        avatarUrl: 'https://i.pravatar.cc/150?u=player7',
        joinedAt: '2024-03-01',
      },
      {
        discordId: '8',
        username: 'Player8',
        role: 'player' as const,
        avatarUrl: 'https://i.pravatar.cc/150?u=player8',
        joinedAt: '2024-03-05',
      },
      {
        discordId: '9',
        username: 'Spectator2',
        role: 'spectator' as const,
        avatarUrl: 'https://i.pravatar.cc/150?u=spectator2',
        joinedAt: '2024-03-10',
      },
    ],
  },
};
