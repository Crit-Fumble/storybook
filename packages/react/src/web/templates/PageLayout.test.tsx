import { render, screen } from '@testing-library/react';
import { PageLayout } from './PageLayout';

describe('PageLayout', () => {
  it('renders children', () => {
    render(<PageLayout><p>Page content</p></PageLayout>);
    expect(screen.getByText('Page content')).toBeInTheDocument();
  });

  it('renders with default testId', () => {
    render(<PageLayout>Content</PageLayout>);
    expect(screen.getByTestId('page-layout')).toBeInTheDocument();
  });

  it('renders with custom testId', () => {
    render(<PageLayout testId="custom-page">Content</PageLayout>);
    expect(screen.getByTestId('custom-page')).toBeInTheDocument();
  });

  describe('header', () => {
    it('renders header', () => {
      render(<PageLayout>Content</PageLayout>);
      expect(screen.getByTestId('page-layout-header')).toBeInTheDocument();
    });

    it('renders logo link', () => {
      render(<PageLayout>Content</PageLayout>);
      const logo = screen.getByTestId('page-layout-logo');
      expect(logo).toHaveTextContent('Crit-Fumble');
      expect(logo).toHaveAttribute('href', '/');
    });

    it('renders navigation', () => {
      render(<PageLayout>Content</PageLayout>);
      expect(screen.getByTestId('page-layout-nav')).toBeInTheDocument();
    });
  });

  describe('navigation links', () => {
    it('renders Wiki as link by default', () => {
      render(<PageLayout>Content</PageLayout>);
      const wikiLink = screen.getByText('Wiki');
      expect(wikiLink.tagName).toBe('A');
      expect(wikiLink).toHaveAttribute('href', '/wiki');
    });

    it('renders Wiki as text when current', () => {
      render(<PageLayout nav={{ current: 'wiki' }}>Content</PageLayout>);
      const wiki = screen.getByText('Wiki');
      expect(wiki.tagName).toBe('SPAN');
      expect(wiki).toHaveClass('text-white');
    });

    it('renders Activity as link by default', () => {
      render(<PageLayout>Content</PageLayout>);
      const activityLink = screen.getByText('Activity');
      expect(activityLink.tagName).toBe('A');
      expect(activityLink).toHaveAttribute('href', 'https://activity.crit-fumble.com');
    });

    it('renders Activity as text when current', () => {
      render(<PageLayout nav={{ current: 'activity' }}>Content</PageLayout>);
      const activity = screen.getByText('Activity');
      expect(activity.tagName).toBe('SPAN');
      expect(activity).toHaveClass('text-white');
    });

    it('does not render Dashboard link by default', () => {
      render(<PageLayout>Content</PageLayout>);
      expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
    });

    it('renders Dashboard link when user can edit', () => {
      render(<PageLayout user={{ role: 'admin', canEdit: true }}>Content</PageLayout>);
      const dashboardLink = screen.getByText('Dashboard');
      expect(dashboardLink.tagName).toBe('A');
      expect(dashboardLink).toHaveAttribute('href', '/dashboard');
    });

    it('renders Dashboard as text when current', () => {
      render(
        <PageLayout
          user={{ role: 'admin', canEdit: true }}
          nav={{ current: 'dashboard' }}
        >
          Content
        </PageLayout>
      );
      const dashboard = screen.getByText('Dashboard');
      expect(dashboard.tagName).toBe('SPAN');
    });

    it('hides Dashboard when hideDashboard is true', () => {
      render(
        <PageLayout
          user={{ role: 'admin', canEdit: true }}
          nav={{ hideDashboard: true }}
        >
          Content
        </PageLayout>
      );
      expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
    });
  });

  describe('role badge', () => {
    it('does not render when no user', () => {
      render(<PageLayout>Content</PageLayout>);
      expect(screen.queryByTestId('page-layout-role-badge')).not.toBeInTheDocument();
    });

    it('renders owner badge', () => {
      render(<PageLayout user={{ role: 'owner' }}>Content</PageLayout>);
      const badge = screen.getByTestId('page-layout-role-badge');
      expect(badge).toHaveTextContent('Owner');
      expect(badge).toHaveClass('bg-crit-purple-primary');
    });

    it('renders admin badge', () => {
      render(<PageLayout user={{ role: 'admin' }}>Content</PageLayout>);
      const badge = screen.getByTestId('page-layout-role-badge');
      expect(badge).toHaveTextContent('Admin');
    });

    it('renders member badge', () => {
      render(<PageLayout user={{ role: 'member' }}>Content</PageLayout>);
      const badge = screen.getByTestId('page-layout-role-badge');
      expect(badge).toHaveTextContent('Member');
      expect(badge).toHaveClass('bg-slate-700');
    });
  });

  describe('main content', () => {
    it('renders main element', () => {
      render(<PageLayout>Content</PageLayout>);
      expect(screen.getByTestId('page-layout-main')).toBeInTheDocument();
    });

    it('main has correct styling', () => {
      render(<PageLayout>Content</PageLayout>);
      const main = screen.getByTestId('page-layout-main');
      expect(main).toHaveClass('flex-1', 'max-w-4xl', 'mx-auto');
    });
  });

  describe('footer', () => {
    it('renders footer', () => {
      render(<PageLayout>Content</PageLayout>);
      expect(screen.getByTestId('page-layout-footer')).toBeInTheDocument();
    });

    it('displays copyright with current year', () => {
      render(<PageLayout>Content</PageLayout>);
      const currentYear = new Date().getFullYear();
      expect(screen.getByText(new RegExp(`© ${currentYear} Crit-Fumble Gaming`))).toBeInTheDocument();
    });
  });
});
