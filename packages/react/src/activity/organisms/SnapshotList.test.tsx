import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SnapshotList } from './SnapshotList';
import type { WorldSnapshot } from '../types';

const createSnapshot = (id: string, version: number): WorldSnapshot => ({
  id,
  campaignId: 'campaign-1',
  version,
  name: `Snapshot ${version}`,
  isAuto: false,
  storageKey: `snapshots/${id}.tar.gz`,
  sizeBytes: BigInt(1024 * 1024 * 10), // 10 MB
  createdAt: new Date('2024-03-15T10:00:00'),
  createdBy: 'user-1',
});

const snapshots = [
  createSnapshot('snap-1', 1),
  createSnapshot('snap-2', 2),
  createSnapshot('snap-3', 3),
];

describe('SnapshotList', () => {
  describe('Header', () => {
    it('shows snapshot count', () => {
      render(<SnapshotList snapshots={snapshots} />);
      expect(screen.getByText(/3 snapshots/)).toBeInTheDocument();
    });

    it('shows singular when one snapshot', () => {
      render(<SnapshotList snapshots={[snapshots[0]]} />);
      expect(screen.getByText(/1 snapshot/)).toBeInTheDocument();
    });

    it('shows total size', () => {
      render(<SnapshotList snapshots={snapshots} />);
      expect(screen.getByText(/30 MB total/)).toBeInTheDocument();
    });

    it('shows Create Snapshot button when onCreateSnapshot provided', () => {
      const handleCreate = vi.fn();
      render(<SnapshotList snapshots={snapshots} onCreateSnapshot={handleCreate} />);

      const createBtn = screen.getByTestId('snapshot-list-create-btn');
      expect(createBtn).toHaveTextContent('Create Snapshot');

      fireEvent.click(createBtn);
      expect(handleCreate).toHaveBeenCalled();
    });

    it('shows Creating... when isCreating', () => {
      render(
        <SnapshotList snapshots={snapshots} onCreateSnapshot={() => {}} isCreating={true} />
      );

      expect(screen.getByTestId('snapshot-list-create-btn')).toHaveTextContent('Creating...');
      expect(screen.getByTestId('snapshot-list-create-btn')).toBeDisabled();
    });
  });

  describe('Empty state', () => {
    it('shows empty message when no snapshots', () => {
      render(<SnapshotList snapshots={[]} />);
      expect(screen.getByText('No snapshots yet')).toBeInTheDocument();
    });

    it('shows create hint in empty state', () => {
      render(<SnapshotList snapshots={[]} />);
      expect(screen.getByText(/Create a snapshot to backup/)).toBeInTheDocument();
    });
  });

  describe('Snapshot items', () => {
    it('renders snapshot cards', () => {
      render(<SnapshotList snapshots={snapshots} />);
      expect(screen.getByTestId('snapshot-list-item-0')).toBeInTheDocument();
      expect(screen.getByTestId('snapshot-list-item-1')).toBeInTheDocument();
      expect(screen.getByTestId('snapshot-list-item-2')).toBeInTheDocument();
    });

    it('sorts snapshots by version descending', () => {
      render(<SnapshotList snapshots={snapshots} />);
      // Version 3 should be first (index 0)
      expect(screen.getByTestId('snapshot-list-item-0-version')).toHaveTextContent('v3');
    });

    it('marks current snapshot', () => {
      render(<SnapshotList snapshots={snapshots} currentSnapshotId="snap-3" />);
      expect(screen.getByTestId('snapshot-list-item-0-current-badge')).toBeInTheDocument();
    });

    it('passes onRestoreSnapshot to cards', () => {
      const handleRestore = vi.fn();
      render(
        <SnapshotList
          snapshots={snapshots}
          currentSnapshotId="snap-3"
          onRestoreSnapshot={handleRestore}
        />
      );

      // Click restore on non-current snapshot (snap-2, which is item-1)
      const restoreBtn = screen.getByTestId('snapshot-list-item-1-restore-btn');
      fireEvent.click(restoreBtn);
      expect(handleRestore).toHaveBeenCalledWith('snap-2');
    });

    it('passes onDownloadSnapshot to cards', () => {
      const handleDownload = vi.fn();
      render(<SnapshotList snapshots={snapshots} onDownloadSnapshot={handleDownload} />);

      const downloadBtn = screen.getByTestId('snapshot-list-item-0-download-btn');
      fireEvent.click(downloadBtn);
      expect(handleDownload).toHaveBeenCalledWith('snap-3');
    });

    it('passes onDeleteSnapshot to cards', () => {
      const handleDelete = vi.fn();
      render(
        <SnapshotList
          snapshots={snapshots}
          currentSnapshotId="snap-3"
          onDeleteSnapshot={handleDelete}
        />
      );

      // Delete non-current snapshot
      const deleteBtn = screen.getByTestId('snapshot-list-item-1-delete-btn');
      fireEvent.click(deleteBtn);
      expect(handleDelete).toHaveBeenCalledWith('snap-2');
    });

    it('sets loading state on specific snapshot', () => {
      render(
        <SnapshotList
          snapshots={snapshots}
          onRestoreSnapshot={() => {}}
          loadingSnapshotId="snap-2"
        />
      );

      // snap-2 is item-1 (sorted by version desc)
      expect(screen.getByTestId('snapshot-list-item-1-restore-btn')).toBeDisabled();
    });
  });

  describe('Pagination', () => {
    it('limits displayed snapshots to maxDisplay', () => {
      const manySnapshots = [
        ...snapshots,
        createSnapshot('snap-4', 4),
        createSnapshot('snap-5', 5),
        createSnapshot('snap-6', 6),
      ];

      render(<SnapshotList snapshots={manySnapshots} maxDisplay={3} />);

      expect(screen.getByTestId('snapshot-list-item-0')).toBeInTheDocument();
      expect(screen.getByTestId('snapshot-list-item-1')).toBeInTheDocument();
      expect(screen.getByTestId('snapshot-list-item-2')).toBeInTheDocument();
      expect(screen.queryByTestId('snapshot-list-item-3')).not.toBeInTheDocument();
    });

    it('shows View All button when more snapshots than maxDisplay', () => {
      const manySnapshots = [
        ...snapshots,
        createSnapshot('snap-4', 4),
        createSnapshot('snap-5', 5),
        createSnapshot('snap-6', 6),
      ];

      const handleViewAll = vi.fn();
      render(
        <SnapshotList
          snapshots={manySnapshots}
          maxDisplay={3}
          onViewAll={handleViewAll}
        />
      );

      const viewAllBtn = screen.getByTestId('snapshot-list-view-all');
      expect(viewAllBtn).toHaveTextContent('View all 6 snapshots');

      fireEvent.click(viewAllBtn);
      expect(handleViewAll).toHaveBeenCalled();
    });

    it('does not show View All when all snapshots displayed', () => {
      render(
        <SnapshotList
          snapshots={snapshots}
          maxDisplay={5}
          onViewAll={() => {}}
        />
      );

      expect(screen.queryByTestId('snapshot-list-view-all')).not.toBeInTheDocument();
    });
  });

  it('applies custom className', () => {
    render(<SnapshotList snapshots={snapshots} className="custom-class" />);
    expect(screen.getByTestId('snapshot-list')).toHaveClass('custom-class');
  });

  it('uses custom testId', () => {
    render(<SnapshotList snapshots={snapshots} testId="custom-id" />);
    expect(screen.getByTestId('custom-id')).toBeInTheDocument();
  });
});
