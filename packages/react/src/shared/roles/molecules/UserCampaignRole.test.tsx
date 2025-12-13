import { render, screen, fireEvent } from '@testing-library/react';
import { UserCampaignRole } from './UserCampaignRole';
import type { PlatformRole } from '../types';

describe('UserCampaignRole', () => {
  describe('rendering', () => {
    it('renders user name', () => {
      render(
        <UserCampaignRole
          userName="John Doe"
          assumedRole="player"
          testId="user"
        />
      );
      expect(screen.getByTestId('user-name')).toHaveTextContent('John Doe');
    });

    it('renders assumed role badge', () => {
      render(
        <UserCampaignRole
          userName="John Doe"
          assumedRole="game_master"
          testId="user"
        />
      );
      expect(screen.getByTestId('user-role')).toBeInTheDocument();
    });

    it('applies testId', () => {
      render(
        <UserCampaignRole
          userName="John Doe"
          assumedRole="player"
          testId="my-user"
        />
      );
      expect(screen.getByTestId('my-user')).toBeInTheDocument();
    });
  });

  describe('avatar', () => {
    it('renders avatar image when avatarUrl provided', () => {
      render(
        <UserCampaignRole
          userName="John Doe"
          assumedRole="player"
          avatarUrl="https://example.com/avatar.jpg"
          testId="user"
        />
      );
      expect(screen.getByTestId('user-avatar')).toBeInTheDocument();
      expect(screen.getByTestId('user-avatar')).toHaveAttribute('src', 'https://example.com/avatar.jpg');
    });

    it('renders placeholder when no avatarUrl', () => {
      render(
        <UserCampaignRole
          userName="John Doe"
          assumedRole="player"
          testId="user"
        />
      );
      expect(screen.getByTestId('user-avatar-placeholder')).toBeInTheDocument();
      expect(screen.getByTestId('user-avatar-placeholder')).toHaveTextContent('J');
    });

    it('uses role color for placeholder background', () => {
      render(
        <UserCampaignRole
          userName="John Doe"
          assumedRole="game_master"
          testId="user"
        />
      );
      const placeholder = screen.getByTestId('user-avatar-placeholder');
      expect(placeholder).toHaveStyle({ backgroundColor: 'rgba(249, 115, 22, 0.2)' });
    });
  });

  describe('status indicator', () => {
    it('shows online indicator when isActive is true', () => {
      render(
        <UserCampaignRole
          userName="John Doe"
          assumedRole="player"
          isActive={true}
          testId="user"
        />
      );
      expect(screen.getByTestId('user-status')).toHaveClass('bg-cfg-green');
    });

    it('shows offline indicator when isActive is false', () => {
      render(
        <UserCampaignRole
          userName="John Doe"
          assumedRole="player"
          isActive={false}
          testId="user"
        />
      );
      expect(screen.getByTestId('user-status')).toHaveClass('bg-cfg-text-muted');
    });

    it('does not show status when isActive is undefined', () => {
      render(
        <UserCampaignRole
          userName="John Doe"
          assumedRole="player"
          testId="user"
        />
      );
      expect(screen.queryByTestId('user-status')).not.toBeInTheDocument();
    });
  });

  describe('owned roles', () => {
    it('does not show other roles by default', () => {
      render(
        <UserCampaignRole
          userName="John Doe"
          assumedRole="player"
          ownedRoles={['player', 'game_master', 'creator']}
          testId="user"
        />
      );
      expect(screen.queryByTestId('user-other-roles')).not.toBeInTheDocument();
    });

    it('shows count of other roles when showOwnedRoles is true', () => {
      render(
        <UserCampaignRole
          userName="John Doe"
          assumedRole="player"
          ownedRoles={['player', 'game_master', 'creator']}
          showOwnedRoles
          testId="user"
        />
      );
      expect(screen.getByTestId('user-other-roles')).toHaveTextContent('+2 more');
    });

    it('does not show other roles indicator when only assumed role', () => {
      render(
        <UserCampaignRole
          userName="John Doe"
          assumedRole="player"
          ownedRoles={['player']}
          showOwnedRoles
          testId="user"
        />
      );
      expect(screen.queryByTestId('user-other-roles')).not.toBeInTheDocument();
    });
  });

  describe('size variants', () => {
    it('applies small size classes', () => {
      render(
        <UserCampaignRole
          userName="John"
          assumedRole="player"
          size="sm"
          testId="user"
        />
      );
      expect(screen.getByTestId('user')).toHaveClass('p-2', 'gap-2');
    });

    it('applies medium size classes by default', () => {
      render(
        <UserCampaignRole
          userName="John"
          assumedRole="player"
          testId="user"
        />
      );
      expect(screen.getByTestId('user')).toHaveClass('p-3', 'gap-3');
    });

    it('applies large size classes', () => {
      render(
        <UserCampaignRole
          userName="John"
          assumedRole="player"
          size="lg"
          testId="user"
        />
      );
      expect(screen.getByTestId('user')).toHaveClass('p-4', 'gap-4');
    });

    it('shows large icon only on large size', () => {
      const { rerender } = render(
        <UserCampaignRole
          userName="John"
          assumedRole="player"
          size="md"
          testId="user"
        />
      );
      expect(screen.queryByTestId('user-large-icon')).not.toBeInTheDocument();

      rerender(
        <UserCampaignRole
          userName="John"
          assumedRole="player"
          size="lg"
          testId="user"
        />
      );
      expect(screen.getByTestId('user-large-icon')).toBeInTheDocument();
    });
  });

  describe('interactive behavior', () => {
    it('calls onClick when clicked', () => {
      const handleClick = jest.fn();
      render(
        <UserCampaignRole
          userName="John Doe"
          assumedRole="player"
          onClick={handleClick}
          testId="user"
        />
      );

      fireEvent.click(screen.getByTestId('user'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('has button role when onClick provided', () => {
      const handleClick = jest.fn();
      render(
        <UserCampaignRole
          userName="John Doe"
          assumedRole="player"
          onClick={handleClick}
          testId="user"
        />
      );

      expect(screen.getByTestId('user')).toHaveAttribute('role', 'button');
    });

    it('is focusable when interactive', () => {
      const handleClick = jest.fn();
      render(
        <UserCampaignRole
          userName="John Doe"
          assumedRole="player"
          onClick={handleClick}
          testId="user"
        />
      );

      expect(screen.getByTestId('user')).toHaveAttribute('tabIndex', '0');
    });

    it('responds to Enter key', () => {
      const handleClick = jest.fn();
      render(
        <UserCampaignRole
          userName="John Doe"
          assumedRole="player"
          onClick={handleClick}
          testId="user"
        />
      );

      fireEvent.keyDown(screen.getByTestId('user'), { key: 'Enter' });
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('applies hover class when interactive', () => {
      const handleClick = jest.fn();
      render(
        <UserCampaignRole
          userName="John Doe"
          assumedRole="player"
          onClick={handleClick}
          testId="user"
        />
      );

      expect(screen.getByTestId('user')).toHaveClass('hover:bg-cfg-background-tertiary');
    });
  });

  describe('styling', () => {
    it('merges custom className', () => {
      render(
        <UserCampaignRole
          userName="John Doe"
          assumedRole="player"
          className="custom-class"
          testId="user"
        />
      );
      expect(screen.getByTestId('user')).toHaveClass('custom-class');
    });

    it('applies base styling classes', () => {
      render(
        <UserCampaignRole
          userName="John Doe"
          assumedRole="player"
          testId="user"
        />
      );
      expect(screen.getByTestId('user')).toHaveClass('flex', 'items-center', 'rounded-lg', 'bg-cfg-background-secondary');
    });
  });

  describe('all campaign roles', () => {
    const roles = ['game_master', 'assistant_gm', 'trusted_player', 'player', 'spectator'] as const;

    it.each(roles)('renders %s role correctly', (role) => {
      render(
        <UserCampaignRole
          userName="Test User"
          assumedRole={role}
          testId="user"
        />
      );
      expect(screen.getByTestId('user-role')).toBeInTheDocument();
    });
  });
});
