
import { render, screen } from '@testing-library/react';
import { CenteredLayout } from './CenteredLayout';

describe('CenteredLayout', () => {
  it('renders children', () => {
    render(
      <CenteredLayout>
        <div>Test Content</div>
      </CenteredLayout>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies centered layout classes', () => {
    render(
      <CenteredLayout>
        <div>Content</div>
      </CenteredLayout>
    );

    const layout = screen.getByTestId('centered-layout');
    expect(layout).toHaveClass('min-h-screen');
    expect(layout).toHaveClass('flex');
    expect(layout).toHaveClass('items-center');
    expect(layout).toHaveClass('justify-center');
  });

  it('accepts custom testId', () => {
    render(
      <CenteredLayout testId="custom-layout">
        <div>Content</div>
      </CenteredLayout>
    );

    expect(screen.getByTestId('custom-layout')).toBeInTheDocument();
  });
});
