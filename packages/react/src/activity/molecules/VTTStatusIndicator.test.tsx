import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { VTTStatusIndicator } from './VTTStatusIndicator';

describe('VTTStatusIndicator', () => {
  describe('rendering', () => {
    it('renders the indicator', () => {
      const { container } = render(<VTTStatusIndicator status="stopped" />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('renders status dot', () => {
      const { container } = render(<VTTStatusIndicator status="running" />);
      const dot = container.querySelector('.rounded-full');
      expect(dot).toBeInTheDocument();
    });
  });

  describe('status labels', () => {
    it('displays Stopped for stopped status', () => {
      render(<VTTStatusIndicator status="stopped" />);
      expect(screen.getByText('Stopped')).toBeInTheDocument();
    });

    it('displays Starting... for starting status', () => {
      render(<VTTStatusIndicator status="starting" />);
      expect(screen.getByText('Starting...')).toBeInTheDocument();
    });

    it('displays Running for running status', () => {
      render(<VTTStatusIndicator status="running" />);
      expect(screen.getByText('Running')).toBeInTheDocument();
    });

    it('displays Error for error status', () => {
      render(<VTTStatusIndicator status="error" />);
      expect(screen.getByText('Error')).toBeInTheDocument();
    });
  });

  describe('status dot colors', () => {
    it('applies muted color for stopped', () => {
      const { container } = render(<VTTStatusIndicator status="stopped" />);
      const dot = container.querySelector('.bg-cfg-text-muted');
      expect(dot).toBeInTheDocument();
    });

    it('applies yellow with pulse for starting', () => {
      const { container } = render(<VTTStatusIndicator status="starting" />);
      const dot = container.querySelector('.bg-cfg-yellow');
      expect(dot).toBeInTheDocument();
      expect(dot).toHaveClass('animate-pulse');
    });

    it('applies green for running', () => {
      const { container } = render(<VTTStatusIndicator status="running" />);
      const dot = container.querySelector('.bg-cfg-green');
      expect(dot).toBeInTheDocument();
    });

    it('applies red for error', () => {
      const { container } = render(<VTTStatusIndicator status="error" />);
      const dot = container.querySelector('.bg-cfg-red');
      expect(dot).toBeInTheDocument();
    });
  });

  describe('showLabel prop', () => {
    it('shows label by default', () => {
      render(<VTTStatusIndicator status="running" />);
      expect(screen.getByText('Running')).toBeInTheDocument();
    });

    it('hides label when showLabel is false', () => {
      render(<VTTStatusIndicator status="running" showLabel={false} />);
      expect(screen.queryByText('Running')).not.toBeInTheDocument();
    });
  });

  describe('lastActiveAt', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('shows last active time for stopped status', () => {
      const now = new Date('2024-01-15T12:00:00Z');
      vi.setSystemTime(now);

      const lastActive = new Date('2024-01-15T11:30:00Z');
      render(<VTTStatusIndicator status="stopped" lastActiveAt={lastActive} />);

      expect(screen.getByText(/Last active: 30m ago/)).toBeInTheDocument();
    });

    it('shows "Just now" for very recent activity', () => {
      const now = new Date('2024-01-15T12:00:00Z');
      vi.setSystemTime(now);

      const lastActive = new Date('2024-01-15T11:59:45Z');
      render(<VTTStatusIndicator status="stopped" lastActiveAt={lastActive} />);

      expect(screen.getByText(/Last active: Just now/)).toBeInTheDocument();
    });

    it('shows hours for older activity', () => {
      const now = new Date('2024-01-15T12:00:00Z');
      vi.setSystemTime(now);

      const lastActive = new Date('2024-01-15T09:00:00Z');
      render(<VTTStatusIndicator status="stopped" lastActiveAt={lastActive} />);

      expect(screen.getByText(/Last active: 3h ago/)).toBeInTheDocument();
    });

    it('shows days for much older activity', () => {
      const now = new Date('2024-01-15T12:00:00Z');
      vi.setSystemTime(now);

      const lastActive = new Date('2024-01-13T12:00:00Z');
      render(<VTTStatusIndicator status="stopped" lastActiveAt={lastActive} />);

      expect(screen.getByText(/Last active: 2d ago/)).toBeInTheDocument();
    });

    it('does not show last active for running status', () => {
      const now = new Date('2024-01-15T12:00:00Z');
      vi.setSystemTime(now);

      const lastActive = new Date('2024-01-15T11:30:00Z');
      render(<VTTStatusIndicator status="running" lastActiveAt={lastActive} />);

      expect(screen.queryByText(/Last active/)).not.toBeInTheDocument();
    });
  });

  describe('styling', () => {
    it('merges custom className', () => {
      const { container } = render(
        <VTTStatusIndicator status="running" className="custom-class" />
      );
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });
});
