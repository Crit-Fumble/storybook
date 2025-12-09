
import { render, screen } from '@testing-library/react';
import { PageLayout } from './PageLayout';

describe('PageLayout', () => {
  it('renders children', () => {
    render(
      <PageLayout>
        <div>Test Content</div>
      </PageLayout>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders header with logo', () => {
    render(
      <PageLayout>
        <div>Content</div>
      </PageLayout>
    );

    expect(screen.getByTestId('page-layout-logo')).toHaveTextContent('Crit-Fumble');
  });

  it('renders navigation links', () => {
    render(
      <PageLayout>
        <div>Content</div>
      </PageLayout>
    );

    expect(screen.getByText('Wiki')).toBeInTheDocument();
    expect(screen.getByText('Activity')).toBeInTheDocument();
  });

  it('highlights current page in navigation', () => {
    render(
      <PageLayout nav={{ current: 'wiki' }}>
        <div>Content</div>
      </PageLayout>
    );

    const wikiLink = screen.getByText('Wiki');
    expect(wikiLink.tagName).toBe('SPAN');
    expect(wikiLink).toHaveClass('text-white');
  });

  it('renders role badge for users', () => {
    render(
      <PageLayout user={{ role: 'admin' }}>
        <div>Content</div>
      </PageLayout>
    );

    expect(screen.getByTestId('page-layout-role-badge')).toHaveTextContent('Admin');
  });

  it('renders owner badge with correct styling', () => {
    render(
      <PageLayout user={{ role: 'owner' }}>
        <div>Content</div>
      </PageLayout>
    );

    const badge = screen.getByTestId('page-layout-role-badge');
    expect(badge).toHaveTextContent('Owner');
    expect(badge).toHaveClass('bg-crit-purple-primary');
  });

  it('renders member badge with correct styling', () => {
    render(
      <PageLayout user={{ role: 'member' }}>
        <div>Content</div>
      </PageLayout>
    );

    const badge = screen.getByTestId('page-layout-role-badge');
    expect(badge).toHaveTextContent('Member');
    expect(badge).toHaveClass('bg-slate-700');
  });

  it('shows dashboard link for users with canEdit', () => {
    render(
      <PageLayout user={{ role: 'admin', canEdit: true }}>
        <div>Content</div>
      </PageLayout>
    );

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('hides dashboard link when hideDashboard is true', () => {
    render(
      <PageLayout
        user={{ role: 'admin', canEdit: true }}
        nav={{ hideDashboard: true }}
      >
        <div>Content</div>
      </PageLayout>
    );

    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
  });

  it('does not show dashboard link for users without canEdit', () => {
    render(
      <PageLayout user={{ role: 'member', canEdit: false }}>
        <div>Content</div>
      </PageLayout>
    );

    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
  });

  it('highlights dashboard as current page', () => {
    render(
      <PageLayout
        user={{ role: 'admin', canEdit: true }}
        nav={{ current: 'dashboard' }}
      >
        <div>Content</div>
      </PageLayout>
    );

    const dashboardLink = screen.getByText('Dashboard');
    expect(dashboardLink.tagName).toBe('SPAN');
  });

  it('highlights activity as current page', () => {
    render(
      <PageLayout nav={{ current: 'activity' }}>
        <div>Content</div>
      </PageLayout>
    );

    const activityLink = screen.getByText('Activity');
    expect(activityLink.tagName).toBe('SPAN');
  });

  it('renders footer with copyright', () => {
    render(
      <PageLayout>
        <div>Content</div>
      </PageLayout>
    );

    const footer = screen.getByTestId('page-layout-footer');
    expect(footer).toHaveTextContent('Crit-Fumble Gaming. All rights reserved.');
  });

  it('renders footer with current year', () => {
    render(
      <PageLayout>
        <div>Content</div>
      </PageLayout>
    );

    const currentYear = new Date().getFullYear();
    const footer = screen.getByTestId('page-layout-footer');
    expect(footer).toHaveTextContent(currentYear.toString());
  });

  it('accepts custom testId', () => {
    render(
      <PageLayout testId="custom-layout">
        <div>Content</div>
      </PageLayout>
    );

    expect(screen.getByTestId('custom-layout')).toBeInTheDocument();
  });
});
