
import { render, screen, fireEvent } from '@testing-library/react';
import { CampaignMemberList } from './CampaignMemberList';

describe('CampaignMemberList', () => {
  const mockMembers = [
    { discordId: '1', username: 'GameMaster', role: 'gm' as const, avatarUrl: null },
    { discordId: '2', username: 'Player1', role: 'player' as const, avatarUrl: null },
    { discordId: '3', username: 'Player2', role: 'player' as const, avatarUrl: null },
    { discordId: '4', username: 'Watcher', role: 'spectator' as const, avatarUrl: null },
  ];

  describe('rendering', () => {
    it('renders the header', () => {
      render(<CampaignMemberList members={mockMembers} />);
      expect(screen.getByText('Campaign Members')).toBeInTheDocument();
    });

    it('renders member count', () => {
      render(<CampaignMemberList members={mockMembers} />);
      expect(screen.getByText(/4 members/)).toBeInTheDocument();
    });

    it('renders GM count', () => {
      render(<CampaignMemberList members={mockMembers} />);
      expect(screen.getByText(/1 GM/)).toBeInTheDocument();
    });

    it('renders player count', () => {
      render(<CampaignMemberList members={mockMembers} />);
      expect(screen.getByText(/2 players/)).toBeInTheDocument();
    });

    it('renders GM section', () => {
      render(<CampaignMemberList members={mockMembers} />);
      expect(screen.getByTestId('campaign-member-list-gm-section')).toBeInTheDocument();
      expect(screen.getByText('Game Masters (1)')).toBeInTheDocument();
    });

    it('renders players section', () => {
      render(<CampaignMemberList members={mockMembers} />);
      expect(screen.getByTestId('campaign-member-list-players-section')).toBeInTheDocument();
      expect(screen.getByText('Players (2)')).toBeInTheDocument();
    });

    it('renders spectators section', () => {
      render(<CampaignMemberList members={mockMembers} />);
      expect(screen.getByTestId('campaign-member-list-spectators-section')).toBeInTheDocument();
      expect(screen.getByText('Spectators (1)')).toBeInTheDocument();
    });

    it('renders individual member cards', () => {
      render(<CampaignMemberList members={mockMembers} />);
      expect(screen.getByTestId('campaign-member-list-member-1')).toBeInTheDocument();
      expect(screen.getByTestId('campaign-member-list-member-2')).toBeInTheDocument();
      expect(screen.getByTestId('campaign-member-list-member-3')).toBeInTheDocument();
      expect(screen.getByTestId('campaign-member-list-member-4')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<CampaignMemberList members={mockMembers} className="custom-class" />);
      expect(screen.getByTestId('campaign-member-list')).toHaveClass('custom-class');
    });

    it('applies custom testId', () => {
      render(<CampaignMemberList members={mockMembers} testId="custom-list" />);
      expect(screen.getByTestId('custom-list')).toBeInTheDocument();
    });
  });

  describe('empty state', () => {
    it('shows empty state when no members', () => {
      render(<CampaignMemberList members={[]} />);
      expect(screen.getByTestId('campaign-member-list-empty')).toBeInTheDocument();
      expect(screen.getByText('No Members')).toBeInTheDocument();
    });

    it('hides GM section when no GMs', () => {
      const playersOnly = mockMembers.filter(m => m.role !== 'gm');
      render(<CampaignMemberList members={playersOnly} />);
      expect(screen.queryByTestId('campaign-member-list-gm-section')).not.toBeInTheDocument();
    });

    it('hides players section when no players', () => {
      const gmsOnly = mockMembers.filter(m => m.role === 'gm');
      render(<CampaignMemberList members={gmsOnly} />);
      expect(screen.queryByTestId('campaign-member-list-players-section')).not.toBeInTheDocument();
    });

    it('hides spectators section when no spectators', () => {
      const noSpectators = mockMembers.filter(m => m.role !== 'spectator');
      render(<CampaignMemberList members={noSpectators} />);
      expect(screen.queryByTestId('campaign-member-list-spectators-section')).not.toBeInTheDocument();
    });
  });

  describe('invite button', () => {
    it('shows invite button when canManage and onInvite provided', () => {
      render(
        <CampaignMemberList
          members={mockMembers}
          canManage
          onInvite={() => {}}
        />
      );
      expect(screen.getByTestId('campaign-member-list-invite-btn')).toBeInTheDocument();
    });

    it('does not show invite button without canManage', () => {
      render(
        <CampaignMemberList
          members={mockMembers}
          onInvite={() => {}}
        />
      );
      expect(screen.queryByTestId('campaign-member-list-invite-btn')).not.toBeInTheDocument();
    });

    it('calls onInvite when clicked', () => {
      const handleInvite = jest.fn();
      render(
        <CampaignMemberList
          members={mockMembers}
          canManage
          onInvite={handleInvite}
        />
      );
      fireEvent.click(screen.getByTestId('campaign-member-list-invite-btn'));
      expect(handleInvite).toHaveBeenCalledTimes(1);
    });
  });

  describe('member management', () => {
    it('passes canManage to member cards', () => {
      render(
        <CampaignMemberList
          members={mockMembers}
          canManage
          onRoleChange={() => {}}
        />
      );
      // Role select should appear on non-current-user cards
      expect(screen.getAllByRole('combobox').length).toBeGreaterThan(0);
    });

    it('calls onRoleChange with correct arguments', () => {
      const handleRoleChange = jest.fn();
      render(
        <CampaignMemberList
          members={mockMembers}
          canManage
          onRoleChange={handleRoleChange}
        />
      );
      const selects = screen.getAllByRole('combobox');
      fireEvent.change(selects[0], { target: { value: 'spectator' } });
      expect(handleRoleChange).toHaveBeenCalledWith('1', 'spectator');
    });

    it('calls onRemove with correct arguments', () => {
      const handleRemove = jest.fn();
      render(
        <CampaignMemberList
          members={mockMembers}
          canManage
          onRemove={handleRemove}
        />
      );
      const removeButtons = screen.getAllByText('Remove from Campaign');
      fireEvent.click(removeButtons[0]);
      expect(handleRemove).toHaveBeenCalledWith('1');
    });

    it('marks current user correctly', () => {
      render(
        <CampaignMemberList
          members={mockMembers}
          currentUserId="2"
        />
      );
      expect(screen.getByText('(you)')).toBeInTheDocument();
    });

    it('shows loading state for specific member', () => {
      render(
        <CampaignMemberList
          members={mockMembers}
          canManage
          onRoleChange={() => {}}
          onRemove={() => {}}
          loadingMemberId="2"
        />
      );
      // The member card with ID 2 should have disabled controls
      const memberCard = screen.getByTestId('campaign-member-list-member-2');
      const select = memberCard.querySelector('select');
      expect(select).toBeDisabled();
    });
  });

  describe('singular/plural grammar', () => {
    it('uses singular "member" for one member', () => {
      render(<CampaignMemberList members={[mockMembers[0]]} />);
      expect(screen.getByText(/1 member(?!s)/)).toBeInTheDocument();
    });

    it('uses singular "GM" for one GM', () => {
      render(<CampaignMemberList members={[mockMembers[0]]} />);
      expect(screen.getByText(/1 GM(?!s)/)).toBeInTheDocument();
    });

    it('uses plural "players" for multiple players', () => {
      render(<CampaignMemberList members={mockMembers} />);
      expect(screen.getByText(/2 players/)).toBeInTheDocument();
    });
  });
});
