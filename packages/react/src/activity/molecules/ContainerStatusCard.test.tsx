import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ContainerStatusCard } from './ContainerStatusCard';
import type { ContainerStatus } from '../types';

describe('ContainerStatusCard', () => {
  describe('Status display', () => {
    it('shows stopped status', () => {
      render(<ContainerStatusCard status="stopped" />);

      expect(screen.getByTestId('container-status-card-status')).toHaveTextContent('Stopped');
    });

    it('shows starting status', () => {
      render(<ContainerStatusCard status="starting" />);

      expect(screen.getByTestId('container-status-card-status')).toHaveTextContent('Starting');
    });

    it('shows running status', () => {
      render(<ContainerStatusCard status="running" />);

      expect(screen.getByTestId('container-status-card-status')).toHaveTextContent('Running');
    });

    it('shows error status', () => {
      render(<ContainerStatusCard status="error" />);

      expect(screen.getByTestId('container-status-card-status')).toHaveTextContent('Error');
    });
  });

  describe('Title', () => {
    it('shows default title when no campaign name', () => {
      render(<ContainerStatusCard status="stopped" />);

      expect(screen.getByTestId('container-status-card-title')).toHaveTextContent('VTT Container');
    });

    it('shows campaign name in title', () => {
      render(<ContainerStatusCard status="running" campaignName="Dragon Quest" />);

      expect(screen.getByTestId('container-status-card-title')).toHaveTextContent('Dragon Quest Container');
    });
  });

  describe('Container details', () => {
    it('shows container ID when provided', () => {
      render(
        <ContainerStatusCard
          status="running"
          containerId="abc123def456789"
        />
      );

      expect(screen.getByTestId('container-status-card-container-id')).toHaveTextContent('abc123def456');
    });

    it('shows port when provided', () => {
      render(
        <ContainerStatusCard
          status="running"
          containerPort={30000}
        />
      );

      expect(screen.getByTestId('container-status-card-port')).toHaveTextContent('30000');
    });

    it('shows last active when provided', () => {
      const lastActive = new Date(Date.now() - 5 * 60 * 1000); // 5 minutes ago
      render(
        <ContainerStatusCard
          status="running"
          lastActiveAt={lastActive}
        />
      );

      expect(screen.getByTestId('container-status-card-last-active')).toHaveTextContent('5m ago');
    });

    it('shows no details message when no details provided', () => {
      render(<ContainerStatusCard status="stopped" />);

      expect(screen.getByTestId('container-status-card-no-details')).toBeInTheDocument();
    });

    it('does not show no details message when details provided', () => {
      render(
        <ContainerStatusCard
          status="running"
          containerId="abc123"
        />
      );

      expect(screen.queryByTestId('container-status-card-no-details')).not.toBeInTheDocument();
    });
  });

  describe('Actions - Stopped', () => {
    it('shows Start button when stopped and onStart provided', () => {
      render(
        <ContainerStatusCard
          status="stopped"
          onStart={() => {}}
        />
      );

      expect(screen.getByTestId('container-status-card-start-btn')).toBeInTheDocument();
    });

    it('calls onStart when Start button clicked', () => {
      const handleStart = vi.fn();
      render(
        <ContainerStatusCard
          status="stopped"
          onStart={handleStart}
        />
      );

      fireEvent.click(screen.getByTestId('container-status-card-start-btn'));
      expect(handleStart).toHaveBeenCalledTimes(1);
    });

    it('disables Start button when loading', () => {
      render(
        <ContainerStatusCard
          status="stopped"
          onStart={() => {}}
          isLoading={true}
        />
      );

      expect(screen.getByTestId('container-status-card-start-btn')).toBeDisabled();
    });
  });

  describe('Actions - Running', () => {
    it('shows Stop button when running and onStop provided', () => {
      render(
        <ContainerStatusCard
          status="running"
          onStop={() => {}}
        />
      );

      expect(screen.getByTestId('container-status-card-stop-btn')).toBeInTheDocument();
    });

    it('shows Restart button when running and onRestart provided', () => {
      render(
        <ContainerStatusCard
          status="running"
          onRestart={() => {}}
        />
      );

      expect(screen.getByTestId('container-status-card-restart-btn')).toBeInTheDocument();
    });

    it('calls onStop when Stop button clicked', () => {
      const handleStop = vi.fn();
      render(
        <ContainerStatusCard
          status="running"
          onStop={handleStop}
        />
      );

      fireEvent.click(screen.getByTestId('container-status-card-stop-btn'));
      expect(handleStop).toHaveBeenCalledTimes(1);
    });

    it('calls onRestart when Restart button clicked', () => {
      const handleRestart = vi.fn();
      render(
        <ContainerStatusCard
          status="running"
          onRestart={handleRestart}
        />
      );

      fireEvent.click(screen.getByTestId('container-status-card-restart-btn'));
      expect(handleRestart).toHaveBeenCalledTimes(1);
    });
  });

  describe('Actions - Starting', () => {
    it('shows starting message when status is starting', () => {
      render(<ContainerStatusCard status="starting" />);

      expect(screen.getByText('Container is starting...')).toBeInTheDocument();
    });

    it('does not show Start button when starting', () => {
      render(
        <ContainerStatusCard
          status="starting"
          onStart={() => {}}
        />
      );

      expect(screen.queryByTestId('container-status-card-start-btn')).not.toBeInTheDocument();
    });
  });

  describe('Actions - Error', () => {
    it('shows Retry button when error and onStart provided', () => {
      render(
        <ContainerStatusCard
          status="error"
          onStart={() => {}}
        />
      );

      expect(screen.getByTestId('container-status-card-retry-btn')).toBeInTheDocument();
    });

    it('calls onStart when Retry button clicked', () => {
      const handleStart = vi.fn();
      render(
        <ContainerStatusCard
          status="error"
          onStart={handleStart}
        />
      );

      fireEvent.click(screen.getByTestId('container-status-card-retry-btn'));
      expect(handleStart).toHaveBeenCalledTimes(1);
    });
  });

  describe('TestId and className', () => {
    it('uses default testId', () => {
      render(<ContainerStatusCard status="stopped" />);
      expect(screen.getByTestId('container-status-card')).toBeInTheDocument();
    });

    it('uses custom testId', () => {
      render(<ContainerStatusCard status="stopped" testId="custom-card" />);
      expect(screen.getByTestId('custom-card')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<ContainerStatusCard status="stopped" className="custom-class" />);
      expect(screen.getByTestId('container-status-card')).toHaveClass('custom-class');
    });
  });
});
