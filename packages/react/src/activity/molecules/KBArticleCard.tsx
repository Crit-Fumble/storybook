import { clsx } from 'clsx';
import { Badge } from '../../shared/atoms/Badge';

export interface KBArticleCardProps {
  /** Article slug (unique identifier) */
  slug: string;
  /** Article title */
  title: string;
  /** Game system (e.g., "dnd5e", "pathfinder2e") */
  system: string;
  /** Article category */
  category: string;
  /** Tags for filtering/searching */
  tags?: string[];
  /** Source book/document */
  source?: string | null;
  /** Called when card is clicked */
  onClick?: () => void;
  /** Called when view is requested */
  onView?: () => void;
  /** Whether actions are loading */
  isLoading?: boolean;
  /** Maximum tags to display */
  maxTags?: number;
  /** Additional CSS classes */
  className?: string;
  /** Test ID */
  testId?: string;
}

// Display names for common game systems
const systemDisplayNames: Record<string, string> = {
  dnd5e: 'D&D 5e',
  dnd2024: 'D&D 2024',
  pathfinder2e: 'Pathfinder 2e',
  pf2e: 'Pathfinder 2e',
  '13thage': '13th Age',
  starfinder: 'Starfinder',
  fate: 'Fate',
  pbta: 'Powered by the Apocalypse',
  coc: 'Call of Cthulhu',
  wfrp: 'Warhammer Fantasy',
};

function getSystemDisplayName(system: string): string {
  return systemDisplayNames[system.toLowerCase()] || system;
}

export function KBArticleCard({
  slug: _slug,
  title,
  system,
  category,
  tags = [],
  source,
  onClick,
  onView,
  isLoading = false,
  maxTags = 3,
  className,
  testId = 'kb-article-card',
}: KBArticleCardProps) {
  const displayTags = tags.slice(0, maxTags);
  const remainingTags = tags.length - maxTags;

  return (
    <div
      className={clsx(
        'rounded-lg border p-4 transition-all',
        'bg-cfg-background-secondary border-cfg-border',
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
            📚 {title}
          </h3>
          <div className="flex items-center gap-2 text-xs text-cfg-text-muted">
            <span data-testid={`${testId}-category`}>{category}</span>
            {source && (
              <>
                <span>•</span>
                <span data-testid={`${testId}-source`}>{source}</span>
              </>
            )}
          </div>
        </div>

        <Badge
          variant="primary"
          size="sm"
          testId={`${testId}-system-badge`}
        >
          {getSystemDisplayName(system)}
        </Badge>
      </div>

      {/* Tags */}
      {displayTags.length > 0 && (
        <div
          className="flex items-center gap-1.5 flex-wrap mb-3"
          data-testid={`${testId}-tags`}
        >
          {displayTags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs rounded-full bg-cfg-background-floating text-cfg-text-muted"
            >
              {tag}
            </span>
          ))}
          {remainingTags > 0 && (
            <span className="text-xs text-cfg-text-muted">
              +{remainingTags} more
            </span>
          )}
        </div>
      )}

      {/* Actions */}
      {onView && (
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-cfg-border">
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
            Read Article
          </button>
        </div>
      )}
    </div>
  );
}
