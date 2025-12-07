import { clsx } from 'clsx';
import { Button } from '../atoms';

export interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
  testId?: string;
}

export function EmptyState({
  icon = '📭',
  title,
  description,
  actionLabel,
  onAction,
  className,
  testId,
}: EmptyStateProps) {
  return (
    <div
      className={clsx('flex flex-col items-center justify-center py-12 text-center', className)}
      data-testid={testId}
    >
      <div className="text-4xl mb-4" data-testid={testId ? `${testId}-icon` : undefined}>
        {icon}
      </div>
      <h3
        className="text-lg font-semibold text-cfg-text-normal mb-2"
        data-testid={testId ? `${testId}-title` : undefined}
      >
        {title}
      </h3>
      {description && (
        <p
          className="text-cfg-text-muted max-w-sm"
          data-testid={testId ? `${testId}-description` : undefined}
        >
          {description}
        </p>
      )}
      {actionLabel && onAction && (
        <Button
          variant="primary"
          onClick={onAction}
          className="mt-4"
          testId={testId ? `${testId}-action` : undefined}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
