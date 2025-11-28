import { clsx } from 'clsx';
import { ChatWindow, type ChatMessage, type ChatWindowProps } from './ChatWindow';

export interface FloatingChatProps extends Omit<ChatWindowProps, 'className'> {
  /** Whether the chat window is open */
  isOpen: boolean;
  /** Called when toggle button is clicked */
  onToggle: () => void;
  /** Position of the floating button */
  position?: 'bottom-right' | 'bottom-left';
  /** Optional test ID */
  testId?: string;
}

export function FloatingChat({
  isOpen,
  onToggle,
  position = 'bottom-right',
  testId,
  ...chatProps
}: FloatingChatProps) {
  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
  };

  const windowPositionClasses = {
    'bottom-right': 'bottom-24 right-6',
    'bottom-left': 'bottom-24 left-6',
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        data-testid={testId ? `${testId}-toggle` : undefined}
        className={clsx(
          'fixed w-14 h-14 bg-cfg-primary hover:bg-cfg-primary-hover text-white rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-105 z-50',
          positionClasses[position]
        )}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <ChatWindow
          {...chatProps}
          testId={testId ? `${testId}-window` : undefined}
          className={clsx(
            'fixed w-96 h-[500px] z-50',
            windowPositionClasses[position]
          )}
        />
      )}
    </>
  );
}

export type { ChatMessage };
