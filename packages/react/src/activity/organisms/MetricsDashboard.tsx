import { clsx } from 'clsx';
import { MetricsCard } from '../molecules/MetricsCard';

export interface CommandStat {
  command: string;
  count: number;
}

export interface DiceStats {
  totalRolls: number;
  crits: number;
  fumbles: number;
  average: number;
}

export interface MetricsData {
  commandUsage: {
    total: number;
    topCommands: CommandStat[];
  };
  diceStats: DiceStats;
  activeSessions: number;
  activeCampaigns: number;
  activeUsers: number;
}

export type MetricsPeriod = '24h' | '7d' | '30d';

export interface MetricsDashboardProps {
  /** Metrics data to display */
  data?: MetricsData;
  /** Currently selected time period */
  period: MetricsPeriod;
  /** Callback when period changes */
  onPeriodChange: (period: MetricsPeriod) => void;
  /** Loading state */
  isLoading?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

function DiceIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  );
}

function CommandIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
    </svg>
  );
}

function CampaignIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  );
}

function SessionIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  );
}

export function MetricsDashboard({
  data,
  period,
  onPeriodChange,
  isLoading = false,
  className,
  testId = 'metrics-dashboard',
}: MetricsDashboardProps) {
  const periods: { value: MetricsPeriod; label: string }[] = [
    { value: '24h', label: '24h' },
    { value: '7d', label: '7d' },
    { value: '30d', label: '30d' },
  ];

  return (
    <div data-testid={testId} className={clsx('space-y-6', className)}>
      {/* Period Selector */}
      <div className="flex items-center justify-between">
        <h2 className="text-discord-text-normal text-lg font-display font-semibold">
          Dashboard
        </h2>
        <div className="flex gap-1 bg-discord-background-tertiary rounded-lg p-1">
          {periods.map((p) => (
            <button
              key={p.value}
              onClick={() => onPeriodChange(p.value)}
              className={clsx(
                'px-3 py-1 text-sm font-medium rounded transition-colors',
                period === p.value
                  ? 'bg-discord-primary text-white'
                  : 'text-discord-text-muted hover:text-discord-text-normal'
              )}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Top Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <MetricsCard
          title="Commands Used"
          value={data?.commandUsage.total ?? 0}
          icon={<CommandIcon className="w-6 h-6" />}
          isLoading={isLoading}
        />
        <MetricsCard
          title="Dice Rolls"
          value={data?.diceStats.totalRolls ?? 0}
          subtitle={`Avg: ${data?.diceStats.average?.toFixed(1) ?? '0.0'}`}
          icon={<DiceIcon className="w-6 h-6" />}
          isLoading={isLoading}
        />
        <MetricsCard
          title="Active Sessions"
          value={data?.activeSessions ?? 0}
          icon={<SessionIcon className="w-6 h-6" />}
          isLoading={isLoading}
        />
        <MetricsCard
          title="Campaigns"
          value={data?.activeCampaigns ?? 0}
          icon={<CampaignIcon className="w-6 h-6" />}
          isLoading={isLoading}
        />
        <MetricsCard
          title="Active Users"
          value={data?.activeUsers ?? 0}
          icon={<UsersIcon className="w-6 h-6" />}
          isLoading={isLoading}
        />
      </div>

      {/* Dice Stats Detail */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-discord-background-secondary rounded-lg p-4">
          <h3 className="text-discord-text-normal font-display font-semibold mb-4">
            Dice Statistics
          </h3>
          {isLoading ? (
            <div className="space-y-3 animate-pulse">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-8 bg-discord-background-tertiary rounded" />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-discord-text-muted">Critical Hits (Nat 20)</span>
                <span className="text-discord-green font-semibold">
                  {data?.diceStats.crits ?? 0}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-discord-text-muted">Fumbles (Nat 1)</span>
                <span className="text-discord-red font-semibold">
                  {data?.diceStats.fumbles ?? 0}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-discord-text-muted">Average Roll</span>
                <span className="text-discord-text-normal font-semibold">
                  {data?.diceStats.average?.toFixed(2) ?? '0.00'}
                </span>
              </div>
              {data && data.diceStats.totalRolls > 0 && (
                <div className="pt-2 border-t border-discord-background-tertiary">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-discord-text-muted">Crit Rate</span>
                    <span className="text-discord-green">
                      {((data.diceStats.crits / data.diceStats.totalRolls) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs mt-1">
                    <span className="text-discord-text-muted">Fumble Rate</span>
                    <span className="text-discord-red">
                      {((data.diceStats.fumbles / data.diceStats.totalRolls) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Top Commands */}
        <div className="bg-discord-background-secondary rounded-lg p-4">
          <h3 className="text-discord-text-normal font-display font-semibold mb-4">
            Top Commands
          </h3>
          {isLoading ? (
            <div className="space-y-2 animate-pulse">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-6 bg-discord-background-tertiary rounded" />
              ))}
            </div>
          ) : data?.commandUsage.topCommands.length ? (
            <div className="space-y-2">
              {data.commandUsage.topCommands.slice(0, 10).map((cmd, index) => (
                <div
                  key={cmd.command}
                  className="flex items-center justify-between py-1"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-discord-text-muted text-xs w-4">
                      {index + 1}.
                    </span>
                    <code className="text-discord-text-normal text-sm font-mono">
                      /{cmd.command}
                    </code>
                  </div>
                  <span className="text-discord-text-muted text-sm">
                    {cmd.count.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-discord-text-muted text-sm">No commands used yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
