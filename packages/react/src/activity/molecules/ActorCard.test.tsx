import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ActorCard } from './ActorCard';
import type { FoundryActorInfo } from './ActorCard';

const mockActor: FoundryActorInfo = {
  id: 'actor-1',
  name: 'Test Actor',
  type: 'character',
  img: 'https://example.com/actor.png',
};

const mockActorNoImage: FoundryActorInfo = {
  id: 'actor-2',
  name: 'No Image Actor',
  type: 'npc',
};

describe('ActorCard', () => {
  describe('rendering', () => {
    it('renders actor name', () => {
      render(<ActorCard actor={mockActor} />);
      expect(screen.getByText('Test Actor')).toBeInTheDocument();
    });

    it('renders actor type', () => {
      render(<ActorCard actor={mockActor} />);
      expect(screen.getByText('character')).toBeInTheDocument();
    });

    it('applies default testId based on actor id', () => {
      render(<ActorCard actor={mockActor} />);
      expect(screen.getByTestId('actor-card-actor-1')).toBeInTheDocument();
    });

    it('applies custom testId', () => {
      render(<ActorCard actor={mockActor} testId="custom-actor-card" />);
      expect(screen.getByTestId('custom-actor-card')).toBeInTheDocument();
    });
  });

  describe('image', () => {
    it('renders image when available', () => {
      render(<ActorCard actor={mockActor} />);
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('src', 'https://example.com/actor.png');
      expect(img).toHaveAttribute('alt', 'Test Actor');
    });

    it('renders placeholder with first letter when no image', () => {
      render(<ActorCard actor={mockActorNoImage} />);
      expect(screen.getByText('N')).toBeInTheDocument();
      expect(screen.getByTestId('actor-card-actor-2-placeholder')).toBeInTheDocument();
    });
  });

  describe('type colors', () => {
    it('applies green color for character type', () => {
      render(<ActorCard actor={{ ...mockActor, type: 'character' }} />);
      const typeElement = screen.getByText('character');
      expect(typeElement).toHaveClass('text-discord-green');
    });

    it('applies yellow color for npc type', () => {
      render(<ActorCard actor={{ ...mockActor, type: 'npc' }} />);
      const typeElement = screen.getByText('npc');
      expect(typeElement).toHaveClass('text-discord-yellow');
    });

    it('applies primary color for vehicle type', () => {
      render(<ActorCard actor={{ ...mockActor, type: 'vehicle' }} />);
      const typeElement = screen.getByText('vehicle');
      expect(typeElement).toHaveClass('text-discord-primary');
    });

    it('applies muted color for unknown type', () => {
      render(<ActorCard actor={{ ...mockActor, type: 'unknown' }} />);
      const typeElement = screen.getByText('unknown');
      expect(typeElement).toHaveClass('text-discord-text-muted');
    });
  });

  describe('sizes', () => {
    it('applies small size classes', () => {
      render(<ActorCard actor={mockActor} size="sm" />);
      const img = screen.getByRole('img');
      expect(img).toHaveClass('w-8', 'h-8');
    });

    it('applies medium size classes by default', () => {
      render(<ActorCard actor={mockActor} />);
      const img = screen.getByRole('img');
      expect(img).toHaveClass('w-12', 'h-12');
    });

    it('applies large size classes', () => {
      render(<ActorCard actor={mockActor} size="lg" />);
      const img = screen.getByRole('img');
      expect(img).toHaveClass('w-16', 'h-16');
    });
  });

  describe('selection', () => {
    it('applies selected styles when selected is true', () => {
      render(<ActorCard actor={mockActor} selected={true} />);
      expect(screen.getByTestId('actor-card-actor-1')).toHaveClass('ring-2', 'ring-discord-primary');
    });

    it('does not apply selected styles when selected is false', () => {
      render(<ActorCard actor={mockActor} selected={false} />);
      expect(screen.getByTestId('actor-card-actor-1')).not.toHaveClass('ring-2');
    });
  });

  describe('interactions', () => {
    it('calls onClick when clicked', () => {
      const handleClick = vi.fn();
      render(<ActorCard actor={mockActor} onClick={handleClick} />);
      fireEvent.click(screen.getByTestId('actor-card-actor-1'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('applies interactive variant when onClick is provided', () => {
      const handleClick = vi.fn();
      render(<ActorCard actor={mockActor} onClick={handleClick} />);
      expect(screen.getByTestId('actor-card-actor-1')).toHaveClass('cursor-pointer');
    });
  });
});
