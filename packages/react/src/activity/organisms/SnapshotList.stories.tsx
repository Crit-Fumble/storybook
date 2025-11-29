import type { Meta, StoryObj } from '@storybook/react';
import { SnapshotList } from './SnapshotList';
import type { WorldSnapshot } from '../types';

const meta: Meta<typeof SnapshotList> = {
  title: 'Activity/Organisms/SnapshotList',
  component: SnapshotList,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="p-6 bg-cfg-background-primary max-w-lg">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SnapshotList>;

const createSnapshot = (
  id: string,
  version: number,
  name: string | null,
  isAuto: boolean,
  daysAgo: number,
  sizeMB: number
): WorldSnapshot => ({
  id,
  campaignId: 'campaign-1',
  version,
  name,
  isAuto,
  storageKey: `snapshots/${id}.tar.gz`,
  sizeBytes: BigInt(sizeMB * 1024 * 1024),
  createdAt: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000),
  createdBy: isAuto ? null : 'user-1',
});

const snapshots: WorldSnapshot[] = [
  createSnapshot('snap-5', 5, 'Before Dragon Fight', false, 1, 52),
  createSnapshot('snap-4', 4, null, true, 2, 51),
  createSnapshot('snap-3', 3, 'Halfway Point', false, 5, 48),
  createSnapshot('snap-2', 2, null, true, 7, 42),
  createSnapshot('snap-1', 1, 'Initial Setup', false, 14, 35),
];

export const Default: Story = {
  args: {
    snapshots,
    currentSnapshotId: 'snap-5',
    onCreateSnapshot: () => alert('Create snapshot'),
    onRestoreSnapshot: (id) => alert(`Restore: ${id}`),
    onDownloadSnapshot: (id) => alert(`Download: ${id}`),
    onDeleteSnapshot: (id) => alert(`Delete: ${id}`),
  },
};

export const Empty: Story = {
  args: {
    snapshots: [],
    onCreateSnapshot: () => alert('Create snapshot'),
  },
};

export const Creating: Story = {
  args: {
    snapshots,
    currentSnapshotId: 'snap-5',
    onCreateSnapshot: () => {},
    isCreating: true,
  },
};

export const LoadingSnapshot: Story = {
  args: {
    snapshots,
    currentSnapshotId: 'snap-5',
    onRestoreSnapshot: () => {},
    onDownloadSnapshot: () => {},
    loadingSnapshotId: 'snap-3',
  },
};

export const ManySnapshots: Story = {
  args: {
    snapshots: [
      ...snapshots,
      createSnapshot('snap-6', 6, 'Boss Battle Prep', false, 0.5, 55),
      createSnapshot('snap-7', 7, null, true, 0.25, 56),
      createSnapshot('snap-8', 8, 'Latest', false, 0.1, 58),
    ],
    currentSnapshotId: 'snap-8',
    maxDisplay: 5,
    onCreateSnapshot: () => alert('Create'),
    onRestoreSnapshot: (id) => alert(`Restore: ${id}`),
    onViewAll: () => alert('View all'),
  },
};

export const NoActions: Story = {
  args: {
    snapshots: snapshots.slice(0, 3),
    currentSnapshotId: 'snap-5',
  },
};

export const DownloadOnly: Story = {
  args: {
    snapshots: snapshots.slice(0, 3),
    currentSnapshotId: 'snap-5',
    onDownloadSnapshot: (id) => alert(`Download: ${id}`),
  },
};
