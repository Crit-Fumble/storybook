import { type ReactNode } from 'react';
import { clsx } from 'clsx';

export interface PageLayoutProps {
  children: ReactNode;

  /** Current user info for role badge */
  user?: {
    role: 'owner' | 'admin' | 'member';
    canEdit?: boolean;
  } | null;

  /** Navigation config */
  nav?: {
    /** Current page - renders as text instead of link */
    current?: 'wiki' | 'activity' | 'dashboard';
    /** Hide dashboard link even if canEdit is true */
    hideDashboard?: boolean;
  };

  /** Optional test ID */
  testId?: string;
}

const roleLabels: Record<'owner' | 'admin' | 'member', string> = {
  owner: 'Owner',
  admin: 'Admin',
  member: 'Member',
};

export function PageLayout({
  children,
  user,
  nav,
  testId = 'page-layout',
}: PageLayoutProps) {
  const currentYear = new Date().getFullYear();
  const showDashboard = user?.canEdit && !nav?.hideDashboard;

  return (
    <div
      className="min-h-screen bg-slate-950 flex flex-col"
      data-testid={testId}
    >
      {/* Header */}
      <header
        className="bg-slate-900 border-b border-slate-800"
        data-testid={`${testId}-header`}
      >
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <a
            href="/"
            className="font-display text-xl text-crit-purple-light hover:text-crit-purple-primary transition-colors"
            data-testid={`${testId}-logo`}
          >
            Crit-Fumble
          </a>

          {/* Navigation */}
          <nav
            className="flex items-center gap-6"
            data-testid={`${testId}-nav`}
          >
            {/* Wiki Link */}
            {nav?.current === 'wiki' ? (
              <span className="text-white text-sm font-medium">Wiki</span>
            ) : (
              <a
                href="/wiki"
                className="text-gray-400 hover:text-crit-purple-light text-sm transition-colors"
              >
                Wiki
              </a>
            )}

            {/* Activity Link */}
            {nav?.current === 'activity' ? (
              <span className="text-white text-sm font-medium">Activity</span>
            ) : (
              <a
                href="https://activity.crit-fumble.com"
                className="text-gray-400 hover:text-crit-purple-light text-sm transition-colors"
              >
                Activity
              </a>
            )}

            {/* Dashboard Link (conditional) */}
            {showDashboard && (
              nav?.current === 'dashboard' ? (
                <span className="text-white text-sm font-medium">Dashboard</span>
              ) : (
                <a
                  href="/dashboard"
                  className="text-gray-400 hover:text-crit-purple-light text-sm transition-colors"
                >
                  Dashboard
                </a>
              )
            )}

            {/* Role Badge */}
            {user && (
              <span
                className={clsx(
                  'px-2 py-0.5 text-xs font-medium rounded-full',
                  user.role === 'owner' && 'bg-crit-purple-primary text-white',
                  user.role === 'admin' && 'bg-crit-purple-light/20 text-crit-purple-light',
                  user.role === 'member' && 'bg-slate-700 text-gray-300'
                )}
                data-testid={`${testId}-role-badge`}
              >
                {roleLabels[user.role]}
              </span>
            )}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main
        className="flex-1 max-w-4xl w-full mx-auto px-4 py-8"
        data-testid={`${testId}-main`}
      >
        {children}
      </main>

      {/* Footer */}
      <footer
        className="border-t border-slate-800 bg-slate-900"
        data-testid={`${testId}-footer`}
      >
        <div className="max-w-4xl mx-auto px-4 py-4">
          <p className="text-gray-500 text-sm text-center">
            © {currentYear} Crit-Fumble Gaming. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
