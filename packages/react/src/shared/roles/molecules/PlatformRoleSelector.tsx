import { clsx } from 'clsx';
import { PlatformRoleCard } from './PlatformRoleCard';
import { getAllPlatformRoles, type PlatformRole } from '../types';

export interface PlatformRoleSelectorProps {
  /** Currently selected roles */
  selectedRoles: PlatformRole[];
  /** Called when selection changes */
  onChange: (roles: PlatformRole[]) => void;
  /** Available roles to show (defaults to all) */
  availableRoles?: PlatformRole[];
  /** Whether the selector is disabled */
  disabled?: boolean;
  /** Use compact cards */
  compact?: boolean;
  /** Number of columns (responsive by default) */
  columns?: 1 | 2 | 3 | 4;
  /** Maximum number of roles that can be selected (undefined = unlimited) */
  maxSelections?: number;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

const columnClasses = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
};

export function PlatformRoleSelector({
  selectedRoles,
  onChange,
  availableRoles,
  disabled = false,
  compact = false,
  columns,
  maxSelections,
  className,
  testId = 'platform-role-selector',
}: PlatformRoleSelectorProps) {
  const allRoles = getAllPlatformRoles();
  const rolesToShow = availableRoles
    ? allRoles.filter((r) => availableRoles.includes(r.key))
    : allRoles;

  const handleRoleToggle = (role: PlatformRole) => {
    if (disabled) return;

    const isSelected = selectedRoles.includes(role);

    if (isSelected) {
      // Remove role
      onChange(selectedRoles.filter((r) => r !== role));
    } else {
      // Add role (if under max)
      if (maxSelections && selectedRoles.length >= maxSelections) {
        return; // Don't add if at max
      }
      onChange([...selectedRoles, role]);
    }
  };

  const isAtMax = maxSelections !== undefined && selectedRoles.length >= maxSelections;

  // Default columns based on compact mode
  const gridColumns = columns ?? (compact ? 4 : 3);

  return (
    <div
      className={clsx('space-y-3', className)}
      data-testid={testId}
    >
      {/* Selection info */}
      {maxSelections !== undefined && (
        <div
          className="text-sm text-cfg-text-muted"
          data-testid={`${testId}-selection-info`}
        >
          {selectedRoles.length} of {maxSelections} role{maxSelections !== 1 ? 's' : ''} selected
        </div>
      )}

      {/* Role grid */}
      <div
        className={clsx(
          'grid gap-3',
          columnClasses[gridColumns]
        )}
        role="group"
        aria-label="Platform role selection"
        data-testid={`${testId}-grid`}
      >
        {rolesToShow.map((config) => {
          const isSelected = selectedRoles.includes(config.key);
          const isDisabled = disabled || (isAtMax && !isSelected);

          return (
            <PlatformRoleCard
              key={config.key}
              role={config.key}
              selected={isSelected}
              disabled={isDisabled}
              compact={compact}
              onClick={() => handleRoleToggle(config.key)}
              testId={`${testId}-role-${config.key}`}
            />
          );
        })}
      </div>

      {/* Empty state */}
      {rolesToShow.length === 0 && (
        <div
          className="text-center py-8 text-cfg-text-muted"
          data-testid={`${testId}-empty`}
        >
          No roles available
        </div>
      )}
    </div>
  );
}
