import { render, screen } from '@testing-library/react';
import { DashboardSidebar } from './DashboardSidebar';

describe('DashboardSidebar', () => {
  const defaultProps = {
    user: {
      name: 'Test User',
    },
    children: <div>Sidebar content</div>,
  };

  it('renders with default testId', () => {
    render(<DashboardSidebar {...defaultProps} />);
    expect(screen.getByTestId('dashboard-sidebar')).toBeInTheDocument();
  });

  it('renders with custom testId', () => {
    render(<DashboardSidebar {...defaultProps} testId="custom-sidebar" />);
    expect(screen.getByTestId('custom-sidebar')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(<DashboardSidebar {...defaultProps} />);
    expect(screen.getByText('Sidebar content')).toBeInTheDocument();
  });

  describe('user section', () => {
    it('renders user name', () => {
      render(<DashboardSidebar {...defaultProps} />);
      expect(screen.getByTestId('dashboard-sidebar-user')).toBeInTheDocument();
      expect(screen.getByText('Test User')).toBeInTheDocument();
    });

    it('renders user avatar when image provided', () => {
      render(
        <DashboardSidebar
          {...defaultProps}
          user={{ name: 'Test User', image: '/avatar.png' }}
        />
      );
      const avatar = screen.getByTestId('dashboard-sidebar-user-avatar');
      expect(avatar).toHaveAttribute('src', '/avatar.png');
    });

    it('does not render avatar when no image', () => {
      render(<DashboardSidebar {...defaultProps} />);
      expect(screen.queryByTestId('dashboard-sidebar-user-avatar')).not.toBeInTheDocument();
    });

    it('renders user role when provided', () => {
      render(
        <DashboardSidebar
          {...defaultProps}
          user={{ name: 'Test User', role: 'admin' }}
        />
      );
      expect(screen.getByText('admin')).toBeInTheDocument();
    });

    it('does not render role when not provided', () => {
      render(<DashboardSidebar {...defaultProps} />);
      expect(screen.queryByText('admin')).not.toBeInTheDocument();
    });
  });

  describe('header section', () => {
    it('renders header when provided', () => {
      render(
        <DashboardSidebar {...defaultProps} header={<div>Header content</div>} />
      );
      expect(screen.getByTestId('dashboard-sidebar-header')).toBeInTheDocument();
      expect(screen.getByText('Header content')).toBeInTheDocument();
    });

    it('does not render header when not provided', () => {
      render(<DashboardSidebar {...defaultProps} />);
      expect(screen.queryByTestId('dashboard-sidebar-header')).not.toBeInTheDocument();
    });
  });

  describe('footer section', () => {
    it('renders footer when provided', () => {
      render(
        <DashboardSidebar {...defaultProps} footer={<div>Footer content</div>} />
      );
      expect(screen.getByTestId('dashboard-sidebar-footer')).toBeInTheDocument();
      expect(screen.getByText('Footer content')).toBeInTheDocument();
    });

    it('does not render footer when not provided', () => {
      render(<DashboardSidebar {...defaultProps} />);
      expect(screen.queryByTestId('dashboard-sidebar-footer')).not.toBeInTheDocument();
    });
  });

  it('renders content section', () => {
    render(<DashboardSidebar {...defaultProps} />);
    expect(screen.getByTestId('dashboard-sidebar-content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<DashboardSidebar {...defaultProps} className="custom-class" />);
    expect(screen.getByTestId('dashboard-sidebar')).toHaveClass('custom-class');
  });

  it('has correct layout classes', () => {
    render(<DashboardSidebar {...defaultProps} />);
    const sidebar = screen.getByTestId('dashboard-sidebar');
    expect(sidebar).toHaveClass('w-64', 'flex', 'flex-col');
  });
});
