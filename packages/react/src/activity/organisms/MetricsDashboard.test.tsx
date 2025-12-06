
import { render, screen, fireEvent } from '@testing-library/react';
import { MetricsDashboard, type MetricsData, type MetricsPeriod } from './MetricsDashboard';

const createMetricsData = (overrides: Partial<MetricsData> = {}): MetricsData => ({
  commandUsage: {
    total: 150,
    topCommands: [
      { command: 'roll', count: 75 },
      { command: 'help', count: 45 },
      { command: 'character', count: 18 },
      { command: 'campaign', count: 12 },
    ],
  },
  diceStats: {
    totalRolls: 500,
    crits: 25,
    fumbles: 30,
    average: 10.5,
  },
  activeSessions: 3,
  activeCampaigns: 5,
  activeUsers: 42,
  ...overrides,
});

describe('MetricsDashboard', () => {
  describe('Header and period selector', () => {
    it('renders Dashboard header', () => {
      render(
        <MetricsDashboard
          period="24h"
          onPeriodChange={() => {}}
        />
      );

      expect(screen.getByText('Dashboard')).toBeInTheDocument();
    });

    it('renders all period options', () => {
      render(
        <MetricsDashboard
          period="24h"
          onPeriodChange={() => {}}
        />
      );

      expect(screen.getByText('24h')).toBeInTheDocument();
      expect(screen.getByText('7d')).toBeInTheDocument();
      expect(screen.getByText('30d')).toBeInTheDocument();
    });

    it('calls onPeriodChange when period is clicked', () => {
      const handlePeriodChange = jest.fn();
      render(
        <MetricsDashboard
          period="24h"
          onPeriodChange={handlePeriodChange}
        />
      );

      fireEvent.click(screen.getByText('7d'));
      expect(handlePeriodChange).toHaveBeenCalledWith('7d');

      fireEvent.click(screen.getByText('30d'));
      expect(handlePeriodChange).toHaveBeenCalledWith('30d');
    });

    it('highlights active period', () => {
      const { rerender } = render(
        <MetricsDashboard
          period="24h"
          onPeriodChange={() => {}}
        />
      );

      const button24h = screen.getByText('24h');
      expect(button24h).toHaveClass('bg-discord-primary');

      rerender(
        <MetricsDashboard
          period="7d"
          onPeriodChange={() => {}}
        />
      );

      const button7d = screen.getByText('7d');
      expect(button7d).toHaveClass('bg-discord-primary');
    });
  });

  describe('Metrics cards', () => {
    it('shows Commands Used metric', () => {
      render(
        <MetricsDashboard
          data={createMetricsData()}
          period="24h"
          onPeriodChange={() => {}}
        />
      );

      expect(screen.getByText('Commands Used')).toBeInTheDocument();
      expect(screen.getByText('150')).toBeInTheDocument();
    });

    it('shows Dice Rolls metric with average', () => {
      render(
        <MetricsDashboard
          data={createMetricsData()}
          period="24h"
          onPeriodChange={() => {}}
        />
      );

      expect(screen.getByText('Dice Rolls')).toBeInTheDocument();
      expect(screen.getByText('500')).toBeInTheDocument();
      expect(screen.getByText('Avg: 10.5')).toBeInTheDocument();
    });

    it('shows Active Sessions metric', () => {
      render(
        <MetricsDashboard
          data={createMetricsData()}
          period="24h"
          onPeriodChange={() => {}}
        />
      );

      expect(screen.getByText('Active Sessions')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('shows Campaigns metric', () => {
      render(
        <MetricsDashboard
          data={createMetricsData()}
          period="24h"
          onPeriodChange={() => {}}
        />
      );

      expect(screen.getByText('Campaigns')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('shows Active Users metric', () => {
      render(
        <MetricsDashboard
          data={createMetricsData()}
          period="24h"
          onPeriodChange={() => {}}
        />
      );

      expect(screen.getByText('Active Users')).toBeInTheDocument();
      expect(screen.getByText('42')).toBeInTheDocument();
    });

    it('shows 0 values when data is not provided', () => {
      render(
        <MetricsDashboard
          period="24h"
          onPeriodChange={() => {}}
        />
      );

      // Multiple 0 values should be present
      const zeros = screen.getAllByText('0');
      expect(zeros.length).toBeGreaterThanOrEqual(5);
    });
  });

  describe('Dice statistics section', () => {
    it('shows Dice Statistics header', () => {
      render(
        <MetricsDashboard
          data={createMetricsData()}
          period="24h"
          onPeriodChange={() => {}}
        />
      );

      expect(screen.getByText('Dice Statistics')).toBeInTheDocument();
    });

    it('shows crits count', () => {
      render(
        <MetricsDashboard
          data={createMetricsData()}
          period="24h"
          onPeriodChange={() => {}}
        />
      );

      expect(screen.getByText('Critical Hits (Nat 20)')).toBeInTheDocument();
      expect(screen.getByText('25')).toBeInTheDocument();
    });

    it('shows fumbles count', () => {
      render(
        <MetricsDashboard
          data={createMetricsData()}
          period="24h"
          onPeriodChange={() => {}}
        />
      );

      expect(screen.getByText('Fumbles (Nat 1)')).toBeInTheDocument();
      expect(screen.getByText('30')).toBeInTheDocument();
    });

    it('shows average roll', () => {
      render(
        <MetricsDashboard
          data={createMetricsData()}
          period="24h"
          onPeriodChange={() => {}}
        />
      );

      expect(screen.getByText('Average Roll')).toBeInTheDocument();
      expect(screen.getByText('10.50')).toBeInTheDocument();
    });

    it('shows crit and fumble rates when rolls exist', () => {
      render(
        <MetricsDashboard
          data={createMetricsData()}
          period="24h"
          onPeriodChange={() => {}}
        />
      );

      expect(screen.getByText('Crit Rate')).toBeInTheDocument();
      expect(screen.getByText('5.0%')).toBeInTheDocument(); // 25/500

      expect(screen.getByText('Fumble Rate')).toBeInTheDocument();
      expect(screen.getByText('6.0%')).toBeInTheDocument(); // 30/500
    });

    it('does not show rates when no rolls', () => {
      const dataWithNoRolls = createMetricsData({
        diceStats: {
          totalRolls: 0,
          crits: 0,
          fumbles: 0,
          average: 0,
        },
      });

      render(
        <MetricsDashboard
          data={dataWithNoRolls}
          period="24h"
          onPeriodChange={() => {}}
        />
      );

      expect(screen.queryByText('Crit Rate')).not.toBeInTheDocument();
      expect(screen.queryByText('Fumble Rate')).not.toBeInTheDocument();
    });
  });

  describe('Top commands section', () => {
    it('shows Top Commands header', () => {
      render(
        <MetricsDashboard
          data={createMetricsData()}
          period="24h"
          onPeriodChange={() => {}}
        />
      );

      expect(screen.getByText('Top Commands')).toBeInTheDocument();
    });

    it('shows top commands list', () => {
      render(
        <MetricsDashboard
          data={createMetricsData()}
          period="24h"
          onPeriodChange={() => {}}
        />
      );

      expect(screen.getByText('/roll')).toBeInTheDocument();
      expect(screen.getByText('/help')).toBeInTheDocument();
      expect(screen.getByText('/character')).toBeInTheDocument();
      expect(screen.getByText('/campaign')).toBeInTheDocument();
    });

    it('shows command counts', () => {
      render(
        <MetricsDashboard
          data={createMetricsData()}
          period="24h"
          onPeriodChange={() => {}}
        />
      );

      expect(screen.getByText('75')).toBeInTheDocument();
      expect(screen.getByText('45')).toBeInTheDocument();
    });

    it('shows empty message when no commands', () => {
      const dataWithNoCommands = createMetricsData({
        commandUsage: {
          total: 0,
          topCommands: [],
        },
      });

      render(
        <MetricsDashboard
          data={dataWithNoCommands}
          period="24h"
          onPeriodChange={() => {}}
        />
      );

      expect(screen.getByText('No commands used yet')).toBeInTheDocument();
    });
  });

  describe('Loading state', () => {
    it('shows loading skeletons when loading', () => {
      render(
        <MetricsDashboard
          period="24h"
          onPeriodChange={() => {}}
          isLoading={true}
        />
      );

      const dashboard = screen.getByTestId('metrics-dashboard');
      const skeletons = dashboard.querySelectorAll('.animate-pulse');
      expect(skeletons.length).toBeGreaterThan(0);
    });
  });

  describe('TestId and className', () => {
    it('uses default testId', () => {
      render(
        <MetricsDashboard
          period="24h"
          onPeriodChange={() => {}}
        />
      );

      expect(screen.getByTestId('metrics-dashboard')).toBeInTheDocument();
    });

    it('uses custom testId', () => {
      render(
        <MetricsDashboard
          period="24h"
          onPeriodChange={() => {}}
          testId="custom-metrics"
        />
      );

      expect(screen.getByTestId('custom-metrics')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(
        <MetricsDashboard
          period="24h"
          onPeriodChange={() => {}}
          className="custom-class"
        />
      );

      expect(screen.getByTestId('metrics-dashboard')).toHaveClass('custom-class');
    });
  });
});
