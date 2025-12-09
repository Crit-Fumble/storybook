
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { WebLoginPage } from './WebLoginPage';

describe('WebLoginPage', () => {
  it('renders login page content', () => {
    const onLogin = jest.fn();
    render(<WebLoginPage onLogin={onLogin} />);

    expect(screen.getByTestId('web-login-page')).toBeInTheDocument();
    expect(screen.getByTestId('web-login-page-card')).toBeInTheDocument();
    expect(screen.getByTestId('web-login-page-title')).toHaveTextContent('Welcome to CFGOS');
    expect(screen.getByTestId('web-login-page-description')).toHaveTextContent(
      'Sign in with your Discord account to manage campaigns, characters, and settings.'
    );
    expect(screen.getByTestId('web-login-page-note')).toHaveTextContent(
      "You'll be redirected to Discord to authorize access."
    );
  });

  it('renders login button', () => {
    const onLogin = jest.fn();
    render(<WebLoginPage onLogin={onLogin} />);

    const loginButton = screen.getByTestId('web-login-page-login-btn');
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toHaveTextContent('Login with Discord');
  });

  it('calls onLogin when login button is clicked', async () => {
    const user = userEvent.setup();
    const onLogin = jest.fn();
    render(<WebLoginPage onLogin={onLogin} />);

    const loginButton = screen.getByTestId('web-login-page-login-btn');
    await user.click(loginButton);

    expect(onLogin).toHaveBeenCalledTimes(1);
  });

  it('accepts custom testId', () => {
    const onLogin = jest.fn();
    render(<WebLoginPage onLogin={onLogin} testId="custom-login" />);

    expect(screen.getByTestId('custom-login')).toBeInTheDocument();
    expect(screen.getByTestId('custom-login-card')).toBeInTheDocument();
  });
});
