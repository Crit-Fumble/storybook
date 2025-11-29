import { clsx } from 'clsx';

export interface BannerProps {
  /** Visual style variant */
  variant?: 'warning' | 'info' | 'success' | 'danger';
  /** Banner content */
  children: React.ReactNode;
  /** Optional test ID */
  testId?: string;
  /** Additional CSS classes */
  className?: string;
  /** Whether the banner is sticky at top */
  sticky?: boolean;
  /** Callback when dismiss button is clicked */
  onDismiss?: () => void;
}

export function Banner({
  variant = 'warning',
  children,
  testId,
  className,
  sticky = false,
  onDismiss,
}: BannerProps) {
  return (
    <div
      data-testid={testId}
      role="alert"
      className={clsx(
        'py-2 px-4 font-semibold text-sm z-50 flex items-center justify-between',
        {
          'bg-cfg-yellow text-black': variant === 'warning',
          'bg-cfg-primary text-white': variant === 'info',
          'bg-cfg-green text-white': variant === 'success',
          'bg-cfg-red text-white': variant === 'danger',
          'sticky top-0': sticky,
        },
        className
      )}
    >
      <span className="flex-1 text-center">{children}</span>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="ml-4 opacity-70 hover:opacity-100 transition-opacity"
          aria-label="Dismiss"
          data-testid={testId ? `${testId}-dismiss` : undefined}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
