
import { render, screen } from '@testing-library/react';
import { MetricsCard } from './MetricsCard';

describe('MetricsCard', () => {
  describe('rendering', () => {
    it('renders title', () => {
      render(<MetricsCard title="Total Users" value={100} />);
      expect(screen.getByText('Total Users')).toBeInTheDocument();
    });

    it('renders numeric value', () => {
      render(<MetricsCard title="Users" value={1234} />);
      expect(screen.getByText('1234')).toBeInTheDocument();
    });

    it('renders string value', () => {
      render(<MetricsCard title="Status" value="Active" />);
      expect(screen.getByText('Active')).toBeInTheDocument();
    });

    it('applies default testId', () => {
      render(<MetricsCard title="Test" value={0} />);
      expect(screen.getByTestId('metrics-card')).toBeInTheDocument();
    });

    it('applies custom testId', () => {
      render(<MetricsCard title="Test" value={0} testId="custom-metrics" />);
      expect(screen.getByTestId('custom-metrics')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<MetricsCard title="Test" value={0} className="custom-class" />);
      expect(screen.getByTestId('metrics-card')).toHaveClass('custom-class');
    });
  });

  describe('subtitle', () => {
    it('renders subtitle when provided', () => {
      render(<MetricsCard title="Users" value={100} subtitle="Last 30 days" />);
      expect(screen.getByText('Last 30 days')).toBeInTheDocument();
    });

    it('does not render subtitle when not provided', () => {
      render(<MetricsCard title="Users" value={100} />);
      expect(screen.queryByText('Last 30 days')).not.toBeInTheDocument();
    });
  });

  describe('icon', () => {
    it('renders icon when provided', () => {
      render(
        <MetricsCard
          title="Users"
          value={100}
          icon={<span data-testid="test-icon">Icon</span>}
        />
      );
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });

    it('does not render icon container when not provided', () => {
      render(<MetricsCard title="Users" value={100} />);
      expect(screen.queryByText('Icon')).not.toBeInTheDocument();
    });
  });

  describe('trend', () => {
    it('renders up trend with green color', () => {
      render(
        <MetricsCard
          title="Users"
          value={100}
          trend={{ direction: 'up', value: '+10%' }}
        />
      );
      expect(screen.getByText('+10%')).toBeInTheDocument();
      expect(screen.getByText('+10%').parentElement).toHaveClass('text-discord-green');
    });

    it('renders down trend with red color', () => {
      render(
        <MetricsCard
          title="Users"
          value={100}
          trend={{ direction: 'down', value: '-5%' }}
        />
      );
      expect(screen.getByText('-5%')).toBeInTheDocument();
      expect(screen.getByText('-5%').parentElement).toHaveClass('text-discord-red');
    });

    it('renders neutral trend with muted color', () => {
      render(
        <MetricsCard
          title="Users"
          value={100}
          trend={{ direction: 'neutral', value: '0%' }}
        />
      );
      expect(screen.getByText('0%')).toBeInTheDocument();
      expect(screen.getByText('0%').parentElement).toHaveClass('text-discord-text-muted');
    });

    it('renders up arrow for up trend', () => {
      render(
        <MetricsCard
          title="Users"
          value={100}
          trend={{ direction: 'up', value: '+10%' }}
        />
      );
      const svg = screen.getByText('+10%').parentElement?.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('renders down arrow for down trend', () => {
      render(
        <MetricsCard
          title="Users"
          value={100}
          trend={{ direction: 'down', value: '-5%' }}
        />
      );
      const svg = screen.getByText('-5%').parentElement?.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('does not render arrow for neutral trend', () => {
      render(
        <MetricsCard
          title="Users"
          value={100}
          trend={{ direction: 'neutral', value: '0%' }}
        />
      );
      const svg = screen.getByText('0%').parentElement?.querySelector('svg');
      expect(svg).not.toBeInTheDocument();
    });
  });

  describe('loading state', () => {
    it('shows loading skeleton when isLoading is true', () => {
      render(<MetricsCard title="Users" value={100} isLoading={true} />);
      expect(screen.getByTestId('metrics-card')).toHaveClass('animate-pulse');
    });

    it('does not show title when loading', () => {
      render(<MetricsCard title="Users" value={100} isLoading={true} />);
      expect(screen.queryByText('Users')).not.toBeInTheDocument();
    });

    it('does not show value when loading', () => {
      render(<MetricsCard title="Users" value={100} isLoading={true} />);
      expect(screen.queryByText('100')).not.toBeInTheDocument();
    });

    it('shows placeholder elements when loading', () => {
      render(<MetricsCard title="Users" value={100} isLoading={true} />);
      const container = screen.getByTestId('metrics-card');
      const placeholders = container.querySelectorAll('.bg-discord-background-tertiary');
      expect(placeholders.length).toBeGreaterThan(0);
    });
  });
});
