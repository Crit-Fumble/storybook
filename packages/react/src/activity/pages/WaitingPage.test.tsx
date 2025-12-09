import { render, screen } from '@testing-library/react';
import { WaitingPage } from './WaitingPage';

describe('WaitingPage', () => {
  it('renders with default testId', () => {
    render(<WaitingPage />);
    expect(screen.getByTestId('waiting-page')).toBeInTheDocument();
  });

  it('renders with custom testId', () => {
    render(<WaitingPage testId="custom-waiting" />);
    expect(screen.getByTestId('custom-waiting')).toBeInTheDocument();
  });

  it('displays spinner', () => {
    render(<WaitingPage />);
    expect(screen.getByTestId('waiting-page-spinner')).toBeInTheDocument();
  });

  it('displays title', () => {
    render(<WaitingPage />);
    expect(screen.getByTestId('waiting-page-title')).toHaveTextContent('Waiting for Admin...');
  });

  it('displays message', () => {
    render(<WaitingPage />);
    expect(screen.getByTestId('waiting-page-message')).toHaveTextContent('An administrator needs to start a campaign session.');
  });

  it('has centered layout', () => {
    render(<WaitingPage />);
    const layout = screen.getByTestId('waiting-page');
    expect(layout).toHaveClass('flex', 'items-center', 'justify-center');
  });

  it('spinner has correct testId based on page testId', () => {
    render(<WaitingPage testId="my-waiting" />);
    expect(screen.getByTestId('my-waiting-spinner')).toBeInTheDocument();
  });

  it('title has correct testId based on page testId', () => {
    render(<WaitingPage testId="my-waiting" />);
    expect(screen.getByTestId('my-waiting-title')).toBeInTheDocument();
  });

  it('message has correct testId based on page testId', () => {
    render(<WaitingPage testId="my-waiting" />);
    expect(screen.getByTestId('my-waiting-message')).toBeInTheDocument();
  });
});
