import type { Meta, StoryObj } from '@storybook/react';
import { PayoutPanel } from './PayoutPanel';

const meta: Meta<typeof PayoutPanel> = {
  title: 'Shared/Economy/Organisms/PayoutPanel',
  component: PayoutPanel,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof PayoutPanel>;

export const Default: Story = {
  args: {
    availableBalance: 1500,
    minimumPayout: 100,
    exchangeRate: 1.0, // 1 Story Credit = $1.00 USD
    processingFee: 0.02, // 2% processing fee
    payoutMethods: [
      { id: 'paypal', type: 'paypal', label: 'PayPal', details: 'user@example.com' },
      { id: 'stripe', type: 'stripe', label: 'Stripe Connect' },
      { id: 'bank', type: 'bank_transfer', label: 'Bank Transfer' },
    ],
    onRequestPayout: async (amount: number, methodId: string) => {
      console.log(`Requesting payout of ${amount} Story Credits via ${methodId}`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const afterFee = amount * 0.98; // 2% fee
      alert(`Payout request submitted: ${amount} Story Credits ($${afterFee.toFixed(2)} USD after fees) via ${methodId}`);
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Default payout panel showing Story Credit balance with 2% processing fee. Story Credits are earned from tips (1 CC tip = 0.75 SC earned) and can be cashed out at 1 SC = $1 USD.',
      },
    },
  },
};

export const LowBalance: Story = {
  args: {
    availableBalance: 50,
    minimumPayout: 100,
    exchangeRate: 1.0,
    processingFee: 0.02,
    payoutMethods: [
      { id: 'paypal', type: 'paypal', label: 'PayPal', details: 'user@example.com' },
    ],
    onRequestPayout: async () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'User has insufficient Story Credits for minimum payout (50 SC < 100 SC minimum).',
      },
    },
  },
};

export const HighBalance: Story = {
  args: {
    availableBalance: 50000,
    minimumPayout: 100,
    exchangeRate: 1.0,
    processingFee: 0.02,
    payoutMethods: [
      { id: 'paypal', type: 'paypal', label: 'PayPal', details: 'dm@example.com' },
      { id: 'stripe', type: 'stripe', label: 'Stripe Connect' },
    ],
    onRequestPayout: async () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'High-earning creator with 50,000 Story Credits available ($49,000 USD after 2% processing fee).',
      },
    },
  },
};

export const CustomConversion: Story = {
  args: {
    availableBalance: 10000,
    minimumPayout: 500,
    exchangeRate: 1.0,
    processingFee: 0.05, // Higher 5% processing fee example
    payoutMethods: [
      { id: 'crypto', type: 'bank_transfer', label: 'Crypto Wallet' },
    ],
    onRequestPayout: async () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Example with custom processing fee (5% instead of default 2%). The conversion rates are configurable via props for testing different fee structures.',
      },
    },
  },
};
