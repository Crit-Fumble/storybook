import { clsx } from 'clsx';
import { CritCoinBalance } from '../molecules/CritCoinBalance';
import { StoryCreditBalance } from '../molecules/StoryCreditBalance';
import { Card, CardHeader, CardTitle, CardContent } from '../../molecules/Card';

export interface EconomyStats {
  /** Crit-Coins (purchased, used for tipping) */
  critCoins: number;
  /** Story Credits (earned from tips, can be cashed out) */
  storyCredits: number;
  /** Total Story Credits earned from tips */
  totalEarned: number;
  /** Total Crit-Coins spent on tips */
  totalSpent: number;
  /** Story Credits in pending payouts */
  pendingPayouts: number;
}

export interface EconomyDashboardProps {
  stats: EconomyStats;
  showDetailedStats?: boolean;
  className?: string;
  testId?: string;
}

export function EconomyDashboard({
  stats,
  showDetailedStats = true,
  className,
  testId,
}: EconomyDashboardProps) {
  return (
    <div className={clsx('space-y-4', className)} data-testid={testId}>
      {/* Balances */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CritCoinBalance
          balance={stats.critCoins}
          size="lg"
          className="w-full justify-center"
          testId={testId ? `${testId}-crit-coins` : undefined}
        />
        <StoryCreditBalance
          balance={stats.storyCredits}
          size="lg"
          className="w-full justify-center"
          testId={testId ? `${testId}-story-credits` : undefined}
        />
      </div>

      {/* Detailed Stats */}
      {showDetailedStats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Total Earned</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-cfg-green">
                {stats.totalEarned.toLocaleString()}
              </div>
              <div className="text-sm text-cfg-text-muted">Story Credits</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Total Spent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-cfg-text-normal">
                {stats.totalSpent.toLocaleString()}
              </div>
              <div className="text-sm text-cfg-text-muted">Crit-Coins</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pending Payouts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-cfg-yellow">
                {stats.pendingPayouts.toLocaleString()}
              </div>
              <div className="text-sm text-cfg-text-muted">Story Credits</div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
