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
}

export function Banner({
  variant = 'warning',
  children,
  testId,
  className,
  sticky = false,
}: BannerProps) {
  return (
    <div
      data-testid={testId}
      className={clsx(
        'py-2 px-4 text-center font-semibold text-sm z-50',
        {
          'bg-discord-yellow text-black': variant === 'warning',
          'bg-discord-primary text-white': variant === 'info',
          'bg-discord-green text-white': variant === 'success',
          'bg-discord-red text-white': variant === 'danger',
          'sticky top-0': sticky,
        },
        className
      )}
    >
      {children}
    </div>
  );
}
