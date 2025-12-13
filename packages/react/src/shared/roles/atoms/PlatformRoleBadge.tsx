import { clsx } from 'clsx';
import { RpgIcon } from '../../atoms/RpgIcon';
import { getPlatformRoleConfig, type PlatformRole } from '../types';

export interface PlatformRoleBadgeProps {
  /** The platform role to display */
  role: PlatformRole;
  /** Size of the badge */
  size?: 'sm' | 'md' | 'lg';
  /** Whether to show the role icon */
  showIcon?: boolean;
  /** Whether to show the role label */
  showLabel?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

const sizeClasses = {
  sm: 'px-1.5 py-0.5 text-[10px] gap-1',
  md: 'px-2 py-1 text-xs gap-1.5',
  lg: 'px-3 py-1.5 text-sm gap-2',
};

const iconSizes = {
  sm: 'sm' as const,
  md: 'sm' as const,
  lg: 'md' as const,
};

export function PlatformRoleBadge({
  role,
  size = 'md',
  showIcon = true,
  showLabel = true,
  className,
  testId = 'platform-role-badge',
}: PlatformRoleBadgeProps) {
  const config = getPlatformRoleConfig(role);

  // If neither icon nor label is shown, show at least the icon
  const shouldShowIcon = showIcon || !showLabel;
  const shouldShowLabel = showLabel;

  return (
    <span
      className={clsx(
        'inline-flex items-center rounded font-medium',
        sizeClasses[size],
        className
      )}
      style={{
        color: config.color,
        backgroundColor: config.bgColor,
      }}
      data-testid={testId}
      data-role={role}
    >
      {shouldShowIcon && (
        <RpgIcon
          icon={config.icon}
          size={iconSizes[size]}
          aria-hidden
          testId={`${testId}-icon`}
        />
      )}
      {shouldShowLabel && (
        <span data-testid={`${testId}-label`}>{config.label}</span>
      )}
    </span>
  );
}
