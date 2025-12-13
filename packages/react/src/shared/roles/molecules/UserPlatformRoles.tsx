import { clsx } from 'clsx';
import { PlatformRoleBadge } from '../atoms/PlatformRoleBadge';
import type { PlatformRole } from '../types';

export interface UserPlatformRolesProps {
  /** List of platform roles the user has */
  roles: PlatformRole[];
  /** Maximum number of roles to display before showing "+N more" */
  maxVisible?: number;
  /** Size of the role badges */
  size?: 'sm' | 'md' | 'lg';
  /** Whether to show role icons */
  showIcons?: boolean;
  /** Layout direction */
  direction?: 'horizontal' | 'vertical';
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

export function UserPlatformRoles({
  roles,
  maxVisible,
  size = 'md',
  showIcons = true,
  direction = 'horizontal',
  className,
  testId = 'user-platform-roles',
}: UserPlatformRolesProps) {
  if (roles.length === 0) {
    return (
      <span
        className="text-cfg-text-muted text-sm"
        data-testid={testId}
      >
        No roles assigned
      </span>
    );
  }

  const visibleRoles = maxVisible ? roles.slice(0, maxVisible) : roles;
  const hiddenCount = maxVisible ? Math.max(0, roles.length - maxVisible) : 0;

  return (
    <div
      className={clsx(
        'flex flex-wrap',
        direction === 'horizontal' ? 'gap-1.5' : 'flex-col gap-1',
        className
      )}
      data-testid={testId}
    >
      {visibleRoles.map((role) => (
        <PlatformRoleBadge
          key={role}
          role={role}
          size={size}
          showIcon={showIcons}
          showLabel
          testId={`${testId}-role-${role}`}
        />
      ))}
      {hiddenCount > 0 && (
        <span
          className={clsx(
            'inline-flex items-center rounded font-medium bg-cfg-border text-cfg-text-muted',
            size === 'sm' && 'px-1.5 py-0.5 text-[10px]',
            size === 'md' && 'px-2 py-1 text-xs',
            size === 'lg' && 'px-3 py-1.5 text-sm'
          )}
          data-testid={`${testId}-overflow`}
          title={roles.slice(maxVisible).join(', ')}
        >
          +{hiddenCount} more
        </span>
      )}
    </div>
  );
}
