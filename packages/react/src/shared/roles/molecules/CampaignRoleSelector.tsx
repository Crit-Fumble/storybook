import { clsx } from 'clsx';
import { PlatformRoleBadge } from '../atoms/PlatformRoleBadge';
import { RpgIcon } from '../../atoms/RpgIcon';
import {
  getPlatformRoleConfig,
  getCampaignEligibleRoles,
  type PlatformRole,
  type CampaignEligibleRole,
} from '../types';

export interface CampaignRoleSelectorProps {
  /** All platform roles the user owns */
  ownedRoles: PlatformRole[];
  /** Currently selected/assumed role in this campaign */
  selectedRole: CampaignEligibleRole | null;
  /** Called when user selects a different role */
  onRoleChange: (role: CampaignEligibleRole) => void;
  /** Whether the selector is disabled */
  disabled?: boolean;
  /** Display mode */
  variant?: 'dropdown' | 'inline' | 'compact';
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

export function CampaignRoleSelector({
  ownedRoles,
  selectedRole,
  onRoleChange,
  disabled = false,
  variant = 'dropdown',
  className,
  testId = 'campaign-role-selector',
}: CampaignRoleSelectorProps) {
  const eligibleRoles = getCampaignEligibleRoles(ownedRoles);

  // No eligible roles
  if (eligibleRoles.length === 0) {
    return (
      <div
        className={clsx('text-cfg-text-muted text-sm', className)}
        data-testid={testId}
      >
        No campaign roles available
      </div>
    );
  }

  // Only one eligible role - just display it
  if (eligibleRoles.length === 1) {
    const role = eligibleRoles[0];
    return (
      <div className={className} data-testid={testId}>
        <PlatformRoleBadge
          role={role}
          size={variant === 'compact' ? 'sm' : 'md'}
          testId={`${testId}-badge`}
        />
      </div>
    );
  }

  const selectedConfig = selectedRole ? getPlatformRoleConfig(selectedRole) : null;

  // Dropdown variant
  if (variant === 'dropdown') {
    return (
      <div className={clsx('relative', className)} data-testid={testId}>
        <select
          value={selectedRole ?? ''}
          onChange={(e) => onRoleChange(e.target.value as CampaignEligibleRole)}
          disabled={disabled}
          className={clsx(
            'appearance-none w-full px-3 py-2 pr-10 rounded-lg border transition-colors',
            'bg-cfg-background-secondary border-cfg-border text-cfg-text-normal',
            'focus:outline-none focus:ring-2 focus:ring-cfg-primary focus:border-transparent',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
          data-testid={`${testId}-select`}
        >
          {!selectedRole && (
            <option value="" disabled>
              Select a role...
            </option>
          )}
          {eligibleRoles.map((role) => {
            const config = getPlatformRoleConfig(role);
            return (
              <option key={role} value={role}>
                {config.emoji} {config.label}
              </option>
            );
          })}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
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
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    );
  }

  // Inline variant - horizontal button group
  if (variant === 'inline') {
    return (
      <div
        className={clsx('flex flex-wrap gap-2', className)}
        role="radiogroup"
        aria-label="Campaign role selection"
        data-testid={testId}
      >
        {eligibleRoles.map((role) => {
          const config = getPlatformRoleConfig(role);
          const isSelected = role === selectedRole;

          return (
            <button
              key={role}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onRoleChange(role)}
              disabled={disabled}
              className={clsx(
                'flex items-center gap-2 px-3 py-2 rounded-lg border transition-all',
                isSelected
                  ? 'border-2'
                  : 'border-cfg-border hover:border-cfg-primary',
                disabled && 'opacity-50 cursor-not-allowed',
                !disabled && 'cursor-pointer'
              )}
              style={{
                borderColor: isSelected ? config.color : undefined,
                backgroundColor: isSelected ? config.bgColor : undefined,
              }}
              data-testid={`${testId}-option-${role}`}
            >
              <RpgIcon
                icon={config.icon}
                size="sm"
                color={config.color}
                aria-hidden
              />
              <span
                className="text-sm font-medium"
                style={{ color: isSelected ? config.color : undefined }}
              >
                {config.label}
              </span>
            </button>
          );
        })}
      </div>
    );
  }

  // Compact variant - small badge buttons
  return (
    <div
      className={clsx('flex flex-wrap gap-1', className)}
      role="radiogroup"
      aria-label="Campaign role selection"
      data-testid={testId}
    >
      {eligibleRoles.map((role) => {
        const config = getPlatformRoleConfig(role);
        const isSelected = role === selectedRole;

        return (
          <button
            key={role}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onRoleChange(role)}
            disabled={disabled}
            className={clsx(
              'inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-all',
              isSelected
                ? 'ring-2 ring-offset-1 ring-offset-cfg-background-primary'
                : 'opacity-60 hover:opacity-100',
              disabled && 'cursor-not-allowed',
              !disabled && 'cursor-pointer'
            )}
            style={{
              color: config.color,
              backgroundColor: config.bgColor,
              ringColor: isSelected ? config.color : undefined,
            }}
            data-testid={`${testId}-option-${role}`}
          >
            <span>{config.emoji}</span>
            <span>{config.label}</span>
          </button>
        );
      })}
    </div>
  );
}
