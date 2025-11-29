import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { GuildCard } from './GuildCard';
import type { Guild } from '@crit-fumble/core/types';

const mockGuild: Guild = {
  id: '123456789',
  name: 'Test Server',
  icon: 'icon123',
  owner: true,
  permissions: '8',
};

const mockGuildNoIcon: Guild = {
  id: '123456789',
  name: 'Test Server',
  icon: null,
  owner: false,
  permissions: '0',
};

const mockGuildAnimatedIcon: Guild = {
  id: '123456789',
  name: 'Animated Server',
  icon: 'a_icon123',
  owner: false,
  permissions: '0',
};

describe('GuildCard', () => {
  describe('rendering', () => {
    it('renders guild name', () => {
      render(<GuildCard guild={mockGuild} />);
      expect(screen.getByText('Test Server')).toBeInTheDocument();
    });

    it('applies testId correctly', () => {
      render(<GuildCard guild={mockGuild} testId="custom-guild-card" />);
      expect(screen.getByTestId('custom-guild-card')).toBeInTheDocument();
    });

    it('applies default testId', () => {
      render(<GuildCard guild={mockGuild} />);
      expect(screen.getByTestId('guild-card')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<GuildCard guild={mockGuild} className="custom-class" />);
      expect(screen.getByTestId('guild-card')).toHaveClass('custom-class');
    });
  });

  describe('icon', () => {
    it('renders guild icon when available', () => {
      render(<GuildCard guild={mockGuild} />);
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('src', expect.stringContaining('cdn.discordapp.com/icons/123456789/icon123.png'));
    });

    it('renders animated icon with gif extension', () => {
      render(<GuildCard guild={mockGuildAnimatedIcon} />);
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('src', expect.stringContaining('.gif'));
    });

    it('renders initials when no icon', () => {
      render(<GuildCard guild={mockGuildNoIcon} />);
      expect(screen.getByText('TS')).toBeInTheDocument();
    });

    it('renders correct initials for multi-word names', () => {
      render(<GuildCard guild={{ ...mockGuildNoIcon, name: 'My Great Server' }} />);
      expect(screen.getByText('MG')).toBeInTheDocument();
    });

    it('renders alt text correctly', () => {
      render(<GuildCard guild={mockGuild} />);
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('alt', 'Test Server');
    });
  });

  describe('owner badge', () => {
    it('shows owner badge when owner is true and showOwnerBadge is true', () => {
      render(<GuildCard guild={mockGuild} showOwnerBadge={true} />);
      expect(screen.getByText('Owner')).toBeInTheDocument();
    });

    it('does not show owner badge when showOwnerBadge is false', () => {
      render(<GuildCard guild={mockGuild} showOwnerBadge={false} />);
      expect(screen.queryByText('Owner')).not.toBeInTheDocument();
    });

    it('does not show owner badge when not owner', () => {
      render(<GuildCard guild={mockGuildNoIcon} showOwnerBadge={true} />);
      expect(screen.queryByText('Owner')).not.toBeInTheDocument();
    });
  });

  describe('sizes', () => {
    it('applies small size classes', () => {
      render(<GuildCard guild={mockGuild} size="sm" />);
      const img = screen.getByRole('img');
      expect(img).toHaveClass('w-8', 'h-8');
    });

    it('applies medium size classes by default', () => {
      render(<GuildCard guild={mockGuild} />);
      const img = screen.getByRole('img');
      expect(img).toHaveClass('w-12', 'h-12');
    });

    it('applies large size classes', () => {
      render(<GuildCard guild={mockGuild} size="lg" />);
      const img = screen.getByRole('img');
      expect(img).toHaveClass('w-16', 'h-16');
    });
  });

  describe('selection', () => {
    it('applies selected styles when isSelected is true', () => {
      render(<GuildCard guild={mockGuild} isSelected={true} />);
      expect(screen.getByTestId('guild-card')).toHaveClass('ring-2', 'ring-discord-primary');
    });

    it('does not apply selected styles when isSelected is false', () => {
      render(<GuildCard guild={mockGuild} isSelected={false} />);
      expect(screen.getByTestId('guild-card')).not.toHaveClass('ring-2');
    });
  });

  describe('interactions', () => {
    it('calls onClick when clicked', () => {
      const handleClick = vi.fn();
      render(<GuildCard guild={mockGuild} onClick={handleClick} />);
      fireEvent.click(screen.getByTestId('guild-card'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('applies hover styles when onClick is provided', () => {
      const handleClick = vi.fn();
      render(<GuildCard guild={mockGuild} onClick={handleClick} />);
      expect(screen.getByTestId('guild-card')).toHaveClass('cursor-pointer');
    });

    it('does not apply hover styles when onClick is not provided', () => {
      render(<GuildCard guild={mockGuild} />);
      expect(screen.getByTestId('guild-card')).not.toHaveClass('cursor-pointer');
    });
  });
});
