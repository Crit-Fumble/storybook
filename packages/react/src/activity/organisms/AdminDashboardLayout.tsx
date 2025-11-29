import { useState } from 'react';
import { clsx } from 'clsx';

export type AdminTab = 'dashboard' | 'prompts' | 'activity' | 'settings';

export interface AdminDashboardLayoutProps {
  /** Server name to display */
  serverName: string;
  /** Server icon URL */
  serverIcon?: string;
  /** Initial active tab */
  initialTab?: AdminTab;
  /** Dashboard tab content */
  dashboardContent: React.ReactNode;
  /** Prompt partials tab content */
  promptsContent: React.ReactNode;
  /** Activity tab content */
  activityContent: React.ReactNode;
  /** Settings tab content */
  settingsContent: React.ReactNode;
  /** Back button handler */
  onBack?: () => void;
  /** Tab change handler */
  onTabChange?: (tab: AdminTab) => void;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

const tabs: { id: AdminTab; label: string; icon: React.ReactNode }[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
  },
  {
    id: 'prompts',
    label: 'Prompt Partials',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
  {
    id: 'activity',
    label: 'Activity',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export function AdminDashboardLayout({
  serverName,
  serverIcon,
  initialTab = 'dashboard',
  dashboardContent,
  promptsContent,
  activityContent,
  settingsContent,
  onBack,
  onTabChange,
  className,
  testId = 'admin-dashboard-layout',
}: AdminDashboardLayoutProps) {
  const [activeTab, setActiveTab] = useState<AdminTab>(initialTab);

  const handleTabChange = (tab: AdminTab) => {
    setActiveTab(tab);
    onTabChange?.(tab);
  };

  const getContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return dashboardContent;
      case 'prompts':
        return promptsContent;
      case 'activity':
        return activityContent;
      case 'settings':
        return settingsContent;
    }
  };

  return (
    <div
      data-testid={testId}
      className={clsx(
        'min-h-screen bg-discord-background-primary flex flex-col',
        className
      )}
    >
      {/* Header */}
      <header className="bg-discord-background-secondary border-b border-discord-background-tertiary px-4 py-3">
        <div className="flex items-center gap-4">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 text-discord-text-muted hover:text-discord-text-normal hover:bg-discord-background-tertiary rounded transition-colors"
              aria-label="Go back"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </button>
          )}

          {serverIcon ? (
            <img
              src={serverIcon}
              alt={serverName}
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-discord-background-tertiary flex items-center justify-center text-discord-text-normal font-semibold">
              {serverName.charAt(0).toUpperCase()}
            </div>
          )}

          <div>
            <h1 className="text-discord-text-normal font-display font-semibold">
              {serverName}
            </h1>
            <p className="text-discord-text-muted text-sm">Admin Dashboard</p>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="bg-discord-background-secondary border-b border-discord-background-tertiary px-4">
        <div className="flex gap-1 -mb-px">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={clsx(
                'flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors',
                activeTab === tab.id
                  ? 'text-discord-primary border-discord-primary'
                  : 'text-discord-text-muted border-transparent hover:text-discord-text-normal hover:border-discord-background-tertiary'
              )}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Content Area */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="max-w-6xl mx-auto">{getContent()}</div>
      </main>
    </div>
  );
}
