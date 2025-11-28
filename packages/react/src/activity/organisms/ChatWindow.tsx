import { useRef, useEffect } from 'react';
import { clsx } from 'clsx';
import { Avatar } from '../atoms/Avatar';
import { Button, Input } from '../../shared/atoms';
import { ChatBubble } from '../molecules/ChatBubble';
import { TypingIndicator } from '../molecules/TypingIndicator';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

export interface ChatWindowProps {
  /** Chat window title */
  title: string;
  /** Subtitle text */
  subtitle?: string;
  /** Avatar image or fallback initial */
  avatar?: {
    src?: string;
    fallback: string;
  };
  /** Chat messages to display */
  messages: ChatMessage[];
  /** Current input value */
  inputValue: string;
  /** Called when input value changes */
  onInputChange: (value: string) => void;
  /** Called when message is submitted */
  onSubmit: (message: string) => void;
  /** Whether a message is being processed */
  isLoading?: boolean;
  /** Placeholder text for input */
  placeholder?: string;
  /** Welcome message when no messages */
  welcomeMessage?: {
    greeting: string;
    hint?: string;
  };
  /** Optional action for assistant messages */
  messageAction?: {
    label: string;
    onClick: (content: string) => void;
  };
  /** Additional CSS classes */
  className?: string;
  /** Optional test ID */
  testId?: string;
}

export function ChatWindow({
  title,
  subtitle,
  avatar,
  messages,
  inputValue,
  onInputChange,
  onSubmit,
  isLoading = false,
  placeholder = 'Type a message...',
  welcomeMessage,
  messageAction,
  className,
  testId,
}: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      onSubmit(inputValue.trim());
    }
  }

  return (
    <div
      data-testid={testId}
      className={clsx(
        'flex flex-col bg-cfg-bg-primary border border-cfg-border rounded-lg shadow-xl overflow-hidden',
        className
      )}
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-cfg-border flex items-center gap-3 bg-cfg-bg-secondary">
        {avatar && (
          <Avatar
            src={avatar.src}
            fallback={avatar.fallback}
            size="md"
          />
        )}
        <div>
          <div className="text-cfg-text-normal font-medium">{title}</div>
          {subtitle && (
            <div className="text-xs text-cfg-text-muted">{subtitle}</div>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && welcomeMessage && (
          <div className="text-center text-cfg-text-muted mt-8">
            <p className="text-sm">{welcomeMessage.greeting}</p>
            {welcomeMessage.hint && (
              <p className="text-xs mt-2">{welcomeMessage.hint}</p>
            )}
          </div>
        )}

        {messages.map((msg) => (
          <ChatBubble
            key={msg.id}
            content={msg.content}
            isUser={msg.role === 'user'}
            action={
              messageAction && msg.role === 'assistant'
                ? {
                    label: messageAction.label,
                    onClick: () => messageAction.onClick(msg.content),
                  }
                : undefined
            }
          />
        ))}

        {isLoading && <TypingIndicator />}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-cfg-border">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder={placeholder}
            disabled={isLoading}
            className="flex-1"
          />
          <Button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            variant="primary"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </Button>
        </div>
      </form>
    </div>
  );
}
