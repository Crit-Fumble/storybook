import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatusDot } from './StatusDot';

describe('StatusDot', () => {
  describe('rendering', () => {
    it('renders as a span element', () => {
      render(<StatusDot status="active" testId="dot" />);
      expect(screen.getByTestId('dot').tagName).toBe('SPAN');
    });

    it('applies testId', () => {
      render(<StatusDot status="active" testId="status-dot" />);
      expect(screen.getByTestId('status-dot')).toBeInTheDocument();
    });

    it('applies base status-dot class', () => {
      render(<StatusDot status="active" testId="dot" />);
      expect(screen.getByTestId('dot')).toHaveClass('status-dot');
    });
  });

  describe('status variants', () => {
    it('applies active status class', () => {
      render(<StatusDot status="active" testId="dot" />);
      expect(screen.getByTestId('dot')).toHaveClass('status-dot-active');
    });

    it('applies stopped status class', () => {
      render(<StatusDot status="stopped" testId="dot" />);
      expect(screen.getByTestId('dot')).toHaveClass('status-dot-stopped');
    });

    it('applies error status class', () => {
      render(<StatusDot status="error" testId="dot" />);
      expect(screen.getByTestId('dot')).toHaveClass('status-dot-error');
    });

    it('applies warning status class', () => {
      render(<StatusDot status="warning" testId="dot" />);
      expect(screen.getByTestId('dot')).toHaveClass('bg-cfg-yellow');
    });

    it('applies loading status classes', () => {
      render(<StatusDot status="loading" testId="dot" />);
      expect(screen.getByTestId('dot')).toHaveClass('bg-cfg-primary', 'animate-pulse');
    });
  });

  describe('styling', () => {
    it('merges custom className', () => {
      render(<StatusDot status="active" className="custom-class" testId="dot" />);
      expect(screen.getByTestId('dot')).toHaveClass('custom-class');
    });
  });
});
