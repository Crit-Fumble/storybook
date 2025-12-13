import type { Meta, StoryObj } from '@storybook/react';
import { UserPlatformRoles } from './UserPlatformRoles';
import type { PlatformRole } from '../types';

const meta: Meta<typeof UserPlatformRoles> = {
  title: 'Shared/Roles/UserPlatformRoles',
  component: UserPlatformRoles,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    direction: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof UserPlatformRoles>;

export const Default: Story = {
  args: {
    roles: ['player', 'creator'],
  },
};

export const SingleRole: Story = {
  args: {
    roles: ['game_master'],
  },
};

export const MultipleRoles: Story = {
  args: {
    roles: ['player', 'game_master', 'storyteller', 'worldbuilder'],
  },
};

export const AllRoles: Story = {
  args: {
    roles: [
      'gamer', 'player', 'trusted_player', 'game_master', 'assistant_gm',
      'spectator', 'storyteller', 'worldbuilder', 'creator', 'developer', 'admin'
    ] as PlatformRole[],
  },
};

export const WithMaxVisible: Story = {
  args: {
    roles: ['player', 'game_master', 'creator', 'developer', 'admin'],
    maxVisible: 3,
  },
};

export const MaxVisibleOverflow: Story = {
  args: {
    roles: [
      'player', 'game_master', 'storyteller', 'worldbuilder',
      'creator', 'developer', 'admin'
    ] as PlatformRole[],
    maxVisible: 2,
  },
};

export const SmallSize: Story = {
  args: {
    roles: ['player', 'game_master', 'creator'],
    size: 'sm',
  },
};

export const LargeSize: Story = {
  args: {
    roles: ['player', 'game_master', 'creator'],
    size: 'lg',
  },
};

export const NoIcons: Story = {
  args: {
    roles: ['player', 'game_master', 'creator'],
    showIcons: false,
  },
};

export const Vertical: Story = {
  args: {
    roles: ['player', 'game_master', 'creator', 'storyteller'],
    direction: 'vertical',
  },
};

export const Empty: Story = {
  args: {
    roles: [],
  },
};

export const AdminUser: Story = {
  args: {
    roles: ['admin', 'developer'],
  },
};

export const ContentCreator: Story = {
  args: {
    roles: ['storyteller', 'worldbuilder', 'creator'],
  },
};

export const PlayerWithTrust: Story = {
  args: {
    roles: ['player', 'trusted_player'],
  },
};

export const AllSizes: Story = {
  render: () => {
    const roles: PlatformRole[] = ['player', 'game_master', 'creator'];
    return (
      <div className="space-y-4">
        <div>
          <span className="text-cfg-text-muted text-sm block mb-2">Small:</span>
          <UserPlatformRoles roles={roles} size="sm" />
        </div>
        <div>
          <span className="text-cfg-text-muted text-sm block mb-2">Medium:</span>
          <UserPlatformRoles roles={roles} size="md" />
        </div>
        <div>
          <span className="text-cfg-text-muted text-sm block mb-2">Large:</span>
          <UserPlatformRoles roles={roles} size="lg" />
        </div>
      </div>
    );
  },
};

export const InUserCard: Story = {
  render: () => (
    <div className="bg-cfg-background-secondary rounded-lg p-4 max-w-sm border border-cfg-border">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-cfg-primary flex items-center justify-center text-white font-bold">
          JD
        </div>
        <div>
          <h4 className="font-semibold text-cfg-text-normal">John Doe</h4>
          <p className="text-sm text-cfg-text-muted">@johndoe</p>
        </div>
      </div>
      <UserPlatformRoles
        roles={['game_master', 'worldbuilder', 'creator']}
        size="sm"
      />
    </div>
  ),
};

export const InMemberList: Story = {
  render: () => {
    const members = [
      { name: 'Alice', roles: ['admin', 'developer'] as PlatformRole[] },
      { name: 'Bob', roles: ['game_master', 'storyteller'] as PlatformRole[] },
      { name: 'Carol', roles: ['player'] as PlatformRole[] },
      { name: 'Dave', roles: ['player', 'creator', 'worldbuilder', 'storyteller'] as PlatformRole[] },
    ];

    return (
      <div className="space-y-2 max-w-md">
        {members.map((member) => (
          <div
            key={member.name}
            className="flex items-center justify-between p-3 bg-cfg-background-secondary rounded-lg border border-cfg-border"
          >
            <span className="font-medium text-cfg-text-normal">{member.name}</span>
            <UserPlatformRoles roles={member.roles} size="sm" maxVisible={2} />
          </div>
        ))}
      </div>
    );
  },
};
