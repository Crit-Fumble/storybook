import { render, screen, fireEvent } from '@testing-library/react';
import { PartyCard } from './PartyCard';

describe('PartyCard', () => {
  const defaultProps = {
    id: 'party-1',
    name: 'The Adventurers',
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
      render(<PartyCard {...defaultProps} />);
      expect(screen.getByTestId('party-card-name')).toHaveTextContent('The Adventurers');
    });

    it('renders with custom testId', () => {
      render(<PartyCard {...defaultProps} testId="custom-party" />);
      expect(screen.getByTestId('custom-party')).toBeInTheDocument();
    });

    it('renders description when provided', () => {
      render(<PartyCard {...defaultProps} description="A brave group of heroes" />);
      expect(screen.getByTestId('party-card-description')).toHaveTextContent('A brave group of heroes');
    });

    it('does not render description when not provided', () => {
      render(<PartyCard {...defaultProps} />);
      expect(screen.queryByTestId('party-card-description')).not.toBeInTheDocument();
    });

    it('renders color indicator with custom color', () => {
      render(<PartyCard {...defaultProps} color="#ff0000" />);
      const colorDot = screen.getByTestId('party-card-color');
      expect(colorDot).toHaveStyle({ backgroundColor: '#ff0000' });
    });

    it('renders color indicator with default color when not provided', () => {
      render(<PartyCard {...defaultProps} />);
      const colorDot = screen.getByTestId('party-card-color');
      expect(colorDot).toHaveStyle({ backgroundColor: '#552e66' });
    });
  });

  describe('member and session counts', () => {
    it('displays member count singular', () => {
      render(<PartyCard {...defaultProps} memberCount={1} />);
      expect(screen.getByTestId('party-card-member-count')).toHaveTextContent('1 member');
    });

    it('displays member count plural', () => {
      render(<PartyCard {...defaultProps} memberCount={5} />);
      expect(screen.getByTestId('party-card-member-count')).toHaveTextContent('5 members');
    });

    it('displays session count singular', () => {
      render(<PartyCard {...defaultProps} sessionCount={1} />);
      expect(screen.getByTestId('party-card-session-count')).toHaveTextContent('1 session');
    });

    it('displays session count plural', () => {
      render(<PartyCard {...defaultProps} sessionCount={10} />);
      expect(screen.getByTestId('party-card-session-count')).toHaveTextContent('10 sessions');
    });

    it('displays zero counts', () => {
      render(<PartyCard {...defaultProps} memberCount={0} sessionCount={0} />);
      expect(screen.getByTestId('party-card-member-count')).toHaveTextContent('0 members');
      expect(screen.getByTestId('party-card-session-count')).toHaveTextContent('0 sessions');
    });
  });

  describe('status badges', () => {
    it('does not show inactive badge when active', () => {
      render(<PartyCard {...defaultProps} isActive={true} />);
      expect(screen.queryByTestId('party-card-inactive-badge')).not.toBeInTheDocument();
    });

    it('shows inactive badge when not active', () => {
      render(<PartyCard {...defaultProps} isActive={false} />);
      expect(screen.getByTestId('party-card-inactive-badge')).toHaveTextContent('Inactive');
    });

    it('shows schedule badge when has schedule', () => {
      render(<PartyCard {...defaultProps} hasSchedule={true} />);
      expect(screen.getByTestId('party-card-schedule-badge')).toHaveTextContent('Scheduled');
    });

    it('does not show schedule badge when no schedule', () => {
      render(<PartyCard {...defaultProps} hasSchedule={false} />);
      expect(screen.queryByTestId('party-card-schedule-badge')).not.toBeInTheDocument();
    });
  });

  describe('next session display', () => {
    it('shows next session when hasSchedule is true', () => {
      render(
        <PartyCard
          {...defaultProps}
          hasSchedule={true}
          nextSessionAt="2024-01-15T14:00:00Z"
        />
      );
      expect(screen.getByTestId('party-card-next-session')).toBeInTheDocument();
    });

    it('does not show next session when hasSchedule is false', () => {
      render(<PartyCard {...defaultProps} hasSchedule={false} nextSessionAt="2024-01-15T14:00:00Z" />);
      expect(screen.queryByTestId('party-card-next-session')).not.toBeInTheDocument();
    });

    it('displays "Not scheduled" when no nextSessionAt', () => {
      render(<PartyCard {...defaultProps} hasSchedule={true} />);
      expect(screen.getByTestId('party-card-next-session')).toHaveTextContent('Not scheduled');
    });

    it('displays "Starting soon" for very near sessions', () => {
      render(
        <PartyCard
          {...defaultProps}
          hasSchedule={true}
          nextSessionAt="2024-01-15T12:00:30Z"
        />
      );
      expect(screen.getByTestId('party-card-next-session')).toHaveTextContent('Starting soon');
    });

    it('displays hours for upcoming sessions', () => {
      render(
        <PartyCard
          {...defaultProps}
          hasSchedule={true}
          nextSessionAt="2024-01-15T15:00:00Z"
        />
      );
      expect(screen.getByTestId('party-card-next-session')).toHaveTextContent('In 3h');
    });

    it('displays "Tomorrow" for next day sessions', () => {
      render(
        <PartyCard
          {...defaultProps}
          hasSchedule={true}
          nextSessionAt="2024-01-16T14:00:00Z"
        />
      );
      expect(screen.getByTestId('party-card-next-session')).toHaveTextContent('Tomorrow');
    });

    it('displays days for sessions within a week', () => {
      render(
        <PartyCard
          {...defaultProps}
          hasSchedule={true}
          nextSessionAt="2024-01-18T14:00:00Z"
        />
      );
      expect(screen.getByTestId('party-card-next-session')).toHaveTextContent('In 3 days');
    });

    it('displays date for sessions more than a week away', () => {
      render(
        <PartyCard
          {...defaultProps}
          hasSchedule={true}
          nextSessionAt="2024-01-25T14:00:00Z"
        />
      );
      // Should show a formatted date
      expect(screen.getByTestId('party-card-next-session')).toBeInTheDocument();
    });

    it('displays "Past due" for past sessions', () => {
      render(
        <PartyCard
          {...defaultProps}
          hasSchedule={true}
          nextSessionAt="2024-01-10T14:00:00Z"
        />
      );
      expect(screen.getByTestId('party-card-next-session')).toHaveTextContent('Past due');
    });

    it('displays session duration', () => {
      render(
        <PartyCard
          {...defaultProps}
          hasSchedule={true}
          nextSessionAt="2024-01-16T14:00:00Z"
          sessionDuration={180}
        />
      );
      expect(screen.getByTestId('party-card-next-session')).toHaveTextContent('3h');
    });

    it('displays duration with minutes', () => {
      render(
        <PartyCard
          {...defaultProps}
          hasSchedule={true}
          nextSessionAt="2024-01-16T14:00:00Z"
          sessionDuration={150}
        />
      );
      expect(screen.getByTestId('party-card-next-session')).toHaveTextContent('2h 30m');
    });

    it('displays minutes-only duration', () => {
      render(
        <PartyCard
          {...defaultProps}
          hasSchedule={true}
          nextSessionAt="2024-01-16T14:00:00Z"
          sessionDuration={45}
        />
      );
      expect(screen.getByTestId('party-card-next-session')).toHaveTextContent('45m');
    });
  });

  describe('campaign and channels', () => {
    it('displays campaign name', () => {
      render(<PartyCard {...defaultProps} campaignName="Curse of Strahd" />);
      expect(screen.getByTestId('party-card-campaign')).toHaveTextContent('Curse of Strahd');
    });

    it('does not display campaign when not provided', () => {
      render(<PartyCard {...defaultProps} />);
      expect(screen.queryByTestId('party-card-campaign')).not.toBeInTheDocument();
    });

    it('displays voice channel', () => {
      render(<PartyCard {...defaultProps} voiceChannelName="Game Voice" />);
      expect(screen.getByTestId('party-card-voice-channel')).toHaveTextContent('Game Voice');
    });

    it('displays text channel', () => {
      render(<PartyCard {...defaultProps} textChannelName="game-chat" />);
      expect(screen.getByTestId('party-card-text-channel')).toHaveTextContent('game-chat');
    });

    it('displays both channels', () => {
      render(<PartyCard {...defaultProps} voiceChannelName="Voice" textChannelName="text" />);
      expect(screen.getByTestId('party-card-voice-channel')).toBeInTheDocument();
      expect(screen.getByTestId('party-card-text-channel')).toBeInTheDocument();
    });

    it('displays timezone', () => {
      render(<PartyCard {...defaultProps} timezone="America/New_York" />);
      expect(screen.getByTestId('party-card-timezone')).toHaveTextContent('America/New_York');
    });
  });

  describe('click behavior', () => {
    it('calls onClick when card is clicked', () => {
      const handleClick = jest.fn();
      render(<PartyCard {...defaultProps} onClick={handleClick} />);
      fireEvent.click(screen.getByTestId('party-card'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('has button role when onClick is provided', () => {
      render(<PartyCard {...defaultProps} onClick={() => {}} />);
      expect(screen.getByTestId('party-card')).toHaveAttribute('role', 'button');
    });

    it('does not have button role when onClick is not provided', () => {
      render(<PartyCard {...defaultProps} />);
      expect(screen.getByTestId('party-card')).not.toHaveAttribute('role');
    });

    it('responds to Enter key', () => {
      const handleClick = jest.fn();
      render(<PartyCard {...defaultProps} onClick={handleClick} />);
      fireEvent.keyDown(screen.getByTestId('party-card'), { key: 'Enter' });
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('responds to Space key', () => {
      const handleClick = jest.fn();
      render(<PartyCard {...defaultProps} onClick={handleClick} />);
      fireEvent.keyDown(screen.getByTestId('party-card'), { key: ' ' });
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not respond to other keys', () => {
      const handleClick = jest.fn();
      render(<PartyCard {...defaultProps} onClick={handleClick} />);
      fireEvent.keyDown(screen.getByTestId('party-card'), { key: 'a' });
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('does not call onClick when loading', () => {
      const handleClick = jest.fn();
      render(<PartyCard {...defaultProps} onClick={handleClick} isLoading={true} />);
      fireEvent.click(screen.getByTestId('party-card'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('action buttons', () => {
    it('renders edit button when onEdit provided', () => {
      render(<PartyCard {...defaultProps} onEdit={() => {}} />);
      expect(screen.getByTestId('party-card-edit-btn')).toBeInTheDocument();
    });

    it('renders delete button when onDelete provided', () => {
      render(<PartyCard {...defaultProps} onDelete={() => {}} />);
      expect(screen.getByTestId('party-card-delete-btn')).toBeInTheDocument();
    });

    it('calls onEdit when edit clicked', () => {
      const handleEdit = jest.fn();
      render(<PartyCard {...defaultProps} onEdit={handleEdit} />);
      fireEvent.click(screen.getByTestId('party-card-edit-btn'));
      expect(handleEdit).toHaveBeenCalledTimes(1);
    });

    it('calls onDelete when delete clicked', () => {
      const handleDelete = jest.fn();
      render(<PartyCard {...defaultProps} onDelete={handleDelete} />);
      fireEvent.click(screen.getByTestId('party-card-delete-btn'));
      expect(handleDelete).toHaveBeenCalledTimes(1);
    });

    it('stops propagation when edit clicked', () => {
      const handleClick = jest.fn();
      const handleEdit = jest.fn();
      render(<PartyCard {...defaultProps} onClick={handleClick} onEdit={handleEdit} />);
      fireEvent.click(screen.getByTestId('party-card-edit-btn'));
      expect(handleEdit).toHaveBeenCalled();
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('stops propagation when delete clicked', () => {
      const handleClick = jest.fn();
      const handleDelete = jest.fn();
      render(<PartyCard {...defaultProps} onClick={handleClick} onDelete={handleDelete} />);
      fireEvent.click(screen.getByTestId('party-card-delete-btn'));
      expect(handleDelete).toHaveBeenCalled();
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('disables buttons when loading', () => {
      render(<PartyCard {...defaultProps} onEdit={() => {}} onDelete={() => {}} isLoading={true} />);
      expect(screen.getByTestId('party-card-edit-btn')).toBeDisabled();
      expect(screen.getByTestId('party-card-delete-btn')).toBeDisabled();
    });
  });

  describe('styling', () => {
    it('applies custom className', () => {
      render(<PartyCard {...defaultProps} className="custom-class" />);
      expect(screen.getByTestId('party-card')).toHaveClass('custom-class');
    });

    it('applies inactive styling when not active', () => {
      render(<PartyCard {...defaultProps} isActive={false} />);
      expect(screen.getByTestId('party-card')).toHaveClass('opacity-60');
    });

    it('applies loading styling when loading', () => {
      render(<PartyCard {...defaultProps} isLoading={true} />);
      expect(screen.getByTestId('party-card')).toHaveClass('opacity-70');
    });
  });
});
