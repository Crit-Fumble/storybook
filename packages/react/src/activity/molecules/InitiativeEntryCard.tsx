import { clsx } from 'clsx';

export interface InitiativeEntryCardProps {
  /** Unique identifier */
  id: string;
  /** Display name */
  name: string;
  /** Initiative value/roll */
  initiative: number;
  /** Current health points (optional) */
  hp?: number | null;
  /** Maximum health points (optional) */
  maxHp?: number | null;
  /** Armor class or defense value (optional) */
  ac?: number | null;
  /** Active conditions/status effects */
  conditions?: string[];
  /** Whether this is a player character */
  isPlayer?: boolean;
  /** Whether this entry is the current turn */
  isCurrentTurn?: boolean;
  /** Whether the entry is defeated/dead */
  isDefeated?: boolean;
  /** Avatar/token image URL */
  avatarUrl?: string | null;
  /** Custom color for the entry */
  color?: string;
  /** Called when entry is clicked */
  onClick?: () => void;
  /** Called when HP is updated */
  onHpChange?: (newHp: number) => void;
  /** Called when entry is removed */
  onRemove?: () => void;
  /** Whether actions are loading */
  isLoading?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Test ID */
  testId?: string;
}

export function InitiativeEntryCard({
  id: _id,
  name,
  initiative,
  hp,
  maxHp,
  ac,
  conditions = [],
  isPlayer = false,
  isCurrentTurn = false,
  isDefeated = false,
  avatarUrl,
  color,
  onClick,
  onHpChange,
  onRemove,
  isLoading = false,
  className,
  testId = 'initiative-entry-card',
}: InitiativeEntryCardProps) {
  const hpPercentage = hp != null && maxHp != null && maxHp > 0
    ? Math.max(0, Math.min(100, (hp / maxHp) * 100))
    : null;

  const getHpColor = () => {
    if (hpPercentage === null) return 'bg-cfg-text-muted';
    if (hpPercentage <= 25) return 'bg-cfg-red';
    if (hpPercentage <= 50) return 'bg-cfg-yellow';
    return 'bg-cfg-green';
  };

  const handleHpAdjust = (delta: number) => {
    if (onHpChange && hp != null) {
      const newHp = Math.max(0, hp + delta);
      onHpChange(newHp);
    }
  };

  return (
    <div
      className={clsx(
        'flex items-center gap-3 p-3 rounded-lg border transition-all',
        isCurrentTurn
          ? 'bg-cfg-primary/20 border-cfg-primary shadow-lg'
          : 'bg-cfg-background-secondary border-cfg-border',
        isDefeated && 'opacity-50',
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
      {/* Initiative Number */}
      <div
        className={clsx(
          'flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg',
          isCurrentTurn ? 'bg-cfg-primary text-white' : 'bg-cfg-background-tertiary text-cfg-text-normal'
        )}
        data-testid={`${testId}-initiative`}
        style={color && !isCurrentTurn ? { backgroundColor: color, color: 'white' } : undefined}
      >
        {initiative}
      </div>

      {/* Avatar */}
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={name}
          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
          data-testid={`${testId}-avatar`}
        />
      ) : (
        <div
          className={clsx(
            'w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0',
            isPlayer ? 'bg-cfg-accent text-white' : 'bg-cfg-background-tertiary text-cfg-text-muted'
          )}
          data-testid={`${testId}-avatar-placeholder`}
        >
          {name.charAt(0).toUpperCase()}
        </div>
      )}

      {/* Name and Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span
            className={clsx(
              'font-medium truncate',
              isDefeated ? 'text-cfg-text-muted line-through' : 'text-cfg-text-normal'
            )}
            data-testid={`${testId}-name`}
          >
            {name}
          </span>
          {isPlayer && (
            <span
              className="text-xs px-1.5 py-0.5 rounded bg-cfg-accent/20 text-cfg-accent"
              data-testid={`${testId}-player-badge`}
            >
              PC
            </span>
          )}
          {isCurrentTurn && (
            <span
              className="text-xs px-1.5 py-0.5 rounded bg-cfg-primary text-white"
              data-testid={`${testId}-turn-badge`}
            >
              Turn
            </span>
          )}
        </div>

        {/* Conditions */}
        {conditions.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1" data-testid={`${testId}-conditions`}>
            {conditions.map((condition) => (
              <span
                key={condition}
                className="text-xs px-1.5 py-0.5 rounded bg-cfg-yellow/20 text-cfg-yellow"
              >
                {condition}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="flex items-center gap-3 flex-shrink-0">
        {/* HP */}
        {(hp != null || maxHp != null) && (
          <div className="flex items-center gap-1" data-testid={`${testId}-hp`}>
            {onHpChange && (
              <button
                type="button"
                className="w-6 h-6 rounded bg-cfg-background-tertiary text-cfg-text-muted hover:bg-cfg-red hover:text-white transition-colors text-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleHpAdjust(-1);
                }}
                disabled={isLoading}
                data-testid={`${testId}-hp-decrease`}
              >
                -
              </button>
            )}
            <div className="text-center min-w-[50px]">
              <div className="text-sm font-medium text-cfg-text-normal">
                {hp ?? '?'}/{maxHp ?? '?'}
              </div>
              {hpPercentage !== null && (
                <div className="h-1 w-full bg-cfg-background-tertiary rounded-full overflow-hidden mt-0.5">
                  <div
                    className={clsx('h-full transition-all', getHpColor())}
                    style={{ width: `${hpPercentage}%` }}
                  />
                </div>
              )}
            </div>
            {onHpChange && (
              <button
                type="button"
                className="w-6 h-6 rounded bg-cfg-background-tertiary text-cfg-text-muted hover:bg-cfg-green hover:text-white transition-colors text-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleHpAdjust(1);
                }}
                disabled={isLoading}
                data-testid={`${testId}-hp-increase`}
              >
                +
              </button>
            )}
          </div>
        )}

        {/* AC */}
        {ac != null && (
          <div
            className="flex flex-col items-center px-2 py-1 bg-cfg-background-tertiary rounded"
            data-testid={`${testId}-ac`}
          >
            <span className="text-xs text-cfg-text-muted">AC</span>
            <span className="text-sm font-medium text-cfg-text-normal">{ac}</span>
          </div>
        )}

        {/* Remove Button */}
        {onRemove && (
          <button
            type="button"
            className="w-8 h-8 rounded flex items-center justify-center text-cfg-text-muted hover:bg-cfg-red hover:text-white transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            disabled={isLoading}
            data-testid={`${testId}-remove`}
            aria-label={`Remove ${name}`}
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}
