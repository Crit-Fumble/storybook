import { render, screen } from '@testing-library/react';
import { EconomyDashboard } from './EconomyDashboard';

describe('EconomyDashboard', () => {
  const mockStats = {
    critCoins: 1250,
    storyCredits: 45,
    totalEarned: 5000,
    totalSpent: 3750,
    pendingPayouts: 500,
  };

  it('renders crit-coin balance', () => {
    render(<EconomyDashboard stats={mockStats} testId="dashboard" />);

    expect(screen.getByTestId('dashboard-crit-coins-amount-amount')).toHaveTextContent('1,250');
  });

  it('renders story credit balance', () => {
    render(<EconomyDashboard stats={mockStats} testId="dashboard" />);

    expect(screen.getByTestId('dashboard-story-credits-amount-amount')).toHaveTextContent('45');
  });

  it('renders total earned stat', () => {
    render(<EconomyDashboard stats={mockStats} testId="dashboard" />);

    expect(screen.getByText('Total Earned')).toBeInTheDocument();
    expect(screen.getByText('5,000')).toBeInTheDocument();
  });

  it('renders total spent stat', () => {
    render(<EconomyDashboard stats={mockStats} testId="dashboard" />);

    expect(screen.getByText('Total Spent')).toBeInTheDocument();
    expect(screen.getByText('3,750')).toBeInTheDocument();
  });

  it('renders pending payouts stat', () => {
    render(<EconomyDashboard stats={mockStats} testId="dashboard" />);

    expect(screen.getByText('Pending Payouts')).toBeInTheDocument();
    expect(screen.getByText('500')).toBeInTheDocument();
  });

  it('hides detailed stats when showDetailedStats is false', () => {
    render(<EconomyDashboard stats={mockStats} showDetailedStats={false} testId="dashboard" />);

    expect(screen.queryByText('Total Earned')).not.toBeInTheDocument();
    expect(screen.queryByText('Total Spent')).not.toBeInTheDocument();
    expect(screen.queryByText('Pending Payouts')).not.toBeInTheDocument();
  });

  it('still shows balances when detailed stats are hidden', () => {
    render(<EconomyDashboard stats={mockStats} showDetailedStats={false} testId="dashboard" />);

    expect(screen.getByTestId('dashboard-crit-coins-amount-amount')).toHaveTextContent('1,250');
    expect(screen.getByTestId('dashboard-story-credits-amount-amount')).toHaveTextContent('45');
  });

  it('renders with zero balances', () => {
    const zeroStats = {
      critCoins: 0,
      storyCredits: 0,
      totalEarned: 0,
      totalSpent: 0,
      pendingPayouts: 0,
    };

    render(<EconomyDashboard stats={zeroStats} testId="dashboard" />);

    expect(screen.getByTestId('dashboard-crit-coins-amount-amount')).toHaveTextContent('0');
    expect(screen.getByTestId('dashboard-story-credits-amount-amount')).toHaveTextContent('0');
  });

  it('renders with large numbers', () => {
    const largeStats = {
      critCoins: 1000000,
      storyCredits: 5000,
      totalEarned: 10000000,
      totalSpent: 7500000,
      pendingPayouts: 50000,
    };

    render(<EconomyDashboard stats={largeStats} testId="dashboard" />);

    expect(screen.getByTestId('dashboard-crit-coins-amount-amount')).toHaveTextContent('1,000,000');
    expect(screen.getByTestId('dashboard-story-credits-amount-amount')).toHaveTextContent('5,000');
    expect(screen.getByText('10,000,000')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<EconomyDashboard stats={mockStats} className="custom-class" testId="dashboard" />);

    expect(screen.getByTestId('dashboard')).toHaveClass('custom-class');
  });

  it('uses large size for balance displays', () => {
    render(<EconomyDashboard stats={mockStats} testId="dashboard" />);

    expect(screen.getByTestId('dashboard-crit-coins-amount')).toHaveClass('text-lg');
    expect(screen.getByTestId('dashboard-story-credits-amount')).toHaveClass('text-lg');
  });

  it('applies correct color to total earned', () => {
    const { container } = render(<EconomyDashboard stats={mockStats} testId="dashboard" />);

    const earnedElement = screen.getByText('5,000');
    expect(earnedElement).toHaveClass('text-cfg-green');
  });

  it('applies correct color to pending payouts', () => {
    const { container } = render(<EconomyDashboard stats={mockStats} testId="dashboard" />);

    const payoutsElement = screen.getByText('500');
    expect(payoutsElement).toHaveClass('text-cfg-yellow');
  });
});
