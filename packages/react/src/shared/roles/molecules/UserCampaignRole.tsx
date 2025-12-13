import { clsx } from 'clsx';
import { RpgIcon } from '../../atoms/RpgIcon';
import { PlatformRoleBadge } from '../atoms/PlatformRoleBadge';
import {
  getPlatformRoleConfig,
  type CampaignEligibleRole,
  type PlatformRole,
} from '../types';

export interface UserCampaignRoleProps {
  /** User's display name */
  userName: string;
  /** User's avatar URL (optional) */
  avatarUrl?: string;
  /** The role the user has assumed in this campaign */
  assumedRole: CampaignEligibleRole;
  /** All platform roles the user owns (optional, for showing additional context) */
  ownedRoles?: PlatformRole[];
  /** Whether to show all owned roles alongside the assumed role */
  showOwnedRoles?: boolean;
  /** Display size */
  size?: 'sm' | 'md' | 'lg';
  /** Whether this user is currently active/online */
  isActive?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

export function UserCampaignRole({
  userName,
  avatarUrl,
  assumedRole,
  ownedRoles,
  showOwnedRoles = false,
  size = 'md',
  isActive,
  onClick,
  className,
  testId = 'user-campaign-role',
}: UserCampaignRoleProps) {
  const roleConfig = getPlatformRoleConfig(assumedRole);
  const isInteractive = !!onClick;

  const sizeClasses = {
    sm: {
      container: 'p-2 gap-2',
      avatar: 'w-8 h-8 text-sm',
      name: 'text-sm',
      badge: 'sm' as const,
    },
    md: {
      container: 'p-3 gap-3',
      avatar: 'w-10 h-10 text-base',
      name: 'text-base',
      badge: 'sm' as const,
    },
    lg: {
      container: 'p-4 gap-4',
      avatar: 'w-12 h-12 text-lg',
      name: 'text-lg',
      badge: 'md' as const,
    },
  };

  const sizes = sizeClasses[size];

  // Get other owned campaign roles (excluding the assumed one)
  const otherRoles = showOwnedRoles && ownedRoles
    ? ownedRoles.filter((r) => r !== assumedRole)
    : [];

  return (
    <div
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onClick={onClick}
      onKeyDown={isInteractive ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      } : undefined}
      className={clsx(
        'flex items-center rounded-lg transition-colors',
        sizes.container,
        'bg-cfg-background-secondary',
        isInteractive && 'cursor-pointer hover:bg-cfg-background-tertiary',
        className
      )}
      data-testid={testId}
    >
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={userName}
            className={clsx('rounded-full object-cover', sizes.avatar)}
            data-testid={`${testId}-avatar`}
          />
        ) : (
          <div
            className={clsx(
              'rounded-full flex items-center justify-center font-semibold',
              sizes.avatar
            )}
            style={{
              backgroundColor: roleConfig.bgColor,
              color: roleConfig.color,
            }}
            data-testid={`${testId}-avatar-placeholder`}
          >
            {userName.charAt(0).toUpperCase()}
          </div>
        )}

        {/* Online indicator */}
        {isActive !== undefined && (
          <span
            className={clsx(
              'absolute bottom-0 right-0 rounded-full border-2 border-cfg-background-secondary',
              size === 'sm' ? 'w-2.5 h-2.5' : 'w-3 h-3',
              isActive ? 'bg-cfg-green' : 'bg-cfg-text-muted'
            )}
            data-testid={`${testId}-status`}
            aria-label={isActive ? 'Online' : 'Offline'}
          />
        )}
      </div>

      {/* User info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span
            className={clsx('font-medium text-cfg-text-normal truncate', sizes.name)}
            data-testid={`${testId}-name`}
          >
            {userName}
          </span>
        </div>

        {/* Assumed role */}
        <div className="flex items-center gap-1.5 mt-0.5">
          <PlatformRoleBadge
            role={assumedRole}
            size={sizes.badge}
            testId={`${testId}-role`}
          />
          {otherRoles.length > 0 && (
            <span
              className="text-xs text-cfg-text-muted"
              data-testid={`${testId}-other-roles`}
            >
              +{otherRoles.length} more
            </span>
          )}
        </div>
      </div>

      {/* Role icon (large size only) */}
      {size === 'lg' && (
        <div
          className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: roleConfig.bgColor }}
          data-testid={`${testId}-large-icon`}
        >
          <RpgIcon
            icon={roleConfig.icon}
            size="lg"
            color={roleConfig.color}
            aria-hidden
          />
        </div>
      )}
    </div>
  );
}
