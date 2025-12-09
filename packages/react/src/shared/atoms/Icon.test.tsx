import { render, screen } from '@testing-library/react';
import { Icon } from './Icon';

describe('Icon', () => {
  it('renders known icon', () => {
    render(<Icon name="dice" testId="icon" />);
    expect(screen.getByTestId('icon')).toHaveTextContent('🎲');
  });

  it('renders fallback for unknown icon', () => {
    render(<Icon name="unknown-icon" testId="icon" />);
    expect(screen.getByTestId('icon')).toHaveTextContent('?');
  });

  it('has correct aria-label', () => {
    render(<Icon name="dice" />);
    expect(screen.getByRole('img', { name: 'dice' })).toBeInTheDocument();
  });

  it('renders with testId', () => {
    render(<Icon name="dice" testId="test-icon" />);
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  describe('sizes', () => {
    it('renders sm size', () => {
      render(<Icon name="dice" size="sm" testId="icon" />);
      expect(screen.getByTestId('icon')).toHaveClass('text-sm');
    });

    it('renders md size by default', () => {
      render(<Icon name="dice" testId="icon" />);
      expect(screen.getByTestId('icon')).toHaveClass('text-base');
    });

    it('renders lg size', () => {
      render(<Icon name="dice" size="lg" testId="icon" />);
      expect(screen.getByTestId('icon')).toHaveClass('text-xl');
    });

    it('renders xl size', () => {
      render(<Icon name="dice" size="xl" testId="icon" />);
      expect(screen.getByTestId('icon')).toHaveClass('text-2xl');
    });
  });

  describe('all icons render correctly', () => {
    const iconMap: Record<string, string> = {
      dice: '🎲',
      campaign: '🏰',
      settings: '⚙️',
      user: '👤',
      users: '👥',
      add: '+',
      back: '←',
      close: '×',
      check: '✓',
      warning: '⚠️',
      error: '❌',
      chat: '💬',
      voice: '🎤',
      announcements: '📢',
      notes: '📝',
      refresh: '🔄',
      save: '💾',
      play: '▶️',
      stop: '⏹️',
      pause: '⏸️',
    };

    Object.entries(iconMap).forEach(([name, emoji]) => {
      it(`renders ${name} icon`, () => {
        render(<Icon name={name} testId="icon" />);
        expect(screen.getByTestId('icon')).toHaveTextContent(emoji);
      });
    });
  });

  it('applies custom className', () => {
    render(<Icon name="dice" className="custom-class" testId="icon" />);
    expect(screen.getByTestId('icon')).toHaveClass('custom-class');
  });
});
