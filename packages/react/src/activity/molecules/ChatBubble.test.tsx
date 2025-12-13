
import { render, screen, fireEvent } from '@testing-library/react';
import { ChatBubble } from './ChatBubble';

describe('ChatBubble', () => {
  describe('rendering', () => {
    it('renders message content', () => {
      render(<ChatBubble content="Hello world" />);
      expect(screen.getByText('Hello world')).toBeInTheDocument();
    });

    it('applies testId', () => {
      render(<ChatBubble content="Hello" testId="bubble" />);
      expect(screen.getByTestId('bubble')).toBeInTheDocument();
    });

    it('preserves whitespace in content', () => {
      render(<ChatBubble content="Line 1\nLine 2" testId="bubble" />);
      const paragraph = screen.getByText(/Line 1/);
      expect(paragraph).toHaveClass('whitespace-pre-wrap');
    });
  });

  describe('user vs assistant messages', () => {
    it('aligns to end for user messages', () => {
      render(<ChatBubble content="User message" isUser testId="bubble" />);
      expect(screen.getByTestId('bubble')).toHaveClass('justify-end');
    });

    it('aligns to start for assistant messages', () => {
      render(<ChatBubble content="Assistant message" isUser={false} testId="bubble" />);
      expect(screen.getByTestId('bubble')).toHaveClass('justify-start');
    });

    it('defaults to assistant (isUser false)', () => {
      render(<ChatBubble content="Message" testId="bubble" />);
      expect(screen.getByTestId('bubble')).toHaveClass('justify-start');
    });

    it('applies user bubble styling', () => {
      const { container } = render(<ChatBubble content="User message" isUser />);
      const bubble = container.querySelector('.bg-cfg-primary');
      expect(bubble).toHaveClass('text-white');
    });

    it('applies assistant bubble styling', () => {
      const { container } = render(<ChatBubble content="Assistant message" isUser={false} />);
      const bubble = container.querySelector('.bg-cfg-background-secondary');
      expect(bubble).toHaveClass('text-cfg-text-normal');
    });
  });

  describe('action button', () => {
    it('renders action button for assistant messages when action is provided', () => {
      const action = { label: 'Copy', onClick: jest.fn() };
      render(<ChatBubble content="Message" isUser={false} action={action} />);
      expect(screen.getByText('Copy')).toBeInTheDocument();
    });

    it('does not render action button for user messages', () => {
      const action = { label: 'Copy', onClick: jest.fn() };
      render(<ChatBubble content="Message" isUser action={action} />);
      expect(screen.queryByText('Copy')).not.toBeInTheDocument();
    });

    it('does not render action button when not provided', () => {
      render(<ChatBubble content="Message" isUser={false} />);
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('calls action onClick when clicked', () => {
      const handleClick = jest.fn();
      const action = { label: 'Copy', onClick: handleClick };
      render(<ChatBubble content="Message" isUser={false} action={action} />);

      fireEvent.click(screen.getByText('Copy'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('styling', () => {
    it('applies max-width to bubble', () => {
      const { container } = render(<ChatBubble content="Message" />);
      const innerDiv = container.querySelector('.max-w-\\[80\\%\\]');
      expect(innerDiv).toBeInTheDocument();
    });

    it('applies rounded corners', () => {
      const { container } = render(<ChatBubble content="Message" />);
      const innerDiv = container.querySelector('.rounded-lg');
      expect(innerDiv).toBeInTheDocument();
    });

    it('merges custom className', () => {
      render(<ChatBubble content="Message" className="custom-class" testId="bubble" />);
      expect(screen.getByTestId('bubble')).toHaveClass('custom-class');
    });
  });
});
