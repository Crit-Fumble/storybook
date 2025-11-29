import { clsx } from 'clsx';

export interface BadgeProps {
  variant?: 'default' | 'primary' | 'success' | 'danger' | 'warning';
  size?: 'sm' | 'md';
  children: React.ReactNode;
  testId?: string;
  className?: string;
}

const sizeClasses = {
  sm: 'px-1.5 py-0.5 text-[10px]',
  md: 'px-2 py-0.5 text-xs',
};

export function Badge({ variant = 'default', size = 'md', children, testId, className }: BadgeProps) {
  return (
    <span
      data-testid={testId}
      className={clsx(
        'inline-flex items-center rounded font-medium',
        sizeClasses[size],
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
