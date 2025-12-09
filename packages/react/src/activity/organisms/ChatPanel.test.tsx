
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChatPanel } from './ChatPanel';

global.fetch = jest.fn();
global.crypto = { randomUUID: () => 'test-uuid' } as any;

describe('ChatPanel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('does not render when closed', () => {
    render(
      <ChatPanel
        isOpen={false}
        onClose={jest.fn()}
        userId="user-1"
        username="TestUser"
      />
    );

    expect(screen.queryByTestId('chat-panel')).not.toBeInTheDocument();
  });

  it('renders when open', () => {
    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => ({ messages: [] }),
    });

    render(
      <ChatPanel
        isOpen={true}
        onClose={jest.fn()}
        userId="user-1"
        username="TestUser"
      />
    );

    expect(screen.getByTestId('chat-panel')).toBeInTheDocument();
    expect(screen.getByText('Chat with FumbleBot')).toBeInTheDocument();
  });

  it('loads chat history when opened', async () => {
    const mockMessages = {
      messages: [
        {
          id: 'msg-1',
          role: 'user',
          content: 'Hello',
          timestamp: new Date().toISOString(),
        },
        {
          id: 'msg-2',
          role: 'assistant',
          content: 'Hi there!',
          timestamp: new Date().toISOString(),
        },
      ],
    };

    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => mockMessages,
    });

    render(
      <ChatPanel
        isOpen={true}
        onClose={jest.fn()}
        userId="user-1"
        username="TestUser"
      />
    );

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        '/.proxy/api/chat/history?userId=user-1'
      );
    });

    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('Hi there!')).toBeInTheDocument();
  });

  it('displays empty state when no messages', async () => {
    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => ({ messages: [] }),
    });

    render(
      <ChatPanel
        isOpen={true}
        onClose={jest.fn()}
        userId="user-1"
        username="TestUser"
      />
    );

    await waitFor(() => {
      expect(screen.getByText('Start a conversation with FumbleBot!')).toBeInTheDocument();
    });
  });

  it('sends message when send button clicked', async () => {
    const user = userEvent.setup();
    (global.fetch as any).mockImplementation((url: string, options: any) => {
      if (url.includes('/history')) {
        return Promise.resolve({
          ok: true,
          json: async () => ({ messages: [] }),
        });
      }
      if (options?.method === 'POST') {
        return Promise.resolve({
          ok: true,
          json: async () => ({ response: 'Bot response' }),
        });
      }
      return Promise.resolve({ ok: false });
    });

    render(
      <ChatPanel
        isOpen={true}
        onClose={jest.fn()}
        userId="user-1"
        username="TestUser"
      />
    );

    await waitFor(() => {
      expect(screen.getByTestId('chat-panel-input')).toBeInTheDocument();
    });

    const input = screen.getByTestId('chat-panel-input');
    await user.type(input, 'Test message');

    const sendButton = screen.getByTestId('chat-panel-send-btn');
    await user.click(sendButton);

    await waitFor(() => {
      expect(screen.getByText('Test message')).toBeInTheDocument();
      expect(screen.getByText('Bot response')).toBeInTheDocument();
    });
  });

  it('sends message when Enter key pressed', async () => {
    const user = userEvent.setup();
    (global.fetch as any).mockImplementation((url: string, options: any) => {
      if (url.includes('/history')) {
        return Promise.resolve({
          ok: true,
          json: async () => ({ messages: [] }),
        });
      }
      if (options?.method === 'POST') {
        return Promise.resolve({
          ok: true,
          json: async () => ({ response: 'Bot response' }),
        });
      }
      return Promise.resolve({ ok: false });
    });

    render(
      <ChatPanel
        isOpen={true}
        onClose={jest.fn()}
        userId="user-1"
        username="TestUser"
      />
    );

    await waitFor(() => {
      expect(screen.getByTestId('chat-panel-input')).toBeInTheDocument();
    });

    const input = screen.getByTestId('chat-panel-input');
    await user.type(input, 'Test message{Enter}');

    await waitFor(() => {
      expect(screen.getByText('Test message')).toBeInTheDocument();
    });
  });

  it('does not send empty messages', async () => {
    const user = userEvent.setup();
    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => ({ messages: [] }),
    });

    render(
      <ChatPanel
        isOpen={true}
        onClose={jest.fn()}
        userId="user-1"
        username="TestUser"
      />
    );

    await waitFor(() => {
      expect(screen.getByTestId('chat-panel-send-btn')).toBeInTheDocument();
    });

    const sendButton = screen.getByTestId('chat-panel-send-btn');
    expect(sendButton).toBeDisabled();

    const input = screen.getByTestId('chat-panel-input');
    await user.type(input, '   ');

    expect(sendButton).toBeDisabled();
  });

  it('handles API error responses', async () => {
    const user = userEvent.setup();
    (global.fetch as any).mockImplementation((url: string, options: any) => {
      if (url.includes('/history')) {
        return Promise.resolve({
          ok: true,
          json: async () => ({ messages: [] }),
        });
      }
      if (options?.method === 'POST') {
        return Promise.resolve({ ok: false });
      }
      return Promise.resolve({ ok: false });
    });

    render(
      <ChatPanel
        isOpen={true}
        onClose={jest.fn()}
        userId="user-1"
        username="TestUser"
      />
    );

    await waitFor(() => {
      expect(screen.getByTestId('chat-panel-input')).toBeInTheDocument();
    });

    const input = screen.getByTestId('chat-panel-input');
    await user.type(input, 'Test message');

    const sendButton = screen.getByTestId('chat-panel-send-btn');
    await user.click(sendButton);

    await waitFor(() => {
      expect(screen.getByText('Sorry, there was an error processing your message.')).toBeInTheDocument();
    });
  });

  it('handles network errors', async () => {
    const user = userEvent.setup();
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

    (global.fetch as any).mockImplementation((url: string, options: any) => {
      if (url.includes('/history')) {
        return Promise.resolve({
          ok: true,
          json: async () => ({ messages: [] }),
        });
      }
      if (options?.method === 'POST') {
        return Promise.reject(new Error('Network error'));
      }
      return Promise.resolve({ ok: false });
    });

    render(
      <ChatPanel
        isOpen={true}
        onClose={jest.fn()}
        userId="user-1"
        username="TestUser"
      />
    );

    await waitFor(() => {
      expect(screen.getByTestId('chat-panel-input')).toBeInTheDocument();
    });

    const input = screen.getByTestId('chat-panel-input');
    await user.type(input, 'Test message');

    const sendButton = screen.getByTestId('chat-panel-send-btn');
    await user.click(sendButton);

    await waitFor(() => {
      expect(screen.getByText('Failed to connect to chat server.')).toBeInTheDocument();
    });

    consoleError.mockRestore();
  });

  it('disables input while loading', async () => {
    const user = userEvent.setup();
    let resolvePromise: any;
    const promise = new Promise((resolve) => {
      resolvePromise = resolve;
    });

    (global.fetch as any).mockImplementation((url: string, options: any) => {
      if (url.includes('/history')) {
        return Promise.resolve({
          ok: true,
          json: async () => ({ messages: [] }),
        });
      }
      if (options?.method === 'POST') {
        return promise;
      }
      return Promise.resolve({ ok: false });
    });

    render(
      <ChatPanel
        isOpen={true}
        onClose={jest.fn()}
        userId="user-1"
        username="TestUser"
      />
    );

    await waitFor(() => {
      expect(screen.getByTestId('chat-panel-input')).toBeInTheDocument();
    });

    const input = screen.getByTestId('chat-panel-input');
    await user.type(input, 'Test message');

    const sendButton = screen.getByTestId('chat-panel-send-btn');
    await user.click(sendButton);

    await waitFor(() => {
      expect(input).toBeDisabled();
    });

    resolvePromise({ ok: true, json: async () => ({ response: 'Done' }) });
  });

  it('shows typing indicator while loading', async () => {
    const user = userEvent.setup();
    let resolvePromise: any;
    const promise = new Promise((resolve) => {
      resolvePromise = resolve;
    });

    (global.fetch as any).mockImplementation((url: string, options: any) => {
      if (url.includes('/history')) {
        return Promise.resolve({
          ok: true,
          json: async () => ({ messages: [] }),
        });
      }
      if (options?.method === 'POST') {
        return promise;
      }
      return Promise.resolve({ ok: false });
    });

    render(
      <ChatPanel
        isOpen={true}
        onClose={jest.fn()}
        userId="user-1"
        username="TestUser"
      />
    );

    await waitFor(() => {
      expect(screen.getByTestId('chat-panel-input')).toBeInTheDocument();
    });

    const input = screen.getByTestId('chat-panel-input');
    await user.type(input, 'Test message');

    const sendButton = screen.getByTestId('chat-panel-send-btn');
    await user.click(sendButton);

    await waitFor(() => {
      expect(screen.getByTestId('chat-panel-typing')).toBeInTheDocument();
    });

    resolvePromise({ ok: true, json: async () => ({ response: 'Done' }) });
  });

  it('handles fetch history errors', async () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    (global.fetch as any).mockRejectedValue(new Error('Network error'));

    render(
      <ChatPanel
        isOpen={true}
        onClose={jest.fn()}
        userId="user-1"
        username="TestUser"
      />
    );

    await waitFor(() => {
      expect(consoleError).toHaveBeenCalledWith(
        'Failed to load chat history:',
        expect.any(Error)
      );
    });

    consoleError.mockRestore();
  });

  it('calls onClose when close button clicked', async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();

    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => ({ messages: [] }),
    });

    render(
      <ChatPanel
        isOpen={true}
        onClose={onClose}
        userId="user-1"
        username="TestUser"
      />
    );

    const closeButton = screen.getByTestId('chat-panel-close-btn');
    await user.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('only loads history once', async () => {
    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => ({ messages: [] }),
    });

    const { rerender } = render(
      <ChatPanel
        isOpen={true}
        onClose={jest.fn()}
        userId="user-1"
        username="TestUser"
      />
    );

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    // Rerender without closing
    rerender(
      <ChatPanel
        isOpen={true}
        onClose={jest.fn()}
        userId="user-1"
        username="TestUser"
      />
    );

    // Should still be only 1 call
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
