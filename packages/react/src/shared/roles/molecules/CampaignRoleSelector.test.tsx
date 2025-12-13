import { render, screen, fireEvent } from '@testing-library/react';
import { CampaignRoleSelector } from './CampaignRoleSelector';
import type { PlatformRole, CampaignEligibleRole } from '../types';

describe('CampaignRoleSelector', () => {
  const mockOnRoleChange = jest.fn();

  beforeEach(() => {
    mockOnRoleChange.mockClear();
  });

  describe('rendering', () => {
    it('renders with testId', () => {
      render(
        <CampaignRoleSelector
          ownedRoles={['player', 'game_master']}
          selectedRole="player"
          onRoleChange={mockOnRoleChange}
          testId="selector"
        />
      );
      expect(screen.getByTestId('selector')).toBeInTheDocument();
    });

    it('shows message when no eligible roles', () => {
      render(
        <CampaignRoleSelector
          ownedRoles={['creator', 'developer', 'admin']}
          selectedRole={null}
          onRoleChange={mockOnRoleChange}
          testId="selector"
        />
      );
      expect(screen.getByText('No campaign roles available')).toBeInTheDocument();
    });

    it('shows badge when only one eligible role', () => {
      render(
        <CampaignRoleSelector
          ownedRoles={['player']}
          selectedRole="player"
          onRoleChange={mockOnRoleChange}
          testId="selector"
        />
      );
      expect(screen.getByTestId('selector-badge')).toBeInTheDocument();
    });
  });

  describe('filtering', () => {
    it('only shows campaign-eligible roles', () => {
      render(
        <CampaignRoleSelector
          ownedRoles={['admin', 'player', 'game_master', 'creator']}
          selectedRole="player"
          onRoleChange={mockOnRoleChange}
          variant="inline"
          testId="selector"
        />
      );

      // Should show player and game_master
      expect(screen.getByTestId('selector-option-player')).toBeInTheDocument();
      expect(screen.getByTestId('selector-option-game_master')).toBeInTheDocument();

      // Should not show admin or creator
      expect(screen.queryByTestId('selector-option-admin')).not.toBeInTheDocument();
      expect(screen.queryByTestId('selector-option-creator')).not.toBeInTheDocument();
    });

    it('shows all five campaign-eligible roles when user has them', () => {
      const allEligible: PlatformRole[] = [
        'game_master', 'assistant_gm', 'trusted_player', 'player', 'spectator'
      ];
      render(
        <CampaignRoleSelector
          ownedRoles={allEligible}
          selectedRole="player"
          onRoleChange={mockOnRoleChange}
          variant="inline"
          testId="selector"
        />
      );

      expect(screen.getByTestId('selector-option-game_master')).toBeInTheDocument();
      expect(screen.getByTestId('selector-option-assistant_gm')).toBeInTheDocument();
      expect(screen.getByTestId('selector-option-trusted_player')).toBeInTheDocument();
      expect(screen.getByTestId('selector-option-player')).toBeInTheDocument();
      expect(screen.getByTestId('selector-option-spectator')).toBeInTheDocument();
    });
  });

  describe('dropdown variant', () => {
    it('renders select element', () => {
      render(
        <CampaignRoleSelector
          ownedRoles={['player', 'game_master']}
          selectedRole="player"
          onRoleChange={mockOnRoleChange}
          variant="dropdown"
          testId="selector"
        />
      );
      expect(screen.getByTestId('selector-select')).toBeInTheDocument();
    });

    it('calls onRoleChange when selection changes', () => {
      render(
        <CampaignRoleSelector
          ownedRoles={['player', 'game_master']}
          selectedRole="player"
          onRoleChange={mockOnRoleChange}
          variant="dropdown"
          testId="selector"
        />
      );

      fireEvent.change(screen.getByTestId('selector-select'), {
        target: { value: 'game_master' },
      });

      expect(mockOnRoleChange).toHaveBeenCalledWith('game_master');
    });

    it('shows placeholder when no selection', () => {
      render(
        <CampaignRoleSelector
          ownedRoles={['player', 'game_master']}
          selectedRole={null}
          onRoleChange={mockOnRoleChange}
          variant="dropdown"
          testId="selector"
        />
      );

      expect(screen.getByText('Select a role...')).toBeInTheDocument();
    });
  });

  describe('inline variant', () => {
    it('renders button for each eligible role', () => {
      render(
        <CampaignRoleSelector
          ownedRoles={['player', 'game_master', 'spectator']}
          selectedRole="player"
          onRoleChange={mockOnRoleChange}
          variant="inline"
          testId="selector"
        />
      );

      expect(screen.getByTestId('selector-option-player')).toBeInTheDocument();
      expect(screen.getByTestId('selector-option-game_master')).toBeInTheDocument();
      expect(screen.getByTestId('selector-option-spectator')).toBeInTheDocument();
    });

    it('calls onRoleChange when clicking option', () => {
      render(
        <CampaignRoleSelector
          ownedRoles={['player', 'game_master']}
          selectedRole="player"
          onRoleChange={mockOnRoleChange}
          variant="inline"
          testId="selector"
        />
      );

      fireEvent.click(screen.getByTestId('selector-option-game_master'));
      expect(mockOnRoleChange).toHaveBeenCalledWith('game_master');
    });

    it('marks selected role with aria-checked', () => {
      render(
        <CampaignRoleSelector
          ownedRoles={['player', 'game_master']}
          selectedRole="game_master"
          onRoleChange={mockOnRoleChange}
          variant="inline"
          testId="selector"
        />
      );

      expect(screen.getByTestId('selector-option-game_master')).toHaveAttribute('aria-checked', 'true');
      expect(screen.getByTestId('selector-option-player')).toHaveAttribute('aria-checked', 'false');
    });

    it('has radiogroup role', () => {
      render(
        <CampaignRoleSelector
          ownedRoles={['player', 'game_master']}
          selectedRole="player"
          onRoleChange={mockOnRoleChange}
          variant="inline"
          testId="selector"
        />
      );

      expect(screen.getByTestId('selector')).toHaveAttribute('role', 'radiogroup');
    });
  });

  describe('compact variant', () => {
    it('renders compact buttons', () => {
      render(
        <CampaignRoleSelector
          ownedRoles={['player', 'game_master']}
          selectedRole="player"
          onRoleChange={mockOnRoleChange}
          variant="compact"
          testId="selector"
        />
      );

      expect(screen.getByTestId('selector-option-player')).toBeInTheDocument();
      expect(screen.getByTestId('selector-option-game_master')).toBeInTheDocument();
    });

    it('calls onRoleChange when clicking compact option', () => {
      render(
        <CampaignRoleSelector
          ownedRoles={['player', 'game_master']}
          selectedRole="player"
          onRoleChange={mockOnRoleChange}
          variant="compact"
          testId="selector"
        />
      );

      fireEvent.click(screen.getByTestId('selector-option-game_master'));
      expect(mockOnRoleChange).toHaveBeenCalledWith('game_master');
    });
  });

  describe('disabled state', () => {
    it('disables dropdown when disabled', () => {
      render(
        <CampaignRoleSelector
          ownedRoles={['player', 'game_master']}
          selectedRole="player"
          onRoleChange={mockOnRoleChange}
          variant="dropdown"
          disabled
          testId="selector"
        />
      );

      expect(screen.getByTestId('selector-select')).toBeDisabled();
    });

    it('disables inline buttons when disabled', () => {
      render(
        <CampaignRoleSelector
          ownedRoles={['player', 'game_master']}
          selectedRole="player"
          onRoleChange={mockOnRoleChange}
          variant="inline"
          disabled
          testId="selector"
        />
      );

      expect(screen.getByTestId('selector-option-player')).toBeDisabled();
      expect(screen.getByTestId('selector-option-game_master')).toBeDisabled();
    });

    it('does not call onRoleChange when disabled', () => {
      render(
        <CampaignRoleSelector
          ownedRoles={['player', 'game_master']}
          selectedRole="player"
          onRoleChange={mockOnRoleChange}
          variant="inline"
          disabled
          testId="selector"
        />
      );

      fireEvent.click(screen.getByTestId('selector-option-game_master'));
      expect(mockOnRoleChange).not.toHaveBeenCalled();
    });
  });

  describe('styling', () => {
    it('merges custom className', () => {
      render(
        <CampaignRoleSelector
          ownedRoles={['player', 'game_master']}
          selectedRole="player"
          onRoleChange={mockOnRoleChange}
          className="custom-class"
          testId="selector"
        />
      );

      expect(screen.getByTestId('selector')).toHaveClass('custom-class');
    });
  });
});
