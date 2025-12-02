import { clsx } from 'clsx';
import { Badge, Button } from '../../shared/atoms';

export interface SystemCompatibility {
  minimum?: string;
  verified?: string;
  maximum?: string;
}

export interface SystemAuthor {
  name: string;
  url?: string;
  discord?: string;
}

export interface SystemCardProps {
  /** System ID (e.g., "dnd5e") */
  systemId: string;
  /** Display title (e.g., "D&D 5th Edition") */
  title: string;
  /** System description */
  description?: string | null;
  /** Current version */
  version?: string | null;
  /** Icon URL */
  iconUrl?: string | null;
  /** Compatibility info */
  compatibility?: SystemCompatibility | null;
  /** Authors */
  authors?: SystemAuthor[] | null;
  /** Whether the system is enabled */
  isEnabled?: boolean;
  /** Whether this system is currently selected */
  isSelected?: boolean;
  /** Called when the system is selected */
  onSelect?: () => void;
  /** Called to view more details */
  onViewDetails?: () => void;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

export function SystemCard({
  systemId,
  title,
  description,
  version,
  iconUrl,
  compatibility,
  authors,
  isEnabled = true,
  isSelected = false,
  onSelect,
  onViewDetails,
  className,
  testId = 'system-card',
}: SystemCardProps) {
  const isClickable = !!onSelect && isEnabled;

  return (
    <div
      data-testid={testId}
      className={clsx(
        'bg-cfg-background-secondary rounded-lg p-4 border transition-colors',
        isSelected
          ? 'border-cfg-primary ring-1 ring-cfg-primary'
          : 'border-cfg-border',
        isClickable && !isSelected && 'cursor-pointer hover:border-cfg-primary/50',
        !isEnabled && 'opacity-50',
        className
      )}
      onClick={isClickable ? onSelect : undefined}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={isClickable ? (e) => e.key === 'Enter' && onSelect?.() : undefined}
    >
      {/* Header with icon and title */}
      <div className="flex items-start gap-3">
        {iconUrl ? (
          <img
            src={iconUrl}
            alt={title}
            className="w-12 h-12 rounded-lg object-cover bg-cfg-background-tertiary"
            data-testid={`${testId}-icon`}
          />
        ) : (
          <div
            className="w-12 h-12 rounded-lg bg-cfg-background-tertiary flex items-center justify-center text-xl"
            data-testid={`${testId}-icon-placeholder`}
          >
            🎲
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3
              className="text-cfg-text-normal font-semibold"
              data-testid={`${testId}-title`}
            >
              {title}
            </h3>
            {version && (
              <Badge variant="default" size="sm" testId={`${testId}-version`}>
                v{version}
              </Badge>
            )}
            {isSelected && (
              <Badge variant="primary" size="sm" testId={`${testId}-selected-badge`}>
                Selected
              </Badge>
            )}
            {!isEnabled && (
              <Badge variant="warning" size="sm" testId={`${testId}-disabled-badge`}>
                Disabled
              </Badge>
            )}
          </div>
          <p
            className="text-xs text-cfg-text-muted font-mono mt-0.5"
            data-testid={`${testId}-system-id`}
          >
            {systemId}
          </p>
        </div>
      </div>

      {/* Description */}
      {description && (
        <p
          className="text-sm text-cfg-text-muted mt-3 line-clamp-2"
          data-testid={`${testId}-description`}
        >
          {description}
        </p>
      )}

      {/* Compatibility info */}
      {compatibility && (compatibility.minimum || compatibility.verified) && (
        <div
          className="mt-3 pt-3 border-t border-cfg-border"
          data-testid={`${testId}-compatibility`}
        >
          <p className="text-xs text-cfg-text-muted">
            <span className="font-medium">Foundry Compatibility:</span>{' '}
            {compatibility.verified && (
              <span className="text-cfg-green">Verified {compatibility.verified}</span>
            )}
            {compatibility.minimum && !compatibility.verified && (
              <span>Min {compatibility.minimum}</span>
            )}
            {compatibility.maximum && (
              <span className="ml-2 text-cfg-text-muted">Max {compatibility.maximum}</span>
            )}
          </p>
        </div>
      )}

      {/* Authors */}
      {authors && authors.length > 0 && (
        <div
          className="mt-2 text-xs text-cfg-text-muted"
          data-testid={`${testId}-authors`}
        >
          By {authors.map((a) => a.name).join(', ')}
        </div>
      )}

      {/* Actions */}
      {onViewDetails && (
        <div
          className="mt-3 pt-3 border-t border-cfg-border"
          onClick={(e) => e.stopPropagation()}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={onViewDetails}
            testId={`${testId}-details-btn`}
          >
            View Details
          </Button>
        </div>
      )}
    </div>
  );
}
