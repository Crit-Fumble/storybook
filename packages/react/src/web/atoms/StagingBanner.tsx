export interface StagingBannerProps {
  environment?: string;
  testId?: string;
}

export function StagingBanner({
  environment,
  testId = 'staging-banner'
}: StagingBannerProps) {
  const appEnv = environment || (typeof process !== 'undefined' ? process.env?.APP_ENV || process.env?.NODE_ENV : undefined);

  // Only show banner in staging environment
  if (appEnv !== 'staging') {
    return null;
  }

  return (
    <div
      className="bg-yellow-500 text-black py-2 px-4 text-center font-semibold text-sm sticky top-0 z-50"
      data-testid={testId}
    >
      ⚠️ STAGING ENVIRONMENT - This is a test environment. Data may be reset at any time.
    </div>
  );
}
