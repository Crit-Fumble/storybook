import { render, screen } from '@testing-library/react';
import { CritCoinBalance } from './CritCoinBalance';

describe('CritCoinBalance', () => {
  it('renders balance with default label', () => {
    render(<CritCoinBalance balance={100} testId="balance" />);

    expect(screen.getByText('Crit-Coins:')).toBeInTheDocument();
    expect(screen.getByTestId('balance-amount-amount')).toHaveTextContent('100');
  });

  it('renders with custom label', () => {
    render(<CritCoinBalance balance={50} label="My Coins" testId="balance" />);

    expect(screen.getByText('My Coins:')).toBeInTheDocument();
  });

  it('hides label when showLabel is false', () => {
    render(<CritCoinBalance balance={100} showLabel={false} testId="balance" />);

    expect(screen.queryByText('Crit-Coins:')).not.toBeInTheDocument();
    expect(screen.getByTestId('balance-amount-amount')).toHaveTextContent('100');
  });

  it('formats large numbers with commas', () => {
    render(<CritCoinBalance balance={1000000} testId="balance" />);

    expect(screen.getByTestId('balance-amount-amount')).toHaveTextContent('1,000,000');
  });

  it('renders with small size', () => {
    render(<CritCoinBalance balance={100} size="sm" testId="balance" />);

    expect(screen.getByTestId('balance-amount')).toHaveClass('text-sm');
  });

  it('renders with medium size', () => {
    render(<CritCoinBalance balance={100} size="md" testId="balance" />);

    expect(screen.getByTestId('balance-amount')).toHaveClass('text-base');
  });

  it('renders with large size', () => {
    render(<CritCoinBalance balance={100} size="lg" testId="balance" />);

    expect(screen.getByTestId('balance-amount')).toHaveClass('text-lg');
  });

  it('applies custom className', () => {
    render(<CritCoinBalance balance={100} className="custom-class" testId="balance" />);

    expect(screen.getByTestId('balance')).toHaveClass('custom-class');
  });

  it('has background and border styling', () => {
    render(<CritCoinBalance balance={100} testId="balance" />);

    const container = screen.getByTestId('balance');
    expect(container).toHaveClass('bg-cfg-background-secondary', 'border', 'border-cfg-border');
  });
});
