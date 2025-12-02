import type { Meta, StoryObj } from '@storybook/react';
import { ApiKeyCard } from './ApiKeyCard';

const meta = {
  title: 'Activity/Molecules/ApiKeyCard',
  component: ApiKeyCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onRevoke: { action: 'revoked' },
    onCopy: { action: 'copied' },
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ApiKeyCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'key-abc123def456789',
    name: 'Production API Key',
    scopes: ['read:campaigns', 'write:campaigns', 'read:users'],
    createdAt: new Date('2024-01-15'),
    expiresAt: new Date(Date.now() + 90 * 86400000), // 90 days from now
    lastUsedAt: new Date(Date.now() - 3600000), // 1 hour ago
  },
};

export const NewlyCreated: Story = {
  args: {
    id: 'key-newkey123456789',
    name: 'New API Key',
    scopes: ['read:campaigns'],
    createdAt: new Date(),
    keyValue: 'cfg_key_1234567890abcdefghijklmnop',
    onCopy: () => console.log('Copy clicked'),
  },
};

export const NeverExpires: Story = {
  args: {
    id: 'key-permanent123456',
    name: 'Permanent Key',
    scopes: ['admin'],
    createdAt: new Date('2024-01-01'),
    expiresAt: null,
    lastUsedAt: new Date(Date.now() - 86400000), // 1 day ago
  },
};

export const ExpiresSoon: Story = {
  args: {
    id: 'key-expiring123456',
    name: 'Expiring Soon',
    scopes: ['read:campaigns'],
    createdAt: new Date('2024-01-01'),
    expiresAt: new Date(Date.now() + 7 * 86400000), // 7 days from now
    lastUsedAt: new Date(Date.now() - 3 * 3600000), // 3 hours ago
  },
};

export const Expired: Story = {
  args: {
    id: 'key-expired123456',
    name: 'Expired Key',
    scopes: ['read:campaigns', 'write:campaigns'],
    createdAt: new Date('2023-06-01'),
    expiresAt: new Date(Date.now() - 30 * 86400000), // 30 days ago
    lastUsedAt: new Date(Date.now() - 45 * 86400000), // 45 days ago
  },
};

export const WithRevoke: Story = {
  args: {
    id: 'key-revokable123456',
    name: 'Revokable Key',
    scopes: ['read:campaigns'],
    createdAt: new Date('2024-02-01'),
    onRevoke: () => console.log('Revoke clicked'),
  },
};

export const RevokeLoading: Story = {
  args: {
    id: 'key-revoking123456',
    name: 'Revoking Key',
    scopes: ['read:campaigns'],
    createdAt: new Date('2024-02-01'),
    onRevoke: () => {},
    isLoading: true,
  },
};

export const NoScopes: Story = {
  args: {
    id: 'key-noscopes123456',
    name: 'No Scopes Key',
    scopes: [],
    createdAt: new Date('2024-03-01'),
  },
};

export const ManyScopes: Story = {
  args: {
    id: 'key-manyscopes123456',
    name: 'Full Access Key',
    scopes: [
      'admin',
      'read:campaigns',
      'write:campaigns',
      'read:users',
      'write:users',
      'read:sessions',
      'write:sessions',
      'read:characters',
    ],
    createdAt: new Date('2024-01-01'),
    expiresAt: new Date(Date.now() + 365 * 86400000),
  },
};

export const RecentlyUsed: Story = {
  args: {
    id: 'key-recent123456',
    name: 'Frequently Used Key',
    scopes: ['read:campaigns'],
    createdAt: new Date('2024-01-01'),
    lastUsedAt: new Date(Date.now() - 30000), // 30 seconds ago
  },
};

export const NeverUsed: Story = {
  args: {
    id: 'key-unused123456',
    name: 'Unused Key',
    scopes: ['read:campaigns'],
    createdAt: new Date('2024-03-01'),
    // No lastUsedAt
  },
};

export const KeyList: StoryObj<typeof ApiKeyCard> = {
  render: () => (
    <div className="space-y-4 w-96">
      <ApiKeyCard
        id="key-prod-123"
        name="Production"
        scopes={['admin']}
        createdAt={new Date('2024-01-01')}
        lastUsedAt={new Date(Date.now() - 3600000)}
        onRevoke={() => {}}
      />
      <ApiKeyCard
        id="key-dev-456"
        name="Development"
        scopes={['read:campaigns', 'write:campaigns']}
        createdAt={new Date('2024-02-15')}
        expiresAt={new Date(Date.now() + 30 * 86400000)}
        onRevoke={() => {}}
      />
      <ApiKeyCard
        id="key-old-789"
        name="Legacy Key"
        scopes={['read:campaigns']}
        createdAt={new Date('2023-06-01')}
        expiresAt={new Date(Date.now() - 7 * 86400000)}
        onRevoke={() => {}}
      />
    </div>
  ),
};
