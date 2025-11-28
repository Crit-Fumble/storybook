import { clsx } from 'clsx';

export interface TypingIndicatorProps {
  /** Additional CSS classes */
  className?: string;
  /** Optional test ID */
  testId?: string;
}

export function TypingIndicator({ className, testId }: TypingIndicatorProps) {
  return (
    <div
      data-testid={testId}
      className={clsx('flex justify-start', className)}
    >
      <div className="bg-cfg-bg-secondary px-3 py-2 rounded-lg">
        <div className="flex gap-1">
          <span
            className="w-2 h-2 bg-cfg-text-muted rounded-full animate-bounce"
            style={{ animationDelay: '0ms' }}
          />
          <span
            className="w-2 h-2 bg-cfg-text-muted rounded-full animate-bounce"
            style={{ animationDelay: '150ms' }}
          />
          <span
            className="w-2 h-2 bg-cfg-text-muted rounded-full animate-bounce"
            style={{ animationDelay: '300ms' }}
          />
        </div>
      </div>
    </div>
  );
}
