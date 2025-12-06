import { clsx } from 'clsx';
import { Badge } from '../../shared/atoms/Badge';

export interface DialogueNodePreview {
  id: string;
  text: string;
  responseCount: number;
}

export interface DialogueTreeCardProps {
  /** Dialogue tree ID */
  id: string;
  /** NPC ID */
  npcId: string;
  /** NPC name */
  npcName: string;
  /** Starting node ID */
  startNodeId?: string | null;
  /** Number of dialogue nodes */
  nodeCount: number;
  /** Preview of starting node */
  startNodePreview?: DialogueNodePreview | null;
  /** Whether the dialogue is active */
  isActive?: boolean;
  /** Who created the dialogue */
  createdBy?: string | null;
  /** When generated */
  generatedAt?: string | Date | null;
  /** Called when card is clicked */
  onClick?: () => void;
  /** Called when preview is requested */
  onPreview?: () => void;
  /** Called when edit is requested */
  onEdit?: () => void;
  /** Called when delete is requested */
  onDelete?: () => void;
  /** Whether actions are loading */
  isLoading?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Test ID */
  testId?: string;
}

function formatTimeAgo(date: string | Date | null | undefined): string {
  if (!date) return '';
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / (60 * 1000));
  const diffHours = Math.floor(diffMs / (60 * 60 * 1000));
  const diffDays = Math.floor(diffMs / (24 * 60 * 60 * 1000));

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return d.toLocaleDateString();
}

export function DialogueTreeCard({
  id: _id,
  npcId: _npcId,
  npcName,
  startNodeId: _startNodeId,
  nodeCount,
  startNodePreview,
  isActive = true,
  createdBy,
  generatedAt,
  onClick,
  onPreview,
  onEdit,
  onDelete,
  isLoading = false,
  className,
  testId = 'dialogue-tree-card',
}: DialogueTreeCardProps) {
  return (
    <div
      className={clsx(
        'rounded-lg border p-4 transition-all',
        isActive
          ? 'bg-cfg-background-secondary border-cfg-border'
          : 'bg-cfg-background-tertiary border-cfg-border opacity-60',
        onClick && !isLoading && 'cursor-pointer hover:bg-cfg-background-floating',
        isLoading && 'opacity-70 pointer-events-none',
        className
      )}
      onClick={!isLoading ? onClick : undefined}
      data-testid={testId}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="min-w-0">
          <h3
            className="font-display font-semibold text-cfg-text-normal truncate"
            data-testid={`${testId}-npc-name`}
          >
            💬 {npcName}
          </h3>
          <div className="text-xs text-cfg-text-muted">
            Dialogue Tree
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <Badge variant="primary" size="sm" testId={`${testId}-node-badge`}>
            {nodeCount} {nodeCount === 1 ? 'node' : 'nodes'}
          </Badge>
          {!isActive && (
            <Badge variant="warning" size="sm" testId={`${testId}-inactive-badge`}>
              Inactive
            </Badge>
          )}
        </div>
      </div>

      {/* Start node preview */}
      {startNodePreview && (
        <div
          className="bg-cfg-background-floating rounded p-3 mb-3"
          data-testid={`${testId}-start-preview`}
        >
          <div className="text-xs text-cfg-text-muted mb-1">Starting dialogue:</div>
          <p className="text-sm text-cfg-text-normal line-clamp-2 italic">
            "{startNodePreview.text}"
          </p>
          {startNodePreview.responseCount > 0 && (
            <div className="text-xs text-cfg-accent mt-1">
              {startNodePreview.responseCount} {startNodePreview.responseCount === 1 ? 'response option' : 'response options'}
            </div>
          )}
        </div>
      )}

      {/* Stats */}
      <div className="flex items-center gap-4 text-xs text-cfg-text-muted">
        {createdBy && (
          <span data-testid={`${testId}-created-by`}>
            by {createdBy}
          </span>
        )}
        {generatedAt && (
          <span data-testid={`${testId}-generated-at`}>
            {formatTimeAgo(generatedAt)}
          </span>
        )}
      </div>

      {/* Actions */}
      {(onPreview || onEdit || onDelete) && (
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-cfg-border">
          {onPreview && (
            <button
              type="button"
              className="flex-1 py-1.5 rounded bg-cfg-primary text-white text-sm font-medium hover:bg-cfg-primary-hover transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onPreview();
              }}
              disabled={isLoading}
              data-testid={`${testId}-preview-btn`}
            >
              Preview
            </button>
          )}
          {onEdit && (
            <button
              type="button"
              className="py-1.5 px-3 rounded text-cfg-text-muted text-sm hover:bg-cfg-background-tertiary transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              disabled={isLoading}
              data-testid={`${testId}-edit-btn`}
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              type="button"
              className="py-1.5 px-3 rounded text-cfg-red text-sm hover:bg-cfg-red/10 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              disabled={isLoading}
              data-testid={`${testId}-delete-btn`}
            >
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
}
