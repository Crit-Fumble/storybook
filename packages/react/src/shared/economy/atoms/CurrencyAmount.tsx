import { clsx } from 'clsx';
import type { ReactNode } from 'react';

export interface CurrencyAmountProps {
  amount: number;
  icon: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  showPlus?: boolean;
  className?: string;
  testId?: string;
}

const sizeClasses = {
  sm: 'text-sm gap-1',
  md: 'text-base gap-2',
  lg: 'text-lg gap-2',
};

export function CurrencyAmount({
  amount,
  icon,
  size = 'md',
  showPlus = false,
  className,
  testId,
}: CurrencyAmountProps) {
  const formattedAmount = new Intl.NumberFormat('en-US').format(amount);
  const displayAmount = showPlus && amount > 0 ? `+${formattedAmount}` : formattedAmount;

  return (
    <div
      className={clsx('inline-flex items-center font-semibold', sizeClasses[size], className)}
      data-testid={testId}
    >
      {icon}
      <span className="text-cfg-text-normal" data-testid={testId ? `${testId}-amount` : undefined}>
        {displayAmount}
      </span>
    </div>
  );
}
