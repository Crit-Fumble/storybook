
import { render, screen, fireEvent } from '@testing-library/react';
import { FloatingChat } from './FloatingChat';

describe('FloatingChat', () => {
  const defaultProps = {
    title: 'Chat',
    messages: [],
    inputValue: '',
    onInputChange: jest.fn(),
    onSubmit: jest.fn(),
    isOpen: false,
    onToggle: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('toggle button', () => {
    it('renders toggle button', () => {
      render(<FloatingChat {...defaultProps} testId="floating" />);
      expect(screen.getByTestId('floating-toggle')).toBeInTheDocument();
    });

    it('has correct aria-label when closed', () => {
      render(<FloatingChat {...defaultProps} isOpen={false} testId="floating" />);
      expect(screen.getByTestId('floating-toggle')).toHaveAttribute('aria-label', 'Open chat');
    });

    it('has correct aria-label when open', () => {
      render(<FloatingChat {...defaultProps} isOpen testId="floating" />);
      expect(screen.getByTestId('floating-toggle')).toHaveAttribute('aria-label', 'Close chat');
    });

    it('calls onToggle when clicked', () => {
      const onToggle = jest.fn();
      render(<FloatingChat {...defaultProps} onToggle={onToggle} testId="floating" />);

      fireEvent.click(screen.getByTestId('floating-toggle'));
      expect(onToggle).toHaveBeenCalledTimes(1);
    });
  });

  describe('chat window visibility', () => {
    it('does not render chat window when closed', () => {
      render(<FloatingChat {...defaultProps} isOpen={false} testId="floating" />);
      expect(screen.queryByTestId('floating-window')).not.toBeInTheDocument();
    });

    it('renders chat window when open', () => {
      render(<FloatingChat {...defaultProps} isOpen testId="floating" />);
      expect(screen.getByTestId('floating-window')).toBeInTheDocument();
    });

    it('renders chat title in window', () => {
      render(<FloatingChat {...defaultProps} title="FumbleBot" isOpen testId="floating" />);
      expect(screen.getByText('FumbleBot')).toBeInTheDocument();
    });
  });

  describe('position variants', () => {
    it('positions bottom-right by default', () => {
      render(<FloatingChat {...defaultProps} testId="floating" />);
      // Mobile-first responsive positioning
      expect(screen.getByTestId('floating-toggle')).toHaveClass('bottom-4', 'right-4');
    });

    it('positions bottom-left when specified', () => {
      render(<FloatingChat {...defaultProps} position="bottom-left" testId="floating" />);
      expect(screen.getByTestId('floating-toggle')).toHaveClass('bottom-4', 'left-4');
    });

    it('positions window with mobile-first responsive classes', () => {
      render(<FloatingChat {...defaultProps} position="bottom-right" isOpen testId="floating" />);
      // Mobile: full width with inset-x; Desktop: fixed position
      expect(screen.getByTestId('floating-window')).toHaveClass('inset-x-3', 'bottom-20');
    });

    it('positions window bottom-left when toggle is bottom-left', () => {
      render(<FloatingChat {...defaultProps} position="bottom-left" isOpen testId="floating" />);
      expect(screen.getByTestId('floating-window')).toHaveClass('inset-x-3', 'bottom-20');
    });
  });

  describe('button styling', () => {
    it('applies fixed positioning', () => {
      render(<FloatingChat {...defaultProps} testId="floating" />);
      expect(screen.getByTestId('floating-toggle')).toHaveClass('fixed');
    });

    it('applies circular button styling', () => {
      render(<FloatingChat {...defaultProps} testId="floating" />);
      expect(screen.getByTestId('floating-toggle')).toHaveClass('w-14', 'h-14', 'rounded-full');
    });

    it('applies brand colors', () => {
      render(<FloatingChat {...defaultProps} testId="floating" />);
      expect(screen.getByTestId('floating-toggle')).toHaveClass('bg-cfg-primary', 'text-white');
    });
  });

  describe('chat window sizing', () => {
    it('applies mobile-first responsive size to chat window', () => {
      render(<FloatingChat {...defaultProps} isOpen testId="floating" />);
      // Mobile: full width with height calc; Desktop: fixed dimensions
      expect(screen.getByTestId('floating-window')).toHaveClass('w-auto', 'max-h-[500px]');
    });

    it('applies fixed positioning to chat window', () => {
      render(<FloatingChat {...defaultProps} isOpen testId="floating" />);
      expect(screen.getByTestId('floating-window')).toHaveClass('fixed');
    });
  });

  describe('chat functionality passthrough', () => {
    it('passes messages to chat window', () => {
      const messages = [{ id: '1', role: 'user' as const, content: 'Hello!' }];
      render(<FloatingChat {...defaultProps} messages={messages} isOpen testId="floating" />);
      expect(screen.getByText('Hello!')).toBeInTheDocument();
    });

    it('passes inputValue to chat window', () => {
      render(<FloatingChat {...defaultProps} inputValue="Test input" isOpen />);
      expect(screen.getByRole('textbox')).toHaveValue('Test input');
    });

    it('passes onInputChange to chat window', () => {
      const onInputChange = jest.fn();
      render(<FloatingChat {...defaultProps} onInputChange={onInputChange} isOpen />);

      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'New value' } });
      expect(onInputChange).toHaveBeenCalledWith('New value');
    });

    it('passes onSubmit to chat window', () => {
      const onSubmit = jest.fn();
      render(<FloatingChat {...defaultProps} inputValue="Hello" onSubmit={onSubmit} isOpen />);

      const form = screen.getByRole('textbox').closest('form')!;
      fireEvent.submit(form);
      expect(onSubmit).toHaveBeenCalledWith('Hello');
    });

    it('passes isLoading to chat window', () => {
      render(<FloatingChat {...defaultProps} isLoading isOpen />);
      expect(screen.getByRole('textbox')).toBeDisabled();
    });
  });
});
