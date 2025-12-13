import type { Meta, StoryObj } from '@storybook/react';
import { UserCampaignRole } from './UserCampaignRole';
import type { PlatformRole, CampaignEligibleRole } from '../types';

const meta: Meta<typeof UserCampaignRole> = {
  title: 'Shared/Roles/UserCampaignRole',
  component: UserCampaignRole,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    assumedRole: {
      control: 'select',
      options: ['game_master', 'assistant_gm', 'trusted_player', 'player', 'spectator'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof UserCampaignRole>;

export const Default: Story = {
  args: {
    userName: 'John Doe',
    assumedRole: 'player',
  },
};

export const GameMaster: Story = {
  args: {
    userName: 'Sarah GM',
    assumedRole: 'game_master',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
  },
};

export const TrustedPlayer: Story = {
  args: {
    userName: 'Mike Veteran',
    assumedRole: 'trusted_player',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
  },
};

export const Spectator: Story = {
  args: {
    userName: 'Watcher123',
    assumedRole: 'spectator',
  },
};

export const WithOwnedRoles: Story = {
  args: {
    userName: 'Alice Multi',
    assumedRole: 'game_master',
    ownedRoles: ['admin', 'game_master', 'player', 'creator', 'storyteller'],
    showOwnedRoles: true,
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
  },
};

export const Online: Story = {
  args: {
    userName: 'Active Player',
    assumedRole: 'player',
    isActive: true,
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Active',
  },
};

export const Offline: Story = {
  args: {
    userName: 'Away Player',
    assumedRole: 'player',
    isActive: false,
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Away',
  },
};

export const SmallSize: Story = {
  args: {
    userName: 'Small User',
    assumedRole: 'player',
    size: 'sm',
  },
};

export const LargeSize: Story = {
  args: {
    userName: 'Large User',
    assumedRole: 'game_master',
    size: 'lg',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Large',
  },
};

export const Interactive: Story = {
  args: {
    userName: 'Clickable User',
    assumedRole: 'assistant_gm',
    onClick: () => alert('User clicked!'),
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Click',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <p className="text-cfg-text-muted mb-2 text-sm">Small:</p>
        <UserCampaignRole
          userName="Small User"
          assumedRole="player"
          size="sm"
          isActive={true}
        />
      </div>
      <div>
        <p className="text-cfg-text-muted mb-2 text-sm">Medium:</p>
        <UserCampaignRole
          userName="Medium User"
          assumedRole="trusted_player"
          size="md"
          isActive={true}
          avatarUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=Medium"
        />
      </div>
      <div>
        <p className="text-cfg-text-muted mb-2 text-sm">Large:</p>
        <UserCampaignRole
          userName="Large User"
          assumedRole="game_master"
          size="lg"
          isActive={false}
          avatarUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=LargeGM"
        />
      </div>
    </div>
  ),
};

export const CampaignPartyList: Story = {
  render: () => {
    const members = [
      {
        name: 'DungeonMaster42',
        role: 'game_master' as CampaignEligibleRole,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DM42',
        active: true,
        owned: ['admin', 'game_master', 'player'] as PlatformRole[],
      },
      {
        name: 'AssistantDM',
        role: 'assistant_gm' as CampaignEligibleRole,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ADM',
        active: true,
        owned: ['assistant_gm', 'player'] as PlatformRole[],
      },
      {
        name: 'VeteranPlayer',
        role: 'trusted_player' as CampaignEligibleRole,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=VP',
        active: true,
        owned: ['trusted_player', 'player', 'creator'] as PlatformRole[],
      },
      {
        name: 'NewAdventurer',
        role: 'player' as CampaignEligibleRole,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=NA',
        active: false,
        owned: ['player'] as PlatformRole[],
      },
      {
        name: 'CuriousWatcher',
        role: 'spectator' as CampaignEligibleRole,
        active: false,
        owned: ['spectator'] as PlatformRole[],
      },
    ];

    return (
      <div className="bg-cfg-background-primary p-4 rounded-lg max-w-md">
        <h3 className="text-lg font-semibold text-cfg-text-normal mb-4">
          Campaign Members
        </h3>
        <div className="space-y-2">
          {members.map((member) => (
            <UserCampaignRole
              key={member.name}
              userName={member.name}
              assumedRole={member.role}
              avatarUrl={member.avatar}
              isActive={member.active}
              ownedRoles={member.owned}
              showOwnedRoles
              size="sm"
            />
          ))}
        </div>
      </div>
    );
  },
};

export const InSessionView: Story = {
  render: () => (
    <div className="bg-cfg-background-tertiary p-6 rounded-lg max-w-2xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-cfg-text-normal">Session #12: The Dragon's Lair</h2>
        <span className="text-sm text-cfg-green">In Progress</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-cfg-text-muted">Game Master</h4>
          <UserCampaignRole
            userName="DungeonMaster42"
            assumedRole="game_master"
            avatarUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=DM42"
            isActive={true}
            size="md"
          />
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-cfg-text-muted">Players (3)</h4>
          <div className="space-y-1">
            <UserCampaignRole
              userName="VeteranPlayer"
              assumedRole="trusted_player"
              avatarUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=VP"
              isActive={true}
              size="sm"
            />
            <UserCampaignRole
              userName="NewAdventurer"
              assumedRole="player"
              avatarUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=NA"
              isActive={true}
              size="sm"
            />
            <UserCampaignRole
              userName="AwayPlayer"
              assumedRole="player"
              isActive={false}
              size="sm"
            />
          </div>
        </div>
      </div>
    </div>
  ),
};
