import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TipJar } from './TipJar';

describe('TipJar', () => {
  const mockOnTip = jest.fn();

  beforeEach(() => {
    mockOnTip.mockClear();
  });

  it('renders recipient name', () => {
    render(<TipJar recipientName="Game Master Dave" onTip={mockOnTip} testId="tip-jar" />);

    expect(screen.getByText(/Tip Game Master Dave/)).toBeInTheDocument();
  });

  it('shows user balance when provided', () => {
    render(<TipJar recipientName="Test" onTip={mockOnTip} userBalance={500} testId="tip-jar" />);

    expect(screen.getByText('500')).toBeInTheDocument();
    expect(screen.getByText(/Your balance:/)).toBeInTheDocument();
  });

  it('renders suggested amount buttons', () => {
    render(
      <TipJar
        recipientName="Test"
        onTip={mockOnTip}
        suggestedAmounts={[1, 5, 10, 25]}
        testId="tip-jar"
      />
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
  });

  it('selects suggested amount when button clicked', () => {
    render(<TipJar recipientName="Test" onTip={mockOnTip} suggestedAmounts={[5, 10]} testId="tip-jar" />);

    const button = screen.getAllByRole('button').find(btn => btn.textContent?.includes('5'));
    fireEvent.click(button!);

    expect(button).toHaveClass('bg-cfg-primary');
  });

  it('calls onTip with selected amount when submit clicked', async () => {
    render(<TipJar recipientName="Test" onTip={mockOnTip} suggestedAmounts={[5]} testId="tip-jar" />);

    const amountButton = screen.getAllByRole('button').find(btn => btn.textContent?.includes('5'));
    fireEvent.click(amountButton!);

    const submitButton = screen.getByTestId('tip-jar-submit');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnTip).toHaveBeenCalledWith(5);
    });
  });

  it('allows custom amount input', () => {
    render(<TipJar recipientName="Test" onTip={mockOnTip} testId="tip-jar" />);

    const input = screen.getByTestId('tip-jar-custom-input');
    fireEvent.change(input, { target: { value: '15' } });

    expect(input).toHaveValue(15);
  });

  it('disables submit when amount is below minimum', () => {
    render(<TipJar recipientName="Test" onTip={mockOnTip} minAmount={10} testId="tip-jar" />);

    const input = screen.getByTestId('tip-jar-custom-input');
    fireEvent.change(input, { target: { value: '5' } });

    const submitButton = screen.getByTestId('tip-jar-submit');
    expect(submitButton).toBeDisabled();
  });

  it('disables submit when amount exceeds balance', () => {
    render(<TipJar recipientName="Test" onTip={mockOnTip} userBalance={10} testId="tip-jar" />);

    const input = screen.getByTestId('tip-jar-custom-input');
    fireEvent.change(input, { target: { value: '20' } });

    const submitButton = screen.getByTestId('tip-jar-submit');
    expect(submitButton).toBeDisabled();
  });

  it('disables suggested amounts that exceed balance', () => {
    render(
      <TipJar
        recipientName="Test"
        onTip={mockOnTip}
        userBalance={5}
        suggestedAmounts={[1, 10, 20]}
        testId="tip-jar"
      />
    );

    const buttons = screen.getAllByRole('button').filter(btn =>
      ['1', '10', '20'].some(amount => btn.textContent?.includes(amount) && btn.textContent?.length < 5)
    );

    expect(buttons[0]).not.toBeDisabled(); // 1
    expect(buttons[1]).toBeDisabled(); // 10
    expect(buttons[2]).toBeDisabled(); // 20
  });

  it('renders with recipient avatar when provided', () => {
    render(<TipJar recipientName="Test" recipientAvatar="/avatar.png" onTip={mockOnTip} testId="tip-jar" />);

    const avatar = screen.getByAltText('Test');
    expect(avatar).toHaveAttribute('src', '/avatar.png');
  });
});
