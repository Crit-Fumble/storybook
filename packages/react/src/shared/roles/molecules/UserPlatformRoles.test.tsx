import { render, screen } from '@testing-library/react';
import { UserPlatformRoles } from './UserPlatformRoles';
import type { PlatformRole } from '../types';

describe('UserPlatformRoles', () => {
  describe('rendering', () => {
    it('renders role badges for each role', () => {
      const roles: PlatformRole[] = ['player', 'creator'];
      render(<UserPlatformRoles roles={roles} testId="roles" />);
      expect(screen.getByTestId('roles-role-player')).toBeInTheDocument();
      expect(screen.getByTestId('roles-role-creator')).toBeInTheDocument();
    });

    it('applies testId when provided', () => {
      render(<UserPlatformRoles roles={['player']} testId="my-roles" />);
      expect(screen.getByTestId('my-roles')).toBeInTheDocument();
    });

    it('shows empty state when no roles', () => {
      render(<UserPlatformRoles roles={[]} testId="roles" />);
      expect(screen.getByText('No roles assigned')).toBeInTheDocument();
    });
  });

  describe('maxVisible', () => {
    it('shows all roles when under maxVisible', () => {
      const roles: PlatformRole[] = ['player', 'creator'];
      render(<UserPlatformRoles roles={roles} maxVisible={5} testId="roles" />);
      expect(screen.getByTestId('roles-role-player')).toBeInTheDocument();
      expect(screen.getByTestId('roles-role-creator')).toBeInTheDocument();
      expect(screen.queryByTestId('roles-overflow')).not.toBeInTheDocument();
    });

    it('limits visible roles to maxVisible', () => {
      const roles: PlatformRole[] = ['player', 'creator', 'developer', 'admin'];
      render(<UserPlatformRoles roles={roles} maxVisible={2} testId="roles" />);
      expect(screen.getByTestId('roles-role-player')).toBeInTheDocument();
      expect(screen.getByTestId('roles-role-creator')).toBeInTheDocument();
      expect(screen.queryByTestId('roles-role-developer')).not.toBeInTheDocument();
      expect(screen.queryByTestId('roles-role-admin')).not.toBeInTheDocument();
    });

    it('shows overflow indicator with correct count', () => {
      const roles: PlatformRole[] = ['player', 'creator', 'developer', 'admin'];
      render(<UserPlatformRoles roles={roles} maxVisible={2} testId="roles" />);
      expect(screen.getByTestId('roles-overflow')).toHaveTextContent('+2 more');
    });

    it('sets title attribute with hidden roles', () => {
      const roles: PlatformRole[] = ['player', 'creator', 'developer', 'admin'];
      render(<UserPlatformRoles roles={roles} maxVisible={2} testId="roles" />);
      expect(screen.getByTestId('roles-overflow')).toHaveAttribute('title', 'developer, admin');
    });

    it('does not show overflow when exactly at maxVisible', () => {
      const roles: PlatformRole[] = ['player', 'creator'];
      render(<UserPlatformRoles roles={roles} maxVisible={2} testId="roles" />);
      expect(screen.queryByTestId('roles-overflow')).not.toBeInTheDocument();
    });
  });

  describe('size variants', () => {
    it('passes small size to badges', () => {
      render(<UserPlatformRoles roles={['player']} size="sm" testId="roles" />);
      // Check that badge has small size classes
      expect(screen.getByTestId('roles-role-player')).toHaveClass('text-[10px]');
    });

    it('passes medium size to badges by default', () => {
      render(<UserPlatformRoles roles={['player']} testId="roles" />);
      expect(screen.getByTestId('roles-role-player')).toHaveClass('text-xs');
    });

    it('passes large size to badges', () => {
      render(<UserPlatformRoles roles={['player']} size="lg" testId="roles" />);
      expect(screen.getByTestId('roles-role-player')).toHaveClass('text-sm');
    });

    it('applies correct size to overflow indicator', () => {
      const roles: PlatformRole[] = ['player', 'creator', 'developer'];
      render(<UserPlatformRoles roles={roles} maxVisible={1} size="lg" testId="roles" />);
      expect(screen.getByTestId('roles-overflow')).toHaveClass('px-3', 'py-1.5', 'text-sm');
    });
  });

  describe('showIcons', () => {
    it('shows icons by default', () => {
      render(<UserPlatformRoles roles={['player']} testId="roles" />);
      expect(screen.getByTestId('roles-role-player-icon')).toBeInTheDocument();
    });

    it('hides icons when showIcons is false', () => {
      render(<UserPlatformRoles roles={['player']} showIcons={false} testId="roles" />);
      expect(screen.queryByTestId('roles-role-player-icon')).not.toBeInTheDocument();
    });
  });

  describe('direction', () => {
    it('applies horizontal layout by default', () => {
      render(<UserPlatformRoles roles={['player', 'creator']} testId="roles" />);
      expect(screen.getByTestId('roles')).toHaveClass('gap-1.5');
      expect(screen.getByTestId('roles')).not.toHaveClass('flex-col');
    });

    it('applies vertical layout when direction is vertical', () => {
      render(<UserPlatformRoles roles={['player', 'creator']} direction="vertical" testId="roles" />);
      expect(screen.getByTestId('roles')).toHaveClass('flex-col', 'gap-1');
    });
  });

  describe('styling', () => {
    it('merges custom className', () => {
      render(<UserPlatformRoles roles={['player']} className="custom-class" testId="roles" />);
      expect(screen.getByTestId('roles')).toHaveClass('custom-class');
    });

    it('applies flex and wrap classes', () => {
      render(<UserPlatformRoles roles={['player']} testId="roles" />);
      expect(screen.getByTestId('roles')).toHaveClass('flex', 'flex-wrap');
    });
  });

  describe('role order', () => {
    it('maintains the order of roles as provided', () => {
      const roles: PlatformRole[] = ['admin', 'player', 'creator'];
      render(<UserPlatformRoles roles={roles} testId="roles" />);

      const container = screen.getByTestId('roles');
      const badges = container.querySelectorAll('[data-role]');

      expect(badges[0]).toHaveAttribute('data-role', 'admin');
      expect(badges[1]).toHaveAttribute('data-role', 'player');
      expect(badges[2]).toHaveAttribute('data-role', 'creator');
    });
  });
});
