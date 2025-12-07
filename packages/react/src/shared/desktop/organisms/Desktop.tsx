import { clsx } from 'clsx';
import type { ReactNode } from 'react';
import type { DesktopIconConfig, ThemeName, DesktopTheme, DockPosition } from '../types';
import { DesktopIcon } from '../atoms/DesktopIcon';
import { Dock } from './Dock';
import { DesktopThemeProvider } from '../hooks';

export interface DesktopProps {
  icons?: DesktopIconConfig[];
  background?: ReactNode | string;
  showDock?: boolean;
  dockPosition?: DockPosition;
  theme?: ThemeName | DesktopTheme;
  children?: ReactNode;
  className?: string;
  testId?: string;
}

export function Desktop({
  icons = [],
  background,
  showDock = false,
  dockPosition = 'bottom',
  theme = 'modern',
  children,
  className,
  testId,
}: DesktopProps) {
  const themeClass = typeof theme === 'string' ? `theme-${theme}` : 'theme-modern';

  const dockItems =
    showDock && icons.length > 0
      ? icons.map((icon) => ({
          id: icon.id,
          icon: icon.icon,
          label: icon.label,
          onClick: icon.onOpen,
        }))
      : [];

  return (
    <DesktopThemeProvider theme={theme}>
      <div
        className={clsx('desktop-background w-full h-full relative', themeClass, className)}
        data-testid={testId}
        style={typeof background === 'string' ? { background } : undefined}
      >
        {typeof background !== 'string' && background}

        {/* Desktop Icons */}
        {icons.length > 0 && (
          <div
            className="absolute top-4 left-4 flex flex-col gap-4"
            data-testid={testId ? `${testId}-icons` : undefined}
          >
            {icons.map((iconConfig) => (
              <DesktopIcon
                key={iconConfig.id}
                icon={iconConfig.icon}
                label={iconConfig.label}
                onDoubleClick={iconConfig.onOpen}
                testId={`${testId}-icon-${iconConfig.id}`}
              />
            ))}
          </div>
        )}

        {/* Windows */}
        <div className="absolute inset-0" data-testid={testId ? `${testId}-windows` : undefined}>
          {children}
        </div>

        {/* Dock */}
        {showDock && dockItems.length > 0 && (
          <Dock
            items={dockItems}
            position={dockPosition}
            testId={testId ? `${testId}-dock` : undefined}
          />
        )}
      </div>
    </DesktopThemeProvider>
  );
}
