import { clsx } from 'clsx';

export interface MetricsCardProps {
  /** Title of the metric */
  title: string;
  /** Main value to display */
  value: string | number;
  /** Optional subtitle or description */
  subtitle?: string;
  /** Optional icon to display */
  icon?: React.ReactNode;
  /** Optional trend indicator */
  trend?: {
    direction: 'up' | 'down' | 'neutral';
    value: string;
  };
  /** Loading state */
  isLoading?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

export function MetricsCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  isLoading = false,
  className,
  testId = 'metrics-card',
}: MetricsCardProps) {
  if (isLoading) {
    return (
      <div
        data-testid={testId}
        className={clsx(
          'bg-discord-background-secondary rounded-lg p-4 animate-pulse',
          className
        )}
      >
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <div className="h-4 bg-discord-background-tertiary rounded w-20" />
            <div className="h-8 bg-discord-background-tertiary rounded w-16" />
            <div className="h-3 bg-discord-background-tertiary rounded w-24" />
          </div>
          <div className="h-10 w-10 bg-discord-background-tertiary rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div
      data-testid={testId}
      className={clsx(
        'bg-discord-background-secondary rounded-lg p-4',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-discord-text-muted text-sm font-medium">{title}</p>
          <p className="text-discord-text-normal text-2xl font-display font-bold">
            {value}
          </p>
          {subtitle && (
            <p className="text-discord-text-muted text-xs">{subtitle}</p>
          )}
          {trend && (
            <div
              className={clsx(
                'flex items-center gap-1 text-xs font-medium',
                trend.direction === 'up' && 'text-discord-green',
                trend.direction === 'down' && 'text-discord-red',
                trend.direction === 'neutral' && 'text-discord-text-muted'
              )}
            >
              {trend.direction === 'up' && (
                <svg
                  className="w-3 h-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                </svg>
              )}
              {trend.direction === 'down' && (
                <svg
                  className="w-3 h-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              )}
              <span>{trend.value}</span>
            </div>
          )}
        </div>
        {icon && (
          <div className="flex-shrink-0 p-2 bg-discord-background-tertiary rounded-lg text-discord-primary">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
