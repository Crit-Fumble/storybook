import { clsx } from 'clsx';
import { Card } from '../../shared/molecules';
import { Button, Badge } from '../../shared/atoms';
import type { WorldSnapshot } from '../types';

function formatBytes(bytes: bigint | number | null): string {
  if (bytes === null) return 'Unknown size';
  const num = typeof bytes === 'bigint' ? Number(bytes) : bytes;
  if (num === 0) return '0 B';

  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(num) / Math.log(k));
  return `${parseFloat((num / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

function formatDateTime(date: Date): string {
  return new Date(date).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export interface SnapshotCardProps {
  /** World snapshot data */
  snapshot: WorldSnapshot;
  /** Called when restore button is clicked */
  onRestore?: () => void;
  /** Called when download button is clicked */
  onDownload?: () => void;
  /** Called when delete button is clicked */
  onDelete?: () => void;
  /** Whether an action is in progress */
  isLoading?: boolean;
  /** Whether this is the current/latest snapshot */
  isCurrent?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

export function SnapshotCard({
  snapshot,
  onRestore,
  onDownload,
  onDelete,
  isLoading = false,
  isCurrent = false,
  className,
  testId = 'snapshot-card',
}: SnapshotCardProps) {
  return (
    <Card
      className={clsx(
        'bg-cfg-background-secondary',
        isCurrent && 'ring-1 ring-cfg-accent',
        className
      )}
      testId={testId}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded bg-cfg-background-tertiary flex items-center justify-center flex-shrink-0">
              <svg
                className="w-4 h-4 text-cfg-text-muted"
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
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span
                  className="text-sm font-medium text-cfg-text-normal"
                  data-testid={`${testId}-version`}
                >
                  v{snapshot.version}
                </span>
                {snapshot.isAuto && (
                  <Badge variant="default" size="sm" testId={`${testId}-auto-badge`}>
                    Auto
                  </Badge>
                )}
                {isCurrent && (
                  <Badge variant="success" size="sm" testId={`${testId}-current-badge`}>
                    Current
                  </Badge>
                )}
              </div>
              {snapshot.name && (
                <p
                  className="text-xs text-cfg-text-muted truncate"
                  data-testid={`${testId}-name`}
                >
                  {snapshot.name}
                </p>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="mt-2 space-y-0.5 text-xs text-cfg-text-muted">
            <p data-testid={`${testId}-date`}>
              {formatDateTime(snapshot.createdAt)}
            </p>
            <p data-testid={`${testId}-size`}>
              {formatBytes(snapshot.sizeBytes)}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-1 flex-shrink-0">
          {onRestore && !isCurrent && (
            <Button
              variant="primary"
              size="sm"
              onClick={onRestore}
              disabled={isLoading}
              testId={`${testId}-restore-btn`}
            >
              Restore
            </Button>
          )}
          {onDownload && (
            <Button
              variant="secondary"
              size="sm"
              onClick={onDownload}
              disabled={isLoading}
              testId={`${testId}-download-btn`}
            >
              Download
            </Button>
          )}
          {onDelete && !isCurrent && (
            <Button
              variant="danger"
              size="sm"
              onClick={onDelete}
              disabled={isLoading}
              testId={`${testId}-delete-btn`}
            >
              Delete
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
