
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { VTTViewer } from './VTTViewer';

describe('VTTViewer', () => {
  const defaultProps = {
    campaignId: 'campaign-123',
    status: 'stopped' as const,
  };

  describe('stopped state', () => {
    it('shows stopped message', () => {
      render(<VTTViewer {...defaultProps} status="stopped" />);
      expect(screen.getByText('VTT Not Running')).toBeInTheDocument();
    });

    it('shows hint to launch', () => {
      render(<VTTViewer {...defaultProps} status="stopped" />);
      expect(screen.getByText('Launch the VTT to start your session')).toBeInTheDocument();
    });

    it('shows dice emoji icon', () => {
      render(<VTTViewer {...defaultProps} status="stopped" />);
      expect(screen.getByText('🎲')).toBeInTheDocument();
    });

    it('shows launch button when onLaunch is provided', () => {
      render(<VTTViewer {...defaultProps} status="stopped" onLaunch={() => {}} />);
      expect(screen.getByRole('button', { name: 'Launch VTT' })).toBeInTheDocument();
    });

    it('does not show launch button when onLaunch is not provided', () => {
      render(<VTTViewer {...defaultProps} status="stopped" />);
      expect(screen.queryByRole('button', { name: 'Launch VTT' })).not.toBeInTheDocument();
    });

    it('calls onLaunch when launch button is clicked', () => {
      const onLaunch = jest.fn();
      render(<VTTViewer {...defaultProps} status="stopped" onLaunch={onLaunch} />);

      fireEvent.click(screen.getByRole('button', { name: 'Launch VTT' }));
      expect(onLaunch).toHaveBeenCalledTimes(1);
    });
  });

  describe('starting state', () => {
    it('shows starting message', () => {
      render(<VTTViewer {...defaultProps} status="starting" />);
      expect(screen.getByText('Starting VTT Container...')).toBeInTheDocument();
    });

    it('shows setup hint', () => {
      render(<VTTViewer {...defaultProps} status="starting" />);
      expect(screen.getByText('This may take a moment for first-time setup')).toBeInTheDocument();
    });

    it('shows spinner', () => {
      render(<VTTViewer {...defaultProps} status="starting" />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });
  });

  describe('running state (loading)', () => {
    it('shows loading spinner when running with port', () => {
      render(<VTTViewer {...defaultProps} status="running" containerPort={30000} />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('shows loading message', () => {
      render(<VTTViewer {...defaultProps} status="running" containerPort={30000} />);
      expect(screen.getByText('Loading FoundryVTT...')).toBeInTheDocument();
    });

    it('renders iframe when running with port', () => {
      render(<VTTViewer {...defaultProps} status="running" containerPort={30000} />);
      const iframe = document.querySelector('iframe');
      expect(iframe).toBeInTheDocument();
    });

    it('constructs correct iframe URL', () => {
      render(<VTTViewer {...defaultProps} status="running" containerPort={30000} />);
      const iframe = document.querySelector('iframe');
      expect(iframe).toHaveAttribute('src', 'https://vtt.fumblebot.com/campaign-123/');
    });

    it('uses custom vttBaseUrl', () => {
      render(
        <VTTViewer
          {...defaultProps}
          status="running"
          containerPort={30000}
          vttBaseUrl="custom.vtt.com"
        />
      );
      const iframe = document.querySelector('iframe');
      expect(iframe).toHaveAttribute('src', 'https://custom.vtt.com/campaign-123/');
    });
  });

  describe('running without port (error)', () => {
    it('shows error when running but no port', () => {
      render(<VTTViewer {...defaultProps} status="running" />);
      expect(screen.getByText('Unable to Load VTT')).toBeInTheDocument();
    });

    it('shows port error message', () => {
      render(<VTTViewer {...defaultProps} status="running" />);
      expect(screen.getByText('Container is running but no port assigned')).toBeInTheDocument();
    });
  });

  describe('error state', () => {
    it('shows error message', () => {
      render(<VTTViewer {...defaultProps} status="error" />);
      expect(screen.getByText('Unable to Load VTT')).toBeInTheDocument();
    });

    it('shows warning emoji', () => {
      render(<VTTViewer {...defaultProps} status="error" />);
      expect(screen.getByText('⚠️')).toBeInTheDocument();
    });

    it('shows error details', () => {
      render(<VTTViewer {...defaultProps} status="error" />);
      expect(screen.getByText('Container encountered an error')).toBeInTheDocument();
    });

    it('shows retry button when onLaunch is provided', () => {
      render(<VTTViewer {...defaultProps} status="error" onLaunch={() => {}} />);
      expect(screen.getByRole('button', { name: 'Try Again' })).toBeInTheDocument();
    });

    it('calls onLaunch when retry button is clicked', () => {
      const onLaunch = jest.fn();
      render(<VTTViewer {...defaultProps} status="error" onLaunch={onLaunch} />);

      fireEvent.click(screen.getByRole('button', { name: 'Try Again' }));
      expect(onLaunch).toHaveBeenCalledTimes(1);
    });
  });

  describe('iframe behavior', () => {
    it('has correct iframe attributes', () => {
      render(<VTTViewer {...defaultProps} status="running" containerPort={30000} />);
      const iframe = document.querySelector('iframe');

      expect(iframe).toHaveAttribute('allow', 'fullscreen; microphone; camera');
      expect(iframe).toHaveAttribute('title', 'FoundryVTT');
    });

    it('iframe starts hidden during load', () => {
      render(<VTTViewer {...defaultProps} status="running" containerPort={30000} />);
      const iframe = document.querySelector('iframe');
      expect(iframe).toHaveClass('opacity-0');
    });
  });

  describe('styling', () => {
    it('merges custom className', () => {
      const { container } = render(
        <VTTViewer {...defaultProps} status="stopped" className="custom-class" />
      );
      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('applies base container styling', () => {
      const { container } = render(<VTTViewer {...defaultProps} status="stopped" />);
      expect(container.firstChild).toHaveClass(
        'relative',
        'bg-cfg-background-tertiary',
        'rounded-lg',
        'overflow-hidden',
        'border',
        'border-cfg-border'
      );
    });
  });
});
