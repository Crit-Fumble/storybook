import { render, screen } from '@testing-library/react';
import { CenteredLayout } from './CenteredLayout';

describe('CenteredLayout', () => {
  it('renders children', () => {
    render(<CenteredLayout><p>Test content</p></CenteredLayout>);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('renders with default testId', () => {
    render(<CenteredLayout>Content</CenteredLayout>);
    expect(screen.getByTestId('centered-layout')).toBeInTheDocument();
  });

  it('renders with custom testId', () => {
    render(<CenteredLayout testId="custom-layout">Content</CenteredLayout>);
    expect(screen.getByTestId('custom-layout')).toBeInTheDocument();
  });

  it('has flexbox centering classes', () => {
    render(<CenteredLayout>Content</CenteredLayout>);
    const layout = screen.getByTestId('centered-layout');
    expect(layout).toHaveClass('flex', 'items-center', 'justify-center');
  });

  it('has full height', () => {
    render(<CenteredLayout>Content</CenteredLayout>);
    const layout = screen.getByTestId('centered-layout');
    expect(layout).toHaveClass('min-h-screen');
  });

  it('has background color', () => {
    render(<CenteredLayout>Content</CenteredLayout>);
    const layout = screen.getByTestId('centered-layout');
    expect(layout).toHaveClass('bg-cfg-background-tertiary');
  });

  it('has padding', () => {
    render(<CenteredLayout>Content</CenteredLayout>);
    const layout = screen.getByTestId('centered-layout');
    expect(layout).toHaveClass('p-4');
  });

  it('renders multiple children', () => {
    render(
      <CenteredLayout>
        <h1>Title</h1>
        <p>Description</p>
      </CenteredLayout>
    );
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
  });
});
