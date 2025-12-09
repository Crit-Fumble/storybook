import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ChatPanel } from './ChatPanel';

// Mock fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('ChatPanel', () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    userId: 'user-123',
    username: 'TestUser',
  };

  beforeEach(() => {
    mockFetch.mockClear();
    defaultProps.onClose.mockClear();
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ messages: [], response: 'Hello!' }),
    });
  });

  it('does not render when isOpen is false', () => {
    render(<ChatPanel {...defaultProps} isOpen={false} />);
    expect(screen.queryByTestId('chat-panel')).not.toBeInTheDocument();
  });

  it('renders when isOpen is true', () => {
    render(<ChatPanel {...defaultProps} />);
    expect(screen.getByTestId('chat-panel')).toBeInTheDocument();
  });

  it('renders with custom testId', () => {
    render(<ChatPanel {...defaultProps} testId="custom-chat" />);
    expect(screen.getByTestId('custom-chat')).toBeInTheDocument();
  });

  describe('header', () => {
    it('renders header', () => {
      render(<ChatPanel {...defaultProps} />);
      expect(screen.getByTestId('chat-panel-header')).toBeInTheDocument();
    });

    it('displays Chat with FumbleBot title', () => {
      render(<ChatPanel {...defaultProps} />);
      expect(screen.getByText('Chat with FumbleBot')).toBeInTheDocument();
    });

    it('renders close button', () => {
      render(<ChatPanel {...defaultProps} />);
      expect(screen.getByTestId('chat-panel-close-btn')).toBeInTheDocument();
    });

    it('calls onClose when close button clicked', () => {
      render(<ChatPanel {...defaultProps} />);
      fireEvent.click(screen.getByTestId('chat-panel-close-btn'));
      expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('messages area', () => {
    it('renders messages container', () => {
      render(<ChatPanel {...defaultProps} />);
      expect(screen.getByTestId('chat-panel-messages')).toBeInTheDocument();
    });

    it('shows empty state message when no messages', async () => {
      render(<ChatPanel {...defaultProps} />);
      await waitFor(() => {
        expect(screen.getByText('Start a conversation with FumbleBot!')).toBeInTheDocument();
      });
    });

    it('loads history on mount', async () => {
      render(<ChatPanel {...defaultProps} />);
      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith('/.proxy/api/chat/history?userId=user-123');
      });
    });

    it('displays loaded messages', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          messages: [
            { id: '1', role: 'user', content: 'Hello', timestamp: new Date().toISOString() },
            { id: '2', role: 'assistant', content: 'Hi there!', timestamp: new Date().toISOString() },
          ],
        }),
      });

      render(<ChatPanel {...defaultProps} />);

      await waitFor(() => {
        expect(screen.getByText('Hello')).toBeInTheDocument();
        expect(screen.getByText('Hi there!')).toBeInTheDocument();
      });
    });
  });

  describe('input area', () => {
    it('renders input area', () => {
      render(<ChatPanel {...defaultProps} />);
      expect(screen.getByTestId('chat-panel-input-area')).toBeInTheDocument();
    });

    it('renders input field', () => {
      render(<ChatPanel {...defaultProps} />);
      expect(screen.getByTestId('chat-panel-input')).toBeInTheDocument();
    });

    it('renders send button', () => {
      render(<ChatPanel {...defaultProps} />);
      expect(screen.getByTestId('chat-panel-send-btn')).toBeInTheDocument();
    });

    it('send button is disabled when input is empty', () => {
      render(<ChatPanel {...defaultProps} />);
      expect(screen.getByTestId('chat-panel-send-btn')).toBeDisabled();
    });

    it('send button is enabled when input has text', async () => {
      render(<ChatPanel {...defaultProps} />);
      await waitFor(() => {
        expect(screen.getByTestId('chat-panel-input')).toBeInTheDocument();
      });

      const input = screen.getByTestId('chat-panel-input').querySelector('input');
      if (input) {
        fireEvent.change(input, { target: { value: 'Hello' } });
        expect(screen.getByTestId('chat-panel-send-btn')).not.toBeDisabled();
      }
    });
  });

  describe('sending messages', () => {
    it('sends message when send button clicked', async () => {
      render(<ChatPanel {...defaultProps} />);

      await waitFor(() => {
        expect(screen.getByTestId('chat-panel-input')).toBeInTheDocument();
      });

      const input = screen.getByTestId('chat-panel-input').querySelector('input');
      if (input) {
        fireEvent.change(input, { target: { value: 'Test message' } });
        fireEvent.click(screen.getByTestId('chat-panel-send-btn'));

        await waitFor(() => {
          expect(mockFetch).toHaveBeenCalledWith('/.proxy/api/chat', expect.any(Object));
        });
      }
    });

    it('sends message on Enter key', async () => {
      render(<ChatPanel {...defaultProps} />);

      await waitFor(() => {
        expect(screen.getByTestId('chat-panel-input')).toBeInTheDocument();
      });

      const input = screen.getByTestId('chat-panel-input').querySelector('input');
      if (input) {
        fireEvent.change(input, { target: { value: 'Test message' } });
        fireEvent.keyPress(input, { key: 'Enter', code: 'Enter' });

        await waitFor(() => {
          expect(mockFetch).toHaveBeenCalledWith('/.proxy/api/chat', expect.any(Object));
        });
      }
    });

    it('clears input after sending', async () => {
      render(<ChatPanel {...defaultProps} />);

      await waitFor(() => {
        expect(screen.getByTestId('chat-panel-input')).toBeInTheDocument();
      });

      const input = screen.getByTestId('chat-panel-input').querySelector('input');
      if (input) {
        fireEvent.change(input, { target: { value: 'Test message' } });
        fireEvent.click(screen.getByTestId('chat-panel-send-btn'));

        await waitFor(() => {
          expect(input).toHaveValue('');
        });
      }
    });
  });

  describe('error handling', () => {
    it('handles history fetch error', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      render(<ChatPanel {...defaultProps} />);

      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith('Failed to load chat history:', expect.any(Error));
      });

      consoleSpy.mockRestore();
    });

    it('handles send message error', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      mockFetch
        .mockResolvedValueOnce({ ok: true, json: async () => ({ messages: [] }) })
        .mockRejectedValueOnce(new Error('Send error'));

      render(<ChatPanel {...defaultProps} />);

      await waitFor(() => {
        expect(screen.getByTestId('chat-panel-input')).toBeInTheDocument();
      });

      const input = screen.getByTestId('chat-panel-input').querySelector('input');
      if (input) {
        fireEvent.change(input, { target: { value: 'Test' } });
        fireEvent.click(screen.getByTestId('chat-panel-send-btn'));

        await waitFor(() => {
          expect(consoleSpy).toHaveBeenCalledWith('Failed to send message:', expect.any(Error));
        });
      }

      consoleSpy.mockRestore();
    });

    it('handles API error response (not ok)', async () => {
      mockFetch
        .mockResolvedValueOnce({ ok: true, json: async () => ({ messages: [] }) })
        .mockResolvedValueOnce({ ok: false, status: 500 });

      render(<ChatPanel {...defaultProps} />);

      await waitFor(() => {
        expect(screen.getByTestId('chat-panel-input')).toBeInTheDocument();
      });

      const input = screen.getByTestId('chat-panel-input').querySelector('input');
      if (input) {
        fireEvent.change(input, { target: { value: 'Test message' } });
        fireEvent.click(screen.getByTestId('chat-panel-send-btn'));

        await waitFor(() => {
          expect(screen.getByText('Sorry, there was an error processing your message.')).toBeInTheDocument();
        });
      }
    });

    it('displays error message in chat when connection fails', async () => {
      mockFetch
        .mockResolvedValueOnce({ ok: true, json: async () => ({ messages: [] }) })
        .mockRejectedValueOnce(new Error('Connection failed'));

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      render(<ChatPanel {...defaultProps} />);

      await waitFor(() => {
        expect(screen.getByTestId('chat-panel-input')).toBeInTheDocument();
      });

      const input = screen.getByTestId('chat-panel-input').querySelector('input');
      if (input) {
        fireEvent.change(input, { target: { value: 'Hello' } });
        fireEvent.click(screen.getByTestId('chat-panel-send-btn'));

        await waitFor(() => {
          expect(screen.getByText('Failed to connect to chat server.')).toBeInTheDocument();
        });
      }

      consoleSpy.mockRestore();
    });
  });

  describe('keyboard handling', () => {
    it('allows Shift+Enter for new line (does not send)', async () => {
      render(<ChatPanel {...defaultProps} />);

      await waitFor(() => {
        expect(screen.getByTestId('chat-panel-input')).toBeInTheDocument();
      });

      const input = screen.getByTestId('chat-panel-input').querySelector('input');
      if (input) {
        fireEvent.change(input, { target: { value: 'Test' } });
        fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', shiftKey: true });

        // Should not send the message
        expect(mockFetch).not.toHaveBeenCalledWith('/.proxy/api/chat', expect.any(Object));
      }
    });

    it('does not send empty message on Enter', async () => {
      render(<ChatPanel {...defaultProps} />);

      await waitFor(() => {
        expect(screen.getByTestId('chat-panel-input')).toBeInTheDocument();
      });

      const input = screen.getByTestId('chat-panel-input').querySelector('input');
      if (input) {
        fireEvent.change(input, { target: { value: '   ' } }); // Only whitespace
        fireEvent.keyPress(input, { key: 'Enter', code: 'Enter' });

        // Should not send
        expect(mockFetch).not.toHaveBeenCalledWith('/.proxy/api/chat', expect.any(Object));
      }
    });

    it('does not send when already loading', async () => {
      mockFetch
        .mockResolvedValueOnce({ ok: true, json: async () => ({ messages: [] }) })
        .mockImplementation(() => new Promise(() => {})); // Never resolves

      render(<ChatPanel {...defaultProps} />);

      await waitFor(() => {
        expect(screen.getByTestId('chat-panel-input')).toBeInTheDocument();
      });

      const input = screen.getByTestId('chat-panel-input').querySelector('input');
      if (input) {
        fireEvent.change(input, { target: { value: 'First' } });
        fireEvent.click(screen.getByTestId('chat-panel-send-btn'));

        // Try to send another message while loading
        fireEvent.change(input, { target: { value: 'Second' } });
        fireEvent.click(screen.getByTestId('chat-panel-send-btn'));

        // Should only have been called once
        expect(mockFetch).toHaveBeenCalledTimes(2); // 1 for history, 1 for first message
      }
    });
  });

  describe('message display', () => {
    it('displays assistant response from API', async () => {
      mockFetch
        .mockResolvedValueOnce({ ok: true, json: async () => ({ messages: [] }) })
        .mockResolvedValueOnce({ ok: true, json: async () => ({ response: 'AI response text' }) });

      render(<ChatPanel {...defaultProps} />);

      await waitFor(() => {
        expect(screen.getByTestId('chat-panel-input')).toBeInTheDocument();
      });

      const input = screen.getByTestId('chat-panel-input').querySelector('input');
      if (input) {
        fireEvent.change(input, { target: { value: 'Hello AI' } });
        fireEvent.click(screen.getByTestId('chat-panel-send-btn'));

        await waitFor(() => {
          expect(screen.getByText('AI response text')).toBeInTheDocument();
        });
      }
    });

    it('displays default message when response is empty', async () => {
      mockFetch
        .mockResolvedValueOnce({ ok: true, json: async () => ({ messages: [] }) })
        .mockResolvedValueOnce({ ok: true, json: async () => ({}) }); // No response field

      render(<ChatPanel {...defaultProps} />);

      await waitFor(() => {
        expect(screen.getByTestId('chat-panel-input')).toBeInTheDocument();
      });

      const input = screen.getByTestId('chat-panel-input').querySelector('input');
      if (input) {
        fireEvent.change(input, { target: { value: 'Hello' } });
        fireEvent.click(screen.getByTestId('chat-panel-send-btn'));

        await waitFor(() => {
          expect(screen.getByText('Sorry, I could not process your request.')).toBeInTheDocument();
        });
      }
    });
  });
});
