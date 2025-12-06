
import { render, screen, fireEvent } from '@testing-library/react';
import { ChatWindow } from './ChatWindow';

describe('ChatWindow', () => {
  const defaultProps = {
    title: 'FumbleBot',
    messages: [],
    inputValue: '',
    onInputChange: jest.fn(),
    onSubmit: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('rendering', () => {
    it('renders the chat window', () => {
      render(<ChatWindow {...defaultProps} testId="chat" />);
      expect(screen.getByTestId('chat')).toBeInTheDocument();
    });

    it('renders title', () => {
      render(<ChatWindow {...defaultProps} />);
      expect(screen.getByText('FumbleBot')).toBeInTheDocument();
    });

    it('renders subtitle when provided', () => {
      render(<ChatWindow {...defaultProps} subtitle="AI Assistant" />);
      expect(screen.getByText('AI Assistant')).toBeInTheDocument();
    });

    it('does not render subtitle when not provided', () => {
      render(<ChatWindow {...defaultProps} />);
      expect(screen.queryByText('AI Assistant')).not.toBeInTheDocument();
    });

    it('renders avatar when provided', () => {
      const { container } = render(
        <ChatWindow
          {...defaultProps}
          avatar={{ src: 'https://example.com/avatar.jpg', fallback: 'F' }}
        />
      );
      const img = container.querySelector('img');
      expect(img).toHaveAttribute('src', 'https://example.com/avatar.jpg');
    });

    it('renders input field', () => {
      render(<ChatWindow {...defaultProps} />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('renders submit button', () => {
      render(<ChatWindow {...defaultProps} />);
      expect(screen.getByRole('button', { name: '' })).toBeInTheDocument();
    });

    it('applies custom placeholder', () => {
      render(<ChatWindow {...defaultProps} placeholder="Ask a question..." />);
      expect(screen.getByPlaceholderText('Ask a question...')).toBeInTheDocument();
    });
  });

  describe('messages', () => {
    it('renders user messages', () => {
      const messages = [{ id: '1', role: 'user' as const, content: 'Hello!' }];
      render(<ChatWindow {...defaultProps} messages={messages} />);
      expect(screen.getByText('Hello!')).toBeInTheDocument();
    });

    it('renders assistant messages', () => {
      const messages = [{ id: '1', role: 'assistant' as const, content: 'Hi there!' }];
      render(<ChatWindow {...defaultProps} messages={messages} />);
      expect(screen.getByText('Hi there!')).toBeInTheDocument();
    });

    it('renders multiple messages', () => {
      const messages = [
        { id: '1', role: 'user' as const, content: 'Hello!' },
        { id: '2', role: 'assistant' as const, content: 'Hi there!' },
        { id: '3', role: 'user' as const, content: 'How are you?' },
      ];
      render(<ChatWindow {...defaultProps} messages={messages} />);
      expect(screen.getByText('Hello!')).toBeInTheDocument();
      expect(screen.getByText('Hi there!')).toBeInTheDocument();
      expect(screen.getByText('How are you?')).toBeInTheDocument();
    });
  });

  describe('welcome message', () => {
    it('shows welcome message when no messages', () => {
      render(
        <ChatWindow
          {...defaultProps}
          welcomeMessage={{ greeting: 'Welcome!', hint: 'Ask me anything' }}
        />
      );
      expect(screen.getByText('Welcome!')).toBeInTheDocument();
      expect(screen.getByText('Ask me anything')).toBeInTheDocument();
    });

    it('hides welcome message when there are messages', () => {
      const messages = [{ id: '1', role: 'user' as const, content: 'Hello!' }];
      render(
        <ChatWindow
          {...defaultProps}
          messages={messages}
          welcomeMessage={{ greeting: 'Welcome!' }}
        />
      );
      expect(screen.queryByText('Welcome!')).not.toBeInTheDocument();
    });

    it('renders welcome message without hint', () => {
      render(
        <ChatWindow {...defaultProps} welcomeMessage={{ greeting: 'Welcome!' }} />
      );
      expect(screen.getByText('Welcome!')).toBeInTheDocument();
    });
  });

  describe('loading state', () => {
    it('shows typing indicator when loading', () => {
      const { container } = render(<ChatWindow {...defaultProps} isLoading />);
      const dots = container.querySelectorAll('.animate-bounce');
      expect(dots.length).toBeGreaterThan(0);
    });

    it('disables input when loading', () => {
      render(<ChatWindow {...defaultProps} isLoading />);
      expect(screen.getByRole('textbox')).toBeDisabled();
    });

    it('disables submit button when loading', () => {
      render(<ChatWindow {...defaultProps} inputValue="test" isLoading />);
      expect(screen.getByRole('button')).toBeDisabled();
    });
  });

  describe('interactions', () => {
    it('calls onInputChange when typing', () => {
      const onInputChange = jest.fn();
      render(<ChatWindow {...defaultProps} onInputChange={onInputChange} />);

      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Hello' } });
      expect(onInputChange).toHaveBeenCalledWith('Hello');
    });

    it('calls onSubmit when form is submitted', () => {
      const onSubmit = jest.fn();
      render(<ChatWindow {...defaultProps} inputValue="Hello" onSubmit={onSubmit} />);

      const form = screen.getByRole('textbox').closest('form')!;
      fireEvent.submit(form);
      expect(onSubmit).toHaveBeenCalledWith('Hello');
    });

    it('does not submit empty message', () => {
      const onSubmit = jest.fn();
      render(<ChatWindow {...defaultProps} inputValue="" onSubmit={onSubmit} />);

      const form = screen.getByRole('textbox').closest('form')!;
      fireEvent.submit(form);
      expect(onSubmit).not.toHaveBeenCalled();
    });

    it('does not submit whitespace-only message', () => {
      const onSubmit = jest.fn();
      render(<ChatWindow {...defaultProps} inputValue="   " onSubmit={onSubmit} />);

      const form = screen.getByRole('textbox').closest('form')!;
      fireEvent.submit(form);
      expect(onSubmit).not.toHaveBeenCalled();
    });

    it('trims whitespace when submitting', () => {
      const onSubmit = jest.fn();
      render(<ChatWindow {...defaultProps} inputValue="  Hello  " onSubmit={onSubmit} />);

      const form = screen.getByRole('textbox').closest('form')!;
      fireEvent.submit(form);
      expect(onSubmit).toHaveBeenCalledWith('Hello');
    });

    it('does not submit when loading', () => {
      const onSubmit = jest.fn();
      render(<ChatWindow {...defaultProps} inputValue="Hello" isLoading onSubmit={onSubmit} />);

      const form = screen.getByRole('textbox').closest('form')!;
      fireEvent.submit(form);
      expect(onSubmit).not.toHaveBeenCalled();
    });
  });

  describe('submit button state', () => {
    it('disables submit button when input is empty', () => {
      render(<ChatWindow {...defaultProps} inputValue="" />);
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('enables submit button when input has content', () => {
      render(<ChatWindow {...defaultProps} inputValue="Hello" />);
      expect(screen.getByRole('button')).not.toBeDisabled();
    });
  });

  describe('message actions', () => {
    it('renders action button on assistant messages when messageAction is provided', () => {
      const messages = [{ id: '1', role: 'assistant' as const, content: 'Response' }];
      const messageAction = { label: 'Copy', onClick: jest.fn() };
      render(<ChatWindow {...defaultProps} messages={messages} messageAction={messageAction} />);

      expect(screen.getByText('Copy')).toBeInTheDocument();
    });

    it('calls messageAction.onClick with content when clicked', () => {
      const messages = [{ id: '1', role: 'assistant' as const, content: 'Response content' }];
      const onClick = jest.fn();
      const messageAction = { label: 'Copy', onClick };
      render(<ChatWindow {...defaultProps} messages={messages} messageAction={messageAction} />);

      fireEvent.click(screen.getByText('Copy'));
      expect(onClick).toHaveBeenCalledWith('Response content');
    });
  });

  describe('styling', () => {
    it('merges custom className', () => {
      render(<ChatWindow {...defaultProps} className="custom-class" testId="chat" />);
      expect(screen.getByTestId('chat')).toHaveClass('custom-class');
    });
  });
});
