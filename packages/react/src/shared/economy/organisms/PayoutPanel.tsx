import { useState } from 'react';
import { clsx } from 'clsx';
import { Button } from '../../atoms/Button';
import { Input } from '../../atoms/Input';
import { Select } from '../../atoms/Select';
import { StoryCredit } from '../atoms/StoryCredit';

export interface PayoutMethod {
  id: string;
  type: 'paypal' | 'stripe' | 'bank_transfer';
  label: string;
  details?: string;
}

export interface PayoutPanelProps {
  /** Available Story Credit balance (earned from tips) */
  availableBalance: number;
  minimumPayout?: number;
  payoutMethods: PayoutMethod[];
  onRequestPayout: (amount: number, methodId: string) => void | Promise<void>;
  /** Story Credits to USD exchange rate (default: 1.0 = 1 SC = $1 USD) */
  exchangeRate?: number;
  /** Processing fee as decimal (default: 0.02 = 2%) */
  processingFee?: number;
  className?: string;
  testId?: string;
}

export function PayoutPanel({
  availableBalance,
  minimumPayout = 100,
  payoutMethods,
  onRequestPayout,
  exchangeRate = 1.0, // Default: 1 Story Credit = $1.00 USD
  processingFee = 0.02, // Default: 2% processing fee
  className,
  testId,
}: PayoutPanelProps) {
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState(payoutMethods[0]?.id || '');
  const [isLoading, setIsLoading] = useState(false);

  const parsedAmount = parseInt(amount) || 0;
  const afterFee = parsedAmount * (1 - processingFee);
  const usdAmount = afterFee * exchangeRate;
  const canPayout = parsedAmount >= minimumPayout && parsedAmount <= availableBalance && selectedMethod;

  const handlePayout = async () => {
    if (!canPayout) return;

    setIsLoading(true);
    try {
      await onRequestPayout(parsedAmount, selectedMethod);
      setAmount('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={clsx(
        'p-6 rounded-lg bg-cfg-background-primary border border-cfg-border',
        className
      )}
      data-testid={testId}
    >
      <h3 className="text-xl font-semibold text-cfg-text-normal mb-4">Request Payout</h3>

      {/* Available Balance */}
      <div className="mb-6 p-4 rounded-lg bg-cfg-background-secondary border border-cfg-border">
        <div className="text-sm text-cfg-text-muted mb-2">Available Story Credits</div>
        <div className="flex items-center gap-2">
          <StoryCredit size="md" />
          <span className="text-2xl font-bold text-cfg-text-normal">
            {availableBalance.toLocaleString()}
          </span>
          <span className="text-sm text-cfg-text-muted ml-2">
            (≈ ${(availableBalance * (1 - processingFee) * exchangeRate).toFixed(2)} USD after fees)
          </span>
        </div>
      </div>

      {/* Payout Amount */}
      <div className="mb-4">
        <label className="block text-sm text-cfg-text-muted mb-2">
          Payout Amount (min: {minimumPayout.toLocaleString()} SC)
        </label>
        <div className="flex items-center gap-2">
          <StoryCredit size="sm" />
          <Input
            type="number"
            min={minimumPayout}
            max={availableBalance}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder={`Min ${minimumPayout}`}
            className="flex-1"
            testId={testId ? `${testId}-amount` : undefined}
          />
        </div>
        {parsedAmount > 0 && (
          <div className="mt-2 text-sm text-cfg-text-muted">
            ≈ ${usdAmount.toFixed(2)} USD (after {(processingFee * 100).toFixed(0)}% processing fee)
          </div>
        )}
      </div>

      {/* Payment Method */}
      <div className="mb-6">
        <label className="block text-sm text-cfg-text-muted mb-2">Payment Method</label>
        <Select
          value={selectedMethod}
          onChange={(e) => setSelectedMethod(e.target.value)}
          options={payoutMethods.map((method) => ({
            value: method.id,
            label: method.details ? `${method.label} - ${method.details}` : method.label,
          }))}
          placeholder="Select method..."
          testId={testId ? `${testId}-method` : undefined}
        />
      </div>

      {/* Warnings */}
      {parsedAmount > 0 && parsedAmount < minimumPayout && (
        <div className="mb-4 p-3 rounded bg-cfg-yellow/10 border border-cfg-yellow text-cfg-yellow text-sm">
          Minimum payout is {minimumPayout.toLocaleString()} Story Credits
        </div>
      )}

      {parsedAmount > availableBalance && (
        <div className="mb-4 p-3 rounded bg-cfg-red/10 border border-cfg-red text-cfg-red text-sm">
          Amount exceeds available balance
        </div>
      )}

      {/* Request Button */}
      <Button
        variant="primary"
        onClick={handlePayout}
        disabled={!canPayout || isLoading}
        isLoading={isLoading}
        className="w-full"
        testId={testId ? `${testId}-submit` : undefined}
      >
        Request Payout
      </Button>

      <div className="mt-4 text-xs text-cfg-text-muted text-center">
        Payouts are processed within 3-5 business days
      </div>
    </div>
  );
}
