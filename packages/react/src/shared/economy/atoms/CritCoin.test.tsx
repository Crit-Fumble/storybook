import { render, screen } from '@testing-library/react';
import { CritCoin } from './CritCoin';

describe('CritCoin', () => {
  it('renders with default medium size', () => {
    render(<CritCoin testId="coin" />);

    const img = screen.getByTestId('coin');
    expect(img).toBeInTheDocument();
    expect(img).toHaveClass('w-8', 'h-8');
  });

  it('renders with xs size', () => {
    render(<CritCoin size="xs" testId="coin" />);

    expect(screen.getByTestId('coin')).toHaveClass('w-4', 'h-4');
  });

  it('renders with sm size', () => {
    render(<CritCoin size="sm" testId="coin" />);

    expect(screen.getByTestId('coin')).toHaveClass('w-6', 'h-6');
  });

  it('renders with lg size', () => {
    render(<CritCoin size="lg" testId="coin" />);

    expect(screen.getByTestId('coin')).toHaveClass('w-12', 'h-12');
  });

  it('renders with xl size', () => {
    render(<CritCoin size="xl" testId="coin" />);

    expect(screen.getByTestId('coin')).toHaveClass('w-16', 'h-16');
  });

  it('has correct image source', () => {
    render(<CritCoin testId="coin" />);

    expect(screen.getByTestId('coin')).toHaveAttribute('src', '/img/crit-coin.png');
  });

  it('has alt text', () => {
    render(<CritCoin testId="coin" />);

    expect(screen.getByTestId('coin')).toHaveAttribute('alt', 'Crit-Coin');
  });

  it('applies custom className', () => {
    render(<CritCoin className="custom-class" testId="coin" />);

    expect(screen.getByTestId('coin')).toHaveClass('custom-class');
  });
});
