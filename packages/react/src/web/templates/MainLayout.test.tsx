
import { render, screen } from '@testing-library/react';
import { MainLayout } from './MainLayout';

describe('MainLayout', () => {
  it('renders children', () => {
    render(
      <MainLayout>
        <div>Test Content</div>
      </MainLayout>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders header when provided', () => {
    render(
      <MainLayout header={<div>Test Header</div>}>
        <div>Content</div>
      </MainLayout>
    );

    expect(screen.getByText('Test Header')).toBeInTheDocument();
    expect(screen.getByTestId('main-layout-header')).toBeInTheDocument();
  });

  it('does not render header when not provided', () => {
    render(
      <MainLayout>
        <div>Content</div>
      </MainLayout>
    );

    expect(screen.queryByTestId('main-layout-header')).not.toBeInTheDocument();
  });

  it('renders main content area', () => {
    render(
      <MainLayout>
        <div>Main Content</div>
      </MainLayout>
    );

    expect(screen.getByTestId('main-layout-main')).toBeInTheDocument();
    expect(screen.getByText('Main Content')).toBeInTheDocument();
  });

  it('accepts custom testId', () => {
    render(
      <MainLayout testId="custom-layout">
        <div>Content</div>
      </MainLayout>
    );

    expect(screen.getByTestId('custom-layout')).toBeInTheDocument();
  });
});
