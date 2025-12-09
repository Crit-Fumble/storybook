
import { render, screen } from '@testing-library/react';
import { WaitingPage } from './WaitingPage';

describe('WaitingPage', () => {
  it('renders waiting message', () => {
    render(<WaitingPage />);

    expect(screen.getByTestId('waiting-page')).toBeInTheDocument();
    expect(screen.getByTestId('waiting-page-spinner')).toBeInTheDocument();
    expect(screen.getByTestId('waiting-page-title')).toHaveTextContent('Waiting for Admin...');
    expect(screen.getByTestId('waiting-page-message')).toHaveTextContent(
      'An administrator needs to start a campaign session.'
    );
  });

  it('accepts custom testId', () => {
    render(<WaitingPage testId="custom-waiting" />);

    expect(screen.getByTestId('custom-waiting')).toBeInTheDocument();
    expect(screen.getByTestId('custom-waiting-spinner')).toBeInTheDocument();
  });
});
