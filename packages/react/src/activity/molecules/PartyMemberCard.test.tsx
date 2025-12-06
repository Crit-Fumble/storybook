import { render, screen, fireEvent } from '@testing-library/react';
import { PartyMemberCard } from './PartyMemberCard';

describe('PartyMemberCard', () => {
  const defaultProps = {
    id: 'member-1',
    name: 'John Doe',
    role: 'player' as const,
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
      render(<PartyMemberCard {...defaultProps} />);
      expect(screen.getByTestId('party-member-card-name')).toHaveTextContent('John Doe');
    });

    it('renders with custom testId', () => {
      render(<PartyMemberCard {...defaultProps} testId="custom-member" />);
      expect(screen.getByTestId('custom-member')).toBeInTheDocument();
    });
  });

  describe('avatar', () => {
    it('renders avatar image when provided', () => {
      render(<PartyMemberCard {...defaultProps} avatarUrl="https://example.com/avatar.jpg" />);
      const avatar = screen.getByTestId('party-member-card-avatar');
      expect(avatar).toHaveAttribute('src', 'https://example.com/avatar.jpg');
    });

    it('renders placeholder with initial when no avatar', () => {
      render(<PartyMemberCard {...defaultProps} />);
      const placeholder = screen.getByTestId('party-member-card-avatar-placeholder');
      expect(placeholder).toHaveTextContent('J');
    });

    it('renders uppercase initial in placeholder', () => {
      render(<PartyMemberCard {...defaultProps} name="alice" />);
      const placeholder = screen.getByTestId('party-member-card-avatar-placeholder');
      expect(placeholder).toHaveTextContent('A');
    });
  });

  describe('online status', () => {
    it('shows online indicator when online', () => {
      render(<PartyMemberCard {...defaultProps} isOnline={true} />);
      const status = screen.getByTestId('party-member-card-online-status');
      expect(status).toHaveClass('bg-cfg-green');
    });

    it('shows offline indicator when offline', () => {
      render(<PartyMemberCard {...defaultProps} isOnline={false} />);
      const status = screen.getByTestId('party-member-card-online-status');
      expect(status).toHaveClass('bg-cfg-text-muted');
    });

    it('does not show status indicator when isOnline is undefined', () => {
      render(<PartyMemberCard {...defaultProps} />);
      expect(screen.queryByTestId('party-member-card-online-status')).not.toBeInTheDocument();
    });
  });

  describe('role badge', () => {
    it('displays GM role badge', () => {
      render(<PartyMemberCard {...defaultProps} role="gm" />);
      expect(screen.getByTestId('party-member-card-role-badge')).toHaveTextContent('GM');
    });

    it('displays Player role badge', () => {
      render(<PartyMemberCard {...defaultProps} role="player" />);
      expect(screen.getByTestId('party-member-card-role-badge')).toHaveTextContent('Player');
    });

    it('displays Guest role badge', () => {
      render(<PartyMemberCard {...defaultProps} role="guest" />);
      expect(screen.getByTestId('party-member-card-role-badge')).toHaveTextContent('Guest');
    });
  });

  describe('joined date', () => {
    it('shows "Joined today" for today', () => {
      render(<PartyMemberCard {...defaultProps} joinedAt="2024-01-15T10:00:00Z" />);
      expect(screen.getByTestId('party-member-card-joined')).toHaveTextContent('Joined today');
    });

    it('shows "Joined yesterday" for yesterday', () => {
      render(<PartyMemberCard {...defaultProps} joinedAt="2024-01-14T10:00:00Z" />);
      expect(screen.getByTestId('party-member-card-joined')).toHaveTextContent('Joined yesterday');
    });

    it('shows days ago for recent dates', () => {
      render(<PartyMemberCard {...defaultProps} joinedAt="2024-01-10T10:00:00Z" />);
      expect(screen.getByTestId('party-member-card-joined')).toHaveTextContent('Joined 5d ago');
    });

    it('shows months ago for older dates', () => {
      render(<PartyMemberCard {...defaultProps} joinedAt="2023-11-15T10:00:00Z" />);
      expect(screen.getByTestId('party-member-card-joined')).toHaveTextContent('Joined 2mo ago');
    });

    it('shows full date for very old dates', () => {
      render(<PartyMemberCard {...defaultProps} joinedAt="2022-01-15T10:00:00Z" />);
      expect(screen.getByTestId('party-member-card-joined')).toBeInTheDocument();
    });

    it('does not show joined when not provided', () => {
      render(<PartyMemberCard {...defaultProps} />);
      expect(screen.queryByTestId('party-member-card-joined')).not.toBeInTheDocument();
    });
  });

  describe('click behavior', () => {
    it('calls onClick when card is clicked', () => {
      const handleClick = jest.fn();
      render(<PartyMemberCard {...defaultProps} onClick={handleClick} />);
      fireEvent.click(screen.getByTestId('party-member-card'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('has button role when onClick is provided', () => {
      render(<PartyMemberCard {...defaultProps} onClick={() => {}} />);
      expect(screen.getByTestId('party-member-card')).toHaveAttribute('role', 'button');
    });

    it('responds to Enter key', () => {
      const handleClick = jest.fn();
      render(<PartyMemberCard {...defaultProps} onClick={handleClick} />);
      fireEvent.keyDown(screen.getByTestId('party-member-card'), { key: 'Enter' });
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('responds to Space key', () => {
      const handleClick = jest.fn();
      render(<PartyMemberCard {...defaultProps} onClick={handleClick} />);
      fireEvent.keyDown(screen.getByTestId('party-member-card'), { key: ' ' });
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when loading', () => {
      const handleClick = jest.fn();
      render(<PartyMemberCard {...defaultProps} onClick={handleClick} isLoading={true} />);
      fireEvent.click(screen.getByTestId('party-member-card'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('role change', () => {
    it('renders role select when onRoleChange provided', () => {
      render(<PartyMemberCard {...defaultProps} onRoleChange={() => {}} />);
      expect(screen.getByTestId('party-member-card-role-select')).toBeInTheDocument();
    });

    it('calls onRoleChange with new role', () => {
      const handleRoleChange = jest.fn();
      render(<PartyMemberCard {...defaultProps} onRoleChange={handleRoleChange} />);
      fireEvent.change(screen.getByTestId('party-member-card-role-select'), { target: { value: 'gm' } });
      expect(handleRoleChange).toHaveBeenCalledWith('gm');
    });

    it('stops propagation when select is clicked', () => {
      const handleClick = jest.fn();
      render(<PartyMemberCard {...defaultProps} onClick={handleClick} onRoleChange={() => {}} />);
      fireEvent.click(screen.getByTestId('party-member-card-role-select'));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('stops propagation when select changes', () => {
      const handleClick = jest.fn();
      const handleRoleChange = jest.fn();
      render(<PartyMemberCard {...defaultProps} onClick={handleClick} onRoleChange={handleRoleChange} />);
      fireEvent.change(screen.getByTestId('party-member-card-role-select'), { target: { value: 'gm' } });
      expect(handleRoleChange).toHaveBeenCalled();
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('disables select when loading', () => {
      render(<PartyMemberCard {...defaultProps} onRoleChange={() => {}} isLoading={true} />);
      expect(screen.getByTestId('party-member-card-role-select')).toBeDisabled();
    });
  });

  describe('remove button', () => {
    it('renders remove button when onRemove provided', () => {
      render(<PartyMemberCard {...defaultProps} onRemove={() => {}} />);
      expect(screen.getByTestId('party-member-card-remove-btn')).toBeInTheDocument();
    });

    it('calls onRemove when clicked', () => {
      const handleRemove = jest.fn();
      render(<PartyMemberCard {...defaultProps} onRemove={handleRemove} />);
      fireEvent.click(screen.getByTestId('party-member-card-remove-btn'));
      expect(handleRemove).toHaveBeenCalledTimes(1);
    });

    it('stops propagation when remove clicked', () => {
      const handleClick = jest.fn();
      const handleRemove = jest.fn();
      render(<PartyMemberCard {...defaultProps} onClick={handleClick} onRemove={handleRemove} />);
      fireEvent.click(screen.getByTestId('party-member-card-remove-btn'));
      expect(handleRemove).toHaveBeenCalled();
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('disables button when loading', () => {
      render(<PartyMemberCard {...defaultProps} onRemove={() => {}} isLoading={true} />);
      expect(screen.getByTestId('party-member-card-remove-btn')).toBeDisabled();
    });

    it('has correct aria-label', () => {
      render(<PartyMemberCard {...defaultProps} onRemove={() => {}} />);
      expect(screen.getByTestId('party-member-card-remove-btn')).toHaveAttribute('aria-label', 'Remove John Doe');
    });
  });

  describe('styling', () => {
    it('applies custom className', () => {
      render(<PartyMemberCard {...defaultProps} className="custom-class" />);
      expect(screen.getByTestId('party-member-card')).toHaveClass('custom-class');
    });

    it('applies loading styling when loading', () => {
      render(<PartyMemberCard {...defaultProps} isLoading={true} />);
      expect(screen.getByTestId('party-member-card')).toHaveClass('opacity-70');
    });
  });
});
