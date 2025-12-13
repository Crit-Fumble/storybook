import { clsx } from 'clsx';
import { RpgIcon } from '../../atoms/RpgIcon';
import { getPlatformRoleConfig, type PlatformRole } from '../types';

export interface PlatformRoleCardProps {
  /** The platform role to display */
  role: PlatformRole;
  /** Whether this role is selected */
  selected?: boolean;
  /** Click handler for selection */
  onClick?: () => void;
  /** Whether the card is disabled */
  disabled?: boolean;
  /** Compact mode - smaller card without description */
  compact?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

export function PlatformRoleCard({
  role,
  selected = false,
  onClick,
  disabled = false,
  compact = false,
  className,
  testId = 'platform-role-card',
}: PlatformRoleCardProps) {
  const config = getPlatformRoleConfig(role);
  const isInteractive = !!onClick && !disabled;

  return (
    <div
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onClick={isInteractive ? onClick : undefined}
      onKeyDown={isInteractive ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      } : undefined}
      className={clsx(
        'rounded-lg border transition-all',
        compact ? 'p-3' : 'p-4',
        // Base styling
        'bg-cfg-background-secondary',
        // Selected state
        selected
          ? 'border-2'
          : 'border-cfg-border',
        // Interactive state
        isInteractive && 'cursor-pointer hover:border-cfg-primary',
        // Disabled state
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      style={{
        borderColor: selected ? config.color : undefined,
      }}
      data-testid={testId}
      data-role={role}
      data-selected={selected}
      aria-pressed={isInteractive ? selected : undefined}
      aria-disabled={disabled}
    >
      <div className={clsx('flex items-center', compact ? 'gap-2' : 'gap-3')}>
        {/* Icon */}
        <div
          className={clsx(
            'flex items-center justify-center rounded-lg',
            compact ? 'w-8 h-8' : 'w-12 h-12'
          )}
          style={{
            backgroundColor: config.bgColor,
          }}
          data-testid={`${testId}-icon-container`}
        >
          <RpgIcon
            icon={config.icon}
            size={compact ? 'md' : 'lg'}
            color={config.color}
            testId={`${testId}-icon`}
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4
            className={clsx(
              'font-semibold text-cfg-text-normal',
              compact ? 'text-sm' : 'text-base'
            )}
            data-testid={`${testId}-title`}
          >
            {config.label}
          </h4>
          {!compact && (
            <p
              className="text-sm text-cfg-text-muted mt-0.5 line-clamp-2"
              data-testid={`${testId}-description`}
            >
              {config.description}
            </p>
          )}
        </div>

        {/* Selection indicator */}
        {selected && (
          <div
            className="flex-shrink-0"
            style={{ color: config.color }}
            data-testid={`${testId}-selected-indicator`}
          >
            <svg
              className={compact ? 'w-4 h-4' : 'w-5 h-5'}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
