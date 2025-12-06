
import { render, screen, fireEvent } from '@testing-library/react';
import { AssetCard } from './AssetCard';
import type { Asset, AssetType } from '@crit-fumble/core/types';

const createMockAsset = (overrides: Partial<Asset> = {}): Asset => ({
  id: 'asset-1',
  campaignId: 'campaign-1',
  name: 'Test Asset',
  type: 'image',
  mimeType: 'image/png',
  sizeBytes: BigInt(1024 * 500), // 500 KB
  storageKey: 'assets/test.png',
  uploaderId: 'user-1',
  createdAt: new Date(),
  ...overrides,
});

describe('AssetCard', () => {
  describe('rendering', () => {
    it('renders asset name', () => {
      render(<AssetCard asset={createMockAsset()} />);
      expect(screen.getByText('Test Asset')).toBeInTheDocument();
    });

    it('applies testId correctly', () => {
      render(<AssetCard asset={createMockAsset()} testId="custom-asset-card" />);
      expect(screen.getByTestId('custom-asset-card')).toBeInTheDocument();
    });

    it('applies default testId', () => {
      render(<AssetCard asset={createMockAsset()} />);
      expect(screen.getByTestId('asset-card')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<AssetCard asset={createMockAsset()} className="custom-class" />);
      expect(screen.getByTestId('asset-card')).toHaveClass('custom-class');
    });
  });

  describe('asset types', () => {
    const assetTypes: AssetType[] = ['image', 'audio', 'video', 'map', 'token'];

    assetTypes.forEach((type) => {
      it(`renders ${type} type badge`, () => {
        render(<AssetCard asset={createMockAsset({ type })} />);
        expect(screen.getByText(type)).toBeInTheDocument();
      });
    });
  });

  describe('file size', () => {
    it('formats bytes correctly', () => {
      render(<AssetCard asset={createMockAsset({ sizeBytes: BigInt(500) })} />);
      expect(screen.getByText('500 B')).toBeInTheDocument();
    });

    it('formats kilobytes correctly', () => {
      render(<AssetCard asset={createMockAsset({ sizeBytes: BigInt(1024 * 2) })} />);
      expect(screen.getByText('2.0 KB')).toBeInTheDocument();
    });

    it('formats megabytes correctly', () => {
      render(<AssetCard asset={createMockAsset({ sizeBytes: BigInt(1024 * 1024 * 2) })} />);
      expect(screen.getByText('2.0 MB')).toBeInTheDocument();
    });
  });

  describe('mime type', () => {
    it('displays mime type', () => {
      render(<AssetCard asset={createMockAsset({ mimeType: 'image/jpeg' })} />);
      expect(screen.getByText('image/jpeg')).toBeInTheDocument();
    });
  });

  describe('preview', () => {
    it('renders image preview for image type', () => {
      render(
        <AssetCard
          asset={createMockAsset({ type: 'image' })}
          assetUrl="https://example.com/image.png"
        />
      );
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('src', 'https://example.com/image.png');
    });

    it('renders image preview for map type', () => {
      render(
        <AssetCard
          asset={createMockAsset({ type: 'map' })}
          assetUrl="https://example.com/map.png"
        />
      );
      const img = screen.getByRole('img');
      expect(img).toBeInTheDocument();
    });

    it('renders image preview for token type', () => {
      render(
        <AssetCard
          asset={createMockAsset({ type: 'token' })}
          assetUrl="https://example.com/token.png"
        />
      );
      const img = screen.getByRole('img');
      expect(img).toBeInTheDocument();
    });

    it('renders icon for audio type', () => {
      render(<AssetCard asset={createMockAsset({ type: 'audio' })} />);
      expect(screen.queryByRole('img')).not.toBeInTheDocument();
    });

    it('renders icon for video type', () => {
      render(<AssetCard asset={createMockAsset({ type: 'video' })} />);
      expect(screen.queryByRole('img')).not.toBeInTheDocument();
    });
  });

  describe('selection', () => {
    it('applies selected styles when isSelected is true', () => {
      render(<AssetCard asset={createMockAsset()} isSelected={true} />);
      expect(screen.getByTestId('asset-card')).toHaveClass('ring-2', 'ring-discord-primary');
    });

    it('does not apply selected styles when isSelected is false', () => {
      render(<AssetCard asset={createMockAsset()} isSelected={false} />);
      expect(screen.getByTestId('asset-card')).not.toHaveClass('ring-2');
    });
  });

  describe('interactions', () => {
    it('calls onClick when clicked', () => {
      const handleClick = jest.fn();
      render(<AssetCard asset={createMockAsset()} onClick={handleClick} />);
      fireEvent.click(screen.getByTestId('asset-card'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('applies hover styles when onClick is provided', () => {
      const handleClick = jest.fn();
      render(<AssetCard asset={createMockAsset()} onClick={handleClick} />);
      expect(screen.getByTestId('asset-card')).toHaveClass('cursor-pointer');
    });

    it('does not apply hover styles when onClick is not provided', () => {
      render(<AssetCard asset={createMockAsset()} />);
      expect(screen.getByTestId('asset-card')).not.toHaveClass('cursor-pointer');
    });
  });

  describe('delete button', () => {
    it('renders delete button when onDelete is provided', () => {
      const handleDelete = jest.fn();
      render(<AssetCard asset={createMockAsset()} onDelete={handleDelete} />);
      expect(screen.getByRole('button', { name: 'Delete asset' })).toBeInTheDocument();
    });

    it('does not render delete button when onDelete is not provided', () => {
      render(<AssetCard asset={createMockAsset()} />);
      expect(screen.queryByRole('button', { name: 'Delete asset' })).not.toBeInTheDocument();
    });

    it('calls onDelete when delete button is clicked', () => {
      const handleDelete = jest.fn();
      render(<AssetCard asset={createMockAsset()} onDelete={handleDelete} />);
      fireEvent.click(screen.getByRole('button', { name: 'Delete asset' }));
      expect(handleDelete).toHaveBeenCalledTimes(1);
    });

    it('stops propagation when delete button is clicked', () => {
      const handleClick = jest.fn();
      const handleDelete = jest.fn();
      render(
        <AssetCard asset={createMockAsset()} onClick={handleClick} onDelete={handleDelete} />
      );
      fireEvent.click(screen.getByRole('button', { name: 'Delete asset' }));
      expect(handleDelete).toHaveBeenCalledTimes(1);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });
});
