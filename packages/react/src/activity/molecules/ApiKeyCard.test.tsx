import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ApiKeyCard } from './ApiKeyCard';

describe('ApiKeyCard', () => {
  const defaultProps = {
    id: 'key-abc123def456',
    name: 'Production API Key',
    scopes: ['read:campaigns', 'write:campaigns'],
  };

  describe('rendering', () => {
    it('renders key name', () => {
      render(<ApiKeyCard {...defaultProps} />);
      expect(screen.getByTestId('api-key-card-name')).toHaveTextContent('Production API Key');
    });

    it('renders truncated key ID', () => {
      render(<ApiKeyCard {...defaultProps} />);
      expect(screen.getByTestId('api-key-card-id')).toHaveTextContent('key-abc1...');
    });

    it('renders scopes', () => {
      render(<ApiKeyCard {...defaultProps} />);
      const scopesContainer = screen.getByTestId('api-key-card-scopes');
      expect(scopesContainer).toHaveTextContent('read:campaigns');
      expect(scopesContainer).toHaveTextContent('write:campaigns');
    });

    it('renders created date when provided', () => {
      const createdAt = new Date('2024-01-15');
      render(<ApiKeyCard {...defaultProps} createdAt={createdAt} />);
      expect(screen.getByTestId('api-key-card-created')).toBeInTheDocument();
    });

    it('renders expires date when provided', () => {
      const expiresAt = new Date(Date.now() + 30 * 86400000); // 30 days from now
      render(<ApiKeyCard {...defaultProps} expiresAt={expiresAt} />);
      expect(screen.getByTestId('api-key-card-expires')).toBeInTheDocument();
    });

    it('shows "Never" for non-expiring keys', () => {
      render(<ApiKeyCard {...defaultProps} expiresAt={null} />);
      expect(screen.getByTestId('api-key-card-expires')).toHaveTextContent('Never');
    });

    it('renders last used date when provided', () => {
      const lastUsedAt = new Date(Date.now() - 3600000); // 1 hour ago
      render(<ApiKeyCard {...defaultProps} lastUsedAt={lastUsedAt} />);
      expect(screen.getByTestId('api-key-card-last-used')).toHaveTextContent('1h ago');
    });

    it('applies custom className', () => {
      render(<ApiKeyCard {...defaultProps} className="custom-class" />);
      expect(screen.getByTestId('api-key-card')).toHaveClass('custom-class');
    });

    it('applies custom testId', () => {
      render(<ApiKeyCard {...defaultProps} testId="custom-card" />);
      expect(screen.getByTestId('custom-card')).toBeInTheDocument();
    });
  });

  describe('expired keys', () => {
    it('shows expired badge when key is expired', () => {
      const expiresAt = new Date(Date.now() - 86400000); // 1 day ago
      render(<ApiKeyCard {...defaultProps} expiresAt={expiresAt} />);
      expect(screen.getByTestId('api-key-card-expired-badge')).toHaveTextContent('Expired');
    });

    it('applies opacity when expired', () => {
      const expiresAt = new Date(Date.now() - 86400000);
      render(<ApiKeyCard {...defaultProps} expiresAt={expiresAt} />);
      expect(screen.getByTestId('api-key-card')).toHaveClass('opacity-60');
    });

    it('shows "Expired" label instead of "Expires"', () => {
      const expiresAt = new Date(Date.now() - 86400000);
      render(<ApiKeyCard {...defaultProps} expiresAt={expiresAt} />);
      expect(screen.getByTestId('api-key-card-expires')).toHaveTextContent('Expired');
    });
  });

  describe('key value display', () => {
    it('renders key value section when keyValue provided', () => {
      render(<ApiKeyCard {...defaultProps} keyValue="sk_live_1234567890abcdef" />);
      expect(screen.getByTestId('api-key-card-key-value')).toBeInTheDocument();
    });

    it('shows warning about copying key', () => {
      render(<ApiKeyCard {...defaultProps} keyValue="sk_live_1234567890abcdef" />);
      expect(screen.getByText(/Copy this key now/)).toBeInTheDocument();
    });

    it('hides key value by default', () => {
      render(<ApiKeyCard {...defaultProps} keyValue="sk_live_1234567890abcdef" />);
      expect(screen.getByTestId('api-key-card-key-display')).toHaveTextContent('••••••••••••••••••••••••');
    });

    it('shows key value when toggle clicked', () => {
      render(<ApiKeyCard {...defaultProps} keyValue="sk_live_1234567890abcdef" />);
      fireEvent.click(screen.getByTestId('api-key-card-toggle-visibility'));
      expect(screen.getByTestId('api-key-card-key-display')).toHaveTextContent('sk_live_1234567890abcdef');
    });

    it('hides key value when toggle clicked again', () => {
      render(<ApiKeyCard {...defaultProps} keyValue="sk_live_1234567890abcdef" />);
      fireEvent.click(screen.getByTestId('api-key-card-toggle-visibility'));
      fireEvent.click(screen.getByTestId('api-key-card-toggle-visibility'));
      expect(screen.getByTestId('api-key-card-key-display')).toHaveTextContent('••••••••••••••••••••••••');
    });

    it('shows copy button when onCopy provided', () => {
      render(<ApiKeyCard {...defaultProps} keyValue="sk_live_1234567890abcdef" onCopy={() => {}} />);
      expect(screen.getByTestId('api-key-card-copy-btn')).toBeInTheDocument();
    });

    it('calls onCopy when copy button clicked', () => {
      const handleCopy = vi.fn();
      render(<ApiKeyCard {...defaultProps} keyValue="sk_live_1234567890abcdef" onCopy={handleCopy} />);
      fireEvent.click(screen.getByTestId('api-key-card-copy-btn'));
      expect(handleCopy).toHaveBeenCalledTimes(1);
    });
  });

  describe('revoke action', () => {
    it('shows revoke button when onRevoke provided', () => {
      render(<ApiKeyCard {...defaultProps} onRevoke={() => {}} />);
      expect(screen.getByTestId('api-key-card-revoke-btn')).toBeInTheDocument();
    });

    it('calls onRevoke when button clicked', () => {
      const handleRevoke = vi.fn();
      render(<ApiKeyCard {...defaultProps} onRevoke={handleRevoke} />);
      fireEvent.click(screen.getByTestId('api-key-card-revoke-btn'));
      expect(handleRevoke).toHaveBeenCalledTimes(1);
    });

    it('disables revoke button when loading', () => {
      render(<ApiKeyCard {...defaultProps} onRevoke={() => {}} isLoading />);
      expect(screen.getByTestId('api-key-card-revoke-btn')).toBeDisabled();
    });

    it('does not show revoke button without onRevoke', () => {
      render(<ApiKeyCard {...defaultProps} />);
      expect(screen.queryByTestId('api-key-card-revoke-btn')).not.toBeInTheDocument();
    });
  });

  describe('relative time formatting', () => {
    it('shows "Just now" for recent usage', () => {
      const lastUsedAt = new Date(Date.now() - 30000); // 30 seconds ago
      render(<ApiKeyCard {...defaultProps} lastUsedAt={lastUsedAt} />);
      expect(screen.getByTestId('api-key-card-last-used')).toHaveTextContent('Just now');
    });

    it('shows minutes for recent usage', () => {
      const lastUsedAt = new Date(Date.now() - 5 * 60000); // 5 minutes ago
      render(<ApiKeyCard {...defaultProps} lastUsedAt={lastUsedAt} />);
      expect(screen.getByTestId('api-key-card-last-used')).toHaveTextContent('5m ago');
    });

    it('shows hours for older usage', () => {
      const lastUsedAt = new Date(Date.now() - 5 * 3600000); // 5 hours ago
      render(<ApiKeyCard {...defaultProps} lastUsedAt={lastUsedAt} />);
      expect(screen.getByTestId('api-key-card-last-used')).toHaveTextContent('5h ago');
    });

    it('shows days for very old usage', () => {
      const lastUsedAt = new Date(Date.now() - 5 * 86400000); // 5 days ago
      render(<ApiKeyCard {...defaultProps} lastUsedAt={lastUsedAt} />);
      expect(screen.getByTestId('api-key-card-last-used')).toHaveTextContent('5d ago');
    });
  });

  describe('empty scopes', () => {
    it('does not render scopes section when empty', () => {
      render(<ApiKeyCard {...defaultProps} scopes={[]} />);
      expect(screen.queryByTestId('api-key-card-scopes')).not.toBeInTheDocument();
    });
  });
});
