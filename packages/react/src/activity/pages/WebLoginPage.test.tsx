import { render, screen, fireEvent } from '@testing-library/react';
import { WebLoginPage } from './WebLoginPage';

describe('WebLoginPage', () => {
  const mockOnLogin = jest.fn();

  beforeEach(() => {
    mockOnLogin.mockClear();
  });

  it('renders with default testId', () => {
    render(<WebLoginPage onLogin={mockOnLogin} />);
    expect(screen.getByTestId('web-login-page')).toBeInTheDocument();
  });

  it('renders with custom testId', () => {
    render(<WebLoginPage onLogin={mockOnLogin} testId="custom-login" />);
    expect(screen.getByTestId('custom-login')).toBeInTheDocument();
  });

  it('displays title', () => {
    render(<WebLoginPage onLogin={mockOnLogin} />);
    expect(screen.getByTestId('web-login-page-title')).toHaveTextContent('Welcome to CFGOS');
  });

  it('displays description', () => {
    render(<WebLoginPage onLogin={mockOnLogin} />);
    expect(screen.getByTestId('web-login-page-description')).toHaveTextContent(
      'Sign in with your Discord account to manage campaigns, characters, and settings.'
    );
  });

  it('displays login button', () => {
    render(<WebLoginPage onLogin={mockOnLogin} />);
    expect(screen.getByTestId('web-login-page-login-btn')).toBeInTheDocument();
    expect(screen.getByText('Login with Discord')).toBeInTheDocument();
  });

  it('calls onLogin when login button is clicked', () => {
    render(<WebLoginPage onLogin={mockOnLogin} />);
    fireEvent.click(screen.getByTestId('web-login-page-login-btn'));
    expect(mockOnLogin).toHaveBeenCalledTimes(1);
  });

  it('displays redirect note', () => {
    render(<WebLoginPage onLogin={mockOnLogin} />);
    expect(screen.getByTestId('web-login-page-note')).toHaveTextContent(
      "You'll be redirected to Discord to authorize access."
    );
  });

  it('displays card container', () => {
    render(<WebLoginPage onLogin={mockOnLogin} />);
    expect(screen.getByTestId('web-login-page-card')).toBeInTheDocument();
  });

  it('has centered layout', () => {
    render(<WebLoginPage onLogin={mockOnLogin} />);
    const layout = screen.getByTestId('web-login-page');
    expect(layout).toHaveClass('flex', 'items-center', 'justify-center');
  });

  it('login button has Discord icon', () => {
    render(<WebLoginPage onLogin={mockOnLogin} />);
    const button = screen.getByTestId('web-login-page-login-btn');
    const svg = button.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
});
