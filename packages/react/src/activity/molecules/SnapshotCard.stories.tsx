import type { Meta, StoryObj } from '@storybook/react';
import { SnapshotCard } from './SnapshotCard';
import type { WorldSnapshot } from '../types';

const meta: Meta<typeof SnapshotCard> = {
  title: 'Activity/Molecules/SnapshotCard',
  component: SnapshotCard,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="p-6 bg-cfg-background-primary max-w-md">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SnapshotCard>;

const baseSnapshot: WorldSnapshot = {
  id: 'snapshot-1',
  campaignId: 'campaign-1',
  version: 12,
  name: 'Before Strahd Battle',
  isAuto: false,
  storageKey: 'snapshots/campaign-1/v12.tar.gz',
  sizeBytes: BigInt(52428800), // 50 MB
  createdAt: new Date('2024-03-15T14:30:00'),
  createdBy: 'user-123',
};

export const Default: Story = {
  args: {
    snapshot: baseSnapshot,
    onRestore: () => alert('Restore clicked'),
    onDownload: () => alert('Download clicked'),
    onDelete: () => alert('Delete clicked'),
  },
};

export const Current: Story = {
  args: {
    snapshot: {
      ...baseSnapshot,
      version: 15,
      name: 'Latest Save',
    },
    isCurrent: true,
    onDownload: () => alert('Download clicked'),
  },
};

export const AutoBackup: Story = {
  args: {
    snapshot: {
      ...baseSnapshot,
      version: 14,
      name: null,
      isAuto: true,
      createdBy: null,
    },
    onRestore: () => alert('Restore clicked'),
    onDownload: () => alert('Download clicked'),
    onDelete: () => alert('Delete clicked'),
  },
};

export const SmallSize: Story = {
  args: {
    snapshot: {
      ...baseSnapshot,
      version: 1,
      name: 'Initial World',
      sizeBytes: BigInt(1024 * 500), // 500 KB
    },
    onRestore: () => alert('Restore'),
    onDownload: () => alert('Download'),
  },
};

export const LargeSize: Story = {
  args: {
    snapshot: {
      ...baseSnapshot,
      version: 25,
      name: 'Full Campaign Backup',
      sizeBytes: BigInt(1024 * 1024 * 1024 * 2), // 2 GB
    },
    onRestore: () => alert('Restore'),
    onDownload: () => alert('Download'),
  },
};

export const UnknownSize: Story = {
  args: {
    snapshot: {
      ...baseSnapshot,
      sizeBytes: null,
    },
    onRestore: () => alert('Restore'),
    onDownload: () => alert('Download'),
  },
};

export const NoName: Story = {
  args: {
    snapshot: {
      ...baseSnapshot,
      name: null,
    },
    onRestore: () => alert('Restore'),
    onDownload: () => alert('Download'),
  },
};

export const Loading: Story = {
  args: {
    snapshot: baseSnapshot,
    onRestore: () => {},
    onDownload: () => {},
    onDelete: () => {},
    isLoading: true,
  },
};

export const DownloadOnly: Story = {
  args: {
    snapshot: baseSnapshot,
    onDownload: () => alert('Download clicked'),
  },
};
