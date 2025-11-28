import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge', () => {
  describe('rendering', () => {
    it('renders children correctly', () => {
      render(<Badge>New</Badge>);
      expect(screen.getByText('New')).toBeInTheDocument();
    });

    it('applies testId when provided', () => {
      render(<Badge testId="my-badge">Test</Badge>);
      expect(screen.getByTestId('my-badge')).toBeInTheDocument();
    });

    it('renders as a span element', () => {
      render(<Badge testId="badge">Content</Badge>);
      expect(screen.getByTestId('badge').tagName).toBe('SPAN');
    });
  });

  describe('variants', () => {
    it('applies default variant classes by default', () => {
      render(<Badge testId="badge">Default</Badge>);
      const badge = screen.getByTestId('badge');
      expect(badge).toHaveClass('bg-cfg-border', 'text-cfg-text-normal');
    });

    it('applies primary variant classes', () => {
      render(<Badge testId="badge" variant="primary">Primary</Badge>);
      const badge = screen.getByTestId('badge');
      expect(badge).toHaveClass('bg-cfg-primary', 'text-white');
    });

    it('applies success variant classes', () => {
      render(<Badge testId="badge" variant="success">Success</Badge>);
      const badge = screen.getByTestId('badge');
      expect(badge).toHaveClass('bg-cfg-green', 'text-white');
    });

    it('applies danger variant classes', () => {
      render(<Badge testId="badge" variant="danger">Danger</Badge>);
      const badge = screen.getByTestId('badge');
      expect(badge).toHaveClass('bg-cfg-red', 'text-white');
    });

    it('applies warning variant classes', () => {
      render(<Badge testId="badge" variant="warning">Warning</Badge>);
      const badge = screen.getByTestId('badge');
      expect(badge).toHaveClass('bg-cfg-yellow', 'text-black');
    });
  });

  describe('styling', () => {
    it('applies base styling classes', () => {
      render(<Badge testId="badge">Test</Badge>);
      const badge = screen.getByTestId('badge');
      expect(badge).toHaveClass(
        'inline-flex',
        'items-center',
        'px-2',
        'py-0.5',
        'rounded',
        'text-xs',
        'font-medium'
      );
    });

    it('merges custom className', () => {
      render(<Badge testId="badge" className="custom-class">Custom</Badge>);
      expect(screen.getByTestId('badge')).toHaveClass('custom-class');
    });
  });

  describe('content types', () => {
    it('renders text content', () => {
      render(<Badge>Text</Badge>);
      expect(screen.getByText('Text')).toBeInTheDocument();
    });

    it('renders numeric content', () => {
      render(<Badge>42</Badge>);
      expect(screen.getByText('42')).toBeInTheDocument();
    });

    it('renders complex children', () => {
      render(
        <Badge testId="badge">
          <span>Icon</span> Label
        </Badge>
      );
      expect(screen.getByTestId('badge')).toHaveTextContent('Icon Label');
    });
  });
});
