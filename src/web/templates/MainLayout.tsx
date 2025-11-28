import { type ReactNode } from 'react';

export interface MainLayoutProps {
  children: ReactNode;
  header?: ReactNode;
  testId?: string;
}

export function MainLayout({ children, header, testId = 'main-layout' }: MainLayoutProps) {
  return (
    <div
      className="min-h-screen bg-cfg-background-tertiary"
      data-testid={testId}
    >
      {header && (
        <header
          className="py-4 px-4 border-b border-cfg-border bg-cfg-background-secondary"
          data-testid={`${testId}-header`}
        >
          {header}
        </header>
      )}
      <main className="container mx-auto" data-testid={`${testId}-main`}>
        {children}
      </main>
    </div>
  );
}
