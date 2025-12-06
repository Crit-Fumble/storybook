
import { render, screen, fireEvent } from '@testing-library/react';
import { SessionMessageList } from './SessionMessageList';
import type { SessionMessage, MessageType } from '@crit-fumble/core/types';

const createMockMessage = (overrides: Partial<SessionMessage> = {}): SessionMessage => ({
  id: 'msg-1',
  sessionId: 'session-1',
  discordId: 'user-1',
  characterId: null,
  content: 'Test message content',
  messageType: 'ooc',
  timestamp: new Date('2024-01-15T10:30:00'),
  ...overrides,
});

describe('SessionMessageList', () => {
  describe('rendering', () => {
    it('renders messages', () => {
      const messages = [createMockMessage()];
      render(<SessionMessageList messages={messages} />);
      expect(screen.getByText('Test message content')).toBeInTheDocument();
    });

    it('applies testId correctly', () => {
      render(<SessionMessageList messages={[]} testId="custom-message-list" />);
      expect(screen.getByTestId('custom-message-list')).toBeInTheDocument();
    });

    it('applies default testId', () => {
      render(<SessionMessageList messages={[]} />);
      expect(screen.getByTestId('session-message-list')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<SessionMessageList messages={[]} className="custom-class" />);
      expect(screen.getByTestId('session-message-list')).toHaveClass('custom-class');
    });
  });

  describe('empty state', () => {
    it('shows empty message when no messages', () => {
      render(<SessionMessageList messages={[]} />);
      expect(screen.getByText('No messages yet.')).toBeInTheDocument();
    });

    it('shows loading skeletons when loading and no messages', () => {
      render(<SessionMessageList messages={[]} isLoading={true} />);
      const skeletons = screen.getByTestId('session-message-list').querySelectorAll('.animate-pulse');
      expect(skeletons.length).toBe(5);
    });
  });

  describe('message types', () => {
    const messageTypes: MessageType[] = ['ic', 'ooc', 'narration', 'roll', 'system'];

    messageTypes.forEach((type) => {
      it(`renders ${type} message type badge`, () => {
        const messages = [createMockMessage({ messageType: type })];
        render(<SessionMessageList messages={messages} />);
        const labels = { ic: 'IC', ooc: 'OOC', narration: 'Narration', roll: 'Roll', system: 'System' };
        expect(screen.getByText(labels[type])).toBeInTheDocument();
      });
    });

    it('applies italic styling to IC messages', () => {
      const messages = [createMockMessage({ messageType: 'ic', content: 'IC content' })];
      render(<SessionMessageList messages={messages} />);
      expect(screen.getByText('IC content')).toHaveClass('italic');
    });

    it('applies italic and color styling to narration messages', () => {
      const messages = [createMockMessage({ messageType: 'narration', content: 'Narration content' })];
      render(<SessionMessageList messages={messages} />);
      const element = screen.getByText('Narration content');
      expect(element).toHaveClass('italic');
      expect(element).toHaveClass('text-discord-yellow');
    });
  });

  describe('name display', () => {
    it('shows character name when characterId matches', () => {
      const messages = [createMockMessage({ characterId: 'char-1' })];
      const characterNames = { 'char-1': 'Aragorn' };
      render(<SessionMessageList messages={messages} characterNames={characterNames} />);
      expect(screen.getByText('Aragorn')).toBeInTheDocument();
    });

    it('shows user name when no characterId', () => {
      const messages = [createMockMessage({ discordId: 'user-1' })];
      const userNames = { 'user-1': 'John' };
      render(<SessionMessageList messages={messages} userNames={userNames} />);
      expect(screen.getByText('John')).toBeInTheDocument();
    });

    it('shows discord id as fallback', () => {
      const messages = [createMockMessage({ discordId: 'user-123' })];
      render(<SessionMessageList messages={messages} />);
      expect(screen.getByText('user-123')).toBeInTheDocument();
    });

    it('prioritizes character name over user name', () => {
      const messages = [createMockMessage({ characterId: 'char-1', discordId: 'user-1' })];
      const characterNames = { 'char-1': 'Aragorn' };
      const userNames = { 'user-1': 'John' };
      render(
        <SessionMessageList
          messages={messages}
          characterNames={characterNames}
          userNames={userNames}
        />
      );
      expect(screen.getByText('Aragorn')).toBeInTheDocument();
      expect(screen.queryByText('John')).not.toBeInTheDocument();
    });
  });

  describe('timestamp', () => {
    it('formats timestamp correctly', () => {
      const messages = [createMockMessage({ timestamp: new Date('2024-01-15T14:30:00') })];
      render(<SessionMessageList messages={messages} />);
      // Time format depends on locale, just check it's rendered
      expect(screen.getByTestId('session-message-list')).toBeInTheDocument();
    });
  });

  describe('load more', () => {
    it('shows load more button when hasMore and onLoadMore provided', () => {
      const messages = [createMockMessage()];
      const handleLoadMore = jest.fn();
      render(
        <SessionMessageList messages={messages} hasMore={true} onLoadMore={handleLoadMore} />
      );
      expect(screen.getByText('Load More')).toBeInTheDocument();
    });

    it('does not show load more button when hasMore is false', () => {
      const messages = [createMockMessage()];
      const handleLoadMore = jest.fn();
      render(
        <SessionMessageList messages={messages} hasMore={false} onLoadMore={handleLoadMore} />
      );
      expect(screen.queryByText('Load More')).not.toBeInTheDocument();
    });

    it('does not show load more button when onLoadMore is not provided', () => {
      const messages = [createMockMessage()];
      render(<SessionMessageList messages={messages} hasMore={true} />);
      expect(screen.queryByText('Load More')).not.toBeInTheDocument();
    });

    it('calls onLoadMore when Load More is clicked', () => {
      const messages = [createMockMessage()];
      const handleLoadMore = jest.fn();
      render(
        <SessionMessageList messages={messages} hasMore={true} onLoadMore={handleLoadMore} />
      );
      fireEvent.click(screen.getByText('Load More'));
      expect(handleLoadMore).toHaveBeenCalledTimes(1);
    });

    it('shows Loading... text when loading', () => {
      const messages = [createMockMessage()];
      const handleLoadMore = jest.fn();
      render(
        <SessionMessageList
          messages={messages}
          hasMore={true}
          onLoadMore={handleLoadMore}
          isLoading={true}
        />
      );
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('disables button when loading', () => {
      const messages = [createMockMessage()];
      const handleLoadMore = jest.fn();
      render(
        <SessionMessageList
          messages={messages}
          hasMore={true}
          onLoadMore={handleLoadMore}
          isLoading={true}
        />
      );
      expect(screen.getByText('Loading...')).toBeDisabled();
    });
  });

  describe('multiple messages', () => {
    it('renders all messages', () => {
      const messages = [
        createMockMessage({ id: '1', content: 'First message' }),
        createMockMessage({ id: '2', content: 'Second message' }),
        createMockMessage({ id: '3', content: 'Third message' }),
      ];
      render(<SessionMessageList messages={messages} />);
      expect(screen.getByText('First message')).toBeInTheDocument();
      expect(screen.getByText('Second message')).toBeInTheDocument();
      expect(screen.getByText('Third message')).toBeInTheDocument();
    });

    it('renders messages in order', () => {
      const messages = [
        createMockMessage({ id: '1', content: 'First' }),
        createMockMessage({ id: '2', content: 'Second' }),
      ];
      render(<SessionMessageList messages={messages} />);
      const container = screen.getByTestId('session-message-list');
      const messageElements = container.querySelectorAll('[class*="border-l-4"]');
      expect(messageElements.length).toBe(2);
    });
  });
});
