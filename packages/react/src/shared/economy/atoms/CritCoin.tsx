import { clsx } from 'clsx';

export interface CritCoinProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  testId?: string;
}

const sizeClasses = {
  xs: 'w-4 h-4',
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16',
};

export function CritCoin({ size = 'md', className, testId }: CritCoinProps) {
  return (
    <img
      src="/img/crit-coin.png"
      alt="Crit-Coin"
      className={clsx('inline-block', sizeClasses[size], className)}
      data-testid={testId}
    />
  );
}
