import { render, screen } from '@testing-library/react';
import { TransactionHistory } from './TransactionHistory';
import { CritCoin } from '../atoms/CritCoin';

describe('TransactionHistory', () => {
  const mockTransactions = [
    {
      id: '1',
      type: 'tip_received' as const,
      amount: 50,
      currency: 'crit-coins' as const,
      currencyIcon: <CritCoin size="sm" />,
      description: 'Tip from Player1',
      timestamp: new Date('2025-01-15T10:00:00'),
    },
    {
      id: '2',
      type: 'tip_sent' as const,
      amount: 25,
      currency: 'crit-coins' as const,
      currencyIcon: <CritCoin size="sm" />,
      description: 'Tip to GameMaster',
      timestamp: new Date('2025-01-14T15:00:00'),
    },
    {
      id: '3',
      type: 'earned' as const,
      amount: 100,
      currency: 'crit-coins' as const,
      currencyIcon: <CritCoin size="sm" />,
      description: 'Quest reward',
      timestamp: new Date('2025-01-13T12:00:00'),
    },
  ];

  it('renders all transactions', () => {
    render(<TransactionHistory transactions={mockTransactions} testId="history" />);

    expect(screen.getByText('Tip from Player1')).toBeInTheDocument();
    expect(screen.getByText('Tip to GameMaster')).toBeInTheDocument();
    expect(screen.getByText('Quest reward')).toBeInTheDocument();
  });

  it('renders loading state', () => {
    render(<TransactionHistory transactions={[]} isLoading testId="history" />);

    expect(screen.getByText('Loading transactions...')).toBeInTheDocument();
  });

  it('renders empty state when no transactions', () => {
    render(<TransactionHistory transactions={[]} testId="history" />);

    expect(screen.getByText('No Transactions')).toBeInTheDocument();
    expect(screen.getByText('No transactions yet')).toBeInTheDocument();
  });

  it('shows custom empty message', () => {
    render(
      <TransactionHistory
        transactions={[]}
        emptyMessage="You haven't made any transactions"
        testId="history"
      />
    );

    expect(screen.getByText("You haven't made any transactions")).toBeInTheDocument();
  });

  it('renders transactions with correct testIds', () => {
    render(<TransactionHistory transactions={mockTransactions} testId="history" />);

    expect(screen.getByTestId('history-transaction-0')).toBeInTheDocument();
    expect(screen.getByTestId('history-transaction-1')).toBeInTheDocument();
    expect(screen.getByTestId('history-transaction-2')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <TransactionHistory
        transactions={mockTransactions}
        className="custom-class"
        testId="history"
      />
    );

    expect(screen.getByTestId('history')).toHaveClass('custom-class');
  });

  it('applies custom className to loading state', () => {
    render(
      <TransactionHistory transactions={[]} isLoading className="custom-class" testId="history" />
    );

    expect(screen.getByTestId('history')).toHaveClass('custom-class');
  });

  it('shows loading spinner during loading', () => {
    const { container } = render(<TransactionHistory transactions={[]} isLoading testId="history" />);

    const spinner = container.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
  });

  it('does not render transactions when loading', () => {
    render(<TransactionHistory transactions={mockTransactions} isLoading testId="history" />);

    expect(screen.queryByText('Tip from Player1')).not.toBeInTheDocument();
    expect(screen.getByText('Loading transactions...')).toBeInTheDocument();
  });

  it('renders single transaction', () => {
    render(<TransactionHistory transactions={[mockTransactions[0]]} testId="history" />);

    expect(screen.getByText('Tip from Player1')).toBeInTheDocument();
    expect(screen.queryByText('Tip to GameMaster')).not.toBeInTheDocument();
  });
});
