import { clsx } from 'clsx';

export interface NPCCardProps {
  /** NPC name */
  name: string;
  /** Race/species/type */
  race?: string | null;
  /** Occupation or role */
  occupation?: string | null;
  /** Personality traits */
  traits?: string[];
  /** Notable quirk */
  quirk?: string | null;
  /** Hidden secret */
  secret?: string | null;
  /** Memorable quote */
  quote?: string | null;
  /** Brief description */
  description?: string | null;
  /** Avatar/portrait URL */
  avatarUrl?: string | null;
  /** Whether secret is revealed */
  showSecret?: boolean;
  /** Called when secret reveal is toggled */
  onToggleSecret?: () => void;
  /** Called when NPC is saved/favorited */
  onSave?: () => void;
  /** Called when NPC is edited */
  onEdit?: () => void;
  /** Called when NPC is used/inserted */
  onUse?: () => void;
  /** Whether NPC is saved */
  isSaved?: boolean;
  /** Whether actions are loading */
  isLoading?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Test ID */
  testId?: string;
}

export function NPCCard({
  name,
  race,
  occupation,
  traits = [],
  quirk,
  secret,
  quote,
  description,
  avatarUrl,
  showSecret = false,
  onToggleSecret,
  onSave,
  onEdit,
  onUse,
  isSaved = false,
  isLoading = false,
  className,
  testId = 'npc-card',
}: NPCCardProps) {
  return (
    <div
      className={clsx(
        'bg-cfg-background-primary rounded-lg border border-cfg-border overflow-hidden',
        isLoading && 'opacity-70 pointer-events-none',
        className
      )}
      data-testid={testId}
    >
      {/* Header with avatar */}
      <div className="flex items-start gap-4 p-4 bg-cfg-background-secondary border-b border-cfg-border">
        {/* Avatar */}
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={name}
            className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
            data-testid={`${testId}-avatar`}
          />
        ) : (
          <div
            className="w-16 h-16 rounded-lg bg-cfg-background-tertiary flex items-center justify-center text-2xl font-bold text-cfg-text-muted flex-shrink-0"
            data-testid={`${testId}-avatar-placeholder`}
          >
            {name.charAt(0).toUpperCase()}
          </div>
        )}

        {/* Name and basic info */}
        <div className="flex-1 min-w-0">
          <h3
            className="font-display font-semibold text-lg text-cfg-text-normal truncate"
            data-testid={`${testId}-name`}
          >
            {name}
          </h3>
          <div className="flex items-center gap-2 mt-1 text-sm text-cfg-text-muted">
            {race && <span data-testid={`${testId}-race`}>{race}</span>}
            {race && occupation && <span>·</span>}
            {occupation && <span data-testid={`${testId}-occupation`}>{occupation}</span>}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1 flex-shrink-0">
          {onSave && (
            <button
              type="button"
              className={clsx(
                'w-8 h-8 rounded flex items-center justify-center transition-colors',
                isSaved
                  ? 'text-cfg-yellow bg-cfg-yellow/20'
                  : 'text-cfg-text-muted hover:bg-cfg-background-tertiary'
              )}
              onClick={onSave}
              disabled={isLoading}
              data-testid={`${testId}-save-btn`}
              aria-label={isSaved ? 'Unsave NPC' : 'Save NPC'}
            >
              {isSaved ? '★' : '☆'}
            </button>
          )}
          {onEdit && (
            <button
              type="button"
              className="w-8 h-8 rounded flex items-center justify-center text-cfg-text-muted hover:bg-cfg-background-tertiary transition-colors"
              onClick={onEdit}
              disabled={isLoading}
              data-testid={`${testId}-edit-btn`}
              aria-label="Edit NPC"
            >
              ✎
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Description */}
        {description && (
          <p className="text-sm text-cfg-text-normal" data-testid={`${testId}-description`}>
            {description}
          </p>
        )}

        {/* Traits */}
        {traits.length > 0 && (
          <div data-testid={`${testId}-traits`}>
            <h4 className="text-xs font-medium text-cfg-text-muted uppercase tracking-wide mb-2">
              Traits
            </h4>
            <div className="flex flex-wrap gap-2">
              {traits.map((trait, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-sm rounded bg-cfg-background-tertiary text-cfg-text-normal"
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Quirk */}
        {quirk && (
          <div data-testid={`${testId}-quirk`}>
            <h4 className="text-xs font-medium text-cfg-text-muted uppercase tracking-wide mb-1">
              Quirk
            </h4>
            <p className="text-sm text-cfg-text-normal">{quirk}</p>
          </div>
        )}

        {/* Quote */}
        {quote && (
          <div data-testid={`${testId}-quote`}>
            <h4 className="text-xs font-medium text-cfg-text-muted uppercase tracking-wide mb-1">
              Quote
            </h4>
            <blockquote className="text-sm italic text-cfg-text-normal border-l-2 border-cfg-accent pl-3">
              "{quote}"
            </blockquote>
          </div>
        )}

        {/* Secret */}
        {secret && (
          <div data-testid={`${testId}-secret`}>
            <div className="flex items-center justify-between mb-1">
              <h4 className="text-xs font-medium text-cfg-text-muted uppercase tracking-wide">
                Secret
              </h4>
              {onToggleSecret && (
                <button
                  type="button"
                  className="text-xs text-cfg-accent hover:underline"
                  onClick={onToggleSecret}
                  data-testid={`${testId}-toggle-secret`}
                >
                  {showSecret ? 'Hide' : 'Reveal'}
                </button>
              )}
            </div>
            {showSecret ? (
              <p className="text-sm text-cfg-text-normal bg-cfg-red/10 p-2 rounded border border-cfg-red/20">
                {secret}
              </p>
            ) : (
              <p className="text-sm text-cfg-text-muted italic">
                [Hidden - click reveal to show]
              </p>
            )}
          </div>
        )}
      </div>

      {/* Footer with use button */}
      {onUse && (
        <div className="p-4 pt-0">
          <button
            type="button"
            className="w-full py-2 rounded bg-cfg-primary text-white font-medium hover:bg-cfg-primary-hover transition-colors disabled:opacity-50"
            onClick={onUse}
            disabled={isLoading}
            data-testid={`${testId}-use-btn`}
          >
            Use NPC
          </button>
        </div>
      )}
    </div>
  );
}
