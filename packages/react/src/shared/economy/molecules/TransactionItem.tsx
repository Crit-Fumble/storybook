import { clsx } from 'clsx';
import type { ReactNode } from 'react';

export interface TransactionItemProps {
  id: string;
  type: 'tip_received' | 'tip_sent' | 'purchase' | 'earned' | 'refund' | 'payout';
  amount: number;
  currency: 'crit-coins' | 'story-credits' | 'usd';
  currencyIcon: ReactNode;
  description: string;
  timestamp: Date | string;
  from?: string;
  to?: string;
  status?: 'pending' | 'completed' | 'failed';
  className?: string;
  testId?: string;
}

const typeLabels = {
  tip_received: 'Tip Received',
  tip_sent: 'Tip Sent',
  purchase: 'Purchase',
  earned: 'Earned',
  refund: 'Refund',
  payout: 'Payout',
};

const typeColors = {
  tip_received: 'text-cfg-green',
  tip_sent: 'text-cfg-text-muted',
  purchase: 'text-cfg-text-muted',
  earned: 'text-cfg-green',
  refund: 'text-cfg-yellow',
  payout: 'text-cfg-red',
};

const statusColors = {
  pending: 'text-cfg-yellow',
  completed: 'text-cfg-green',
  failed: 'text-cfg-red',
};

export function TransactionItem({
  type,
  amount,
  currencyIcon,
  description,
  timestamp,
  from,
  to,
  status = 'completed',
  className,
  testId,
}: TransactionItemProps) {
  const isPositive = type === 'tip_received' || type === 'earned' || type === 'refund';
  const formattedDate =
    typeof timestamp === 'string'
      ? new Date(timestamp).toLocaleString()
      : timestamp.toLocaleString();

  return (
    <div
      className={clsx(
        'flex items-center justify-between p-4 rounded-lg',
        'bg-cfg-background-secondary border border-cfg-border',
        'hover:border-cfg-primary transition-colors',
        className
      )}
      data-testid={testId}
    >
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-cfg-text-normal">{typeLabels[type]}</span>
          {status !== 'completed' && (
            <span className={clsx('text-xs px-2 py-0.5 rounded', statusColors[status])}>
              {status}
            </span>
          )}
        </div>
        <p className="text-sm text-cfg-text-muted mb-1">{description}</p>
        {(from || to) && (
          <p className="text-xs text-cfg-text-muted">
            {from && <span>From: {from}</span>}
            {from && to && <span className="mx-2">•</span>}
            {to && <span>To: {to}</span>}
          </p>
        )}
        <p className="text-xs text-cfg-text-muted mt-1">{formattedDate}</p>
      </div>

      <div className={clsx('flex items-center gap-1 font-semibold text-lg', typeColors[type])}>
        {currencyIcon}
        <span>{isPositive ? '+' : '-'}{Math.abs(amount).toLocaleString()}</span>
      </div>
    </div>
  );
}
