
import { render, screen, fireEvent } from '@testing-library/react';
import { SnapshotCard } from './SnapshotCard';
import type { WorldSnapshot } from '../types';

const createSnapshot = (overrides: Partial<WorldSnapshot> = {}): WorldSnapshot => ({
  id: 'snapshot-1',
  campaignId: 'campaign-1',
  version: 5,
  name: 'Test Snapshot',
  isAuto: false,
  storageKey: 'snapshots/test.tar.gz',
  sizeBytes: BigInt(1024 * 1024 * 10), // 10 MB
  createdAt: new Date('2024-03-15T10:00:00'),
  createdBy: 'user-1',
  ...overrides,
});

describe('SnapshotCard', () => {
  it('renders version number', () => {
    render(<SnapshotCard snapshot={createSnapshot()} />);
    expect(screen.getByTestId('snapshot-card-version')).toHaveTextContent('v5');
  });

  it('renders snapshot name', () => {
    render(<SnapshotCard snapshot={createSnapshot()} />);
    expect(screen.getByTestId('snapshot-card-name')).toHaveTextContent('Test Snapshot');
  });

  it('does not render name when null', () => {
    render(<SnapshotCard snapshot={createSnapshot({ name: null })} />);
    expect(screen.queryByTestId('snapshot-card-name')).not.toBeInTheDocument();
  });

  it('shows Auto badge when isAuto is true', () => {
    render(<SnapshotCard snapshot={createSnapshot({ isAuto: true })} />);
    expect(screen.getByTestId('snapshot-card-auto-badge')).toHaveTextContent('Auto');
  });

  it('does not show Auto badge when isAuto is false', () => {
    render(<SnapshotCard snapshot={createSnapshot({ isAuto: false })} />);
    expect(screen.queryByTestId('snapshot-card-auto-badge')).not.toBeInTheDocument();
  });

  it('shows Current badge when isCurrent is true', () => {
    render(<SnapshotCard snapshot={createSnapshot()} isCurrent={true} />);
    expect(screen.getByTestId('snapshot-card-current-badge')).toHaveTextContent('Current');
  });

  it('displays formatted date', () => {
    render(<SnapshotCard snapshot={createSnapshot()} />);
    expect(screen.getByTestId('snapshot-card-date')).toBeInTheDocument();
  });

  it('displays formatted size', () => {
    render(<SnapshotCard snapshot={createSnapshot()} />);
    expect(screen.getByTestId('snapshot-card-size')).toHaveTextContent('10 MB');
  });

  it('displays Unknown size when sizeBytes is null', () => {
    render(<SnapshotCard snapshot={createSnapshot({ sizeBytes: null })} />);
    expect(screen.getByTestId('snapshot-card-size')).toHaveTextContent('Unknown size');
  });

  describe('Actions', () => {
    it('shows Restore button when onRestore provided and not current', () => {
      const handleRestore = jest.fn();
      render(<SnapshotCard snapshot={createSnapshot()} onRestore={handleRestore} />);

      const restoreBtn = screen.getByTestId('snapshot-card-restore-btn');
      fireEvent.click(restoreBtn);
      expect(handleRestore).toHaveBeenCalled();
    });

    it('hides Restore button when isCurrent', () => {
      render(
        <SnapshotCard
          snapshot={createSnapshot()}
          onRestore={() => {}}
          isCurrent={true}
        />
      );
      expect(screen.queryByTestId('snapshot-card-restore-btn')).not.toBeInTheDocument();
    });

    it('shows Download button when onDownload provided', () => {
      const handleDownload = jest.fn();
      render(<SnapshotCard snapshot={createSnapshot()} onDownload={handleDownload} />);

      const downloadBtn = screen.getByTestId('snapshot-card-download-btn');
      fireEvent.click(downloadBtn);
      expect(handleDownload).toHaveBeenCalled();
    });

    it('shows Delete button when onDelete provided and not current', () => {
      const handleDelete = jest.fn();
      render(<SnapshotCard snapshot={createSnapshot()} onDelete={handleDelete} />);

      const deleteBtn = screen.getByTestId('snapshot-card-delete-btn');
      fireEvent.click(deleteBtn);
      expect(handleDelete).toHaveBeenCalled();
    });

    it('hides Delete button when isCurrent', () => {
      render(
        <SnapshotCard
          snapshot={createSnapshot()}
          onDelete={() => {}}
          isCurrent={true}
        />
      );
      expect(screen.queryByTestId('snapshot-card-delete-btn')).not.toBeInTheDocument();
    });

    it('disables buttons when loading', () => {
      render(
        <SnapshotCard
          snapshot={createSnapshot()}
          onRestore={() => {}}
          onDownload={() => {}}
          onDelete={() => {}}
          isLoading={true}
        />
      );

      expect(screen.getByTestId('snapshot-card-restore-btn')).toBeDisabled();
      expect(screen.getByTestId('snapshot-card-download-btn')).toBeDisabled();
      expect(screen.getByTestId('snapshot-card-delete-btn')).toBeDisabled();
    });
  });

  it('applies ring style when isCurrent', () => {
    render(<SnapshotCard snapshot={createSnapshot()} isCurrent={true} />);
    expect(screen.getByTestId('snapshot-card')).toHaveClass('ring-1');
  });

  it('applies custom className', () => {
    render(<SnapshotCard snapshot={createSnapshot()} className="custom-class" />);
    expect(screen.getByTestId('snapshot-card')).toHaveClass('custom-class');
  });

  it('uses custom testId', () => {
    render(<SnapshotCard snapshot={createSnapshot()} testId="custom-id" />);
    expect(screen.getByTestId('custom-id')).toBeInTheDocument();
  });
});
