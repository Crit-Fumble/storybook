import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatusIndicator } from './StatusIndicator';

describe('StatusIndicator', () => {
  describe('rendering', () => {
    it('renders the indicator', () => {
      render(<StatusIndicator status="active" testId="status" />);
      expect(screen.getByTestId('status')).toBeInTheDocument();
    });

    it('renders status dot', () => {
      render(<StatusIndicator status="active" testId="status" />);
      expect(screen.getByTestId('status-dot')).toBeInTheDocument();
    });

    it('renders label by default', () => {
      render(<StatusIndicator status="active" testId="status" />);
      expect(screen.getByTestId('status-label')).toBeInTheDocument();
    });
  });

  describe('status labels', () => {
    it('displays Active for active status', () => {
      render(<StatusIndicator status="active" testId="status" />);
      expect(screen.getByTestId('status-label')).toHaveTextContent('Active');
    });

    it('displays Stopped for stopped status', () => {
      render(<StatusIndicator status="stopped" testId="status" />);
      expect(screen.getByTestId('status-label')).toHaveTextContent('Stopped');
    });

    it('displays Error for error status', () => {
      render(<StatusIndicator status="error" testId="status" />);
      expect(screen.getByTestId('status-label')).toHaveTextContent('Error');
    });

    it('displays Warning for warning status', () => {
      render(<StatusIndicator status="warning" testId="status" />);
      expect(screen.getByTestId('status-label')).toHaveTextContent('Warning');
    });

    it('displays Loading for loading status', () => {
      render(<StatusIndicator status="loading" testId="status" />);
      expect(screen.getByTestId('status-label')).toHaveTextContent('Loading');
    });

    it('displays custom label when provided', () => {
      render(<StatusIndicator status="active" label="Online" testId="status" />);
      expect(screen.getByTestId('status-label')).toHaveTextContent('Online');
    });
  });

  describe('showLabel prop', () => {
    it('shows label when showLabel is true', () => {
      render(<StatusIndicator status="active" showLabel testId="status" />);
      expect(screen.getByTestId('status-label')).toBeInTheDocument();
    });

    it('hides label when showLabel is false', () => {
      render(<StatusIndicator status="active" showLabel={false} testId="status" />);
      expect(screen.queryByTestId('status-label')).not.toBeInTheDocument();
    });

    it('still renders status dot when label is hidden', () => {
      render(<StatusIndicator status="active" showLabel={false} testId="status" />);
      expect(screen.getByTestId('status-dot')).toBeInTheDocument();
    });
  });

  describe('styling', () => {
    it('applies flex layout', () => {
      render(<StatusIndicator status="active" testId="status" />);
      expect(screen.getByTestId('status')).toHaveClass('flex', 'items-center', 'gap-2');
    });

    it('applies muted text color to label', () => {
      render(<StatusIndicator status="active" testId="status" />);
      expect(screen.getByTestId('status-label')).toHaveClass('text-sm', 'text-cfg-text-muted');
    });

    it('merges custom className', () => {
      render(<StatusIndicator status="active" className="custom-class" testId="status" />);
      expect(screen.getByTestId('status')).toHaveClass('custom-class');
    });
  });
});
