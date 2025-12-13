import { render, screen, fireEvent } from '@testing-library/react';
import { PlatformRoleCard } from './PlatformRoleCard';
import { PLATFORM_ROLES, type PlatformRole } from '../types';

describe('PlatformRoleCard', () => {
  describe('rendering', () => {
    it('renders the role label', () => {
      render(<PlatformRoleCard role="player" />);
      expect(screen.getByText('Player')).toBeInTheDocument();
    });

    it('renders the role description', () => {
      render(<PlatformRoleCard role="player" />);
      expect(screen.getByText(PLATFORM_ROLES.player.description)).toBeInTheDocument();
    });

    it('renders the role icon', () => {
      render(<PlatformRoleCard role="player" testId="card" />);
      expect(screen.getByTestId('card-icon')).toBeInTheDocument();
    });

    it('applies testId when provided', () => {
      render(<PlatformRoleCard role="player" testId="my-card" />);
      expect(screen.getByTestId('my-card')).toBeInTheDocument();
    });

    it('sets data-role attribute', () => {
      render(<PlatformRoleCard role="admin" testId="card" />);
      expect(screen.getByTestId('card')).toHaveAttribute('data-role', 'admin');
    });
  });

  describe('all roles render correctly', () => {
    const allRoles: PlatformRole[] = [
      'gamer', 'player', 'trusted_player', 'game_master', 'assistant_gm',
      'spectator', 'storyteller', 'worldbuilder', 'creator', 'developer', 'admin'
    ];

    it.each(allRoles)('renders %s role with correct title', (role) => {
      render(<PlatformRoleCard role={role} testId="card" />);
      const config = PLATFORM_ROLES[role];
      expect(screen.getByTestId('card-title')).toHaveTextContent(config.label);
    });

    it.each(allRoles)('renders %s role with description', (role) => {
      render(<PlatformRoleCard role={role} testId="card" />);
      const config = PLATFORM_ROLES[role];
      expect(screen.getByTestId('card-description')).toHaveTextContent(config.description);
    });
  });

  describe('selection state', () => {
    it('does not show selected indicator by default', () => {
      render(<PlatformRoleCard role="player" testId="card" />);
      expect(screen.queryByTestId('card-selected-indicator')).not.toBeInTheDocument();
    });

    it('shows selected indicator when selected', () => {
      render(<PlatformRoleCard role="player" selected testId="card" />);
      expect(screen.getByTestId('card-selected-indicator')).toBeInTheDocument();
    });

    it('sets data-selected attribute', () => {
      render(<PlatformRoleCard role="player" selected testId="card" />);
      expect(screen.getByTestId('card')).toHaveAttribute('data-selected', 'true');
    });

    it('applies selected border color from role config', () => {
      render(<PlatformRoleCard role="admin" selected testId="card" />);
      const card = screen.getByTestId('card');
      expect(card).toHaveStyle({ borderColor: '#fbbf24' }); // gold
    });
  });

  describe('interactive behavior', () => {
    it('calls onClick when clicked', () => {
      const handleClick = jest.fn();
      render(<PlatformRoleCard role="player" onClick={handleClick} testId="card" />);
      fireEvent.click(screen.getByTestId('card'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('has button role when onClick is provided', () => {
      const handleClick = jest.fn();
      render(<PlatformRoleCard role="player" onClick={handleClick} testId="card" />);
      expect(screen.getByTestId('card')).toHaveAttribute('role', 'button');
    });

    it('is focusable when interactive', () => {
      const handleClick = jest.fn();
      render(<PlatformRoleCard role="player" onClick={handleClick} testId="card" />);
      expect(screen.getByTestId('card')).toHaveAttribute('tabIndex', '0');
    });

    it('calls onClick on Enter key', () => {
      const handleClick = jest.fn();
      render(<PlatformRoleCard role="player" onClick={handleClick} testId="card" />);
      fireEvent.keyDown(screen.getByTestId('card'), { key: 'Enter' });
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('calls onClick on Space key', () => {
      const handleClick = jest.fn();
      render(<PlatformRoleCard role="player" onClick={handleClick} testId="card" />);
      fireEvent.keyDown(screen.getByTestId('card'), { key: ' ' });
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('has aria-pressed attribute when interactive', () => {
      const handleClick = jest.fn();
      render(<PlatformRoleCard role="player" selected onClick={handleClick} testId="card" />);
      expect(screen.getByTestId('card')).toHaveAttribute('aria-pressed', 'true');
    });
  });

  describe('disabled state', () => {
    it('does not call onClick when disabled', () => {
      const handleClick = jest.fn();
      render(<PlatformRoleCard role="player" disabled onClick={handleClick} testId="card" />);
      fireEvent.click(screen.getByTestId('card'));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('applies opacity for disabled state', () => {
      render(<PlatformRoleCard role="player" disabled testId="card" />);
      expect(screen.getByTestId('card')).toHaveClass('opacity-50');
    });

    it('sets aria-disabled when disabled', () => {
      render(<PlatformRoleCard role="player" disabled testId="card" />);
      expect(screen.getByTestId('card')).toHaveAttribute('aria-disabled', 'true');
    });

    it('is not focusable when disabled', () => {
      const handleClick = jest.fn();
      render(<PlatformRoleCard role="player" disabled onClick={handleClick} testId="card" />);
      expect(screen.getByTestId('card')).not.toHaveAttribute('tabIndex');
    });
  });

  describe('compact mode', () => {
    it('hides description in compact mode', () => {
      render(<PlatformRoleCard role="player" compact testId="card" />);
      expect(screen.queryByTestId('card-description')).not.toBeInTheDocument();
    });

    it('still shows title in compact mode', () => {
      render(<PlatformRoleCard role="player" compact testId="card" />);
      expect(screen.getByTestId('card-title')).toBeInTheDocument();
    });

    it('applies smaller padding in compact mode', () => {
      render(<PlatformRoleCard role="player" compact testId="card" />);
      expect(screen.getByTestId('card')).toHaveClass('p-3');
    });

    it('applies smaller icon container in compact mode', () => {
      render(<PlatformRoleCard role="player" compact testId="card" />);
      expect(screen.getByTestId('card-icon-container')).toHaveClass('w-8', 'h-8');
    });
  });

  describe('styling', () => {
    it('merges custom className', () => {
      render(<PlatformRoleCard role="player" className="custom-class" testId="card" />);
      expect(screen.getByTestId('card')).toHaveClass('custom-class');
    });

    it('applies base styling classes', () => {
      render(<PlatformRoleCard role="player" testId="card" />);
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('rounded-lg', 'border', 'transition-all', 'bg-cfg-background-secondary');
    });

    it('applies interactive hover class when clickable', () => {
      const handleClick = jest.fn();
      render(<PlatformRoleCard role="player" onClick={handleClick} testId="card" />);
      expect(screen.getByTestId('card')).toHaveClass('hover:border-cfg-primary');
    });
  });
});
