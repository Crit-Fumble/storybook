import { Spinner } from '../../shared/atoms';
import { CenteredLayout } from '../../web/templates';

export interface WaitingPageProps {
  testId?: string;
}

export function WaitingPage({ testId = 'waiting-page' }: WaitingPageProps) {
  return (
    <CenteredLayout testId={testId}>
      <div className="flex flex-col items-center text-center">
        <Spinner size="lg" testId={`${testId}-spinner`} />
        <h2
          className="text-xl font-semibold text-discord-text-normal mt-6"
          data-testid={`${testId}-title`}
        >
          Waiting for Admin...
        </h2>
        <p
          className="text-discord-text-muted mt-2"
          data-testid={`${testId}-message`}
        >
          An administrator needs to start a campaign session.
        </p>
      </div>
    </CenteredLayout>
  );
}
