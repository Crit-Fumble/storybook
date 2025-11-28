import { clsx } from 'clsx';

export interface BadgeProps {
  variant?: 'default' | 'primary' | 'success' | 'danger' | 'warning';
  children: React.ReactNode;
  testId?: string;
  className?: string;
}

export function Badge({ variant = 'default', children, testId, className }: BadgeProps) {
  return (
    <span
      data-testid={testId}
      className={clsx(
        'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium',
        {
          'bg-cfg-border text-cfg-text-normal': variant === 'default',
          'bg-cfg-primary text-white': variant === 'primary',
          'bg-cfg-green text-white': variant === 'success',
          'bg-cfg-red text-white': variant === 'danger',
          'bg-cfg-yellow text-black': variant === 'warning',
        },
        className
      )}
    >
      {children}
    </span>
  );
}
