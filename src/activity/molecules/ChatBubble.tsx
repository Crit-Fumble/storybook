import { clsx } from 'clsx';

export interface ChatBubbleProps {
  /** Message content */
  content: string;
  /** Whether this is from the user or assistant */
  isUser?: boolean;
  /** Optional action button (e.g., "Insert into editor") */
  action?: {
    label: string;
    onClick: () => void;
  };
  /** Additional CSS classes */
  className?: string;
  /** Optional test ID */
  testId?: string;
}

export function ChatBubble({
  content,
  isUser = false,
  action,
  className,
  testId,
}: ChatBubbleProps) {
  return (
    <div
      data-testid={testId}
      className={clsx(
        'flex',
        isUser ? 'justify-end' : 'justify-start',
        className
      )}
    >
      <div
        className={clsx(
          'max-w-[80%] px-3 py-2 rounded-lg',
          isUser
            ? 'bg-discord-primary text-white'
            : 'bg-discord-bg-secondary text-discord-text-normal'
        )}
      >
        <p className="text-sm whitespace-pre-wrap">{content}</p>
        {action && !isUser && (
          <button
            onClick={action.onClick}
            className="mt-2 text-xs text-discord-primary hover:text-discord-primary-hover"
          >
            {action.label}
          </button>
        )}
      </div>
    </div>
  );
}
