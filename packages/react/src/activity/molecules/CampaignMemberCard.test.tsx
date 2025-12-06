
import { render, screen, fireEvent } from '@testing-library/react';
import { CampaignMemberCard } from './CampaignMemberCard';

describe('CampaignMemberCard', () => {
  const defaultProps = {
    discordId: '123456789',
    username: 'DragonSlayer',
    role: 'player' as const,
  };

  describe('rendering', () => {
    it('renders username', () => {
      render(<CampaignMemberCard {...defaultProps} />);
      expect(screen.getByTestId('campaign-member-card-username')).toHaveTextContent('DragonSlayer');
    });

    it('renders role badge for player', () => {
      render(<CampaignMemberCard {...defaultProps} />);
      expect(screen.getByTestId('campaign-member-card-role-badge')).toHaveTextContent('Player');
    });

    it('renders role badge for gm', () => {
      render(<CampaignMemberCard {...defaultProps} role="gm" />);
      expect(screen.getByTestId('campaign-member-card-role-badge')).toHaveTextContent('Game Master');
    });

    it('renders role badge for spectator', () => {
      render(<CampaignMemberCard {...defaultProps} role="spectator" />);
      expect(screen.getByTestId('campaign-member-card-role-badge')).toHaveTextContent('Spectator');
    });

    it('renders avatar when provided', () => {
      render(<CampaignMemberCard {...defaultProps} avatarUrl="https://example.com/avatar.png" />);
      expect(screen.getByTestId('campaign-member-card-avatar')).toBeInTheDocument();
    });

    it('shows "(you)" indicator for current user', () => {
      render(<CampaignMemberCard {...defaultProps} isCurrentUser />);
      expect(screen.getByText('(you)')).toBeInTheDocument();
    });

    it('shows VTT Linked when foundry user is linked', () => {
      render(<CampaignMemberCard {...defaultProps} foundryUserId="foundry-123" />);
      expect(screen.getByTestId('campaign-member-card-foundry-linked')).toHaveTextContent('VTT Linked');
    });

    it('renders join date when provided', () => {
      render(<CampaignMemberCard {...defaultProps} joinedAt="2024-01-15" />);
      expect(screen.getByTestId('campaign-member-card-joined')).toHaveTextContent('Joined');
    });

    it('applies custom className', () => {
      render(<CampaignMemberCard {...defaultProps} className="custom-class" />);
      expect(screen.getByTestId('campaign-member-card')).toHaveClass('custom-class');
    });

    it('applies custom testId', () => {
      render(<CampaignMemberCard {...defaultProps} testId="custom-card" />);
      expect(screen.getByTestId('custom-card')).toBeInTheDocument();
    });

    it('applies ring styling for current user', () => {
      render(<CampaignMemberCard {...defaultProps} isCurrentUser />);
      expect(screen.getByTestId('campaign-member-card')).toHaveClass('ring-1');
    });
  });

  describe('management actions', () => {
    it('shows role select when canManage and onRoleChange provided', () => {
      render(
        <CampaignMemberCard
          {...defaultProps}
          canManage
          onRoleChange={() => {}}
        />
      );
      expect(screen.getByTestId('campaign-member-card-role-select')).toBeInTheDocument();
    });

    it('does not show role select for current user', () => {
      render(
        <CampaignMemberCard
          {...defaultProps}
          isCurrentUser
          canManage
          onRoleChange={() => {}}
        />
      );
      expect(screen.queryByTestId('campaign-member-card-role-select')).not.toBeInTheDocument();
    });

    it('calls onRoleChange when role is changed', () => {
      const handleRoleChange = jest.fn();
      render(
        <CampaignMemberCard
          {...defaultProps}
          canManage
          onRoleChange={handleRoleChange}
        />
      );
      fireEvent.change(screen.getByTestId('campaign-member-card-role-select'), {
        target: { value: 'gm' },
      });
      expect(handleRoleChange).toHaveBeenCalledWith('gm');
    });

    it('shows remove button when canManage and onRemove provided', () => {
      render(
        <CampaignMemberCard
          {...defaultProps}
          canManage
          onRemove={() => {}}
        />
      );
      expect(screen.getByTestId('campaign-member-card-remove-btn')).toBeInTheDocument();
    });

    it('does not show remove button for current user', () => {
      render(
        <CampaignMemberCard
          {...defaultProps}
          isCurrentUser
          canManage
          onRemove={() => {}}
        />
      );
      expect(screen.queryByTestId('campaign-member-card-remove-btn')).not.toBeInTheDocument();
    });

    it('calls onRemove when remove button clicked', () => {
      const handleRemove = jest.fn();
      render(
        <CampaignMemberCard
          {...defaultProps}
          canManage
          onRemove={handleRemove}
        />
      );
      fireEvent.click(screen.getByTestId('campaign-member-card-remove-btn'));
      expect(handleRemove).toHaveBeenCalledTimes(1);
    });

    it('disables controls when loading', () => {
      render(
        <CampaignMemberCard
          {...defaultProps}
          canManage
          onRoleChange={() => {}}
          onRemove={() => {}}
          isLoading
        />
      );
      expect(screen.getByTestId('campaign-member-card-role-select')).toBeDisabled();
      expect(screen.getByTestId('campaign-member-card-remove-btn')).toBeDisabled();
    });

    it('does not show management section without canManage', () => {
      render(
        <CampaignMemberCard
          {...defaultProps}
          onRoleChange={() => {}}
          onRemove={() => {}}
        />
      );
      expect(screen.queryByTestId('campaign-member-card-role-select')).not.toBeInTheDocument();
      expect(screen.queryByTestId('campaign-member-card-remove-btn')).not.toBeInTheDocument();
    });
  });

  describe('role icons', () => {
    it('shows crown icon for GM', () => {
      render(<CampaignMemberCard {...defaultProps} role="gm" />);
      expect(screen.getByTestId('campaign-member-card-role-badge')).toHaveTextContent('👑');
    });

    it('shows gamepad icon for player', () => {
      render(<CampaignMemberCard {...defaultProps} role="player" />);
      expect(screen.getByTestId('campaign-member-card-role-badge')).toHaveTextContent('🎮');
    });

    it('shows eye icon for spectator', () => {
      render(<CampaignMemberCard {...defaultProps} role="spectator" />);
      expect(screen.getByTestId('campaign-member-card-role-badge')).toHaveTextContent('👁️');
    });
  });
});
