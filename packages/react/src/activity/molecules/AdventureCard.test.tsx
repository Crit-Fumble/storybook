import { render, screen, fireEvent } from '@testing-library/react';
import { AdventureCard } from './AdventureCard';

describe('AdventureCard', () => {
  const defaultProps = {
    id: 'adventure-1',
    name: 'The Lost Mines',
    status: 'waiting' as const,
    playerCount: 4,
  };

  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-01-15T12:00:00Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('rendering', () => {
    it('renders the card with name', () => {
      render(<AdventureCard {...defaultProps} />);
      expect(screen.getByTestId('adventure-card-name')).toHaveTextContent('The Lost Mines');
    });

    it('renders with custom testId', () => {
      render(<AdventureCard {...defaultProps} testId="custom-adventure" />);
      expect(screen.getByTestId('custom-adventure')).toBeInTheDocument();
    });

    it('renders description when provided', () => {
      render(<AdventureCard {...defaultProps} description="An exciting dungeon crawl" />);
      expect(screen.getByTestId('adventure-card-description')).toHaveTextContent('An exciting dungeon crawl');
    });

    it('does not render description when not provided', () => {
      render(<AdventureCard {...defaultProps} />);
      expect(screen.queryByTestId('adventure-card-description')).not.toBeInTheDocument();
    });
  });

  describe('status badge', () => {
    it('displays Waiting status', () => {
      render(<AdventureCard {...defaultProps} status="waiting" />);
      expect(screen.getByTestId('adventure-card-status-badge')).toHaveTextContent('Waiting');
    });

    it('displays Active status', () => {
      render(<AdventureCard {...defaultProps} status="active" />);
      expect(screen.getByTestId('adventure-card-status-badge')).toHaveTextContent('Active');
    });

    it('displays Paused status', () => {
      render(<AdventureCard {...defaultProps} status="paused" />);
      expect(screen.getByTestId('adventure-card-status-badge')).toHaveTextContent('Paused');
    });

    it('displays Ended status', () => {
      render(<AdventureCard {...defaultProps} status="ended" />);
      expect(screen.getByTestId('adventure-card-status-badge')).toHaveTextContent('Ended');
    });
  });

  describe('player count', () => {
    it('displays player count singular', () => {
      render(<AdventureCard {...defaultProps} playerCount={1} />);
      expect(screen.getByTestId('adventure-card-player-count')).toHaveTextContent('1 player');
    });

    it('displays player count plural', () => {
      render(<AdventureCard {...defaultProps} playerCount={5} />);
      expect(screen.getByTestId('adventure-card-player-count')).toHaveTextContent('5 players');
    });
  });

  describe('channel', () => {
    it('displays channel name when provided', () => {
      render(<AdventureCard {...defaultProps} channelName="adventure-chat" />);
      expect(screen.getByTestId('adventure-card-channel')).toHaveTextContent('#adventure-chat');
    });

    it('does not display channel when not provided', () => {
      render(<AdventureCard {...defaultProps} />);
      expect(screen.queryByTestId('adventure-card-channel')).not.toBeInTheDocument();
    });
  });

  describe('time info', () => {
    it('shows started time for active status', () => {
      render(
        <AdventureCard
          {...defaultProps}
          status="active"
          startedAt="2024-01-15T11:00:00Z"
        />
      );
      expect(screen.getByTestId('adventure-card-started')).toHaveTextContent('Started 1h ago');
    });

    it('shows created time for waiting status', () => {
      render(
        <AdventureCard
          {...defaultProps}
          status="waiting"
          createdAt="2024-01-15T11:00:00Z"
        />
      );
      expect(screen.getByTestId('adventure-card-created')).toHaveTextContent('Created 1h ago');
    });

    it('shows ran time for ended status', () => {
      render(
        <AdventureCard
          {...defaultProps}
          status="ended"
          startedAt="2024-01-14T12:00:00Z"
        />
      );
      expect(screen.getByTestId('adventure-card-ended')).toHaveTextContent('Ran 1d ago');
    });

    it('formats "Just now" for very recent times', () => {
      render(
        <AdventureCard
          {...defaultProps}
          status="active"
          startedAt="2024-01-15T11:59:45Z"
        />
      );
      expect(screen.getByTestId('adventure-card-started')).toHaveTextContent('Just now');
    });

    it('formats minutes ago', () => {
      render(
        <AdventureCard
          {...defaultProps}
          status="active"
          startedAt="2024-01-15T11:30:00Z"
        />
      );
      expect(screen.getByTestId('adventure-card-started')).toHaveTextContent('30m ago');
    });

    it('formats days ago', () => {
      render(
        <AdventureCard
          {...defaultProps}
          status="active"
          startedAt="2024-01-12T12:00:00Z"
        />
      );
      expect(screen.getByTestId('adventure-card-started')).toHaveTextContent('3d ago');
    });
  });

  describe('click behavior', () => {
    it('calls onClick when card is clicked', () => {
      const handleClick = jest.fn();
      render(<AdventureCard {...defaultProps} onClick={handleClick} />);
      fireEvent.click(screen.getByTestId('adventure-card'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('has button role when onClick is provided', () => {
      render(<AdventureCard {...defaultProps} onClick={() => {}} />);
      expect(screen.getByTestId('adventure-card')).toHaveAttribute('role', 'button');
    });

    it('responds to Enter key', () => {
      const handleClick = jest.fn();
      render(<AdventureCard {...defaultProps} onClick={handleClick} />);
      fireEvent.keyDown(screen.getByTestId('adventure-card'), { key: 'Enter' });
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('responds to Space key', () => {
      const handleClick = jest.fn();
      render(<AdventureCard {...defaultProps} onClick={handleClick} />);
      fireEvent.keyDown(screen.getByTestId('adventure-card'), { key: ' ' });
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when loading', () => {
      const handleClick = jest.fn();
      render(<AdventureCard {...defaultProps} onClick={handleClick} isLoading={true} />);
      fireEvent.click(screen.getByTestId('adventure-card'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('action buttons', () => {
    describe('join button', () => {
      it('renders for waiting status', () => {
        render(<AdventureCard {...defaultProps} status="waiting" onJoin={() => {}} />);
        expect(screen.getByTestId('adventure-card-join-btn')).toBeInTheDocument();
      });

      it('renders for active status', () => {
        render(<AdventureCard {...defaultProps} status="active" onJoin={() => {}} />);
        expect(screen.getByTestId('adventure-card-join-btn')).toBeInTheDocument();
      });

      it('does not render for paused status', () => {
        render(<AdventureCard {...defaultProps} status="paused" onJoin={() => {}} />);
        expect(screen.queryByTestId('adventure-card-join-btn')).not.toBeInTheDocument();
      });

      it('does not render for ended status', () => {
        render(<AdventureCard {...defaultProps} status="ended" onJoin={() => {}} />);
        expect(screen.queryByTestId('adventure-card-join-btn')).not.toBeInTheDocument();
      });

      it('calls onJoin when clicked', () => {
        const handleJoin = jest.fn();
        render(<AdventureCard {...defaultProps} onJoin={handleJoin} />);
        fireEvent.click(screen.getByTestId('adventure-card-join-btn'));
        expect(handleJoin).toHaveBeenCalledTimes(1);
      });

      it('stops propagation', () => {
        const handleClick = jest.fn();
        const handleJoin = jest.fn();
        render(<AdventureCard {...defaultProps} onClick={handleClick} onJoin={handleJoin} />);
        fireEvent.click(screen.getByTestId('adventure-card-join-btn'));
        expect(handleJoin).toHaveBeenCalled();
        expect(handleClick).not.toHaveBeenCalled();
      });
    });

    describe('start button', () => {
      it('renders for waiting status', () => {
        render(<AdventureCard {...defaultProps} status="waiting" onStart={() => {}} />);
        expect(screen.getByTestId('adventure-card-start-btn')).toBeInTheDocument();
      });

      it('does not render for active status', () => {
        render(<AdventureCard {...defaultProps} status="active" onStart={() => {}} />);
        expect(screen.queryByTestId('adventure-card-start-btn')).not.toBeInTheDocument();
      });

      it('calls onStart when clicked', () => {
        const handleStart = jest.fn();
        render(<AdventureCard {...defaultProps} onStart={handleStart} />);
        fireEvent.click(screen.getByTestId('adventure-card-start-btn'));
        expect(handleStart).toHaveBeenCalledTimes(1);
      });

      it('stops propagation', () => {
        const handleClick = jest.fn();
        const handleStart = jest.fn();
        render(<AdventureCard {...defaultProps} onClick={handleClick} onStart={handleStart} />);
        fireEvent.click(screen.getByTestId('adventure-card-start-btn'));
        expect(handleStart).toHaveBeenCalled();
        expect(handleClick).not.toHaveBeenCalled();
      });
    });

    describe('end button', () => {
      it('renders for active status', () => {
        render(<AdventureCard {...defaultProps} status="active" onEnd={() => {}} />);
        expect(screen.getByTestId('adventure-card-end-btn')).toBeInTheDocument();
      });

      it('renders for paused status', () => {
        render(<AdventureCard {...defaultProps} status="paused" onEnd={() => {}} />);
        expect(screen.getByTestId('adventure-card-end-btn')).toBeInTheDocument();
      });

      it('does not render for waiting status', () => {
        render(<AdventureCard {...defaultProps} status="waiting" onEnd={() => {}} />);
        expect(screen.queryByTestId('adventure-card-end-btn')).not.toBeInTheDocument();
      });

      it('does not render for ended status', () => {
        render(<AdventureCard {...defaultProps} status="ended" onEnd={() => {}} />);
        expect(screen.queryByTestId('adventure-card-end-btn')).not.toBeInTheDocument();
      });

      it('calls onEnd when clicked', () => {
        const handleEnd = jest.fn();
        render(<AdventureCard {...defaultProps} status="active" onEnd={handleEnd} />);
        fireEvent.click(screen.getByTestId('adventure-card-end-btn'));
        expect(handleEnd).toHaveBeenCalledTimes(1);
      });

      it('stops propagation', () => {
        const handleClick = jest.fn();
        const handleEnd = jest.fn();
        render(<AdventureCard {...defaultProps} status="active" onClick={handleClick} onEnd={handleEnd} />);
        fireEvent.click(screen.getByTestId('adventure-card-end-btn'));
        expect(handleEnd).toHaveBeenCalled();
        expect(handleClick).not.toHaveBeenCalled();
      });
    });

    it('hides all actions for ended status', () => {
      render(
        <AdventureCard
          {...defaultProps}
          status="ended"
          onJoin={() => {}}
          onStart={() => {}}
          onEnd={() => {}}
        />
      );
      expect(screen.queryByTestId('adventure-card-join-btn')).not.toBeInTheDocument();
      expect(screen.queryByTestId('adventure-card-start-btn')).not.toBeInTheDocument();
      expect(screen.queryByTestId('adventure-card-end-btn')).not.toBeInTheDocument();
    });

    it('disables buttons when loading', () => {
      render(
        <AdventureCard
          {...defaultProps}
          status="waiting"
          onJoin={() => {}}
          onStart={() => {}}
          isLoading={true}
        />
      );
      expect(screen.getByTestId('adventure-card-join-btn')).toBeDisabled();
      expect(screen.getByTestId('adventure-card-start-btn')).toBeDisabled();
    });
  });

  describe('styling', () => {
    it('applies custom className', () => {
      render(<AdventureCard {...defaultProps} className="custom-class" />);
      expect(screen.getByTestId('adventure-card')).toHaveClass('custom-class');
    });

    it('applies active styling for active status', () => {
      render(<AdventureCard {...defaultProps} status="active" />);
      expect(screen.getByTestId('adventure-card')).toHaveClass('border-cfg-primary');
    });

    it('applies ended styling for ended status', () => {
      render(<AdventureCard {...defaultProps} status="ended" />);
      expect(screen.getByTestId('adventure-card')).toHaveClass('opacity-60');
    });

    it('applies loading styling when loading', () => {
      render(<AdventureCard {...defaultProps} isLoading={true} />);
      expect(screen.getByTestId('adventure-card')).toHaveClass('opacity-70');
    });
  });
});
