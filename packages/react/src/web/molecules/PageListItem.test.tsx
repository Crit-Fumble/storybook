import { render, screen, fireEvent } from '@testing-library/react';
import { PageListItem } from './PageListItem';

describe('PageListItem', () => {
  const defaultProps = {
    title: 'Test Page',
    slug: 'test-page',
  };

  it('renders title', () => {
    render(<PageListItem {...defaultProps} />);
    expect(screen.getByText('Test Page')).toBeInTheDocument();
  });

  it('renders slug with leading slash', () => {
    render(<PageListItem {...defaultProps} />);
    expect(screen.getByText('/test-page')).toBeInTheDocument();
  });

  it('renders with testId', () => {
    render(<PageListItem {...defaultProps} testId="page-item" />);
    expect(screen.getByTestId('page-item')).toBeInTheDocument();
  });

  it('is a button element', () => {
    render(<PageListItem {...defaultProps} testId="page-item" />);
    expect(screen.getByTestId('page-item').tagName).toBe('BUTTON');
  });

  describe('selected state', () => {
    it('has default (not selected) styling', () => {
      render(<PageListItem {...defaultProps} testId="page-item" />);
      const item = screen.getByTestId('page-item');
      expect(item).toHaveClass('text-cfg-text-muted');
      expect(item).not.toHaveClass('bg-cfg-primary');
    });

    it('has selected styling when selected', () => {
      render(<PageListItem {...defaultProps} selected testId="page-item" />);
      const item = screen.getByTestId('page-item');
      expect(item).toHaveClass('bg-cfg-primary', 'text-white');
    });
  });

  describe('click handling', () => {
    it('calls onClick when clicked', () => {
      const onClick = jest.fn();
      render(<PageListItem {...defaultProps} onClick={onClick} testId="page-item" />);
      fireEvent.click(screen.getByTestId('page-item'));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('does not error when onClick is not provided', () => {
      render(<PageListItem {...defaultProps} testId="page-item" />);
      expect(() => {
        fireEvent.click(screen.getByTestId('page-item'));
      }).not.toThrow();
    });
  });

  it('has full width', () => {
    render(<PageListItem {...defaultProps} testId="page-item" />);
    expect(screen.getByTestId('page-item')).toHaveClass('w-full');
  });

  it('has text-left alignment', () => {
    render(<PageListItem {...defaultProps} testId="page-item" />);
    expect(screen.getByTestId('page-item')).toHaveClass('text-left');
  });

  it('truncates long titles', () => {
    render(<PageListItem title="Very Long Page Title That Should Be Truncated" slug="long" testId="page-item" />);
    const titleElement = screen.getByText('Very Long Page Title That Should Be Truncated');
    expect(titleElement).toHaveClass('truncate');
  });
});
