import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SystemCard } from './SystemCard';

describe('SystemCard', () => {
  const defaultProps = {
    systemId: 'dnd5e',
    title: 'D&D 5th Edition',
  };

  describe('rendering', () => {
    it('renders system title', () => {
      render(<SystemCard {...defaultProps} />);
      expect(screen.getByTestId('system-card-title')).toHaveTextContent('D&D 5th Edition');
    });

    it('renders system ID', () => {
      render(<SystemCard {...defaultProps} />);
      expect(screen.getByTestId('system-card-system-id')).toHaveTextContent('dnd5e');
    });

    it('renders version badge when provided', () => {
      render(<SystemCard {...defaultProps} version="3.0.0" />);
      expect(screen.getByTestId('system-card-version')).toHaveTextContent('v3.0.0');
    });

    it('renders icon when provided', () => {
      render(<SystemCard {...defaultProps} iconUrl="https://example.com/icon.png" />);
      expect(screen.getByTestId('system-card-icon')).toBeInTheDocument();
    });

    it('renders icon placeholder when no icon', () => {
      render(<SystemCard {...defaultProps} />);
      expect(screen.getByTestId('system-card-icon-placeholder')).toBeInTheDocument();
    });

    it('renders description when provided', () => {
      render(<SystemCard {...defaultProps} description="The world's greatest roleplaying game" />);
      expect(screen.getByTestId('system-card-description')).toHaveTextContent(
        "The world's greatest roleplaying game"
      );
    });

    it('renders selected badge when selected', () => {
      render(<SystemCard {...defaultProps} isSelected />);
      expect(screen.getByTestId('system-card-selected-badge')).toHaveTextContent('Selected');
    });

    it('renders disabled badge when not enabled', () => {
      render(<SystemCard {...defaultProps} isEnabled={false} />);
      expect(screen.getByTestId('system-card-disabled-badge')).toHaveTextContent('Disabled');
    });

    it('applies custom className', () => {
      render(<SystemCard {...defaultProps} className="custom-class" />);
      expect(screen.getByTestId('system-card')).toHaveClass('custom-class');
    });

    it('applies custom testId', () => {
      render(<SystemCard {...defaultProps} testId="custom-card" />);
      expect(screen.getByTestId('custom-card')).toBeInTheDocument();
    });
  });

  describe('compatibility info', () => {
    it('shows verified compatibility', () => {
      render(
        <SystemCard
          {...defaultProps}
          compatibility={{ verified: '12.0.0' }}
        />
      );
      expect(screen.getByTestId('system-card-compatibility')).toHaveTextContent('Verified 12.0.0');
    });

    it('shows minimum compatibility when no verified', () => {
      render(
        <SystemCard
          {...defaultProps}
          compatibility={{ minimum: '11.0.0' }}
        />
      );
      expect(screen.getByTestId('system-card-compatibility')).toHaveTextContent('Min 11.0.0');
    });

    it('shows maximum compatibility', () => {
      render(
        <SystemCard
          {...defaultProps}
          compatibility={{ minimum: '11.0.0', maximum: '12.999.0' }}
        />
      );
      expect(screen.getByTestId('system-card-compatibility')).toHaveTextContent('Max 12.999.0');
    });

    it('does not show compatibility section when not provided', () => {
      render(<SystemCard {...defaultProps} />);
      expect(screen.queryByTestId('system-card-compatibility')).not.toBeInTheDocument();
    });
  });

  describe('authors', () => {
    it('shows single author', () => {
      render(
        <SystemCard
          {...defaultProps}
          authors={[{ name: 'Foundry Gaming LLC' }]}
        />
      );
      expect(screen.getByTestId('system-card-authors')).toHaveTextContent('By Foundry Gaming LLC');
    });

    it('shows multiple authors', () => {
      render(
        <SystemCard
          {...defaultProps}
          authors={[{ name: 'Author 1' }, { name: 'Author 2' }]}
        />
      );
      expect(screen.getByTestId('system-card-authors')).toHaveTextContent('By Author 1, Author 2');
    });

    it('does not show authors section when empty', () => {
      render(<SystemCard {...defaultProps} authors={[]} />);
      expect(screen.queryByTestId('system-card-authors')).not.toBeInTheDocument();
    });
  });

  describe('interactions', () => {
    it('calls onSelect when clicked', () => {
      const handleSelect = vi.fn();
      render(<SystemCard {...defaultProps} onSelect={handleSelect} />);
      fireEvent.click(screen.getByTestId('system-card'));
      expect(handleSelect).toHaveBeenCalledTimes(1);
    });

    it('calls onSelect on Enter key', () => {
      const handleSelect = vi.fn();
      render(<SystemCard {...defaultProps} onSelect={handleSelect} />);
      fireEvent.keyDown(screen.getByTestId('system-card'), { key: 'Enter' });
      expect(handleSelect).toHaveBeenCalledTimes(1);
    });

    it('does not call onSelect when disabled', () => {
      const handleSelect = vi.fn();
      render(<SystemCard {...defaultProps} onSelect={handleSelect} isEnabled={false} />);
      fireEvent.click(screen.getByTestId('system-card'));
      expect(handleSelect).not.toHaveBeenCalled();
    });

    it('calls onViewDetails when details button clicked', () => {
      const handleViewDetails = vi.fn();
      render(<SystemCard {...defaultProps} onViewDetails={handleViewDetails} />);
      fireEvent.click(screen.getByTestId('system-card-details-btn'));
      expect(handleViewDetails).toHaveBeenCalledTimes(1);
    });

    it('stops propagation when clicking details button', () => {
      const handleSelect = vi.fn();
      const handleViewDetails = vi.fn();
      render(
        <SystemCard
          {...defaultProps}
          onSelect={handleSelect}
          onViewDetails={handleViewDetails}
        />
      );
      fireEvent.click(screen.getByTestId('system-card-details-btn'));
      expect(handleViewDetails).toHaveBeenCalled();
      expect(handleSelect).not.toHaveBeenCalled();
    });
  });

  describe('styling', () => {
    it('has selected styling when selected', () => {
      render(<SystemCard {...defaultProps} isSelected />);
      expect(screen.getByTestId('system-card')).toHaveClass('border-cfg-primary');
    });

    it('has hover styling when clickable', () => {
      render(<SystemCard {...defaultProps} onSelect={() => {}} />);
      expect(screen.getByTestId('system-card')).toHaveClass('cursor-pointer');
    });

    it('has opacity when disabled', () => {
      render(<SystemCard {...defaultProps} isEnabled={false} />);
      expect(screen.getByTestId('system-card')).toHaveClass('opacity-50');
    });
  });

  describe('accessibility', () => {
    it('has button role when clickable', () => {
      render(<SystemCard {...defaultProps} onSelect={() => {}} />);
      expect(screen.getByTestId('system-card')).toHaveAttribute('role', 'button');
    });

    it('has tabIndex when clickable', () => {
      render(<SystemCard {...defaultProps} onSelect={() => {}} />);
      expect(screen.getByTestId('system-card')).toHaveAttribute('tabIndex', '0');
    });

    it('does not have button role when not clickable', () => {
      render(<SystemCard {...defaultProps} />);
      expect(screen.getByTestId('system-card')).not.toHaveAttribute('role');
    });
  });
});
