import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { WorldAnvilLinkCard } from './WorldAnvilLinkCard';

describe('WorldAnvilLinkCard', () => {
  describe('Unlinked state', () => {
    it('renders unlinked state', () => {
      render(
        <WorldAnvilLinkCard
          worldId={null}
          worldName={null}
          worldUrl={null}
          notebookId={null}
        />
      );
      expect(screen.getByText('World Anvil')).toBeInTheDocument();
      expect(screen.getByText(/Connect your World Anvil world/)).toBeInTheDocument();
    });

    it('shows Link World button when onLink provided', () => {
      const handleLink = vi.fn();
      render(
        <WorldAnvilLinkCard
          worldId={null}
          worldName={null}
          worldUrl={null}
          notebookId={null}
          onLink={handleLink}
        />
      );

      const linkBtn = screen.getByTestId('world-anvil-link-card-link-btn');
      expect(linkBtn).toHaveTextContent('Link World');

      fireEvent.click(linkBtn);
      expect(handleLink).toHaveBeenCalled();
    });

    it('shows Linking... when isLinking is true', () => {
      render(
        <WorldAnvilLinkCard
          worldId={null}
          worldName={null}
          worldUrl={null}
          notebookId={null}
          onLink={() => {}}
          isLinking={true}
        />
      );

      expect(screen.getByText('Linking...')).toBeInTheDocument();
      expect(screen.getByTestId('world-anvil-link-card-link-btn')).toBeDisabled();
    });

    it('does not show linked badge when unlinked', () => {
      render(
        <WorldAnvilLinkCard
          worldId={null}
          worldName={null}
          worldUrl={null}
          notebookId={null}
        />
      );

      expect(screen.queryByTestId('world-anvil-link-card-linked-badge')).not.toBeInTheDocument();
    });
  });

  describe('Linked state', () => {
    it('shows linked badge', () => {
      render(
        <WorldAnvilLinkCard
          worldId="world-123"
          worldName="Test World"
          worldUrl="https://example.com"
          notebookId={null}
        />
      );

      expect(screen.getByTestId('world-anvil-link-card-linked-badge')).toBeInTheDocument();
      expect(screen.getByText('Linked')).toBeInTheDocument();
    });

    it('displays world name', () => {
      render(
        <WorldAnvilLinkCard
          worldId="world-123"
          worldName="Barovia"
          worldUrl={null}
          notebookId={null}
        />
      );

      expect(screen.getByTestId('world-anvil-link-card-world-name')).toHaveTextContent('Barovia');
    });

    it('shows Unknown World when worldName is null', () => {
      render(
        <WorldAnvilLinkCard
          worldId="world-123"
          worldName={null}
          worldUrl={null}
          notebookId={null}
        />
      );

      expect(screen.getByTestId('world-anvil-link-card-world-name')).toHaveTextContent('Unknown World');
    });

    it('displays world URL when provided', () => {
      render(
        <WorldAnvilLinkCard
          worldId="world-123"
          worldName="Test"
          worldUrl="https://www.worldanvil.com/w/test"
          notebookId={null}
        />
      );

      expect(screen.getByTestId('world-anvil-link-card-world-url')).toHaveTextContent(
        'https://www.worldanvil.com/w/test'
      );
    });

    it('shows notebook info when notebookId provided', () => {
      render(
        <WorldAnvilLinkCard
          worldId="world-123"
          worldName="Test"
          worldUrl={null}
          notebookId="notebook-456"
        />
      );

      expect(screen.getByTestId('world-anvil-link-card-notebook')).toHaveTextContent(
        'Session notes notebook linked'
      );
    });

    it('does not show notebook info when notebookId is null', () => {
      render(
        <WorldAnvilLinkCard
          worldId="world-123"
          worldName="Test"
          worldUrl={null}
          notebookId={null}
        />
      );

      expect(screen.queryByTestId('world-anvil-link-card-notebook')).not.toBeInTheDocument();
    });

    it('shows Open World button when worldUrl and onOpenWorld provided', () => {
      const handleOpen = vi.fn();
      render(
        <WorldAnvilLinkCard
          worldId="world-123"
          worldName="Test"
          worldUrl="https://example.com"
          notebookId={null}
          onOpenWorld={handleOpen}
        />
      );

      const openBtn = screen.getByTestId('world-anvil-link-card-open-btn');
      fireEvent.click(openBtn);
      expect(handleOpen).toHaveBeenCalled();
    });

    it('does not show Open World button when worldUrl is null', () => {
      render(
        <WorldAnvilLinkCard
          worldId="world-123"
          worldName="Test"
          worldUrl={null}
          notebookId={null}
          onOpenWorld={() => {}}
        />
      );

      expect(screen.queryByTestId('world-anvil-link-card-open-btn')).not.toBeInTheDocument();
    });

    it('shows Unlink button when onUnlink provided', () => {
      const handleUnlink = vi.fn();
      render(
        <WorldAnvilLinkCard
          worldId="world-123"
          worldName="Test"
          worldUrl={null}
          notebookId={null}
          onUnlink={handleUnlink}
        />
      );

      const unlinkBtn = screen.getByTestId('world-anvil-link-card-unlink-btn');
      fireEvent.click(unlinkBtn);
      expect(handleUnlink).toHaveBeenCalled();
    });
  });

  it('applies custom className', () => {
    render(
      <WorldAnvilLinkCard
        worldId={null}
        worldName={null}
        worldUrl={null}
        notebookId={null}
        className="custom-class"
      />
    );

    expect(screen.getByTestId('world-anvil-link-card')).toHaveClass('custom-class');
  });

  it('uses custom testId', () => {
    render(
      <WorldAnvilLinkCard
        worldId={null}
        worldName={null}
        worldUrl={null}
        notebookId={null}
        testId="custom-test-id"
      />
    );

    expect(screen.getByTestId('custom-test-id')).toBeInTheDocument();
  });
});
