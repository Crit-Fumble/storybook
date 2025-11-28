import type { Meta, StoryObj } from '@storybook/react';
import { UserBadge } from './UserBadge';

const meta: Meta<typeof UserBadge> = {
  title: 'Activity/Molecules/UserBadge',
  component: UserBadge,
  tags: ['autodocs'],
  argTypes: {
    role: {
      control: 'select',
      options: ['admin', 'gm', 'player', undefined],
    },
    showRole: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof UserBadge>;

export const Player: Story = {
  args: {
    username: 'PlayerOne',
    role: 'player',
  },
};

export const GameMaster: Story = {
  args: {
    username: 'DungeonMaster',
    role: 'gm',
  },
};

export const Admin: Story = {
  args: {
    username: 'ServerAdmin',
    role: 'admin',
  },
};

export const WithAvatar: Story = {
  args: {
    username: 'AvatarUser',
    avatar: 'https://avatars.githubusercontent.com/u/1?v=4',
    role: 'player',
  },
};

export const NoRole: Story = {
  args: {
    username: 'JustAUser',
    showRole: false,
  },
};

export const AllRoles: Story = {
  render: () => (
    <div className="space-y-2">
      <UserBadge username="Admin" role="admin" />
      <UserBadge username="GameMaster" role="gm" />
      <UserBadge username="Player" role="player" />
    </div>
  ),
};
