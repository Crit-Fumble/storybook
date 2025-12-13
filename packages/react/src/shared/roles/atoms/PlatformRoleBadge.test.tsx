import { render, screen } from '@testing-library/react';
import { PlatformRoleBadge } from './PlatformRoleBadge';
import { PLATFORM_ROLES, type PlatformRole } from '../types';

describe('PlatformRoleBadge', () => {
  describe('rendering', () => {
    it('renders the role label by default', () => {
      render(<PlatformRoleBadge role="player" />);
      expect(screen.getByText('Player')).toBeInTheDocument();
    });

    it('renders the role icon by default', () => {
      render(<PlatformRoleBadge role="player" testId="badge" />);
      expect(screen.getByTestId('badge-icon')).toBeInTheDocument();
    });

    it('applies testId when provided', () => {
      render(<PlatformRoleBadge role="player" testId="my-badge" />);
      expect(screen.getByTestId('my-badge')).toBeInTheDocument();
    });

    it('renders as a span element', () => {
      render(<PlatformRoleBadge role="player" testId="badge" />);
      expect(screen.getByTestId('badge').tagName).toBe('SPAN');
    });

    it('sets data-role attribute', () => {
      render(<PlatformRoleBadge role="admin" testId="badge" />);
      expect(screen.getByTestId('badge')).toHaveAttribute('data-role', 'admin');
    });
  });

  describe('all roles render correctly', () => {
    const allRoles: PlatformRole[] = [
      'gamer', 'player', 'trusted_player', 'game_master', 'assistant_gm',
      'spectator', 'storyteller', 'worldbuilder', 'creator', 'developer', 'admin'
    ];

    it.each(allRoles)('renders %s role with correct label', (role) => {
      render(<PlatformRoleBadge role={role} testId="badge" />);
      const config = PLATFORM_ROLES[role];
      expect(screen.getByTestId('badge-label')).toHaveTextContent(config.label);
    });

    it.each(allRoles)('renders %s role with icon', (role) => {
      render(<PlatformRoleBadge role={role} testId="badge" />);
      expect(screen.getByTestId('badge-icon')).toBeInTheDocument();
    });
  });

  describe('size variants', () => {
    it('applies small size classes', () => {
      render(<PlatformRoleBadge role="player" size="sm" testId="badge" />);
      const badge = screen.getByTestId('badge');
      expect(badge).toHaveClass('px-1.5', 'py-0.5', 'text-[10px]');
    });

    it('applies medium size classes by default', () => {
      render(<PlatformRoleBadge role="player" testId="badge" />);
      const badge = screen.getByTestId('badge');
      expect(badge).toHaveClass('px-2', 'py-1', 'text-xs');
    });

    it('applies large size classes', () => {
      render(<PlatformRoleBadge role="player" size="lg" testId="badge" />);
      const badge = screen.getByTestId('badge');
      expect(badge).toHaveClass('px-3', 'py-1.5', 'text-sm');
    });
  });

  describe('display options', () => {
    it('hides label when showLabel is false', () => {
      render(<PlatformRoleBadge role="player" showLabel={false} testId="badge" />);
      expect(screen.queryByTestId('badge-label')).not.toBeInTheDocument();
    });

    it('hides icon when showIcon is false', () => {
      render(<PlatformRoleBadge role="player" showIcon={false} testId="badge" />);
      expect(screen.queryByTestId('badge-icon')).not.toBeInTheDocument();
    });

    it('shows icon even when both are false (fallback)', () => {
      render(<PlatformRoleBadge role="player" showIcon={false} showLabel={false} testId="badge" />);
      // When both are false, icon should still show as fallback
      expect(screen.getByTestId('badge-icon')).toBeInTheDocument();
    });

    it('shows both icon and label when both are true', () => {
      render(<PlatformRoleBadge role="player" showIcon showLabel testId="badge" />);
      expect(screen.getByTestId('badge-icon')).toBeInTheDocument();
      expect(screen.getByTestId('badge-label')).toBeInTheDocument();
    });
  });

  describe('styling', () => {
    it('applies inline color styles from role config', () => {
      render(<PlatformRoleBadge role="admin" testId="badge" />);
      const badge = screen.getByTestId('badge');
      expect(badge).toHaveStyle({ color: '#fbbf24' }); // gold
    });

    it('applies inline background color styles from role config', () => {
      render(<PlatformRoleBadge role="admin" testId="badge" />);
      const badge = screen.getByTestId('badge');
      expect(badge).toHaveStyle({ backgroundColor: 'rgba(251, 191, 36, 0.2)' }); // gold bg
    });

    it('merges custom className', () => {
      render(<PlatformRoleBadge role="player" className="custom-class" testId="badge" />);
      expect(screen.getByTestId('badge')).toHaveClass('custom-class');
    });

    it('applies base styling classes', () => {
      render(<PlatformRoleBadge role="player" testId="badge" />);
      const badge = screen.getByTestId('badge');
      expect(badge).toHaveClass('inline-flex', 'items-center', 'rounded', 'font-medium');
    });
  });

  describe('role-specific colors', () => {
    it('applies teal color for player role', () => {
      render(<PlatformRoleBadge role="player" testId="badge" />);
      expect(screen.getByTestId('badge')).toHaveStyle({ color: '#14b8a6' }); // teal
    });

    it('applies orange color for game_master role', () => {
      render(<PlatformRoleBadge role="game_master" testId="badge" />);
      expect(screen.getByTestId('badge')).toHaveStyle({ color: '#f97316' }); // orange
    });

    it('applies gray color for spectator role', () => {
      render(<PlatformRoleBadge role="spectator" testId="badge" />);
      expect(screen.getByTestId('badge')).toHaveStyle({ color: '#6b7280' }); // gray
    });
  });
});
