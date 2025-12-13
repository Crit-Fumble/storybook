// Economy Types
// Re-exports core API types and UI-specific types

// Core types from @crit-fumble/core for API interactions
export type {
  EconomyTransactionType,
  EconomyCurrency,
  EconomyTransactionStatus,
  EconomyPayoutStatus,
  EconomyPayoutMethod,
  UserWallet,
  EconomyTransaction,
  EconomyPayout,
  EconomyStats,
} from '@crit-fumble/core/types';

// UI-specific transaction types (more granular than API types)
export type UITransactionType =
  | 'tip_received'
  | 'tip_sent'
  | 'purchase'
  | 'earned'
  | 'refund'
  | 'payout';

// UI currency type (includes display variants)
export type UICurrency = 'crit-coins' | 'story-credits' | 'usd';

// Map core API types to UI types
export function mapApiTransactionToUI(
  transaction: import('@crit-fumble/core/types').EconomyTransaction,
  currentUserId: string
): UITransactionType {
  switch (transaction.type) {
    case 'tip':
      return transaction.fromUserId === currentUserId ? 'tip_sent' : 'tip_received';
    case 'purchase':
      return 'purchase';
    case 'payout':
      return 'payout';
    case 'refund':
      return 'refund';
    case 'bonus':
      return 'earned';
    default:
      return 'earned';
  }
}

export function mapApiCurrencyToUI(
  currency: import('@crit-fumble/core/types').EconomyCurrency
): UICurrency {
  switch (currency) {
    case 'crit_coins':
      return 'crit-coins';
    case 'story_credits':
      return 'story-credits';
    case 'usd_cents':
      return 'usd';
    default:
      return 'crit-coins';
  }
}
