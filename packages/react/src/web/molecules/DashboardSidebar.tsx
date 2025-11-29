import { clsx } from 'clsx';

export interface SidebarUser {
  name: string;
  image?: string | null;
  role?: string;
}

export interface DashboardSidebarProps {
  user: SidebarUser;
  header?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  testId?: string;
}

export function DashboardSidebar({
  user,
  header,
  children,
  footer,
  className,
  testId = 'dashboard-sidebar',
}: DashboardSidebarProps) {
  return (
    <div
      className={clsx(
        'w-64 bg-cfg-background-secondary border-r border-cfg-border flex flex-col',
        className
      )}
      data-testid={testId}
    >
      {/* User info */}
      <div className="p-4 border-b border-cfg-border" data-testid={`${testId}-user`}>
        <div className="flex items-center gap-3">
          {user.image && (
            <img
              src={user.image}
              alt=""
              className="w-8 h-8 rounded-full"
              data-testid={`${testId}-user-avatar`}
            />
          )}
          <div>
            <div className="text-sm font-medium text-cfg-text-normal">{user.name}</div>
            {user.role && (
              <div className="text-xs text-cfg-text-muted capitalize">{user.role}</div>
            )}
          </div>
        </div>
      </div>

      {/* Optional header */}
      {header && (
        <div className="p-2 border-b border-cfg-border" data-testid={`${testId}-header`}>
          {header}
        </div>
      )}

      {/* Main content / page list */}
      <div className="flex-1 overflow-auto p-2" data-testid={`${testId}-content`}>
        {children}
      </div>

      {/* Footer */}
      {footer && (
        <div className="p-4 border-t border-cfg-border" data-testid={`${testId}-footer`}>
          {footer}
        </div>
      )}
    </div>
  );
}
