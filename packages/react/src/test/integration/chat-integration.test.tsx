import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useState } from 'react';
import { FloatingChat } from '../../activity/organisms/FloatingChat';
import { ChatWindow, type ChatMessage } from '../../activity/organisms/ChatWindow';

/**
 * Integration tests for chat components
 */
describe('Chat Integration', () => {
  describe('FloatingChat with state management', () => {
    function InteractiveFloatingChat() {
      const [isOpen, setIsOpen] = useState(false);
      const [messages, setMessages] = useState<ChatMessage[]>([]);
      const [inputValue, setInputValue] = useState('');
      const [isLoading, setIsLoading] = useState(false);

      const handleSubmit = (message: string) => {
        // Add user message
        const userMessage: ChatMessage = {
          id: String(Date.now()),
          role: 'user',
          content: message,
        };
        setMessages((prev) => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        // Simulate assistant response
        setTimeout(() => {
          const assistantMessage: ChatMessage = {
            id: String(Date.now() + 1),
            role: 'assistant',
            content: `Echo: ${message}`,
          };
          setMessages((prev) => [...prev, assistantMessage]);
          setIsLoading(false);
        }, 100);
      };

      return (
        <FloatingChat
          title="Test Bot"
          subtitle="AI Assistant"
          messages={messages}
          inputValue={inputValue}
          onInputChange={setInputValue}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          isOpen={isOpen}
          onToggle={() => setIsOpen(!isOpen)}
          welcomeMessage={{ greeting: 'Hello!', hint: 'Ask me anything' }}
          testId="chat"
        />
      );
    }

    it('opens and closes chat window', () => {
      render(<InteractiveFloatingChat />);

      // Initially closed
      expect(screen.queryByTestId('chat-window')).not.toBeInTheDocument();

      // Open
      fireEvent.click(screen.getByTestId('chat-toggle'));
      expect(screen.getByTestId('chat-window')).toBeInTheDocument();

      // Close
      fireEvent.click(screen.getByTestId('chat-toggle'));
      expect(screen.queryByTestId('chat-window')).not.toBeInTheDocument();
    });

    it('shows welcome message when no messages', () => {
      render(<InteractiveFloatingChat />);

      fireEvent.click(screen.getByTestId('chat-toggle'));
      expect(screen.getByText('Hello!')).toBeInTheDocument();
      expect(screen.getByText('Ask me anything')).toBeInTheDocument();
    });

    it('sends messages and receives responses', async () => {
      render(<InteractiveFloatingChat />);

      // Open chat
      fireEvent.click(screen.getByTestId('chat-toggle'));

      // Type and send message
      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'Test message' } });
      const form = input.closest('form')!;
      fireEvent.submit(form);

      // User message appears
      expect(screen.getByText('Test message')).toBeInTheDocument();

      // Welcome message hidden
      expect(screen.queryByText('Hello!')).not.toBeInTheDocument();

      // Wait for assistant response
      await waitFor(() => {
        expect(screen.getByText('Echo: Test message')).toBeInTheDocument();
      });
    });

    it('clears input after sending', () => {
      render(<InteractiveFloatingChat />);

      fireEvent.click(screen.getByTestId('chat-toggle'));

      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'Hello' } });

      const form = input.closest('form')!;
      fireEvent.submit(form);

      expect(input).toHaveValue('');
    });
  });

  describe('ChatWindow conversation flow', () => {
    function ConversationChat() {
      const [messages, setMessages] = useState<ChatMessage[]>([
        { id: '1', role: 'assistant', content: 'How can I help you today?' },
      ]);
      const [inputValue, setInputValue] = useState('');
      const [copiedContent, setCopiedContent] = useState<string | null>(null);

      const handleSubmit = (message: string) => {
        setMessages((prev) => [
          ...prev,
          { id: String(Date.now()), role: 'user', content: message },
        ]);
        setInputValue('');
      };

      return (
        <div>
          <ChatWindow
            title="Assistant"
            messages={messages}
            inputValue={inputValue}
            onInputChange={setInputValue}
            onSubmit={handleSubmit}
            messageAction={{
              label: 'Copy',
              onClick: (content) => setCopiedContent(content),
            }}
            testId="chat"
          />
          {copiedContent && (
            <div data-testid="copied-content">Copied: {copiedContent}</div>
          )}
        </div>
      );
    }

    it('shows existing messages', () => {
      render(<ConversationChat />);
      expect(screen.getByText('How can I help you today?')).toBeInTheDocument();
    });

    it('adds new messages to conversation', () => {
      render(<ConversationChat />);

      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'I need help with tests' } });

      const form = input.closest('form')!;
      fireEvent.submit(form);

      expect(screen.getByText('I need help with tests')).toBeInTheDocument();
      // Original message still there
      expect(screen.getByText('How can I help you today?')).toBeInTheDocument();
    });

    it('triggers message action on assistant messages', () => {
      render(<ConversationChat />);

      const copyButton = screen.getByText('Copy');
      fireEvent.click(copyButton);

      expect(screen.getByTestId('copied-content')).toHaveTextContent(
        'Copied: How can I help you today?'
      );
    });
  });

  describe('Multiple chat instances', () => {
    function MultiChatApp() {
      const [chat1Open, setChat1Open] = useState(false);
      const [chat2Open, setChat2Open] = useState(false);

      return (
        <div>
          <button onClick={() => setChat1Open(!chat1Open)} data-testid="toggle-chat1">
            Toggle Chat 1
          </button>
          <button onClick={() => setChat2Open(!chat2Open)} data-testid="toggle-chat2">
            Toggle Chat 2
          </button>

          {chat1Open && (
            <ChatWindow
              title="Chat 1"
              messages={[]}
              inputValue=""
              onInputChange={() => {}}
              onSubmit={() => {}}
              testId="chat1"
            />
          )}
          {chat2Open && (
            <ChatWindow
              title="Chat 2"
              messages={[]}
              inputValue=""
              onInputChange={() => {}}
              onSubmit={() => {}}
              testId="chat2"
            />
          )}
        </div>
      );
    }

    it('handles multiple independent chat windows', () => {
      render(<MultiChatApp />);

      // Both closed initially
      expect(screen.queryByTestId('chat1')).not.toBeInTheDocument();
      expect(screen.queryByTestId('chat2')).not.toBeInTheDocument();

      // Open chat 1
      fireEvent.click(screen.getByTestId('toggle-chat1'));
      expect(screen.getByTestId('chat1')).toBeInTheDocument();
      expect(screen.queryByTestId('chat2')).not.toBeInTheDocument();

      // Open chat 2
      fireEvent.click(screen.getByTestId('toggle-chat2'));
      expect(screen.getByTestId('chat1')).toBeInTheDocument();
      expect(screen.getByTestId('chat2')).toBeInTheDocument();

      // Close chat 1
      fireEvent.click(screen.getByTestId('toggle-chat1'));
      expect(screen.queryByTestId('chat1')).not.toBeInTheDocument();
      expect(screen.getByTestId('chat2')).toBeInTheDocument();
    });
  });
});
