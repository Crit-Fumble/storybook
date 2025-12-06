import { render, screen } from '@testing-library/react';
import { AdventureMessage } from './AdventureMessage';

describe('AdventureMessage', () => {
  const defaultProps = {
    id: 'msg-1',
    playerName: 'Gandalf',
    type: 'say' as const,
    content: 'You shall not pass!',
  };

  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-01-15T12:00:00Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('say message type', () => {
    it('renders player name', () => {
      render(<AdventureMessage {...defaultProps} />);
      expect(screen.getByTestId('adventure-message-player')).toHaveTextContent('Gandalf');
    });

    it('renders content with quotes', () => {
      render(<AdventureMessage {...defaultProps} />);
      expect(screen.getByTestId('adventure-message-content')).toHaveTextContent('"You shall not pass!"');
    });

    it('includes "says" text', () => {
      render(<AdventureMessage {...defaultProps} />);
      expect(screen.getByTestId('adventure-message')).toHaveTextContent('says');
    });

    it('renders timestamp when provided', () => {
      render(<AdventureMessage {...defaultProps} timestamp="2024-01-15T11:30:00Z" />);
      expect(screen.getByTestId('adventure-message-timestamp')).toBeInTheDocument();
    });

    it('applies own message styling', () => {
      render(<AdventureMessage {...defaultProps} isOwnMessage={true} />);
      expect(screen.getByTestId('adventure-message-player')).toHaveClass('text-cfg-primary');
    });

    it('applies DM styling', () => {
      render(<AdventureMessage {...defaultProps} isDM={true} />);
      expect(screen.getByTestId('adventure-message-player')).toHaveClass('text-cfg-accent');
    });
  });

  describe('action message type', () => {
    const actionProps = {
      ...defaultProps,
      type: 'action' as const,
      content: 'swings their sword',
    };

    it('renders player name', () => {
      render(<AdventureMessage {...actionProps} />);
      expect(screen.getByTestId('adventure-message-player')).toHaveTextContent('Gandalf');
    });

    it('renders content in yellow', () => {
      render(<AdventureMessage {...actionProps} />);
      const content = screen.getByTestId('adventure-message-content');
      expect(content).toHaveTextContent('swings their sword');
      expect(content).toHaveClass('text-cfg-yellow');
    });

    it('renders timestamp when provided', () => {
      render(<AdventureMessage {...actionProps} timestamp="2024-01-15T11:30:00Z" />);
      expect(screen.getByTestId('adventure-message-timestamp')).toBeInTheDocument();
    });

    it('applies own message styling', () => {
      render(<AdventureMessage {...actionProps} isOwnMessage={true} />);
      expect(screen.getByTestId('adventure-message-player')).toHaveClass('text-cfg-primary');
    });

    it('applies DM styling', () => {
      render(<AdventureMessage {...actionProps} isDM={true} />);
      expect(screen.getByTestId('adventure-message-player')).toHaveClass('text-cfg-accent');
    });
  });

  describe('emote message type', () => {
    const emoteProps = {
      ...defaultProps,
      type: 'emote' as const,
      content: 'smiles wisely',
    };

    it('renders player name', () => {
      render(<AdventureMessage {...emoteProps} />);
      expect(screen.getByTestId('adventure-message-player')).toHaveTextContent('Gandalf');
    });

    it('renders content', () => {
      render(<AdventureMessage {...emoteProps} />);
      expect(screen.getByTestId('adventure-message-content')).toHaveTextContent('smiles wisely');
    });

    it('has italic styling', () => {
      render(<AdventureMessage {...emoteProps} />);
      expect(screen.getByTestId('adventure-message')).toHaveClass('italic');
    });

    it('renders timestamp when provided', () => {
      render(<AdventureMessage {...emoteProps} timestamp="2024-01-15T11:30:00Z" />);
      expect(screen.getByTestId('adventure-message-timestamp')).toBeInTheDocument();
    });

    it('applies own message styling', () => {
      render(<AdventureMessage {...emoteProps} isOwnMessage={true} />);
      expect(screen.getByTestId('adventure-message-player')).toHaveClass('text-cfg-primary');
    });

    it('applies DM styling', () => {
      render(<AdventureMessage {...emoteProps} isDM={true} />);
      expect(screen.getByTestId('adventure-message-player')).toHaveClass('text-cfg-accent');
    });
  });

  describe('system message type', () => {
    const systemProps = {
      ...defaultProps,
      type: 'system' as const,
      content: 'Gandalf has joined the adventure',
    };

    it('renders content', () => {
      render(<AdventureMessage {...systemProps} />);
      expect(screen.getByTestId('adventure-message-content')).toHaveTextContent('Gandalf has joined the adventure');
    });

    it('has centered italic styling', () => {
      render(<AdventureMessage {...systemProps} />);
      expect(screen.getByTestId('adventure-message')).toHaveClass('text-center', 'italic');
    });

    it('renders timestamp when provided', () => {
      render(<AdventureMessage {...systemProps} timestamp="2024-01-15T11:30:00Z" />);
      expect(screen.getByTestId('adventure-message-timestamp')).toBeInTheDocument();
    });

    it('does not render player name element', () => {
      render(<AdventureMessage {...systemProps} />);
      expect(screen.queryByTestId('adventure-message-player')).not.toBeInTheDocument();
    });
  });

  describe('narrative message type', () => {
    const narrativeProps = {
      ...defaultProps,
      type: 'narrative' as const,
      content: 'The dark lord stirs in his tower, sensing the approach of the fellowship.',
    };

    it('renders content', () => {
      render(<AdventureMessage {...narrativeProps} />);
      expect(screen.getByTestId('adventure-message-content')).toHaveTextContent(
        'The dark lord stirs in his tower'
      );
    });

    it('has italic styling', () => {
      const { container } = render(<AdventureMessage {...narrativeProps} />);
      const content = container.querySelector('.italic');
      expect(content).toBeInTheDocument();
    });

    it('has left border styling', () => {
      render(<AdventureMessage {...narrativeProps} />);
      expect(screen.getByTestId('adventure-message')).toHaveClass('border-l-2');
    });

    it('renders timestamp when provided', () => {
      render(<AdventureMessage {...narrativeProps} timestamp="2024-01-15T11:30:00Z" />);
      expect(screen.getByTestId('adventure-message-timestamp')).toBeInTheDocument();
    });

    it('does not render player name element', () => {
      render(<AdventureMessage {...narrativeProps} />);
      expect(screen.queryByTestId('adventure-message-player')).not.toBeInTheDocument();
    });
  });

  describe('timestamp formatting', () => {
    it('does not show timestamp when not provided', () => {
      render(<AdventureMessage {...defaultProps} />);
      expect(screen.queryByTestId('adventure-message-timestamp')).not.toBeInTheDocument();
    });

    it('formats timestamp correctly', () => {
      render(<AdventureMessage {...defaultProps} timestamp="2024-01-15T14:30:00Z" />);
      expect(screen.getByTestId('adventure-message-timestamp')).toBeInTheDocument();
    });
  });

  describe('custom testId', () => {
    it('uses custom testId', () => {
      render(<AdventureMessage {...defaultProps} testId="custom-msg" />);
      expect(screen.getByTestId('custom-msg')).toBeInTheDocument();
    });
  });

  describe('styling', () => {
    it('applies custom className', () => {
      render(<AdventureMessage {...defaultProps} className="custom-class" />);
      expect(screen.getByTestId('adventure-message')).toHaveClass('custom-class');
    });
  });
});
