import { render, screen } from '@testing-library/react';
import { CurrencyAmount } from './CurrencyAmount';

describe('CurrencyAmount', () => {
  it('renders amount with icon', () => {
    render(<CurrencyAmount amount={100} icon={<span>$</span>} testId="amount" />);

    expect(screen.getByTestId('amount-amount')).toHaveTextContent('100');
  });

  it('formats large numbers with commas', () => {
    render(<CurrencyAmount amount={1000000} icon={<span>$</span>} testId="amount" />);

    expect(screen.getByTestId('amount-amount')).toHaveTextContent('1,000,000');
  });

  it('shows plus sign when showPlus is true and amount is positive', () => {
    render(<CurrencyAmount amount={50} icon={<span>$</span>} showPlus testId="amount" />);

    expect(screen.getByTestId('amount-amount')).toHaveTextContent('+50');
  });

  it('does not show plus sign for negative amounts', () => {
    render(<CurrencyAmount amount={-50} icon={<span>$</span>} showPlus testId="amount" />);

    expect(screen.getByTestId('amount-amount')).toHaveTextContent('-50');
  });

  it('does not show plus sign when showPlus is false', () => {
    render(<CurrencyAmount amount={50} icon={<span>$</span>} showPlus={false} testId="amount" />);

    expect(screen.getByTestId('amount-amount')).toHaveTextContent('50');
    expect(screen.getByTestId('amount-amount')).not.toHaveTextContent('+50');
  });

  it('renders with small size', () => {
    render(<CurrencyAmount amount={100} icon={<span>$</span>} size="sm" testId="amount" />);

    expect(screen.getByTestId('amount')).toHaveClass('text-sm');
  });

  it('renders with large size', () => {
    render(<CurrencyAmount amount={100} icon={<span>$</span>} size="lg" testId="amount" />);

    expect(screen.getByTestId('amount')).toHaveClass('text-lg');
  });

  it('applies custom className', () => {
    render(<CurrencyAmount amount={100} icon={<span>$</span>} className="custom-class" testId="amount" />);

    expect(screen.getByTestId('amount')).toHaveClass('custom-class');
  });
});
