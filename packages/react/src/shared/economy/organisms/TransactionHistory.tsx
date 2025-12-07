import { clsx } from 'clsx';
import { TransactionItem, type TransactionItemProps } from '../molecules/TransactionItem';
import { EmptyState } from '../../molecules/EmptyState';

export interface TransactionHistoryProps {
  transactions: Omit<TransactionItemProps, 'testId'>[];
  isLoading?: boolean;
  emptyMessage?: string;
  className?: string;
  testId?: string;
}

export function TransactionHistory({
  transactions,
  isLoading = false,
  emptyMessage = 'No transactions yet',
  className,
  testId,
}: TransactionHistoryProps) {
  if (isLoading) {
    return (
      <div className={clsx('p-8 text-center', className)} data-testid={testId}>
        <div className="animate-spin w-8 h-8 border-2 border-cfg-primary border-t-transparent rounded-full mx-auto" />
        <p className="text-cfg-text-muted mt-4">Loading transactions...</p>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <EmptyState
        title="No Transactions"
        description={emptyMessage}
        icon="📊"
        className={className}
        testId={testId}
      />
    );
  }

  return (
    <div className={clsx('space-y-2', className)} data-testid={testId}>
      {transactions.map((transaction, index) => (
        <TransactionItem
          key={transaction.id}
          {...transaction}
          testId={testId ? `${testId}-transaction-${index}` : undefined}
        />
      ))}
    </div>
  );
}
