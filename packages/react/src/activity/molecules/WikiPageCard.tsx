import { clsx } from 'clsx';
import { Badge } from '../../shared/atoms/Badge';

export interface WikiPageAuthor {
  id: string;
  name?: string | null;
  image?: string | null;
}

export interface WikiPageCardProps {
  /** Page ID */
  id: string;
  /** Page slug (URL-friendly identifier) */
  slug: string;
  /** Page title */
  title: string;
  /** Page category */
  category: string;
  /** Short description */
  description?: string | null;
  /** Whether the page is published */
  isPublished?: boolean;
  /** Page author */
  author?: WikiPageAuthor | null;
  /** Last editor */
  lastEditor?: WikiPageAuthor | null;
  /** When last updated */
  updatedAt?: string | Date | null;
  /** When published */
  publishedAt?: string | Date | null;
  /** Called when card is clicked */
  onClick?: () => void;
  /** Called when view is requested */
  onView?: () => void;
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

export function WikiPageCard({
  id: _id,
  slug: _slug,
  title,
  category,
  description,
  isPublished = true,
  author,
  lastEditor,
  updatedAt,
  publishedAt: _publishedAt,
  onClick,
  onView,
  onEdit,
  onDelete,
  isLoading = false,
  className,
  testId = 'wiki-page-card',
}: WikiPageCardProps) {
  return (
    <div
      className={clsx(
        'rounded-lg border p-4 transition-all',
        isPublished
          ? 'bg-cfg-background-secondary border-cfg-border'
          : 'bg-cfg-background-tertiary border-cfg-border',
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
            data-testid={`${testId}-title`}
          >
            📄 {title}
          </h3>
          <div
            className="text-xs text-cfg-text-muted"
            data-testid={`${testId}-category`}
          >
            {category}
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {isPublished ? (
            <Badge variant="success" size="sm" testId={`${testId}-published-badge`}>
              Published
            </Badge>
          ) : (
            <Badge variant="warning" size="sm" testId={`${testId}-draft-badge`}>
              Draft
            </Badge>
          )}
        </div>
      </div>

      {/* Description */}
      {description && (
        <p
          className="text-sm text-cfg-text-muted mb-3 line-clamp-2"
          data-testid={`${testId}-description`}
        >
          {description}
        </p>
      )}

      {/* Meta info */}
      <div className="flex items-center gap-4 text-xs text-cfg-text-muted flex-wrap">
        {author && (
          <span
            className="flex items-center gap-1"
            data-testid={`${testId}-author`}
          >
            {author.image && (
              <img
                src={author.image}
                alt=""
                className="w-4 h-4 rounded-full"
              />
            )}
            by {author.name || 'Unknown'}
          </span>
        )}
        {lastEditor && lastEditor.id !== author?.id && (
          <span
            className="flex items-center gap-1"
            data-testid={`${testId}-editor`}
          >
            {lastEditor.image && (
              <img
                src={lastEditor.image}
                alt=""
                className="w-4 h-4 rounded-full"
              />
            )}
            edited by {lastEditor.name || 'Unknown'}
          </span>
        )}
        {updatedAt && (
          <span data-testid={`${testId}-updated`}>
            {formatTimeAgo(updatedAt)}
          </span>
        )}
      </div>

      {/* Actions */}
      {(onView || onEdit || onDelete) && (
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-cfg-border">
          {onView && (
            <button
              type="button"
              className="flex-1 py-1.5 rounded bg-cfg-primary text-white text-sm font-medium hover:bg-cfg-primary-hover transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onView();
              }}
              disabled={isLoading}
              data-testid={`${testId}-view-btn`}
            >
              View
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
