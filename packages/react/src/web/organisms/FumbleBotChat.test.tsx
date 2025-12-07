import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { FumbleBotChat } from './FumbleBotChat';

describe('FumbleBotChat', () => {
  const mockUser = {
    name: 'Test User',
    image: '/avatar.png',
  };

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('does not render when user is null', () => {
    const { container } = render(<FumbleBotChat user={null} testId="fumblebot-chat" />);
    expect(container.firstChild).toBeNull();
  });

  it('renders toggle button when user is logged in', () => {
    render(<FumbleBotChat user={mockUser} testId="fumblebot-chat" />);

    const toggleButton = screen.getByTestId('fumblebot-chat-toggle');
    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton).toHaveAttribute('aria-label', 'Open chat');
  });

  it('toggles chat window when button is clicked', () => {
    render(<FumbleBotChat user={mockUser} testId="fumblebot-chat" />);

    const toggleButton = screen.getByTestId('fumblebot-chat-toggle');

    // Initially closed
    expect(screen.queryByTestId('fumblebot-chat')).not.toBeInTheDocument();

    // Open chat
    fireEvent.click(toggleButton);
    expect(screen.getByTestId('fumblebot-chat')).toBeInTheDocument();
    expect(toggleButton).toHaveAttribute('aria-label', 'Close chat');

    // Close chat
    fireEvent.click(toggleButton);
    expect(screen.queryByTestId('fumblebot-chat')).not.toBeInTheDocument();
  });

  it('shows welcome message when chat is empty', () => {
    render(<FumbleBotChat user={mockUser} testId="fumblebot-chat" />);

    const toggleButton = screen.getByTestId('fumblebot-chat-toggle');
    fireEvent.click(toggleButton);

    expect(screen.getByText(/Hey there, Test User!/)).toBeInTheDocument();
    expect(screen.getByText(/Ask me anything about TTRPGs/)).toBeInTheDocument();
  });

  it('displays FumbleBot branding in header', () => {
    render(<FumbleBotChat user={mockUser} testId="fumblebot-chat" />);

    const toggleButton = screen.getByTestId('fumblebot-chat-toggle');
    fireEvent.click(toggleButton);

    expect(screen.getByText('FumbleBot')).toBeInTheDocument();
    expect(screen.getByText('Your TTRPG Assistant')).toBeInTheDocument();
  });

  it('sends message and displays response', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ response: 'Hello! How can I help you?' }),
    });

    render(<FumbleBotChat user={mockUser} testId="fumblebot-chat" />);

    const toggleButton = screen.getByTestId('fumblebot-chat-toggle');
    fireEvent.click(toggleButton);

    const input = screen.getByTestId('fumblebot-chat-input');
    const sendButton = screen.getByTestId('fumblebot-chat-send-btn');

    // Type and send message
    fireEvent.change(input, { target: { value: 'Hello FumbleBot!' } });
    fireEvent.click(sendButton);

    // User message should appear
    await waitFor(() => {
      expect(screen.getByText('Hello FumbleBot!')).toBeInTheDocument();
    });

    // Bot response should appear
    await waitFor(() => {
      expect(screen.getByText('Hello! How can I help you?')).toBeInTheDocument();
    });

    // Input should be cleared
    expect(input).toHaveValue('');
  });

  it('uses custom API endpoint when provided', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ response: 'Test response' }),
    });

    render(<FumbleBotChat user={mockUser} apiEndpoint="/custom/api" testId="fumblebot-chat" />);

    const toggleButton = screen.getByTestId('fumblebot-chat-toggle');
    fireEvent.click(toggleButton);

    const input = screen.getByTestId('fumblebot-chat-input');
    const sendButton = screen.getByTestId('fumblebot-chat-send-btn');

    fireEvent.change(input, { target: { value: 'Test' } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        '/custom/api',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        })
      );
    });
  });

  it('shows loading indicator while waiting for response', async () => {
    (global.fetch as jest.Mock).mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve({
        ok: true,
        json: async () => ({ response: 'Delayed response' }),
      }), 100))
    );

    render(<FumbleBotChat user={mockUser} testId="fumblebot-chat" />);

    const toggleButton = screen.getByTestId('fumblebot-chat-toggle');
    fireEvent.click(toggleButton);

    const input = screen.getByTestId('fumblebot-chat-input');
    const sendButton = screen.getByTestId('fumblebot-chat-send-btn');

    fireEvent.change(input, { target: { value: 'Test' } });
    fireEvent.click(sendButton);

    // Loading indicator should appear
    const messagesContainer = screen.getByTestId('fumblebot-chat-messages');
    await waitFor(() => {
      expect(messagesContainer).toBeInTheDocument();
    });

    // Input should be disabled during loading
    expect(input).toBeDisabled();
    expect(sendButton).toBeDisabled();

    // Wait for response
    await waitFor(() => {
      expect(screen.getByText('Delayed response')).toBeInTheDocument();
    });
  });

  it('displays error message when API fails', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    render(<FumbleBotChat user={mockUser} testId="fumblebot-chat" />);

    const toggleButton = screen.getByTestId('fumblebot-chat-toggle');
    fireEvent.click(toggleButton);

    const input = screen.getByTestId('fumblebot-chat-input');
    const sendButton = screen.getByTestId('fumblebot-chat-send-btn');

    fireEvent.change(input, { target: { value: 'Test' } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(screen.getByText(/Sorry, I encountered an error/)).toBeInTheDocument();
    });
  });

  it('does not send empty messages', () => {
    render(<FumbleBotChat user={mockUser} testId="fumblebot-chat" />);

    const toggleButton = screen.getByTestId('fumblebot-chat-toggle');
    fireEvent.click(toggleButton);

    const sendButton = screen.getByTestId('fumblebot-chat-send-btn');

    // Button should be disabled when input is empty
    expect(sendButton).toBeDisabled();
  });

  it('does not send whitespace-only messages', () => {
    render(<FumbleBotChat user={mockUser} testId="fumblebot-chat" />);

    const toggleButton = screen.getByTestId('fumblebot-chat-toggle');
    fireEvent.click(toggleButton);

    const input = screen.getByTestId('fumblebot-chat-input');
    const sendButton = screen.getByTestId('fumblebot-chat-send-btn');

    fireEvent.change(input, { target: { value: '   ' } });

    // Button should be disabled for whitespace-only input
    expect(sendButton).toBeDisabled();
  });

  it('prevents sending messages while loading', async () => {
    (global.fetch as jest.Mock).mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve({
        ok: true,
        json: async () => ({ response: 'Response' }),
      }), 100))
    );

    render(<FumbleBotChat user={mockUser} testId="fumblebot-chat" />);

    const toggleButton = screen.getByTestId('fumblebot-chat-toggle');
    fireEvent.click(toggleButton);

    const input = screen.getByTestId('fumblebot-chat-input');
    const sendButton = screen.getByTestId('fumblebot-chat-send-btn');

    fireEvent.change(input, { target: { value: 'First message' } });
    fireEvent.click(sendButton);

    // Try to send another message while loading
    fireEvent.change(input, { target: { value: 'Second message' } });
    fireEvent.click(sendButton);

    // Only one fetch call should have been made
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });
  });
});
