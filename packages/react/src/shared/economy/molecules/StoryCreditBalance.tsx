import { clsx } from 'clsx';
import { StoryCredit } from '../atoms/StoryCredit';
import { CurrencyAmount } from '../atoms/CurrencyAmount';

export interface StoryCreditBalanceProps {
  balance: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
  testId?: string;
}

export function StoryCreditBalance({
  balance,
  label = 'Story Credits',
  size = 'md',
  showLabel = true,
  className,
  testId,
}: StoryCreditBalanceProps) {
  const iconSize = size === 'lg' ? 'md' : size === 'md' ? 'sm' : 'xs';

  return (
    <div
      className={clsx(
        'inline-flex items-center gap-2 px-3 py-2 rounded-lg',
        'bg-cfg-background-secondary border border-cfg-border',
        className
      )}
      data-testid={testId}
    >
      {showLabel && (
        <span className="text-cfg-text-muted text-sm font-medium">{label}:</span>
      )}
      <CurrencyAmount
        amount={balance}
        icon={<StoryCredit size={iconSize} />}
        size={size}
        testId={testId ? `${testId}-amount` : undefined}
      />
    </div>
  );
}
