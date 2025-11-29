import type { Meta, StoryObj } from '@storybook/react';
import { AssetCard } from './AssetCard';
import type { Asset } from '@crit-fumble/core/types';

const meta: Meta<typeof AssetCard> = {
  title: 'FumbleBot/Assets/AssetCard',
  component: AssetCard,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="p-6 bg-discord-background-primary max-w-xs">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AssetCard>;

const imageAsset: Asset = {
  id: '1',
  campaignId: 'campaign-1',
  name: 'Dragon Battle Map',
  type: 'image',
  mimeType: 'image/png',
  sizeBytes: BigInt(2456789),
  storageKey: 'campaigns/1/assets/dragon-map.png',
  metadata: {},
  createdAt: new Date('2024-03-15'),
  uploadedBy: 'user-123',
};

const audioAsset: Asset = {
  id: '2',
  campaignId: 'campaign-1',
  name: 'Epic Battle Theme',
  type: 'audio',
  mimeType: 'audio/mpeg',
  sizeBytes: BigInt(5678901),
  storageKey: 'campaigns/1/assets/battle-theme.mp3',
  metadata: {},
  createdAt: new Date('2024-03-14'),
  uploadedBy: 'user-123',
};

const mapAsset: Asset = {
  id: '3',
  campaignId: 'campaign-1',
  name: 'Tavern Floor Plan',
  type: 'map',
  mimeType: 'image/webp',
  sizeBytes: BigInt(1234567),
  storageKey: 'campaigns/1/assets/tavern-map.webp',
  metadata: {},
  createdAt: new Date('2024-03-13'),
  uploadedBy: 'user-456',
};

const tokenAsset: Asset = {
  id: '4',
  campaignId: 'campaign-1',
  name: 'Goblin Token',
  type: 'token',
  mimeType: 'image/png',
  sizeBytes: BigInt(45678),
  storageKey: 'campaigns/1/assets/goblin-token.png',
  metadata: {},
  createdAt: new Date('2024-03-12'),
  uploadedBy: 'user-123',
};

const videoAsset: Asset = {
  id: '5',
  campaignId: 'campaign-1',
  name: 'Intro Cinematic',
  type: 'video',
  mimeType: 'video/mp4',
  sizeBytes: BigInt(98765432),
  storageKey: 'campaigns/1/assets/intro.mp4',
  metadata: {},
  createdAt: new Date('2024-03-11'),
  uploadedBy: 'user-789',
};

export const Image: Story = {
  args: {
    asset: imageAsset,
    assetUrl: 'https://picsum.photos/400/300',
  },
};

export const Audio: Story = {
  args: {
    asset: audioAsset,
  },
};

export const Map: Story = {
  args: {
    asset: mapAsset,
    assetUrl: 'https://picsum.photos/400/300?random=2',
  },
};

export const Token: Story = {
  args: {
    asset: tokenAsset,
    assetUrl: 'https://picsum.photos/400/300?random=3',
  },
};

export const Video: Story = {
  args: {
    asset: videoAsset,
  },
};

export const Clickable: Story = {
  args: {
    asset: imageAsset,
    assetUrl: 'https://picsum.photos/400/300',
    onClick: () => alert('Asset clicked'),
  },
};

export const WithDelete: Story = {
  args: {
    asset: imageAsset,
    assetUrl: 'https://picsum.photos/400/300',
    onDelete: () => alert('Delete clicked'),
  },
};

export const Selected: Story = {
  args: {
    asset: imageAsset,
    assetUrl: 'https://picsum.photos/400/300',
    isSelected: true,
  },
};

export const NoPreview: Story = {
  args: {
    asset: imageAsset,
  },
};
