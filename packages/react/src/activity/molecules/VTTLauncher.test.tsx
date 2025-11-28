import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { VTTLauncher } from './VTTLauncher';
import type { FumbleCampaign } from '../types';

describe('VTTLauncher', () => {
  const mockCampaign: FumbleCampaign = {
    id: 'campaign-123',
    guildId: 'guild-456',
    name: 'Test Campaign',
    description: 'A test campaign for VTT',
    foundrySystemId: 'dnd5e',
    containerStatus: 'stopped',
  };

  describe('rendering', () => {
    it('renders campaign name', () => {
      render(<VTTLauncher campaign={mockCampaign} onLaunch={() => {}} />);
      expect(screen.getByText('Test Campaign')).toBeInTheDocument();
    });

    it('renders campaign description when provided', () => {
      render(<VTTLauncher campaign={mockCampaign} onLaunch={() => {}} />);
      expect(screen.getByText('A test campaign for VTT')).toBeInTheDocument();
    });

    it('does not render description when not provided', () => {
      const campaignNoDesc = { ...mockCampaign, description: undefined };
      render(<VTTLauncher campaign={campaignNoDesc} onLaunch={() => {}} />);
      expect(screen.queryByText('A test campaign for VTT')).not.toBeInTheDocument();
    });

    it('renders system info when provided', () => {
      render(<VTTLauncher campaign={mockCampaign} onLaunch={() => {}} />);
      expect(screen.getByText('System:')).toBeInTheDocument();
      expect(screen.getByText('dnd5e')).toBeInTheDocument();
    });

    it('does not render system info when not provided', () => {
      const campaignNoSystem = { ...mockCampaign, foundrySystemId: undefined };
      render(<VTTLauncher campaign={campaignNoSystem} onLaunch={() => {}} />);
      expect(screen.queryByText('System:')).not.toBeInTheDocument();
    });

    it('renders status indicator', () => {
      render(<VTTLauncher campaign={mockCampaign} onLaunch={() => {}} />);
      expect(screen.getByText('Stopped')).toBeInTheDocument();
    });
  });

  describe('button states', () => {
    it('shows Launch VTT button when stopped', () => {
      render(<VTTLauncher campaign={mockCampaign} onLaunch={() => {}} />);
      expect(screen.getByRole('button', { name: 'Launch VTT' })).toBeInTheDocument();
    });

    it('shows Stop VTT button when running', () => {
      const runningCampaign = { ...mockCampaign, containerStatus: 'running' as const };
      render(<VTTLauncher campaign={runningCampaign} onLaunch={() => {}} />);
      expect(screen.getByRole('button', { name: 'Stop VTT' })).toBeInTheDocument();
    });

    it('shows Starting... button when starting', () => {
      const startingCampaign = { ...mockCampaign, containerStatus: 'starting' as const };
      render(<VTTLauncher campaign={startingCampaign} onLaunch={() => {}} />);
      expect(screen.getByRole('button', { name: /Starting.../i })).toBeInTheDocument();
    });

    it('disables button when starting', () => {
      const startingCampaign = { ...mockCampaign, containerStatus: 'starting' as const };
      render(<VTTLauncher campaign={startingCampaign} onLaunch={() => {}} />);
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('applies primary variant when stopped', () => {
      render(<VTTLauncher campaign={mockCampaign} onLaunch={() => {}} />);
      const button = screen.getByRole('button', { name: 'Launch VTT' });
      expect(button).toHaveClass('btn-primary');
    });

    it('applies danger variant when running', () => {
      const runningCampaign = { ...mockCampaign, containerStatus: 'running' as const };
      render(<VTTLauncher campaign={runningCampaign} onLaunch={() => {}} />);
      const button = screen.getByRole('button', { name: 'Stop VTT' });
      expect(button).toHaveClass('btn-danger');
    });
  });

  describe('interactions', () => {
    it('calls onLaunch when launch button is clicked', () => {
      const onLaunch = vi.fn();
      render(<VTTLauncher campaign={mockCampaign} onLaunch={onLaunch} />);

      fireEvent.click(screen.getByRole('button', { name: 'Launch VTT' }));
      expect(onLaunch).toHaveBeenCalledWith(mockCampaign);
    });

    it('calls onStop when stop button is clicked and onStop is provided', () => {
      const runningCampaign = { ...mockCampaign, containerStatus: 'running' as const };
      const onLaunch = vi.fn();
      const onStop = vi.fn();
      render(<VTTLauncher campaign={runningCampaign} onLaunch={onLaunch} onStop={onStop} />);

      fireEvent.click(screen.getByRole('button', { name: 'Stop VTT' }));
      expect(onStop).toHaveBeenCalledWith(runningCampaign);
      expect(onLaunch).not.toHaveBeenCalled();
    });

    it('calls onLaunch when stop button is clicked and onStop is not provided', () => {
      const runningCampaign = { ...mockCampaign, containerStatus: 'running' as const };
      const onLaunch = vi.fn();
      render(<VTTLauncher campaign={runningCampaign} onLaunch={onLaunch} />);

      fireEvent.click(screen.getByRole('button', { name: 'Stop VTT' }));
      expect(onLaunch).toHaveBeenCalledWith(runningCampaign);
    });
  });

  describe('connection info', () => {
    const runningWithPort: FumbleCampaign = {
      ...mockCampaign,
      containerStatus: 'running',
      containerPort: 30000,
    };

    it('shows connection URL when running with port', () => {
      render(<VTTLauncher campaign={runningWithPort} onLaunch={() => {}} />);
      expect(screen.getByText('https://vtt.fumblebot.com/campaign-123/')).toBeInTheDocument();
    });

    it('shows connection info label', () => {
      render(<VTTLauncher campaign={runningWithPort} onLaunch={() => {}} />);
      expect(screen.getByText('Direct Connection URL (for FoundryVTT)')).toBeInTheDocument();
    });

    it('does not show connection info when stopped', () => {
      render(<VTTLauncher campaign={mockCampaign} onLaunch={() => {}} />);
      expect(screen.queryByText('Direct Connection URL (for FoundryVTT)')).not.toBeInTheDocument();
    });

    it('does not show connection info when running but no port', () => {
      const runningNoPort = { ...mockCampaign, containerStatus: 'running' as const };
      render(<VTTLauncher campaign={runningNoPort} onLaunch={() => {}} />);
      expect(screen.queryByText('Direct Connection URL (for FoundryVTT)')).not.toBeInTheDocument();
    });

    it('does not show connection info when showConnectionInfo is false', () => {
      render(
        <VTTLauncher
          campaign={runningWithPort}
          onLaunch={() => {}}
          showConnectionInfo={false}
        />
      );
      expect(screen.queryByText('Direct Connection URL (for FoundryVTT)')).not.toBeInTheDocument();
    });

    it('uses custom vttBaseUrl', () => {
      render(
        <VTTLauncher
          campaign={runningWithPort}
          onLaunch={() => {}}
          vttBaseUrl="custom.vtt.com"
        />
      );
      expect(screen.getByText('https://custom.vtt.com/campaign-123/')).toBeInTheDocument();
    });
  });

  describe('styling', () => {
    it('merges custom className', () => {
      const { container } = render(
        <VTTLauncher campaign={mockCampaign} onLaunch={() => {}} className="custom-class" />
      );
      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('applies base container styling', () => {
      const { container } = render(
        <VTTLauncher campaign={mockCampaign} onLaunch={() => {}} />
      );
      expect(container.firstChild).toHaveClass(
        'bg-cfg-background-secondary',
        'rounded-lg',
        'p-4',
        'border',
        'border-cfg-border'
      );
    });
  });
});
