import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { UserCard } from './UserCard';
import type { DiscordUser } from '@crit-fumble/core/types';

const mockUser: DiscordUser = {
  id: '123456789',
  username: 'testuser',
  discriminator: '0',
  avatar: 'abc123',
  global_name: 'Test User',
};

const mockUserNoGlobalName: DiscordUser = {
  id: '123456789',
  username: 'testuser',
  discriminator: '1234',
  avatar: null,
  global_name: null,
};

const mockUserAnimatedAvatar: DiscordUser = {
  id: '123456789',
  username: 'testuser',
  discriminator: '0',
  avatar: 'a_abc123',
  global_name: 'Animated User',
};

describe('UserCard', () => {
  describe('rendering', () => {
    it('renders with display name', () => {
      render(<UserCard user={mockUser} />);
      expect(screen.getByText('Test User')).toBeInTheDocument();
    });

    it('renders with username when no global_name', () => {
      render(<UserCard user={mockUserNoGlobalName} />);
      expect(screen.getByText('testuser')).toBeInTheDocument();
    });

    it('shows @username when showUsername is true and global_name exists', () => {
      render(<UserCard user={mockUser} showUsername={true} />);
      expect(screen.getByText('@testuser')).toBeInTheDocument();
    });

    it('does not show @username when showUsername is false', () => {
      render(<UserCard user={mockUser} showUsername={false} />);
      expect(screen.queryByText('@testuser')).not.toBeInTheDocument();
    });

    it('does not show @username when no global_name', () => {
      render(<UserCard user={mockUserNoGlobalName} showUsername={true} />);
      expect(screen.queryByText('@testuser')).not.toBeInTheDocument();
    });

    it('applies testId correctly', () => {
      render(<UserCard user={mockUser} testId="custom-user-card" />);
      expect(screen.getByTestId('custom-user-card')).toBeInTheDocument();
    });

    it('applies default testId', () => {
      render(<UserCard user={mockUser} />);
      expect(screen.getByTestId('user-card')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<UserCard user={mockUser} className="custom-class" />);
      expect(screen.getByTestId('user-card')).toHaveClass('custom-class');
    });
  });

  describe('avatar', () => {
    it('renders avatar with correct URL for custom avatar', () => {
      render(<UserCard user={mockUser} />);
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('src', expect.stringContaining('cdn.discordapp.com/avatars/123456789/abc123.png'));
    });

    it('renders animated avatar with gif extension', () => {
      render(<UserCard user={mockUserAnimatedAvatar} />);
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('src', expect.stringContaining('.gif'));
    });

    it('renders default avatar when no custom avatar (discriminator 0)', () => {
      render(<UserCard user={mockUserNoGlobalName} />);
      const img = screen.getByRole('img');
      // With discriminator 1234, should use old calculation
      expect(img).toHaveAttribute('src', expect.stringContaining('cdn.discordapp.com/embed/avatars'));
    });

    it('renders avatar with correct alt text', () => {
      render(<UserCard user={mockUser} />);
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('alt', 'Test User');
    });
  });

  describe('sizes', () => {
    it('applies small size classes', () => {
      render(<UserCard user={mockUser} size="sm" />);
      const img = screen.getByRole('img');
      expect(img).toHaveClass('w-8', 'h-8');
    });

    it('applies medium size classes by default', () => {
      render(<UserCard user={mockUser} />);
      const img = screen.getByRole('img');
      expect(img).toHaveClass('w-10', 'h-10');
    });

    it('applies large size classes', () => {
      render(<UserCard user={mockUser} size="lg" />);
      const img = screen.getByRole('img');
      expect(img).toHaveClass('w-14', 'h-14');
    });
  });

  describe('interactions', () => {
    it('calls onClick when clicked', () => {
      const handleClick = vi.fn();
      render(<UserCard user={mockUser} onClick={handleClick} />);
      fireEvent.click(screen.getByTestId('user-card'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('applies hover styles when onClick is provided', () => {
      const handleClick = vi.fn();
      render(<UserCard user={mockUser} onClick={handleClick} />);
      expect(screen.getByTestId('user-card')).toHaveClass('cursor-pointer');
    });

    it('does not apply hover styles when onClick is not provided', () => {
      render(<UserCard user={mockUser} />);
      expect(screen.getByTestId('user-card')).not.toHaveClass('cursor-pointer');
    });
  });
});
