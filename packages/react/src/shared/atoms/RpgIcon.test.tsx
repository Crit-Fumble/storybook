import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RpgIcon, RpgIconGroups } from './RpgIcon';

describe('RpgIcon', () => {
  describe('rendering', () => {
    it('renders with icon class', () => {
      render(<RpgIcon icon="sword" />);
      const icon = screen.getByTestId('rpg-icon');
      expect(icon).toHaveClass('ra', 'ra-sword');
    });

    it('renders different icons', () => {
      const { rerender } = render(<RpgIcon icon="axe" />);
      expect(screen.getByTestId('rpg-icon')).toHaveClass('ra-axe');

      rerender(<RpgIcon icon="dragon" />);
      expect(screen.getByTestId('rpg-icon')).toHaveClass('ra-dragon');

      rerender(<RpgIcon icon="potion" />);
      expect(screen.getByTestId('rpg-icon')).toHaveClass('ra-potion');
    });

    it('applies custom testId', () => {
      render(<RpgIcon icon="sword" testId="custom-icon" />);
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<RpgIcon icon="sword" className="custom-class" />);
      expect(screen.getByTestId('rpg-icon')).toHaveClass('custom-class');
    });
  });

  describe('sizes', () => {
    it('applies sm size class', () => {
      render(<RpgIcon icon="sword" size="sm" />);
      expect(screen.getByTestId('rpg-icon')).toHaveClass('text-sm');
    });

    it('applies no extra class for md size', () => {
      render(<RpgIcon icon="sword" size="md" />);
      const icon = screen.getByTestId('rpg-icon');
      expect(icon).not.toHaveClass('ra-lg', 'ra-2x', 'ra-3x', 'ra-4x', 'ra-5x');
    });

    it('applies lg size class', () => {
      render(<RpgIcon icon="sword" size="lg" />);
      expect(screen.getByTestId('rpg-icon')).toHaveClass('ra-lg');
    });

    it('applies 2x size class', () => {
      render(<RpgIcon icon="sword" size="2x" />);
      expect(screen.getByTestId('rpg-icon')).toHaveClass('ra-2x');
    });

    it('applies 3x size class', () => {
      render(<RpgIcon icon="sword" size="3x" />);
      expect(screen.getByTestId('rpg-icon')).toHaveClass('ra-3x');
    });

    it('applies 4x size class', () => {
      render(<RpgIcon icon="sword" size="4x" />);
      expect(screen.getByTestId('rpg-icon')).toHaveClass('ra-4x');
    });

    it('applies 5x size class', () => {
      render(<RpgIcon icon="sword" size="5x" />);
      expect(screen.getByTestId('rpg-icon')).toHaveClass('ra-5x');
    });
  });

  describe('modifiers', () => {
    it('applies fixed width class when enabled', () => {
      render(<RpgIcon icon="sword" fixedWidth />);
      expect(screen.getByTestId('rpg-icon')).toHaveClass('ra-fw');
    });

    it('does not apply fixed width class when disabled', () => {
      render(<RpgIcon icon="sword" fixedWidth={false} />);
      expect(screen.getByTestId('rpg-icon')).not.toHaveClass('ra-fw');
    });

    it('applies spin class when enabled', () => {
      render(<RpgIcon icon="sword" spin />);
      expect(screen.getByTestId('rpg-icon')).toHaveClass('ra-spin');
    });

    it('does not apply spin class when disabled', () => {
      render(<RpgIcon icon="sword" spin={false} />);
      expect(screen.getByTestId('rpg-icon')).not.toHaveClass('ra-spin');
    });

    it('applies custom color style', () => {
      render(<RpgIcon icon="sword" color="#ff0000" />);
      expect(screen.getByTestId('rpg-icon')).toHaveStyle({ color: '#ff0000' });
    });

    it('does not apply color style when not provided', () => {
      render(<RpgIcon icon="sword" />);
      expect(screen.getByTestId('rpg-icon')).not.toHaveStyle({ color: expect.anything() });
    });
  });

  describe('accessibility', () => {
    it('is hidden from screen readers by default', () => {
      render(<RpgIcon icon="sword" />);
      expect(screen.getByTestId('rpg-icon')).toHaveAttribute('aria-hidden', 'true');
    });

    it('is visible to screen readers when aria-label provided', () => {
      render(<RpgIcon icon="sword" aria-label="A sword icon" />);
      const icon = screen.getByTestId('rpg-icon');
      expect(icon).toHaveAttribute('aria-hidden', 'false');
      expect(icon).toHaveAttribute('aria-label', 'A sword icon');
      expect(icon).toHaveAttribute('role', 'img');
    });

    it('can be explicitly hidden even with aria-label', () => {
      render(<RpgIcon icon="sword" aria-label="A sword" aria-hidden={true} />);
      expect(screen.getByTestId('rpg-icon')).toHaveAttribute('aria-hidden', 'true');
    });

    it('has no role when decorative', () => {
      render(<RpgIcon icon="sword" />);
      expect(screen.getByTestId('rpg-icon')).not.toHaveAttribute('role');
    });
  });

  describe('RpgIconGroups', () => {
    it('has dice group with dice icons', () => {
      expect(RpgIconGroups.dice).toContain('dice-one');
      expect(RpgIconGroups.dice).toContain('dice-six');
      expect(RpgIconGroups.dice).toContain('perspective-dice-random');
    });

    it('has weapons group with weapon icons', () => {
      expect(RpgIconGroups.weapons).toContain('sword');
      expect(RpgIconGroups.weapons).toContain('axe');
      expect(RpgIconGroups.weapons).toContain('crossbow');
    });

    it('has magic group with magic icons', () => {
      expect(RpgIconGroups.magic).toContain('crystal-ball');
      expect(RpgIconGroups.magic).toContain('potion');
      expect(RpgIconGroups.magic).toContain('lightning-bolt');
    });

    it('has creatures group with creature icons', () => {
      expect(RpgIconGroups.creatures).toContain('dragon');
      expect(RpgIconGroups.creatures).toContain('wolf-head');
      expect(RpgIconGroups.creatures).toContain('wyvern');
    });

    it('has armor group with armor icons', () => {
      expect(RpgIconGroups.armor).toContain('helmet');
      expect(RpgIconGroups.armor).toContain('shield');
      expect(RpgIconGroups.armor).toContain('knight-helmet');
    });

    it('has status group with status icons', () => {
      expect(RpgIconGroups.status).toContain('health');
      expect(RpgIconGroups.status).toContain('poison-cloud');
      expect(RpgIconGroups.status).toContain('skull');
    });

    it('has cards group with card icons', () => {
      expect(RpgIconGroups.cards).toContain('hearts-card');
      expect(RpgIconGroups.cards).toContain('diamonds-card');
      expect(RpgIconGroups.cards).toContain('suits');
    });

    it('has zodiac group with zodiac icons', () => {
      expect(RpgIconGroups.zodiac).toContain('aries');
      expect(RpgIconGroups.zodiac).toContain('leo');
      expect(RpgIconGroups.zodiac).toContain('pisces');
      expect(RpgIconGroups.zodiac).toHaveLength(12);
    });
  });

  describe('combined props', () => {
    it('applies multiple classes together', () => {
      render(
        <RpgIcon
          icon="dragon"
          size="3x"
          fixedWidth
          spin
          className="text-red-500"
        />
      );
      const icon = screen.getByTestId('rpg-icon');
      expect(icon).toHaveClass('ra', 'ra-dragon', 'ra-3x', 'ra-fw', 'ra-spin', 'text-red-500');
    });
  });
});
