import { render, screen } from '@testing-library/react';
import { StoryCreditBalance } from './StoryCreditBalance';

describe('StoryCreditBalance', () => {
  it('renders balance with default label', () => {
    render(<StoryCreditBalance balance={25} testId="balance" />);

    expect(screen.getByText('Story Credits:')).toBeInTheDocument();
    expect(screen.getByTestId('balance-amount-amount')).toHaveTextContent('25');
  });

  it('renders with custom label', () => {
    render(<StoryCreditBalance balance={10} label="My Credits" testId="balance" />);

    expect(screen.getByText('My Credits:')).toBeInTheDocument();
  });

  it('hides label when showLabel is false', () => {
    render(<StoryCreditBalance balance={25} showLabel={false} testId="balance" />);

    expect(screen.queryByText('Story Credits:')).not.toBeInTheDocument();
    expect(screen.getByTestId('balance-amount-amount')).toHaveTextContent('25');
  });

  it('formats large numbers with commas', () => {
    render(<StoryCreditBalance balance={5000} testId="balance" />);

    expect(screen.getByTestId('balance-amount-amount')).toHaveTextContent('5,000');
  });

  it('renders with small size', () => {
    render(<StoryCreditBalance balance={25} size="sm" testId="balance" />);

    expect(screen.getByTestId('balance-amount')).toHaveClass('text-sm');
  });

  it('renders with medium size', () => {
    render(<StoryCreditBalance balance={25} size="md" testId="balance" />);

    expect(screen.getByTestId('balance-amount')).toHaveClass('text-base');
  });

  it('renders with large size', () => {
    render(<StoryCreditBalance balance={25} size="lg" testId="balance" />);

    expect(screen.getByTestId('balance-amount')).toHaveClass('text-lg');
  });

  it('applies custom className', () => {
    render(<StoryCreditBalance balance={25} className="custom-class" testId="balance" />);

    expect(screen.getByTestId('balance')).toHaveClass('custom-class');
  });

  it('has background and border styling', () => {
    render(<StoryCreditBalance balance={25} testId="balance" />);

    const container = screen.getByTestId('balance');
    expect(container).toHaveClass('bg-cfg-background-secondary', 'border', 'border-cfg-border');
  });
});
