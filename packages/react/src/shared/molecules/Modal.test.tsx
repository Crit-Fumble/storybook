import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Modal, ModalFooter } from './Modal';

describe('Modal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    children: <div>Modal content</div>,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    document.body.style.overflow = '';
  });

  describe('rendering', () => {
    it('renders when isOpen is true', () => {
      render(<Modal {...defaultProps} testId="modal" />);
      expect(screen.getByTestId('modal')).toBeInTheDocument();
    });

    it('does not render when isOpen is false', () => {
      render(<Modal {...defaultProps} isOpen={false} testId="modal" />);
      expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    });

    it('renders children', () => {
      render(<Modal {...defaultProps} />);
      expect(screen.getByText('Modal content')).toBeInTheDocument();
    });

    it('renders title when provided', () => {
      render(<Modal {...defaultProps} title="Modal Title" testId="modal" />);
      expect(screen.getByTestId('modal-title')).toHaveTextContent('Modal Title');
    });

    it('does not render title when not provided', () => {
      render(<Modal {...defaultProps} testId="modal" />);
      expect(screen.queryByTestId('modal-title')).not.toBeInTheDocument();
    });

    it('renders backdrop', () => {
      render(<Modal {...defaultProps} testId="modal" />);
      expect(screen.getByTestId('modal-backdrop')).toBeInTheDocument();
    });
  });

  describe('sizes', () => {
    it('applies medium size by default', () => {
      render(<Modal {...defaultProps} testId="modal" />);
      expect(screen.getByTestId('modal-content')).toHaveClass('max-w-lg');
    });

    it('applies small size', () => {
      render(<Modal {...defaultProps} size="sm" testId="modal" />);
      expect(screen.getByTestId('modal-content')).toHaveClass('max-w-sm');
    });

    it('applies large size', () => {
      render(<Modal {...defaultProps} size="lg" testId="modal" />);
      expect(screen.getByTestId('modal-content')).toHaveClass('max-w-2xl');
    });
  });

  describe('closing behavior', () => {
    it('calls onClose when backdrop is clicked', () => {
      const onClose = vi.fn();
      render(<Modal {...defaultProps} onClose={onClose} testId="modal" />);
      fireEvent.click(screen.getByTestId('modal-backdrop'));
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('calls onClose when close button is clicked', () => {
      const onClose = vi.fn();
      render(<Modal {...defaultProps} onClose={onClose} title="Title" testId="modal" />);
      fireEvent.click(screen.getByTestId('modal-close'));
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('calls onClose when Escape key is pressed', () => {
      const onClose = vi.fn();
      render(<Modal {...defaultProps} onClose={onClose} testId="modal" />);
      fireEvent.keyDown(document, { key: 'Escape' });
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('does not call onClose for other key presses', () => {
      const onClose = vi.fn();
      render(<Modal {...defaultProps} onClose={onClose} testId="modal" />);
      fireEvent.keyDown(document, { key: 'Enter' });
      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe('body scroll lock', () => {
    it('locks body scroll when modal opens', () => {
      render(<Modal {...defaultProps} />);
      expect(document.body.style.overflow).toBe('hidden');
    });

    it('unlocks body scroll when modal closes', () => {
      const { rerender } = render(<Modal {...defaultProps} />);
      expect(document.body.style.overflow).toBe('hidden');

      rerender(<Modal {...defaultProps} isOpen={false} />);
      expect(document.body.style.overflow).toBe('');
    });

    it('unlocks body scroll on unmount', () => {
      const { unmount } = render(<Modal {...defaultProps} />);
      expect(document.body.style.overflow).toBe('hidden');

      unmount();
      expect(document.body.style.overflow).toBe('');
    });
  });

  describe('accessibility', () => {
    it('has role="dialog"', () => {
      render(<Modal {...defaultProps} testId="modal" />);
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('has aria-modal="true"', () => {
      render(<Modal {...defaultProps} testId="modal" />);
      expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
    });

    it('has aria-labelledby when title is provided', () => {
      render(<Modal {...defaultProps} title="Title" testId="modal" />);
      expect(screen.getByRole('dialog')).toHaveAttribute('aria-labelledby', 'modal-title');
    });
  });

  describe('custom props', () => {
    it('merges custom className', () => {
      render(<Modal {...defaultProps} className="custom-class" testId="modal" />);
      expect(screen.getByTestId('modal-content')).toHaveClass('custom-class');
    });
  });
});

describe('ModalFooter', () => {
  it('renders children correctly', () => {
    render(<ModalFooter>Footer content</ModalFooter>);
    expect(screen.getByText('Footer content')).toBeInTheDocument();
  });

  it('applies testId when provided', () => {
    render(<ModalFooter testId="modal-footer">Footer</ModalFooter>);
    expect(screen.getByTestId('modal-footer')).toBeInTheDocument();
  });

  it('applies styling classes', () => {
    render(<ModalFooter testId="footer">Footer</ModalFooter>);
    const footer = screen.getByTestId('footer');
    expect(footer).toHaveClass('flex', 'justify-end', 'gap-2', 'pt-4', 'border-t', 'border-cfg-border', 'mt-4');
  });

  it('merges custom className', () => {
    render(<ModalFooter testId="footer" className="custom">Footer</ModalFooter>);
    expect(screen.getByTestId('footer')).toHaveClass('custom');
  });
});
