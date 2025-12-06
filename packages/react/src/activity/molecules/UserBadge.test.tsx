
import { render, screen } from '@testing-library/react';
import { UserBadge } from './UserBadge';

describe('UserBadge', () => {
  describe('rendering', () => {
    it('renders the badge', () => {
      render(<UserBadge username="JohnDoe" testId="user" />);
      expect(screen.getByTestId('user')).toBeInTheDocument();
    });

    it('renders username', () => {
      render(<UserBadge username="JohnDoe" testId="user" />);
      expect(screen.getByTestId('user-name')).toHaveTextContent('JohnDoe');
    });

    it('renders avatar image', () => {
      render(<UserBadge username="JohnDoe" testId="user" />);
      expect(screen.getByTestId('user-avatar')).toBeInTheDocument();
    });
  });

  describe('avatar handling', () => {
    it('uses default avatar when no avatar is provided', () => {
      render(<UserBadge username="JohnDoe" testId="user" />);
      expect(screen.getByTestId('user-avatar')).toHaveAttribute(
        'src',
        'https://cdn.discordapp.com/embed/avatars/0.png'
      );
    });

    it('uses default avatar when avatar is null', () => {
      render(<UserBadge username="JohnDoe" avatar={null} testId="user" />);
      expect(screen.getByTestId('user-avatar')).toHaveAttribute(
        'src',
        'https://cdn.discordapp.com/embed/avatars/0.png'
      );
    });

    it('uses full URL when avatar starts with http', () => {
      render(
        <UserBadge
          username="JohnDoe"
          avatar="https://example.com/avatar.jpg"
          testId="user"
        />
      );
      expect(screen.getByTestId('user-avatar')).toHaveAttribute(
        'src',
        'https://example.com/avatar.jpg'
      );
    });

    it('constructs Discord CDN URL for non-http avatars', () => {
      render(<UserBadge username="JohnDoe" avatar="123456/abc123" testId="user" />);
      expect(screen.getByTestId('user-avatar')).toHaveAttribute(
        'src',
        'https://cdn.discordapp.com/avatars/123456/abc123'
      );
    });

    it('applies username as alt text', () => {
      render(<UserBadge username="JohnDoe" testId="user" />);
      expect(screen.getByTestId('user-avatar')).toHaveAttribute('alt', 'JohnDoe');
    });
  });

  describe('role badge', () => {
    it('shows Admin badge for admin role', () => {
      render(<UserBadge username="JohnDoe" role="admin" testId="user" />);
      expect(screen.getByTestId('user-role')).toHaveTextContent('Admin');
    });

    it('shows GM badge for gm role', () => {
      render(<UserBadge username="JohnDoe" role="gm" testId="user" />);
      expect(screen.getByTestId('user-role')).toHaveTextContent('GM');
    });

    it('shows Player badge for player role', () => {
      render(<UserBadge username="JohnDoe" role="player" testId="user" />);
      expect(screen.getByTestId('user-role')).toHaveTextContent('Player');
    });

    it('does not show role badge when no role is provided', () => {
      render(<UserBadge username="JohnDoe" testId="user" />);
      expect(screen.queryByTestId('user-role')).not.toBeInTheDocument();
    });

    it('does not show role badge when showRole is false', () => {
      render(<UserBadge username="JohnDoe" role="admin" showRole={false} testId="user" />);
      expect(screen.queryByTestId('user-role')).not.toBeInTheDocument();
    });
  });

  describe('styling', () => {
    it('applies base container styling', () => {
      render(<UserBadge username="JohnDoe" testId="user" />);
      expect(screen.getByTestId('user')).toHaveClass(
        'flex',
        'items-center',
        'gap-2',
        'px-3',
        'py-1.5',
        'rounded'
      );
    });

    it('applies avatar styling', () => {
      render(<UserBadge username="JohnDoe" testId="user" />);
      expect(screen.getByTestId('user-avatar')).toHaveClass('w-6', 'h-6', 'rounded-full');
    });

    it('merges custom className', () => {
      render(<UserBadge username="JohnDoe" className="custom-class" testId="user" />);
      expect(screen.getByTestId('user')).toHaveClass('custom-class');
    });
  });
});
