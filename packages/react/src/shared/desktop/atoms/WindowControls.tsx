import { clsx } from 'clsx';

export interface WindowControlsProps {
  onMinimize?: () => void;
  onMaximize?: () => void;
  onClose?: () => void;
  isMaximized?: boolean;
  showMinimize?: boolean;
  showMaximize?: boolean;
  showClose?: boolean;
  className?: string;
  testId?: string;
}

export function WindowControls({
  onMinimize,
  onMaximize,
  onClose,
  isMaximized = false,
  showMinimize = true,
  showMaximize = true,
  showClose = true,
  className,
  testId,
}: WindowControlsProps) {
  return (
    <div className={clsx('flex items-center gap-2', className)} data-testid={testId}>
      {showMinimize && (
        <button
          onClick={onMinimize}
          className="window-control-btn window-control-minimize"
          title="Minimize"
          data-testid={testId ? `${testId}-minimize` : undefined}
          aria-label="Minimize window"
        >
          <svg width="12" height="2" viewBox="0 0 12 2" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="1" y1="1" x2="11" y2="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      )}

      {showMaximize && (
        <button
          onClick={onMaximize}
          className="window-control-btn window-control-maximize"
          title={isMaximized ? 'Restore' : 'Maximize'}
          data-testid={testId ? `${testId}-maximize` : undefined}
          aria-label={isMaximized ? 'Restore window' : 'Maximize window'}
        >
          {isMaximized ? (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="1" width="8" height="8" stroke="currentColor" strokeWidth="1.5" fill="none" />
              <path d="M1 3H9V11H1V3Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1" width="10" height="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
            </svg>
          )}
        </button>
      )}

      {showClose && (
        <button
          onClick={onClose}
          className="window-control-btn window-control-close"
          title="Close"
          data-testid={testId ? `${testId}-close` : undefined}
          aria-label="Close window"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line
              x1="2"
              y1="2"
              x2="10"
              y2="10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="10"
              y1="2"
              x2="2"
              y2="10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
