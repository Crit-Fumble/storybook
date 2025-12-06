import { render, screen, fireEvent } from '@testing-library/react';
import { ScheduleCard } from './ScheduleCard';

describe('ScheduleCard', () => {
  const defaultProps = {
    name: 'Weekly Game Night',
    nextStart: '2024-01-16T19:00:00Z',
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
      render(<ScheduleCard {...defaultProps} />);
      expect(screen.getByTestId('schedule-card-name')).toHaveTextContent('Weekly Game Night');
    });

    it('renders with custom testId', () => {
      render(<ScheduleCard {...defaultProps} testId="custom-schedule" />);
      expect(screen.getByTestId('custom-schedule')).toBeInTheDocument();
    });

    it('renders color indicator with custom color', () => {
      render(<ScheduleCard {...defaultProps} color="#ff0000" />);
      const colorDot = screen.getByTestId('schedule-card-color');
      expect(colorDot).toHaveStyle({ backgroundColor: '#ff0000' });
    });

    it('renders color indicator with default color', () => {
      render(<ScheduleCard {...defaultProps} />);
      const colorDot = screen.getByTestId('schedule-card-color');
      expect(colorDot).toHaveStyle({ backgroundColor: '#552e66' });
    });
  });

  describe('campaign name', () => {
    it('displays campaign name when provided', () => {
      render(<ScheduleCard {...defaultProps} campaignName="Curse of Strahd" />);
      expect(screen.getByTestId('schedule-card-campaign')).toHaveTextContent('Curse of Strahd');
    });

    it('does not display campaign when not provided', () => {
      render(<ScheduleCard {...defaultProps} />);
      expect(screen.queryByTestId('schedule-card-campaign')).not.toBeInTheDocument();
    });
  });

  describe('countdown display', () => {
    it('shows "Live Now" when happening', () => {
      render(
        <ScheduleCard
          {...defaultProps}
          nextStart="2024-01-15T11:00:00Z"
          nextEnd="2024-01-15T14:00:00Z"
        />
      );
      expect(screen.getByTestId('schedule-card-countdown')).toHaveTextContent('Live Now');
    });

    it('shows minutes countdown', () => {
      render(<ScheduleCard {...defaultProps} nextStart="2024-01-15T12:30:00Z" />);
      expect(screen.getByTestId('schedule-card-countdown')).toHaveTextContent('In 30m');
    });

    it('shows hours countdown', () => {
      render(<ScheduleCard {...defaultProps} nextStart="2024-01-15T15:00:00Z" />);
      expect(screen.getByTestId('schedule-card-countdown')).toHaveTextContent('In 3h');
    });

    it('shows days countdown', () => {
      render(<ScheduleCard {...defaultProps} nextStart="2024-01-18T12:00:00Z" />);
      expect(screen.getByTestId('schedule-card-countdown')).toHaveTextContent('In 3d');
    });

    it('shows "Started" for past events', () => {
      render(<ScheduleCard {...defaultProps} nextStart="2024-01-15T10:00:00Z" />);
      expect(screen.getByTestId('schedule-card-countdown')).toHaveTextContent('Started');
    });

    it('shows "Starting now" for imminent events', () => {
      render(<ScheduleCard {...defaultProps} nextStart="2024-01-15T12:00:30Z" />);
      expect(screen.getByTestId('schedule-card-countdown')).toHaveTextContent('Starting now');
    });
  });

  describe('date display', () => {
    it('displays "Today" for today', () => {
      render(<ScheduleCard {...defaultProps} nextStart="2024-01-15T19:00:00Z" />);
      expect(screen.getByTestId('schedule-card-date')).toHaveTextContent('Today');
    });

    it('displays "Tomorrow" for tomorrow', () => {
      render(<ScheduleCard {...defaultProps} nextStart="2024-01-16T19:00:00Z" />);
      expect(screen.getByTestId('schedule-card-date')).toHaveTextContent('Tomorrow');
    });

    it('displays weekday for dates within a week', () => {
      render(<ScheduleCard {...defaultProps} nextStart="2024-01-18T19:00:00Z" />);
      // Should show day name like "Thursday"
      expect(screen.getByTestId('schedule-card-date')).toBeInTheDocument();
    });

    it('displays formatted date for dates beyond a week', () => {
      render(<ScheduleCard {...defaultProps} nextStart="2024-01-25T19:00:00Z" />);
      expect(screen.getByTestId('schedule-card-date')).toBeInTheDocument();
    });
  });

  describe('time display', () => {
    it('displays start time', () => {
      render(<ScheduleCard {...defaultProps} />);
      expect(screen.getByTestId('schedule-card-time')).toBeInTheDocument();
    });

    it('displays time range when end time provided', () => {
      render(
        <ScheduleCard
          {...defaultProps}
          nextEnd="2024-01-16T22:00:00Z"
        />
      );
      expect(screen.getByTestId('schedule-card-time')).toBeInTheDocument();
    });

    it('displays time range when duration provided', () => {
      render(
        <ScheduleCard
          {...defaultProps}
          duration={180}
        />
      );
      expect(screen.getByTestId('schedule-card-time')).toBeInTheDocument();
    });
  });

  describe('timezone', () => {
    it('displays timezone when provided', () => {
      render(<ScheduleCard {...defaultProps} timezone="America/New_York" />);
      expect(screen.getByTestId('schedule-card-timezone')).toHaveTextContent('America/New_York');
    });

    it('does not display timezone when not provided', () => {
      render(<ScheduleCard {...defaultProps} />);
      expect(screen.queryByTestId('schedule-card-timezone')).not.toBeInTheDocument();
    });
  });

  describe('recurrence', () => {
    it('displays recurrence when isRecurring is true', () => {
      render(<ScheduleCard {...defaultProps} isRecurring={true} />);
      expect(screen.getByTestId('schedule-card-recurrence')).toBeInTheDocument();
    });

    it('displays "Recurring" as default description', () => {
      render(<ScheduleCard {...defaultProps} isRecurring={true} />);
      expect(screen.getByTestId('schedule-card-recurrence')).toHaveTextContent('Recurring');
    });

    it('displays custom recurrence description', () => {
      render(
        <ScheduleCard
          {...defaultProps}
          isRecurring={true}
          recurrenceDescription="Every Tuesday at 7 PM"
        />
      );
      expect(screen.getByTestId('schedule-card-recurrence')).toHaveTextContent('Every Tuesday at 7 PM');
    });

    it('does not display recurrence when isRecurring is false', () => {
      render(<ScheduleCard {...defaultProps} isRecurring={false} />);
      expect(screen.queryByTestId('schedule-card-recurrence')).not.toBeInTheDocument();
    });
  });

  describe('click behavior', () => {
    it('calls onClick when card is clicked', () => {
      const handleClick = jest.fn();
      render(<ScheduleCard {...defaultProps} onClick={handleClick} />);
      fireEvent.click(screen.getByTestId('schedule-card'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('has button role when onClick is provided', () => {
      render(<ScheduleCard {...defaultProps} onClick={() => {}} />);
      expect(screen.getByTestId('schedule-card')).toHaveAttribute('role', 'button');
    });

    it('responds to Enter key', () => {
      const handleClick = jest.fn();
      render(<ScheduleCard {...defaultProps} onClick={handleClick} />);
      fireEvent.keyDown(screen.getByTestId('schedule-card'), { key: 'Enter' });
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('responds to Space key', () => {
      const handleClick = jest.fn();
      render(<ScheduleCard {...defaultProps} onClick={handleClick} />);
      fireEvent.keyDown(screen.getByTestId('schedule-card'), { key: ' ' });
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when loading', () => {
      const handleClick = jest.fn();
      render(<ScheduleCard {...defaultProps} onClick={handleClick} isLoading={true} />);
      fireEvent.click(screen.getByTestId('schedule-card'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('join button', () => {
    it('renders join button when onJoin provided', () => {
      render(<ScheduleCard {...defaultProps} onJoin={() => {}} />);
      expect(screen.getByTestId('schedule-card-join-btn')).toBeInTheDocument();
    });

    it('shows "Set Reminder" for upcoming events', () => {
      render(<ScheduleCard {...defaultProps} onJoin={() => {}} />);
      expect(screen.getByTestId('schedule-card-join-btn')).toHaveTextContent('Set Reminder');
    });

    it('shows "Join Now" for live events', () => {
      render(
        <ScheduleCard
          {...defaultProps}
          nextStart="2024-01-15T11:00:00Z"
          nextEnd="2024-01-15T14:00:00Z"
          onJoin={() => {}}
        />
      );
      expect(screen.getByTestId('schedule-card-join-btn')).toHaveTextContent('Join Now');
    });

    it('calls onJoin when clicked', () => {
      const handleJoin = jest.fn();
      render(<ScheduleCard {...defaultProps} onJoin={handleJoin} />);
      fireEvent.click(screen.getByTestId('schedule-card-join-btn'));
      expect(handleJoin).toHaveBeenCalledTimes(1);
    });

    it('stops propagation when join clicked', () => {
      const handleClick = jest.fn();
      const handleJoin = jest.fn();
      render(<ScheduleCard {...defaultProps} onClick={handleClick} onJoin={handleJoin} />);
      fireEvent.click(screen.getByTestId('schedule-card-join-btn'));
      expect(handleJoin).toHaveBeenCalled();
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('disables button when loading', () => {
      render(<ScheduleCard {...defaultProps} onJoin={() => {}} isLoading={true} />);
      expect(screen.getByTestId('schedule-card-join-btn')).toBeDisabled();
    });
  });

  describe('styling', () => {
    it('applies custom className', () => {
      render(<ScheduleCard {...defaultProps} className="custom-class" />);
      expect(screen.getByTestId('schedule-card')).toHaveClass('custom-class');
    });

    it('applies loading styling when loading', () => {
      render(<ScheduleCard {...defaultProps} isLoading={true} />);
      expect(screen.getByTestId('schedule-card')).toHaveClass('opacity-70');
    });

    it('applies live styling when happening now', () => {
      render(
        <ScheduleCard
          {...defaultProps}
          nextStart="2024-01-15T11:00:00Z"
          nextEnd="2024-01-15T14:00:00Z"
        />
      );
      expect(screen.getByTestId('schedule-card')).toHaveClass('border-cfg-primary');
    });
  });
});
