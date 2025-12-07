import { render, screen } from '@testing-library/react';
import { StoryCredit } from './StoryCredit';

describe('StoryCredit', () => {
  it('renders with default medium size', () => {
    render(<StoryCredit testId="credit" />);

    const credit = screen.getByTestId('credit');
    expect(credit).toBeInTheDocument();
  });

  it('renders with xs size', () => {
    render(<StoryCredit size="xs" testId="credit" />);

    expect(screen.getByTestId('credit')).toBeInTheDocument();
  });

  it('renders with sm size', () => {
    render(<StoryCredit size="sm" testId="credit" />);

    expect(screen.getByTestId('credit')).toBeInTheDocument();
  });

  it('renders with lg size', () => {
    render(<StoryCredit size="lg" testId="credit" />);

    expect(screen.getByTestId('credit')).toBeInTheDocument();
  });

  it('renders with xl size', () => {
    render(<StoryCredit size="xl" testId="credit" />);

    expect(screen.getByTestId('credit')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<StoryCredit className="custom-class" testId="credit" />);

    expect(screen.getByTestId('credit')).toHaveClass('custom-class');
  });

  it('renders RpgIcon with scroll-unfurled icon', () => {
    const { container } = render(<StoryCredit testId="credit" />);

    const icon = container.querySelector('.ra-scroll-unfurled');
    expect(icon).toBeInTheDocument();
  });

  it('applies accent color to icon', () => {
    const { container } = render(<StoryCredit testId="credit" />);

    const icon = container.querySelector('.text-cfg-accent');
    expect(icon).toBeInTheDocument();
  });
});
