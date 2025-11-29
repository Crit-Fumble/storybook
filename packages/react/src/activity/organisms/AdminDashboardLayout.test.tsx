import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AdminDashboardLayout, type AdminTab } from './AdminDashboardLayout';

const defaultProps = {
  serverName: 'Test Server',
  dashboardContent: <div data-testid="dashboard-content">Dashboard Content</div>,
  promptsContent: <div data-testid="prompts-content">Prompts Content</div>,
  activityContent: <div data-testid="activity-content">Activity Content</div>,
  settingsContent: <div data-testid="settings-content">Settings Content</div>,
};

describe('AdminDashboardLayout', () => {
  describe('Header', () => {
    it('renders server name', () => {
      render(<AdminDashboardLayout {...defaultProps} />);
      expect(screen.getByText('Test Server')).toBeInTheDocument();
    });

    it('shows Admin Dashboard subtitle', () => {
      render(<AdminDashboardLayout {...defaultProps} />);
      expect(screen.getByText('Admin Dashboard')).toBeInTheDocument();
    });

    it('shows first letter of server name when no icon provided', () => {
      render(<AdminDashboardLayout {...defaultProps} serverName="Dragon Server" />);
      expect(screen.getByText('D')).toBeInTheDocument();
    });

    it('shows server icon when provided', () => {
      render(
        <AdminDashboardLayout
          {...defaultProps}
          serverIcon="https://example.com/icon.png"
        />
      );

      const img = screen.getByAltText('Test Server');
      expect(img).toHaveAttribute('src', 'https://example.com/icon.png');
    });
  });

  describe('Back button', () => {
    it('shows back button when onBack is provided', () => {
      const handleBack = vi.fn();
      render(<AdminDashboardLayout {...defaultProps} onBack={handleBack} />);

      const backButton = screen.getByLabelText('Go back');
      expect(backButton).toBeInTheDocument();
    });

    it('does not show back button when onBack is not provided', () => {
      render(<AdminDashboardLayout {...defaultProps} />);
      expect(screen.queryByLabelText('Go back')).not.toBeInTheDocument();
    });

    it('calls onBack when back button is clicked', () => {
      const handleBack = vi.fn();
      render(<AdminDashboardLayout {...defaultProps} onBack={handleBack} />);

      fireEvent.click(screen.getByLabelText('Go back'));
      expect(handleBack).toHaveBeenCalledTimes(1);
    });
  });

  describe('Tab navigation', () => {
    it('renders all tabs', () => {
      render(<AdminDashboardLayout {...defaultProps} />);

      expect(screen.getByText('Dashboard')).toBeInTheDocument();
      expect(screen.getByText('Prompt Partials')).toBeInTheDocument();
      expect(screen.getByText('Activity')).toBeInTheDocument();
      expect(screen.getByText('Settings')).toBeInTheDocument();
    });

    it('shows dashboard tab by default', () => {
      render(<AdminDashboardLayout {...defaultProps} />);
      expect(screen.getByTestId('dashboard-content')).toBeInTheDocument();
    });

    it('uses initialTab when provided', () => {
      render(<AdminDashboardLayout {...defaultProps} initialTab="prompts" />);
      expect(screen.getByTestId('prompts-content')).toBeInTheDocument();
    });

    it('switches to prompts tab when clicked', () => {
      render(<AdminDashboardLayout {...defaultProps} />);

      fireEvent.click(screen.getByText('Prompt Partials'));
      expect(screen.getByTestId('prompts-content')).toBeInTheDocument();
      expect(screen.queryByTestId('dashboard-content')).not.toBeInTheDocument();
    });

    it('switches to activity tab when clicked', () => {
      render(<AdminDashboardLayout {...defaultProps} />);

      fireEvent.click(screen.getByText('Activity'));
      expect(screen.getByTestId('activity-content')).toBeInTheDocument();
    });

    it('switches to settings tab when clicked', () => {
      render(<AdminDashboardLayout {...defaultProps} />);

      fireEvent.click(screen.getByText('Settings'));
      expect(screen.getByTestId('settings-content')).toBeInTheDocument();
    });

    it('switches back to dashboard tab', () => {
      render(<AdminDashboardLayout {...defaultProps} initialTab="settings" />);

      fireEvent.click(screen.getByText('Dashboard'));
      expect(screen.getByTestId('dashboard-content')).toBeInTheDocument();
    });
  });

  describe('Tab change callback', () => {
    it('calls onTabChange when tab is changed', () => {
      const handleTabChange = vi.fn();
      render(
        <AdminDashboardLayout {...defaultProps} onTabChange={handleTabChange} />
      );

      fireEvent.click(screen.getByText('Prompt Partials'));
      expect(handleTabChange).toHaveBeenCalledWith('prompts');
    });

    it('calls onTabChange with correct tab id', () => {
      const handleTabChange = vi.fn();
      render(
        <AdminDashboardLayout {...defaultProps} onTabChange={handleTabChange} />
      );

      const tabsToTest: AdminTab[] = ['prompts', 'activity', 'settings', 'dashboard'];
      const tabLabels = ['Prompt Partials', 'Activity', 'Settings', 'Dashboard'];

      tabsToTest.forEach((tab, index) => {
        fireEvent.click(screen.getByText(tabLabels[index]));
        expect(handleTabChange).toHaveBeenLastCalledWith(tab);
      });
    });
  });

  describe('Content rendering', () => {
    it('renders dashboard content when on dashboard tab', () => {
      render(<AdminDashboardLayout {...defaultProps} initialTab="dashboard" />);
      expect(screen.getByText('Dashboard Content')).toBeInTheDocument();
    });

    it('renders prompts content when on prompts tab', () => {
      render(<AdminDashboardLayout {...defaultProps} initialTab="prompts" />);
      expect(screen.getByText('Prompts Content')).toBeInTheDocument();
    });

    it('renders activity content when on activity tab', () => {
      render(<AdminDashboardLayout {...defaultProps} initialTab="activity" />);
      expect(screen.getByText('Activity Content')).toBeInTheDocument();
    });

    it('renders settings content when on settings tab', () => {
      render(<AdminDashboardLayout {...defaultProps} initialTab="settings" />);
      expect(screen.getByText('Settings Content')).toBeInTheDocument();
    });

    it('only renders one tab content at a time', () => {
      render(<AdminDashboardLayout {...defaultProps} initialTab="dashboard" />);

      expect(screen.getByTestId('dashboard-content')).toBeInTheDocument();
      expect(screen.queryByTestId('prompts-content')).not.toBeInTheDocument();
      expect(screen.queryByTestId('activity-content')).not.toBeInTheDocument();
      expect(screen.queryByTestId('settings-content')).not.toBeInTheDocument();
    });
  });

  describe('TestId and className', () => {
    it('uses default testId', () => {
      render(<AdminDashboardLayout {...defaultProps} />);
      expect(screen.getByTestId('admin-dashboard-layout')).toBeInTheDocument();
    });

    it('uses custom testId', () => {
      render(<AdminDashboardLayout {...defaultProps} testId="custom-layout" />);
      expect(screen.getByTestId('custom-layout')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<AdminDashboardLayout {...defaultProps} className="custom-class" />);
      expect(screen.getByTestId('admin-dashboard-layout')).toHaveClass('custom-class');
    });
  });
});
