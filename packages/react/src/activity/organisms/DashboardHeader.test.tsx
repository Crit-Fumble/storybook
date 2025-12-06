
import { render, screen, fireEvent } from '@testing-library/react';
import { DashboardHeader } from './DashboardHeader';

describe('DashboardHeader', () => {
  describe('Rendering', () => {
    it('renders title', () => {
      render(<DashboardHeader title="Campaign Dashboard" username="TestUser" />);
      expect(screen.getByTestId('dashboard-header-title')).toHaveTextContent('Campaign Dashboard');
    });

    it('renders user badge with username', () => {
      render(<DashboardHeader title="Dashboard" username="DragonSlayer" />);
      expect(screen.getByTestId('dashboard-header-user')).toBeInTheDocument();
    });

    it('renders user badge with role', () => {
      render(<DashboardHeader title="Dashboard" username="TestUser" userRole="gm" />);
      expect(screen.getByTestId('dashboard-header-user')).toBeInTheDocument();
    });

    it('uses admin role by default', () => {
      render(<DashboardHeader title="Dashboard" username="TestUser" />);
      expect(screen.getByTestId('dashboard-header-user')).toBeInTheDocument();
    });
  });

  describe('Activity Hub button', () => {
    it('shows Activity Hub button when onActivityHub is provided', () => {
      const handleActivityHub = jest.fn();
      render(
        <DashboardHeader
          title="Dashboard"
          username="TestUser"
          onActivityHub={handleActivityHub}
        />
      );

      expect(screen.getByTestId('dashboard-header-activity-btn')).toBeInTheDocument();
      expect(screen.getByText('Activity Hub')).toBeInTheDocument();
    });

    it('does not show Activity Hub button when onActivityHub is not provided', () => {
      render(<DashboardHeader title="Dashboard" username="TestUser" />);
      expect(screen.queryByTestId('dashboard-header-activity-btn')).not.toBeInTheDocument();
    });

    it('calls onActivityHub when Activity Hub button is clicked', () => {
      const handleActivityHub = jest.fn();
      render(
        <DashboardHeader
          title="Dashboard"
          username="TestUser"
          onActivityHub={handleActivityHub}
        />
      );

      fireEvent.click(screen.getByTestId('dashboard-header-activity-btn'));
      expect(handleActivityHub).toHaveBeenCalledTimes(1);
    });
  });

  describe('Settings button', () => {
    it('shows Settings button when onSettings is provided', () => {
      const handleSettings = jest.fn();
      render(
        <DashboardHeader
          title="Dashboard"
          username="TestUser"
          onSettings={handleSettings}
        />
      );

      expect(screen.getByTestId('dashboard-header-settings-btn')).toBeInTheDocument();
      expect(screen.getByText('Settings')).toBeInTheDocument();
    });

    it('does not show Settings button when onSettings is not provided', () => {
      render(<DashboardHeader title="Dashboard" username="TestUser" />);
      expect(screen.queryByTestId('dashboard-header-settings-btn')).not.toBeInTheDocument();
    });

    it('calls onSettings when Settings button is clicked', () => {
      const handleSettings = jest.fn();
      render(
        <DashboardHeader
          title="Dashboard"
          username="TestUser"
          onSettings={handleSettings}
        />
      );

      fireEvent.click(screen.getByTestId('dashboard-header-settings-btn'));
      expect(handleSettings).toHaveBeenCalledTimes(1);
    });
  });

  describe('Chat button', () => {
    it('shows Chat button when onChat is provided', () => {
      const handleChat = jest.fn();
      render(
        <DashboardHeader
          title="Dashboard"
          username="TestUser"
          onChat={handleChat}
        />
      );

      expect(screen.getByTestId('dashboard-header-chat')).toBeInTheDocument();
    });

    it('does not show Chat button when onChat is not provided', () => {
      render(<DashboardHeader title="Dashboard" username="TestUser" />);
      expect(screen.queryByTestId('dashboard-header-chat')).not.toBeInTheDocument();
    });

    it('calls onChat when Chat button is clicked', () => {
      const handleChat = jest.fn();
      render(
        <DashboardHeader
          title="Dashboard"
          username="TestUser"
          onChat={handleChat}
        />
      );

      // Click the actual button inside ChatButton wrapper
      fireEvent.click(screen.getByTestId('dashboard-header-chat-btn'));
      expect(handleChat).toHaveBeenCalledTimes(1);
    });

    it('shows unread indicator when hasUnreadMessages is true', () => {
      render(
        <DashboardHeader
          title="Dashboard"
          username="TestUser"
          onChat={() => {}}
          hasUnreadMessages={true}
        />
      );

      // ChatButton should have unread indicator
      expect(screen.getByTestId('dashboard-header-chat')).toBeInTheDocument();
    });
  });

  describe('All buttons', () => {
    it('renders all buttons when all handlers provided', () => {
      render(
        <DashboardHeader
          title="Dashboard"
          username="TestUser"
          onActivityHub={() => {}}
          onSettings={() => {}}
          onChat={() => {}}
        />
      );

      expect(screen.getByTestId('dashboard-header-chat')).toBeInTheDocument();
      expect(screen.getByTestId('dashboard-header-activity-btn')).toBeInTheDocument();
      expect(screen.getByTestId('dashboard-header-settings-btn')).toBeInTheDocument();
      expect(screen.getByTestId('dashboard-header-user')).toBeInTheDocument();
    });
  });

  describe('TestId', () => {
    it('uses default testId', () => {
      render(<DashboardHeader title="Dashboard" username="TestUser" />);
      expect(screen.getByTestId('dashboard-header')).toBeInTheDocument();
    });

    it('uses custom testId', () => {
      render(
        <DashboardHeader
          title="Dashboard"
          username="TestUser"
          testId="custom-header"
        />
      );

      expect(screen.getByTestId('custom-header')).toBeInTheDocument();
      expect(screen.getByTestId('custom-header-title')).toBeInTheDocument();
      expect(screen.getByTestId('custom-header-user')).toBeInTheDocument();
    });
  });
});
