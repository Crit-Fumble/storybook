import { render, screen, fireEvent } from '@testing-library/react';
import { CreateCampaignModal } from './CreateCampaignModal';
import type { FoundrySystemRecord } from '../types';

describe('CreateCampaignModal', () => {
  const mockSystems: FoundrySystemRecord[] = [
    { systemId: 'dnd5e', title: 'D&D 5th Edition', version: '2.0' },
    { systemId: 'pf2e', title: 'Pathfinder 2e', version: '5.0' },
  ];

  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    onSubmit: jest.fn(),
    systems: mockSystems,
  };

  beforeEach(() => {
    defaultProps.onClose.mockClear();
    defaultProps.onSubmit.mockClear();
  });

  it('renders when isOpen is true', () => {
    render(<CreateCampaignModal {...defaultProps} />);
    expect(screen.getByTestId('create-campaign-modal')).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    render(<CreateCampaignModal {...defaultProps} isOpen={false} />);
    expect(screen.queryByTestId('create-campaign-modal')).not.toBeInTheDocument();
  });

  it('renders with custom testId', () => {
    render(<CreateCampaignModal {...defaultProps} testId="custom-modal" />);
    expect(screen.getByTestId('custom-modal')).toBeInTheDocument();
  });

  it('displays modal title', () => {
    render(<CreateCampaignModal {...defaultProps} />);
    expect(screen.getByText('Create New Campaign')).toBeInTheDocument();
  });

  describe('form fields', () => {
    it('renders campaign name field', () => {
      render(<CreateCampaignModal {...defaultProps} />);
      expect(screen.getByTestId('create-campaign-modal-name')).toBeInTheDocument();
    });

    it('renders game system field', () => {
      render(<CreateCampaignModal {...defaultProps} />);
      expect(screen.getByTestId('create-campaign-modal-system')).toBeInTheDocument();
    });

    it('renders description field', () => {
      render(<CreateCampaignModal {...defaultProps} />);
      expect(screen.getByTestId('create-campaign-modal-description')).toBeInTheDocument();
    });

    it('renders system field', () => {
      render(<CreateCampaignModal {...defaultProps} />);
      // Just verify the system field container exists
      expect(screen.getByTestId('create-campaign-modal-system')).toBeInTheDocument();
    });
  });

  describe('form submission', () => {
    it('renders form', () => {
      render(<CreateCampaignModal {...defaultProps} />);
      expect(screen.getByTestId('create-campaign-modal-form')).toBeInTheDocument();
    });

    it('renders submit button', () => {
      render(<CreateCampaignModal {...defaultProps} />);
      expect(screen.getByTestId('create-campaign-modal-submit-btn')).toBeInTheDocument();
      expect(screen.getByText('Create Campaign')).toBeInTheDocument();
    });

    it('renders cancel button', () => {
      render(<CreateCampaignModal {...defaultProps} />);
      expect(screen.getByTestId('create-campaign-modal-cancel-btn')).toBeInTheDocument();
    });

    it('calls onClose when cancel button clicked', () => {
      render(<CreateCampaignModal {...defaultProps} />);
      fireEvent.click(screen.getByTestId('create-campaign-modal-cancel-btn'));
      expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
    });

    it('shows validation error when name is empty on submit', () => {
      render(<CreateCampaignModal {...defaultProps} />);
      fireEvent.click(screen.getByTestId('create-campaign-modal-submit-btn'));
      expect(screen.getByText('Campaign name is required')).toBeInTheDocument();
    });

    it('shows validation error when system is not selected on submit', () => {
      render(<CreateCampaignModal {...defaultProps} />);
      const nameInput = screen.getByTestId('create-campaign-modal-name').querySelector('input');
      if (nameInput) fireEvent.change(nameInput, { target: { value: 'My Campaign' } });
      fireEvent.click(screen.getByTestId('create-campaign-modal-submit-btn'));
      expect(screen.getByText('Please select a game system')).toBeInTheDocument();
    });

    it('validates form before submitting', () => {
      render(<CreateCampaignModal {...defaultProps} />);
      // Submit without filling form should show errors
      fireEvent.click(screen.getByTestId('create-campaign-modal-submit-btn'));
      // Should show validation error
      expect(screen.getByText('Campaign name is required')).toBeInTheDocument();
      // onSubmit should not be called with invalid data
      expect(defaultProps.onSubmit).not.toHaveBeenCalled();
    });
  });

  describe('loading state', () => {
    it('disables cancel button when submitting', () => {
      render(<CreateCampaignModal {...defaultProps} isSubmitting />);
      expect(screen.getByTestId('create-campaign-modal-cancel-btn')).toBeDisabled();
    });
  });

  it('renders footer', () => {
    render(<CreateCampaignModal {...defaultProps} />);
    expect(screen.getByTestId('create-campaign-modal-footer')).toBeInTheDocument();
  });
});
