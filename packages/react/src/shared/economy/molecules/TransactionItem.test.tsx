import { render, screen } from '@testing-library/react';
import { TransactionItem } from './TransactionItem';
import { CritCoin } from '../atoms/CritCoin';

describe('TransactionItem', () => {
  const mockIcon = <CritCoin size="sm" />;
  const mockTimestamp = new Date('2025-01-15T10:30:00');

  it('renders tip received transaction', () => {
    render(
      <TransactionItem
        id="1"
        type="tip_received"
        amount={50}
        currency="crit-coins"
        currencyIcon={mockIcon}
        description="Tip from Player123"
        timestamp={mockTimestamp}
        testId="transaction"
      />
    );

    expect(screen.getByText('Tip Received')).toBeInTheDocument();
    expect(screen.getByText('Tip from Player123')).toBeInTheDocument();
    expect(screen.getByText('+50')).toBeInTheDocument();
  });

  it('renders tip sent transaction with negative amount', () => {
    render(
      <TransactionItem
        id="2"
        type="tip_sent"
        amount={25}
        currency="crit-coins"
        currencyIcon={mockIcon}
        description="Tip to GameMaster"
        timestamp={mockTimestamp}
        testId="transaction"
      />
    );

    expect(screen.getByText('Tip Sent')).toBeInTheDocument();
    expect(screen.getByText('-25')).toBeInTheDocument();
  });

  it('renders purchase transaction', () => {
    render(
      <TransactionItem
        id="3"
        type="purchase"
        amount={100}
        currency="crit-coins"
        currencyIcon={mockIcon}
        description="Purchased item"
        timestamp={mockTimestamp}
        testId="transaction"
      />
    );

    expect(screen.getByText('Purchase')).toBeInTheDocument();
    expect(screen.getByText('-100')).toBeInTheDocument();
  });

  it('renders earned transaction', () => {
    render(
      <TransactionItem
        id="4"
        type="earned"
        amount={75}
        currency="crit-coins"
        currencyIcon={mockIcon}
        description="Quest reward"
        timestamp={mockTimestamp}
        testId="transaction"
      />
    );

    expect(screen.getByText('Earned')).toBeInTheDocument();
    expect(screen.getByText('+75')).toBeInTheDocument();
  });

  it('renders refund transaction', () => {
    render(
      <TransactionItem
        id="5"
        type="refund"
        amount={30}
        currency="crit-coins"
        currencyIcon={mockIcon}
        description="Purchase refund"
        timestamp={mockTimestamp}
        testId="transaction"
      />
    );

    expect(screen.getByText('Refund')).toBeInTheDocument();
    expect(screen.getByText('+30')).toBeInTheDocument();
  });

  it('renders payout transaction', () => {
    render(
      <TransactionItem
        id="6"
        type="payout"
        amount={500}
        currency="usd"
        currencyIcon={mockIcon}
        description="PayPal payout"
        timestamp={mockTimestamp}
        testId="transaction"
      />
    );

    expect(screen.getByText('Payout')).toBeInTheDocument();
    expect(screen.getByText('-500')).toBeInTheDocument();
  });

  it('shows pending status badge', () => {
    render(
      <TransactionItem
        id="7"
        type="payout"
        amount={100}
        currency="crit-coins"
        currencyIcon={mockIcon}
        description="Pending payout"
        timestamp={mockTimestamp}
        status="pending"
        testId="transaction"
      />
    );

    expect(screen.getByText('pending')).toBeInTheDocument();
  });

  it('shows failed status badge', () => {
    render(
      <TransactionItem
        id="8"
        type="purchase"
        amount={50}
        currency="crit-coins"
        currencyIcon={mockIcon}
        description="Failed purchase"
        timestamp={mockTimestamp}
        status="failed"
        testId="transaction"
      />
    );

    expect(screen.getByText('failed')).toBeInTheDocument();
  });

  it('does not show completed status badge', () => {
    render(
      <TransactionItem
        id="9"
        type="earned"
        amount={25}
        currency="crit-coins"
        currencyIcon={mockIcon}
        description="Completed transaction"
        timestamp={mockTimestamp}
        status="completed"
        testId="transaction"
      />
    );

    expect(screen.queryByText('completed')).not.toBeInTheDocument();
  });

  it('renders from and to information', () => {
    render(
      <TransactionItem
        id="10"
        type="tip_received"
        amount={50}
        currency="crit-coins"
        currencyIcon={mockIcon}
        description="Tip transaction"
        timestamp={mockTimestamp}
        from="Player123"
        to="GameMaster"
        testId="transaction"
      />
    );

    expect(screen.getByText(/From: Player123/)).toBeInTheDocument();
    expect(screen.getByText(/To: GameMaster/)).toBeInTheDocument();
  });

  it('renders only from when to is not provided', () => {
    render(
      <TransactionItem
        id="11"
        type="tip_received"
        amount={50}
        currency="crit-coins"
        currencyIcon={mockIcon}
        description="Tip transaction"
        timestamp={mockTimestamp}
        from="Player123"
        testId="transaction"
      />
    );

    expect(screen.getByText(/From: Player123/)).toBeInTheDocument();
    expect(screen.queryByText(/To:/)).not.toBeInTheDocument();
  });

  it('formats timestamp correctly', () => {
    render(
      <TransactionItem
        id="12"
        type="earned"
        amount={25}
        currency="crit-coins"
        currencyIcon={mockIcon}
        description="Test"
        timestamp={mockTimestamp}
        testId="transaction"
      />
    );

    expect(screen.getByText(mockTimestamp.toLocaleString())).toBeInTheDocument();
  });

  it('accepts string timestamp', () => {
    const stringTimestamp = '2025-01-15T10:30:00';
    render(
      <TransactionItem
        id="13"
        type="earned"
        amount={25}
        currency="crit-coins"
        currencyIcon={mockIcon}
        description="Test"
        timestamp={stringTimestamp}
        testId="transaction"
      />
    );

    expect(screen.getByText(new Date(stringTimestamp).toLocaleString())).toBeInTheDocument();
  });

  it('formats large amounts with commas', () => {
    render(
      <TransactionItem
        id="14"
        type="earned"
        amount={1000000}
        currency="crit-coins"
        currencyIcon={mockIcon}
        description="Big reward"
        timestamp={mockTimestamp}
        testId="transaction"
      />
    );

    expect(screen.getByText('+1,000,000')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <TransactionItem
        id="15"
        type="earned"
        amount={25}
        currency="crit-coins"
        currencyIcon={mockIcon}
        description="Test"
        timestamp={mockTimestamp}
        className="custom-class"
        testId="transaction"
      />
    );

    expect(screen.getByTestId('transaction')).toHaveClass('custom-class');
  });

  it('has hover effect styling', () => {
    render(
      <TransactionItem
        id="16"
        type="earned"
        amount={25}
        currency="crit-coins"
        currencyIcon={mockIcon}
        description="Test"
        timestamp={mockTimestamp}
        testId="transaction"
      />
    );

    expect(screen.getByTestId('transaction')).toHaveClass('hover:border-cfg-primary');
  });
});
