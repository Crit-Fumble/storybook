
import { render, screen, fireEvent } from '@testing-library/react';
import { ContainerControlPanel, type ContainerInfo } from './ContainerControlPanel';

const createContainer = (
  id: string,
  campaignId: string,
  campaignName: string,
  status: 'stopped' | 'starting' | 'running' | 'error',
  overrides: Partial<ContainerInfo> = {}
): ContainerInfo => ({
  id,
  campaignId,
  campaignName,
  status,
  containerId: status === 'running' ? `container-${id}` : null,
  containerPort: status === 'running' ? 30000 + parseInt(id) : null,
  lastActiveAt: status === 'running' ? new Date() : null,
  ...overrides,
});

const containers: ContainerInfo[] = [
  createContainer('1', 'campaign-1', 'Dragon Quest', 'running'),
  createContainer('2', 'campaign-2', 'Sword Coast', 'stopped'),
  createContainer('3', 'campaign-3', 'Curse of Strahd', 'starting'),
  createContainer('4', 'campaign-4', 'Lost Mine', 'error'),
];

describe('ContainerControlPanel', () => {
  describe('Header', () => {
    it('renders Container Management header', () => {
      render(<ContainerControlPanel containers={containers} />);

      expect(screen.getByText('Container Management')).toBeInTheDocument();
    });

    it('shows status summary with counts', () => {
      render(<ContainerControlPanel containers={containers} />);

      expect(screen.getByText(/1 running/)).toBeInTheDocument();
      expect(screen.getByText(/1 starting/)).toBeInTheDocument();
      expect(screen.getByText(/1 stopped/)).toBeInTheDocument();
      expect(screen.getByText(/1 error/)).toBeInTheDocument();
    });

    it('shows no containers message when empty', () => {
      render(<ContainerControlPanel containers={[]} />);

      expect(screen.getByText('No containers configured')).toBeInTheDocument();
    });
  });

  describe('Empty state', () => {
    it('shows empty state when no containers', () => {
      render(<ContainerControlPanel containers={[]} />);

      expect(screen.getByTestId('container-control-panel-empty')).toBeInTheDocument();
      expect(screen.getByText('No Containers')).toBeInTheDocument();
    });

    it('does not show empty state when containers exist', () => {
      render(<ContainerControlPanel containers={containers} />);

      expect(screen.queryByTestId('container-control-panel-empty')).not.toBeInTheDocument();
    });
  });

  describe('Container grid', () => {
    it('renders container cards', () => {
      render(<ContainerControlPanel containers={containers} />);

      expect(screen.getByTestId('container-control-panel-container-1')).toBeInTheDocument();
      expect(screen.getByTestId('container-control-panel-container-2')).toBeInTheDocument();
      expect(screen.getByTestId('container-control-panel-container-3')).toBeInTheDocument();
      expect(screen.getByTestId('container-control-panel-container-4')).toBeInTheDocument();
    });

    it('renders grid wrapper', () => {
      render(<ContainerControlPanel containers={containers} />);

      expect(screen.getByTestId('container-control-panel-grid')).toBeInTheDocument();
    });
  });

  describe('Stop All button', () => {
    it('shows Stop All button when running containers exist', () => {
      render(
        <ContainerControlPanel
          containers={containers}
          onStopAll={() => {}}
        />
      );

      expect(screen.getByTestId('container-control-panel-stop-all-btn')).toBeInTheDocument();
    });

    it('does not show Stop All button when no running containers', () => {
      const stoppedContainers = [
        createContainer('1', 'c-1', 'Campaign 1', 'stopped'),
        createContainer('2', 'c-2', 'Campaign 2', 'stopped'),
      ];

      render(
        <ContainerControlPanel
          containers={stoppedContainers}
          onStopAll={() => {}}
        />
      );

      expect(screen.queryByTestId('container-control-panel-stop-all-btn')).not.toBeInTheDocument();
    });

    it('does not show Stop All button when showStopAll is false', () => {
      render(
        <ContainerControlPanel
          containers={containers}
          onStopAll={() => {}}
          showStopAll={false}
        />
      );

      expect(screen.queryByTestId('container-control-panel-stop-all-btn')).not.toBeInTheDocument();
    });

    it('calls onStopAll when clicked', () => {
      const handleStopAll = jest.fn();
      render(
        <ContainerControlPanel
          containers={containers}
          onStopAll={handleStopAll}
        />
      );

      fireEvent.click(screen.getByTestId('container-control-panel-stop-all-btn'));
      expect(handleStopAll).toHaveBeenCalledTimes(1);
    });

    it('disables Stop All button when isStoppingAll', () => {
      render(
        <ContainerControlPanel
          containers={containers}
          onStopAll={() => {}}
          isStoppingAll={true}
        />
      );

      expect(screen.getByTestId('container-control-panel-stop-all-btn')).toBeDisabled();
    });
  });

  describe('Container actions', () => {
    it('calls onStart with campaignId when start clicked', () => {
      const handleStart = jest.fn();
      const stoppedContainers = [createContainer('1', 'campaign-1', 'Test', 'stopped')];

      render(
        <ContainerControlPanel
          containers={stoppedContainers}
          onStart={handleStart}
        />
      );

      fireEvent.click(screen.getByTestId('container-control-panel-container-1-start-btn'));
      expect(handleStart).toHaveBeenCalledWith('campaign-1');
    });

    it('calls onStop with campaignId when stop clicked', () => {
      const handleStop = jest.fn();
      const runningContainers = [createContainer('1', 'campaign-1', 'Test', 'running')];

      render(
        <ContainerControlPanel
          containers={runningContainers}
          onStop={handleStop}
        />
      );

      fireEvent.click(screen.getByTestId('container-control-panel-container-1-stop-btn'));
      expect(handleStop).toHaveBeenCalledWith('campaign-1');
    });

    it('calls onRestart with campaignId when restart clicked', () => {
      const handleRestart = jest.fn();
      const runningContainers = [createContainer('1', 'campaign-1', 'Test', 'running')];

      render(
        <ContainerControlPanel
          containers={runningContainers}
          onRestart={handleRestart}
        />
      );

      fireEvent.click(screen.getByTestId('container-control-panel-container-1-restart-btn'));
      expect(handleRestart).toHaveBeenCalledWith('campaign-1');
    });

    it('sets loading state on specific container', () => {
      const stoppedContainers = [
        createContainer('1', 'campaign-1', 'Test 1', 'stopped'),
        createContainer('2', 'campaign-2', 'Test 2', 'stopped'),
      ];

      render(
        <ContainerControlPanel
          containers={stoppedContainers}
          onStart={() => {}}
          loadingContainerId="campaign-1"
        />
      );

      expect(screen.getByTestId('container-control-panel-container-1-start-btn')).toBeDisabled();
      expect(screen.getByTestId('container-control-panel-container-2-start-btn')).not.toBeDisabled();
    });
  });

  describe('Resource summary', () => {
    it('shows summary when running containers exist', () => {
      render(<ContainerControlPanel containers={containers} />);

      expect(screen.getByTestId('container-control-panel-summary')).toBeInTheDocument();
    });

    it('does not show summary when no running containers', () => {
      const stoppedContainers = [createContainer('1', 'c-1', 'Test', 'stopped')];

      render(<ContainerControlPanel containers={stoppedContainers} />);

      expect(screen.queryByTestId('container-control-panel-summary')).not.toBeInTheDocument();
    });

    it('shows correct counts in summary', () => {
      render(<ContainerControlPanel containers={containers} />);

      // 1 running + 1 starting = 2 active
      expect(screen.getByTestId('container-control-panel-active-count')).toHaveTextContent('2');
      expect(screen.getByTestId('container-control-panel-stopped-count')).toHaveTextContent('1');
      expect(screen.getByTestId('container-control-panel-error-count')).toHaveTextContent('1');
      expect(screen.getByTestId('container-control-panel-total-count')).toHaveTextContent('4');
    });
  });

  describe('TestId and className', () => {
    it('uses default testId', () => {
      render(<ContainerControlPanel containers={containers} />);
      expect(screen.getByTestId('container-control-panel')).toBeInTheDocument();
    });

    it('uses custom testId', () => {
      render(<ContainerControlPanel containers={containers} testId="custom-panel" />);
      expect(screen.getByTestId('custom-panel')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<ContainerControlPanel containers={containers} className="custom-class" />);
      expect(screen.getByTestId('container-control-panel')).toHaveClass('custom-class');
    });
  });
});
