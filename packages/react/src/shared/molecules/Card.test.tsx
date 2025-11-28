import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './Card';

describe('Card', () => {
  describe('rendering', () => {
    it('renders children correctly', () => {
      render(<Card>Card content</Card>);
      expect(screen.getByText('Card content')).toBeInTheDocument();
    });

    it('applies testId when provided', () => {
      render(<Card testId="my-card">Content</Card>);
      expect(screen.getByTestId('my-card')).toBeInTheDocument();
    });

    it('applies base card class', () => {
      render(<Card testId="card">Content</Card>);
      expect(screen.getByTestId('card')).toHaveClass('card');
    });
  });

  describe('variants', () => {
    it('applies default variant (no extra classes)', () => {
      render(<Card testId="card">Default</Card>);
      const card = screen.getByTestId('card');
      expect(card).not.toHaveClass('shadow-lg');
      expect(card).not.toHaveClass('cursor-pointer');
    });

    it('applies elevated variant classes', () => {
      render(<Card testId="card" variant="elevated">Elevated</Card>);
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('shadow-lg', 'bg-cfg-background-floating');
    });

    it('applies interactive variant classes', () => {
      render(<Card testId="card" variant="interactive">Interactive</Card>);
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('cursor-pointer', 'hover:border-cfg-primary', 'transition-colors');
    });
  });

  describe('custom props', () => {
    it('merges custom className', () => {
      render(<Card testId="card" className="custom-class">Custom</Card>);
      expect(screen.getByTestId('card')).toHaveClass('custom-class', 'card');
    });

    it('handles onClick for interactive cards', () => {
      const handleClick = vi.fn();
      render(<Card testId="card" variant="interactive" onClick={handleClick}>Click me</Card>);
      fireEvent.click(screen.getByTestId('card'));
      expect(handleClick).toHaveBeenCalled();
    });
  });
});

describe('CardHeader', () => {
  it('renders children correctly', () => {
    render(<CardHeader>Header content</CardHeader>);
    expect(screen.getByText('Header content')).toBeInTheDocument();
  });

  it('applies testId when provided', () => {
    render(<CardHeader testId="card-header">Header</CardHeader>);
    expect(screen.getByTestId('card-header')).toBeInTheDocument();
  });

  it('applies border styling', () => {
    render(<CardHeader testId="header">Header</CardHeader>);
    expect(screen.getByTestId('header')).toHaveClass('pb-3', 'border-b', 'border-cfg-border', 'mb-3');
  });

  it('merges custom className', () => {
    render(<CardHeader testId="header" className="custom">Header</CardHeader>);
    expect(screen.getByTestId('header')).toHaveClass('custom');
  });
});

describe('CardTitle', () => {
  it('renders children correctly', () => {
    render(<CardTitle>Title</CardTitle>);
    expect(screen.getByText('Title')).toBeInTheDocument();
  });

  it('renders as h3 element', () => {
    render(<CardTitle testId="title">Title</CardTitle>);
    expect(screen.getByTestId('title').tagName).toBe('H3');
  });

  it('applies testId when provided', () => {
    render(<CardTitle testId="card-title">Title</CardTitle>);
    expect(screen.getByTestId('card-title')).toBeInTheDocument();
  });

  it('applies styling classes', () => {
    render(<CardTitle testId="title">Title</CardTitle>);
    expect(screen.getByTestId('title')).toHaveClass('text-lg', 'font-semibold', 'text-cfg-text-normal');
  });

  it('merges custom className', () => {
    render(<CardTitle testId="title" className="custom">Title</CardTitle>);
    expect(screen.getByTestId('title')).toHaveClass('custom');
  });
});

describe('CardContent', () => {
  it('renders children correctly', () => {
    render(<CardContent>Content goes here</CardContent>);
    expect(screen.getByText('Content goes here')).toBeInTheDocument();
  });

  it('applies testId when provided', () => {
    render(<CardContent testId="card-content">Content</CardContent>);
    expect(screen.getByTestId('card-content')).toBeInTheDocument();
  });

  it('applies text styling', () => {
    render(<CardContent testId="content">Content</CardContent>);
    expect(screen.getByTestId('content')).toHaveClass('text-cfg-text-normal');
  });

  it('merges custom className', () => {
    render(<CardContent testId="content" className="custom">Content</CardContent>);
    expect(screen.getByTestId('content')).toHaveClass('custom');
  });
});

describe('CardFooter', () => {
  it('renders children correctly', () => {
    render(<CardFooter>Footer content</CardFooter>);
    expect(screen.getByText('Footer content')).toBeInTheDocument();
  });

  it('applies testId when provided', () => {
    render(<CardFooter testId="card-footer">Footer</CardFooter>);
    expect(screen.getByTestId('card-footer')).toBeInTheDocument();
  });

  it('applies styling classes', () => {
    render(<CardFooter testId="footer">Footer</CardFooter>);
    const footer = screen.getByTestId('footer');
    expect(footer).toHaveClass('pt-3', 'border-t', 'border-cfg-border', 'mt-3', 'flex', 'items-center', 'justify-between');
  });

  it('merges custom className', () => {
    render(<CardFooter testId="footer" className="custom">Footer</CardFooter>);
    expect(screen.getByTestId('footer')).toHaveClass('custom');
  });
});

describe('Card composition', () => {
  it('renders a complete card with all sub-components', () => {
    render(
      <Card testId="card">
        <CardHeader testId="header">
          <CardTitle testId="title">Card Title</CardTitle>
        </CardHeader>
        <CardContent testId="content">
          This is the card content.
        </CardContent>
        <CardFooter testId="footer">
          <span>Footer text</span>
        </CardFooter>
      </Card>
    );

    expect(screen.getByTestId('card')).toBeInTheDocument();
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('title')).toHaveTextContent('Card Title');
    expect(screen.getByTestId('content')).toHaveTextContent('This is the card content.');
    expect(screen.getByTestId('footer')).toHaveTextContent('Footer text');
  });
});
