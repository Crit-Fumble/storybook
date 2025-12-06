
import { render, screen } from '@testing-library/react';
import { TypingIndicator } from './TypingIndicator';

describe('TypingIndicator', () => {
  describe('rendering', () => {
    it('renders the indicator', () => {
      render(<TypingIndicator testId="typing" />);
      expect(screen.getByTestId('typing')).toBeInTheDocument();
    });

    it('renders three animated dots', () => {
      const { container } = render(<TypingIndicator />);
      const dots = container.querySelectorAll('.animate-bounce');
      expect(dots).toHaveLength(3);
    });
  });

  describe('styling', () => {
    it('aligns to start (like assistant messages)', () => {
      render(<TypingIndicator testId="typing" />);
      expect(screen.getByTestId('typing')).toHaveClass('justify-start');
    });

    it('applies background styling to bubble', () => {
      const { container } = render(<TypingIndicator />);
      const bubble = container.querySelector('.bg-cfg-bg-secondary');
      expect(bubble).toBeInTheDocument();
    });

    it('dots have staggered animation delays', () => {
      const { container } = render(<TypingIndicator />);
      const dots = container.querySelectorAll('.animate-bounce');

      expect(dots[0]).toHaveStyle({ animationDelay: '0ms' });
      expect(dots[1]).toHaveStyle({ animationDelay: '150ms' });
      expect(dots[2]).toHaveStyle({ animationDelay: '300ms' });
    });

    it('dots have correct size and color', () => {
      const { container } = render(<TypingIndicator />);
      const dots = container.querySelectorAll('.animate-bounce');

      dots.forEach((dot) => {
        expect(dot).toHaveClass('w-2', 'h-2', 'bg-cfg-text-muted', 'rounded-full');
      });
    });

    it('merges custom className', () => {
      render(<TypingIndicator className="custom-class" testId="typing" />);
      expect(screen.getByTestId('typing')).toHaveClass('custom-class');
    });
  });
});
