import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { PayoutPanel } from './PayoutPanel';

describe('PayoutPanel', () => {
  const mockPayoutMethods = [
    { id: 'paypal', type: 'paypal' as const, label: 'PayPal', details: 'user@example.com' },
    { id: 'stripe', type: 'stripe' as const, label: 'Stripe' },
    { id: 'bank', type: 'bank_transfer' as const, label: 'Bank Transfer' },
  ];

  const mockOnRequestPayout = jest.fn();

  beforeEach(() => {
    mockOnRequestPayout.mockClear();
  });

  it('renders available balance', () => {
    render(
      <PayoutPanel
        availableBalance={1000}
        payoutMethods={mockPayoutMethods}
        onRequestPayout={mockOnRequestPayout}
        testId="payout"
      />
    );

    expect(screen.getByText('1,000')).toBeInTheDocument();
    expect(screen.getByText('Available Story Credits')).toBeInTheDocument();
  });

  it('shows USD equivalent of balance', () => {
    render(
      <PayoutPanel
        availableBalance={1000}
        payoutMethods={mockPayoutMethods}
        onRequestPayout={mockOnRequestPayout}
        exchangeRate={1.0}
        processingFee={0.02}
        testId="payout"
      />
    );

    expect(screen.getByText(/≈ \$980\.00 USD after fees/)).toBeInTheDocument();
  });

  it('renders payment method options', () => {
    render(
      <PayoutPanel
        availableBalance={1000}
        payoutMethods={mockPayoutMethods}
        onRequestPayout={mockOnRequestPayout}
        testId="payout"
      />
    );

    const select = screen.getByTestId('payout-method');
    expect(select).toBeInTheDocument();
    expect(screen.getByText(/PayPal/)).toBeInTheDocument();
    expect(screen.getByText(/Stripe/)).toBeInTheDocument();
  });

  it('updates amount when user types', () => {
    render(
      <PayoutPanel
        availableBalance={1000}
        payoutMethods={mockPayoutMethods}
        onRequestPayout={mockOnRequestPayout}
        testId="payout"
      />
    );

    const input = screen.getByTestId('payout-amount');
    fireEvent.change(input, { target: { value: '500' } });

    expect(input).toHaveValue(500);
  });

  it('shows USD equivalent of entered amount', () => {
    render(
      <PayoutPanel
        availableBalance={1000}
        payoutMethods={mockPayoutMethods}
        onRequestPayout={mockOnRequestPayout}
        exchangeRate={1.0}
        processingFee={0.02}
        testId="payout"
      />
    );

    const input = screen.getByTestId('payout-amount');
    fireEvent.change(input, { target: { value: '500' } });

    expect(screen.getByText(/≈ \$490\.00 USD \(after 2% processing fee\)/)).toBeInTheDocument();
  });

  it('disables submit when amount is below minimum', () => {
    render(
      <PayoutPanel
        availableBalance={1000}
        minimumPayout={100}
        payoutMethods={mockPayoutMethods}
        onRequestPayout={mockOnRequestPayout}
        testId="payout"
      />
    );

    const input = screen.getByTestId('payout-amount');
    const select = screen.getByTestId('payout-method');
    const submit = screen.getByTestId('payout-submit');

    fireEvent.change(input, { target: { value: '50' } });
    fireEvent.change(select, { target: { value: 'paypal' } });

    expect(submit).toBeDisabled();
  });

  it('shows warning when amount is below minimum', () => {
    render(
      <PayoutPanel
        availableBalance={1000}
        minimumPayout={100}
        payoutMethods={mockPayoutMethods}
        onRequestPayout={mockOnRequestPayout}
        testId="payout"
      />
    );

    const input = screen.getByTestId('payout-amount');
    fireEvent.change(input, { target: { value: '50' } });

    expect(screen.getByText(/Minimum payout is 100 Story Credits/)).toBeInTheDocument();
  });

  it('disables submit when amount exceeds balance', () => {
    render(
      <PayoutPanel
        availableBalance={1000}
        payoutMethods={mockPayoutMethods}
        onRequestPayout={mockOnRequestPayout}
        testId="payout"
      />
    );

    const input = screen.getByTestId('payout-amount');
    const select = screen.getByTestId('payout-method');
    const submit = screen.getByTestId('payout-submit');

    fireEvent.change(input, { target: { value: '2000' } });
    fireEvent.change(select, { target: { value: 'paypal' } });

    expect(submit).toBeDisabled();
  });

  it('shows error when amount exceeds balance', () => {
    render(
      <PayoutPanel
        availableBalance={1000}
        payoutMethods={mockPayoutMethods}
        onRequestPayout={mockOnRequestPayout}
        testId="payout"
      />
    );

    const input = screen.getByTestId('payout-amount');
    fireEvent.change(input, { target: { value: '2000' } });

    expect(screen.getByText(/Amount exceeds available balance/)).toBeInTheDocument();
  });

  it('disables submit when no payment method selected', () => {
    render(
      <PayoutPanel
        availableBalance={1000}
        payoutMethods={mockPayoutMethods}
        onRequestPayout={mockOnRequestPayout}
        testId="payout"
      />
    );

    const input = screen.getByTestId('payout-amount');
    const select = screen.getByTestId('payout-method');
    const submit = screen.getByTestId('payout-submit');

    fireEvent.change(input, { target: { value: '500' } });
    fireEvent.change(select, { target: { value: '' } });

    expect(submit).toBeDisabled();
  });

  it('calls onRequestPayout with correct values when submitted', async () => {
    render(
      <PayoutPanel
        availableBalance={1000}
        payoutMethods={mockPayoutMethods}
        onRequestPayout={mockOnRequestPayout}
        testId="payout"
      />
    );

    const input = screen.getByTestId('payout-amount');
    const select = screen.getByTestId('payout-method');
    const submit = screen.getByTestId('payout-submit');

    fireEvent.change(input, { target: { value: '500' } });
    fireEvent.change(select, { target: { value: 'paypal' } });
    fireEvent.click(submit);

    await waitFor(() => {
      expect(mockOnRequestPayout).toHaveBeenCalledWith(500, 'paypal');
    });
  });

  it('clears amount after successful payout', async () => {
    render(
      <PayoutPanel
        availableBalance={1000}
        payoutMethods={mockPayoutMethods}
        onRequestPayout={mockOnRequestPayout}
        testId="payout"
      />
    );

    const input = screen.getByTestId('payout-amount');
    const select = screen.getByTestId('payout-method');
    const submit = screen.getByTestId('payout-submit');

    fireEvent.change(input, { target: { value: '500' } });
    fireEvent.change(select, { target: { value: 'paypal' } });
    fireEvent.click(submit);

    await waitFor(() => {
      expect(input).toHaveValue(null);
    });
  });

  it('shows loading state during payout', async () => {
    const slowPayout = jest.fn(() => new Promise((resolve) => setTimeout(resolve, 100)));

    render(
      <PayoutPanel
        availableBalance={1000}
        payoutMethods={mockPayoutMethods}
        onRequestPayout={slowPayout}
        testId="payout"
      />
    );

    const input = screen.getByTestId('payout-amount');
    const select = screen.getByTestId('payout-method');
    const submit = screen.getByTestId('payout-submit');

    fireEvent.change(input, { target: { value: '500' } });
    fireEvent.change(select, { target: { value: 'paypal' } });
    fireEvent.click(submit);

    expect(submit).toBeDisabled();

    await waitFor(() => {
      expect(slowPayout).toHaveBeenCalled();
    });
  });

  it('uses custom minimum payout', () => {
    render(
      <PayoutPanel
        availableBalance={1000}
        minimumPayout={200}
        payoutMethods={mockPayoutMethods}
        onRequestPayout={mockOnRequestPayout}
        testId="payout"
      />
    );

    expect(screen.getByText(/min: 200/)).toBeInTheDocument();
  });

  it('uses custom exchange rate and processing fee', () => {
    render(
      <PayoutPanel
        availableBalance={1000}
        payoutMethods={mockPayoutMethods}
        onRequestPayout={mockOnRequestPayout}
        exchangeRate={1.0}
        processingFee={0.05} // 5% fee
        testId="payout"
      />
    );

    expect(screen.getByText(/≈ \$950\.00 USD after fees/)).toBeInTheDocument();
  });

  it('shows processing time message', () => {
    render(
      <PayoutPanel
        availableBalance={1000}
        payoutMethods={mockPayoutMethods}
        onRequestPayout={mockOnRequestPayout}
        testId="payout"
      />
    );

    expect(screen.getByText(/Payouts are processed within 3-5 business days/)).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <PayoutPanel
        availableBalance={1000}
        payoutMethods={mockPayoutMethods}
        onRequestPayout={mockOnRequestPayout}
        className="custom-class"
        testId="payout"
      />
    );

    expect(screen.getByTestId('payout')).toHaveClass('custom-class');
  });

  it('handles empty payoutMethods array gracefully', () => {
    render(
      <PayoutPanel
        availableBalance={1000}
        payoutMethods={[]}
        onRequestPayout={mockOnRequestPayout}
        testId="payout"
      />
    );

    // Component should render without crashing
    expect(screen.getByRole('heading', { name: 'Request Payout' })).toBeInTheDocument();

    // Select should exist but have no selected value
    const select = screen.getByTestId('payout-method');
    expect(select).toBeInTheDocument();
    expect(select).toHaveValue('');
  });

  it('does not call onRequestPayout when canPayout is false', async () => {
    render(
      <PayoutPanel
        availableBalance={1000}
        minimumPayout={100}
        payoutMethods={mockPayoutMethods}
        onRequestPayout={mockOnRequestPayout}
        testId="payout"
      />
    );

    const input = screen.getByTestId('payout-amount');
    const submit = screen.getByTestId('payout-submit');

    // Enter amount below minimum
    fireEvent.change(input, { target: { value: '50' } });

    // Try to click submit (should be disabled but let's test the guard)
    fireEvent.click(submit);

    // Should not call the payout function
    await waitFor(() => {
      expect(mockOnRequestPayout).not.toHaveBeenCalled();
    });
  });
});
