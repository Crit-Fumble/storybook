import { clsx } from 'clsx';
import { Card } from '../../shared/molecules';
import { Button } from '../../shared/atoms';
import { SnapshotCard } from '../molecules/SnapshotCard';
import type { WorldSnapshot } from '../types';

export interface SnapshotListProps {
  /** List of world snapshots */
  snapshots: WorldSnapshot[];
  /** Current/latest snapshot ID */
  currentSnapshotId?: string;
  /** Called when create snapshot button is clicked */
  onCreateSnapshot?: () => void;
  /** Called when restore button is clicked for a snapshot */
  onRestoreSnapshot?: (snapshotId: string) => void;
  /** Called when download button is clicked */
  onDownloadSnapshot?: (snapshotId: string) => void;
  /** Called when delete button is clicked */
  onDeleteSnapshot?: (snapshotId: string) => void;
  /** Whether creating a snapshot is in progress */
  isCreating?: boolean;
  /** Whether an action is in progress on a specific snapshot */
  loadingSnapshotId?: string | null;
  /** Maximum number of snapshots to display before pagination */
  maxDisplay?: number;
  /** Called when view all is clicked */
  onViewAll?: () => void;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

export function SnapshotList({
  snapshots,
  currentSnapshotId,
  onCreateSnapshot,
  onRestoreSnapshot,
  onDownloadSnapshot,
  onDeleteSnapshot,
  isCreating = false,
  loadingSnapshotId = null,
  maxDisplay = 5,
  onViewAll,
  className,
  testId = 'snapshot-list',
}: SnapshotListProps) {
  const sortedSnapshots = [...snapshots].sort((a, b) => b.version - a.version);
  const displayedSnapshots = maxDisplay
    ? sortedSnapshots.slice(0, maxDisplay)
    : sortedSnapshots;
  const hasMore = snapshots.length > displayedSnapshots.length;

  // Calculate total size
  const totalSize = snapshots.reduce((sum, s) => {
    if (s.sizeBytes === null) return sum;
    return sum + (typeof s.sizeBytes === 'bigint' ? Number(s.sizeBytes) : s.sizeBytes);
  }, 0);

  const formatTotalSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  };

  return (
    <div className={clsx('space-y-4', className)} data-testid={testId}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-cfg-text-normal">
            World Snapshots
          </h3>
          <p className="text-xs text-cfg-text-muted mt-0.5">
            {snapshots.length} snapshot{snapshots.length !== 1 ? 's' : ''}
            {totalSize > 0 && ` · ${formatTotalSize(totalSize)} total`}
          </p>
        </div>
        {onCreateSnapshot && (
          <Button
            variant="primary"
            size="sm"
            onClick={onCreateSnapshot}
            disabled={isCreating}
            testId={`${testId}-create-btn`}
          >
            {isCreating ? 'Creating...' : 'Create Snapshot'}
          </Button>
        )}
      </div>

      {/* Snapshots */}
      {snapshots.length === 0 ? (
        <Card
          className="bg-cfg-background-secondary"
          testId={`${testId}-empty`}
        >
          <div className="text-center py-6">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-cfg-background-tertiary flex items-center justify-center">
              <svg
                className="w-6 h-6 text-cfg-text-muted"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                />
              </svg>
            </div>
            <p className="text-sm text-cfg-text-muted">No snapshots yet</p>
            <p className="text-xs text-cfg-text-muted/70 mt-1">
              Create a snapshot to backup your world data
            </p>
          </div>
        </Card>
      ) : (
        <div className="space-y-3" data-testid={`${testId}-items`}>
          {displayedSnapshots.map((snapshot, index) => (
            <SnapshotCard
              key={snapshot.id}
              snapshot={snapshot}
              isCurrent={snapshot.id === currentSnapshotId}
              onRestore={
                onRestoreSnapshot
                  ? () => onRestoreSnapshot(snapshot.id)
                  : undefined
              }
              onDownload={
                onDownloadSnapshot
                  ? () => onDownloadSnapshot(snapshot.id)
                  : undefined
              }
              onDelete={
                onDeleteSnapshot
                  ? () => onDeleteSnapshot(snapshot.id)
                  : undefined
              }
              isLoading={loadingSnapshotId === snapshot.id}
              testId={`${testId}-item-${index}`}
            />
          ))}
        </div>
      )}

      {/* View All */}
      {hasMore && onViewAll && (
        <div className="text-center">
          <button
            onClick={onViewAll}
            className="text-sm text-cfg-accent hover:text-cfg-primary transition-colors"
            data-testid={`${testId}-view-all`}
          >
            View all {snapshots.length} snapshots
          </button>
        </div>
      )}
    </div>
  );
}
