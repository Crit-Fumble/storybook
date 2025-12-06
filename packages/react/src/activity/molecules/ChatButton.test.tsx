
import { render, screen, fireEvent } from '@testing-library/react';
import { ChatButton } from './ChatButton';

describe('ChatButton', () => {
  describe('rendering', () => {
    it('renders the button', () => {
      render(<ChatButton onClick={() => {}} />);
      expect(screen.getByTestId('chat-button')).toBeInTheDocument();
    });

    it('applies custom testId', () => {
      render(<ChatButton onClick={() => {}} testId="my-chat-btn" />);
      expect(screen.getByTestId('my-chat-btn')).toBeInTheDocument();
    });

    it('renders chat icon', () => {
      render(<ChatButton onClick={() => {}} testId="chat" />);
      expect(screen.getByTestId('chat-icon')).toBeInTheDocument();
    });

    it('has aria-label for accessibility', () => {
      render(<ChatButton onClick={() => {}} testId="chat" />);
      expect(screen.getByTestId('chat-btn')).toHaveAttribute('aria-label', 'Open chat');
    });
  });

  describe('unread indicator', () => {
    it('does not show unread indicator by default', () => {
      render(<ChatButton onClick={() => {}} testId="chat" />);
      expect(screen.queryByTestId('chat-unread')).not.toBeInTheDocument();
    });

    it('does not show unread indicator when hasUnread is false', () => {
      render(<ChatButton onClick={() => {}} hasUnread={false} testId="chat" />);
      expect(screen.queryByTestId('chat-unread')).not.toBeInTheDocument();
    });

    it('shows unread indicator when hasUnread is true', () => {
      render(<ChatButton onClick={() => {}} hasUnread testId="chat" />);
      expect(screen.getByTestId('chat-unread')).toBeInTheDocument();
    });

    it('applies correct styling to unread indicator', () => {
      render(<ChatButton onClick={() => {}} hasUnread testId="chat" />);
      const indicator = screen.getByTestId('chat-unread');
      expect(indicator).toHaveClass('h-2', 'w-2', 'rounded-full', 'bg-cfg-red');
    });
  });

  describe('interactions', () => {
    it('calls onClick when button is clicked', () => {
      const handleClick = jest.fn();
      render(<ChatButton onClick={handleClick} testId="chat" />);

      fireEvent.click(screen.getByTestId('chat-btn'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });
});
