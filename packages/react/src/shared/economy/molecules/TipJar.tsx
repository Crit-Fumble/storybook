import { useState } from 'react';
import { clsx } from 'clsx';
import { CritCoin } from '../atoms/CritCoin';
import { Button } from '../../atoms/Button';

export interface TipJarProps {
  recipientName: string;
  recipientAvatar?: string;
  onTip: (amount: number) => void | Promise<void>;
  suggestedAmounts?: number[];
  minAmount?: number;
  maxAmount?: number;
  userBalance?: number;
  className?: string;
  testId?: string;
}

export function TipJar({
  recipientName,
  recipientAvatar,
  onTip,
  suggestedAmounts = [1, 5, 10, 25],
  minAmount = 1,
  maxAmount = 1000,
  userBalance,
  className,
  testId,
}: TipJarProps) {
  const [customAmount, setCustomAmount] = useState('');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTip = async () => {
    const amount = selectedAmount || parseInt(customAmount);
    if (isNaN(amount) || amount < minAmount || amount > maxAmount) {
      return;
    }

    if (userBalance !== undefined && amount > userBalance) {
      return;
    }

    setIsLoading(true);
    try {
      await onTip(amount);
      setSelectedAmount(null);
      setCustomAmount('');
    } finally {
      setIsLoading(false);
    }
  };

  const canTip = () => {
    const amount = selectedAmount || parseInt(customAmount);
    if (isNaN(amount) || amount < minAmount || amount > maxAmount) {
      return false;
    }
    if (userBalance !== undefined && amount > userBalance) {
      return false;
    }
    return true;
  };

  return (
    <div
      className={clsx(
        'p-6 rounded-lg bg-cfg-background-primary border border-cfg-border',
        className
      )}
      data-testid={testId}
    >
      {/* Recipient Info */}
      <div className="flex items-center gap-3 mb-4">
        {recipientAvatar && (
          <img
            src={recipientAvatar}
            alt={recipientName}
            className="w-12 h-12 rounded-full"
          />
        )}
        <div>
          <h3 className="text-cfg-text-normal font-semibold">Tip {recipientName}</h3>
          <p className="text-cfg-text-muted text-sm">Show your appreciation!</p>
        </div>
      </div>

      {/* User Balance */}
      {userBalance !== undefined && (
        <div className="mb-4 flex items-center gap-2 text-sm text-cfg-text-muted">
          <span>Your balance:</span>
          <div className="flex items-center gap-1 font-semibold text-cfg-text-normal">
            <CritCoin size="xs" />
            <span>{userBalance.toLocaleString()}</span>
          </div>
        </div>
      )}

      {/* Suggested Amounts */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {suggestedAmounts.map((amount) => (
          <button
            key={amount}
            onClick={() => {
              setSelectedAmount(amount);
              setCustomAmount('');
            }}
            className={clsx(
              'px-3 py-2 rounded border transition-colors',
              'flex items-center justify-center gap-1',
              selectedAmount === amount
                ? 'bg-cfg-primary border-cfg-primary text-white'
                : 'bg-cfg-background-secondary border-cfg-border text-cfg-text-normal hover:border-cfg-primary'
            )}
            disabled={userBalance !== undefined && amount > userBalance}
          >
            <CritCoin size="xs" />
            <span className="font-semibold">{amount}</span>
          </button>
        ))}
      </div>

      {/* Custom Amount */}
      <div className="mb-4">
        <label className="block text-sm text-cfg-text-muted mb-2">Custom Amount</label>
        <div className="flex items-center gap-2">
          <CritCoin size="sm" />
          <input
            type="number"
            min={minAmount}
            max={maxAmount}
            value={customAmount}
            onChange={(e) => {
              setCustomAmount(e.target.value);
              setSelectedAmount(null);
            }}
            placeholder={`${minAmount}-${maxAmount}`}
            className="input flex-1"
            data-testid={testId ? `${testId}-custom-input` : undefined}
          />
        </div>
      </div>

      {/* Tip Button */}
      <Button
        variant="success"
        onClick={handleTip}
        disabled={!canTip() || isLoading}
        isLoading={isLoading}
        className="w-full"
        testId={testId ? `${testId}-submit` : undefined}
      >
        Send Tip
      </Button>
    </div>
  );
}
