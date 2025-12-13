import { render, screen, fireEvent } from '@testing-library/react';
import { PlatformRoleSelector } from './PlatformRoleSelector';
import { getAllPlatformRoles, type PlatformRole } from '../types';

describe('PlatformRoleSelector', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  describe('rendering', () => {
    it('renders all roles by default', () => {
      render(<PlatformRoleSelector selectedRoles={[]} onChange={mockOnChange} testId="selector" />);
      const allRoles = getAllPlatformRoles();
      allRoles.forEach((config) => {
        expect(screen.getByTestId(`selector-role-${config.key}`)).toBeInTheDocument();
      });
    });

    it('applies testId when provided', () => {
      render(<PlatformRoleSelector selectedRoles={[]} onChange={mockOnChange} testId="my-selector" />);
      expect(screen.getByTestId('my-selector')).toBeInTheDocument();
    });

    it('renders role grid', () => {
      render(<PlatformRoleSelector selectedRoles={[]} onChange={mockOnChange} testId="selector" />);
      expect(screen.getByTestId('selector-grid')).toBeInTheDocument();
    });
  });

  describe('selection behavior', () => {
    it('shows roles as selected when in selectedRoles', () => {
      render(
        <PlatformRoleSelector
          selectedRoles={['player', 'admin']}
          onChange={mockOnChange}
          testId="selector"
        />
      );
      expect(screen.getByTestId('selector-role-player')).toHaveAttribute('data-selected', 'true');
      expect(screen.getByTestId('selector-role-admin')).toHaveAttribute('data-selected', 'true');
      expect(screen.getByTestId('selector-role-creator')).toHaveAttribute('data-selected', 'false');
    });

    it('calls onChange with added role when clicking unselected role', () => {
      render(
        <PlatformRoleSelector
          selectedRoles={['player']}
          onChange={mockOnChange}
          testId="selector"
        />
      );
      fireEvent.click(screen.getByTestId('selector-role-admin'));
      expect(mockOnChange).toHaveBeenCalledWith(['player', 'admin']);
    });

    it('calls onChange with removed role when clicking selected role', () => {
      render(
        <PlatformRoleSelector
          selectedRoles={['player', 'admin']}
          onChange={mockOnChange}
          testId="selector"
        />
      );
      fireEvent.click(screen.getByTestId('selector-role-player'));
      expect(mockOnChange).toHaveBeenCalledWith(['admin']);
    });
  });

  describe('availableRoles filtering', () => {
    it('only shows specified available roles', () => {
      const available: PlatformRole[] = ['player', 'game_master'];
      render(
        <PlatformRoleSelector
          selectedRoles={[]}
          onChange={mockOnChange}
          availableRoles={available}
          testId="selector"
        />
      );
      expect(screen.getByTestId('selector-role-player')).toBeInTheDocument();
      expect(screen.getByTestId('selector-role-game_master')).toBeInTheDocument();
      expect(screen.queryByTestId('selector-role-admin')).not.toBeInTheDocument();
    });

    it('shows empty state when no roles available', () => {
      render(
        <PlatformRoleSelector
          selectedRoles={[]}
          onChange={mockOnChange}
          availableRoles={[]}
          testId="selector"
        />
      );
      expect(screen.getByTestId('selector-empty')).toBeInTheDocument();
      expect(screen.getByText('No roles available')).toBeInTheDocument();
    });
  });

  describe('disabled state', () => {
    it('does not call onChange when disabled', () => {
      render(
        <PlatformRoleSelector
          selectedRoles={[]}
          onChange={mockOnChange}
          disabled
          testId="selector"
        />
      );
      fireEvent.click(screen.getByTestId('selector-role-player'));
      expect(mockOnChange).not.toHaveBeenCalled();
    });

    it('passes disabled prop to role cards', () => {
      render(
        <PlatformRoleSelector
          selectedRoles={[]}
          onChange={mockOnChange}
          disabled
          testId="selector"
        />
      );
      expect(screen.getByTestId('selector-role-player')).toHaveAttribute('aria-disabled', 'true');
    });
  });

  describe('maxSelections', () => {
    it('shows selection info when maxSelections is set', () => {
      render(
        <PlatformRoleSelector
          selectedRoles={['player']}
          onChange={mockOnChange}
          maxSelections={3}
          testId="selector"
        />
      );
      expect(screen.getByTestId('selector-selection-info')).toHaveTextContent('1 of 3 roles selected');
    });

    it('prevents selection when max is reached', () => {
      render(
        <PlatformRoleSelector
          selectedRoles={['player', 'admin', 'creator']}
          onChange={mockOnChange}
          maxSelections={3}
          testId="selector"
        />
      );
      // Click on an unselected role
      fireEvent.click(screen.getByTestId('selector-role-developer'));
      expect(mockOnChange).not.toHaveBeenCalled();
    });

    it('allows deselection when at max', () => {
      render(
        <PlatformRoleSelector
          selectedRoles={['player', 'admin', 'creator']}
          onChange={mockOnChange}
          maxSelections={3}
          testId="selector"
        />
      );
      // Click on a selected role to deselect
      fireEvent.click(screen.getByTestId('selector-role-player'));
      expect(mockOnChange).toHaveBeenCalledWith(['admin', 'creator']);
    });

    it('disables unselected roles when at max', () => {
      render(
        <PlatformRoleSelector
          selectedRoles={['player', 'admin']}
          onChange={mockOnChange}
          maxSelections={2}
          testId="selector"
        />
      );
      expect(screen.getByTestId('selector-role-developer')).toHaveAttribute('aria-disabled', 'true');
    });

    it('keeps selected roles enabled when at max', () => {
      render(
        <PlatformRoleSelector
          selectedRoles={['player', 'admin']}
          onChange={mockOnChange}
          maxSelections={2}
          testId="selector"
        />
      );
      expect(screen.getByTestId('selector-role-player')).toHaveAttribute('aria-disabled', 'false');
    });
  });

  describe('compact mode', () => {
    it('passes compact prop to role cards', () => {
      render(
        <PlatformRoleSelector
          selectedRoles={[]}
          onChange={mockOnChange}
          compact
          testId="selector"
        />
      );
      // Check that a role card has compact styling (p-3 instead of p-4)
      expect(screen.getByTestId('selector-role-player')).toHaveClass('p-3');
    });
  });

  describe('columns', () => {
    it('applies single column class when columns=1', () => {
      render(
        <PlatformRoleSelector
          selectedRoles={[]}
          onChange={mockOnChange}
          columns={1}
          testId="selector"
        />
      );
      expect(screen.getByTestId('selector-grid')).toHaveClass('grid-cols-1');
    });

    it('applies two column class when columns=2', () => {
      render(
        <PlatformRoleSelector
          selectedRoles={[]}
          onChange={mockOnChange}
          columns={2}
          testId="selector"
        />
      );
      expect(screen.getByTestId('selector-grid')).toHaveClass('sm:grid-cols-2');
    });
  });

  describe('accessibility', () => {
    it('has role="group" on the grid', () => {
      render(
        <PlatformRoleSelector
          selectedRoles={[]}
          onChange={mockOnChange}
          testId="selector"
        />
      );
      expect(screen.getByTestId('selector-grid')).toHaveAttribute('role', 'group');
    });

    it('has aria-label on the grid', () => {
      render(
        <PlatformRoleSelector
          selectedRoles={[]}
          onChange={mockOnChange}
          testId="selector"
        />
      );
      expect(screen.getByTestId('selector-grid')).toHaveAttribute('aria-label', 'Platform role selection');
    });
  });

  describe('styling', () => {
    it('merges custom className', () => {
      render(
        <PlatformRoleSelector
          selectedRoles={[]}
          onChange={mockOnChange}
          className="custom-class"
          testId="selector"
        />
      );
      expect(screen.getByTestId('selector')).toHaveClass('custom-class');
    });
  });
});
