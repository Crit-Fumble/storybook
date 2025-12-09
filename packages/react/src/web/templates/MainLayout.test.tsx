import { render, screen } from '@testing-library/react';
import { MainLayout } from './MainLayout';

describe('MainLayout', () => {
  it('renders children', () => {
    render(<MainLayout><p>Main content</p></MainLayout>);
    expect(screen.getByText('Main content')).toBeInTheDocument();
  });

  it('renders with default testId', () => {
    render(<MainLayout>Content</MainLayout>);
    expect(screen.getByTestId('main-layout')).toBeInTheDocument();
  });

  it('renders with custom testId', () => {
    render(<MainLayout testId="custom-main">Content</MainLayout>);
    expect(screen.getByTestId('custom-main')).toBeInTheDocument();
  });

  it('has full height background', () => {
    render(<MainLayout>Content</MainLayout>);
    const layout = screen.getByTestId('main-layout');
    expect(layout).toHaveClass('min-h-screen', 'bg-cfg-background-tertiary');
  });

  describe('header', () => {
    it('does not render header by default', () => {
      render(<MainLayout>Content</MainLayout>);
      expect(screen.queryByTestId('main-layout-header')).not.toBeInTheDocument();
    });

    it('renders header when provided', () => {
      render(<MainLayout header={<h1>Header Content</h1>}>Content</MainLayout>);
      expect(screen.getByTestId('main-layout-header')).toBeInTheDocument();
      expect(screen.getByText('Header Content')).toBeInTheDocument();
    });

    it('header has correct styling', () => {
      render(<MainLayout header={<h1>Header</h1>}>Content</MainLayout>);
      const header = screen.getByTestId('main-layout-header');
      expect(header).toHaveClass('py-4', 'px-4', 'border-b', 'border-cfg-border', 'bg-cfg-background-secondary');
    });
  });

  describe('main content area', () => {
    it('renders main element', () => {
      render(<MainLayout>Content</MainLayout>);
      expect(screen.getByTestId('main-layout-main')).toBeInTheDocument();
    });

    it('main has container class', () => {
      render(<MainLayout>Content</MainLayout>);
      const main = screen.getByTestId('main-layout-main');
      expect(main).toHaveClass('container', 'mx-auto');
    });

    it('main testId follows custom testId', () => {
      render(<MainLayout testId="custom">Content</MainLayout>);
      expect(screen.getByTestId('custom-main')).toBeInTheDocument();
    });
  });

  it('renders both header and content', () => {
    render(
      <MainLayout header={<nav>Navigation</nav>}>
        <article>Article content</article>
      </MainLayout>
    );
    expect(screen.getByText('Navigation')).toBeInTheDocument();
    expect(screen.getByText('Article content')).toBeInTheDocument();
  });
});
