import { render, screen, fireEvent } from '@testing-library/react';
import { EditorModeToggle, EditorMode } from './EditorModeToggle';

describe('EditorModeToggle', () => {
  const defaultProps = {
    mode: 'wysiwyg' as EditorMode,
    onChange: jest.fn(),
  };

  beforeEach(() => {
    defaultProps.onChange.mockClear();
  });

  it('renders with default testId', () => {
    render(<EditorModeToggle {...defaultProps} />);
    expect(screen.getByTestId('editor-mode-toggle')).toBeInTheDocument();
  });

  it('renders with custom testId', () => {
    render(<EditorModeToggle {...defaultProps} testId="custom-toggle" />);
    expect(screen.getByTestId('custom-toggle')).toBeInTheDocument();
  });

  it('renders default modes (wysiwyg and markdown)', () => {
    render(<EditorModeToggle {...defaultProps} />);
    expect(screen.getByTestId('editor-mode-toggle-wysiwyg')).toBeInTheDocument();
    expect(screen.getByTestId('editor-mode-toggle-markdown')).toBeInTheDocument();
    expect(screen.queryByTestId('editor-mode-toggle-preview')).not.toBeInTheDocument();
  });

  it('renders custom modes', () => {
    render(<EditorModeToggle {...defaultProps} modes={['markdown', 'preview']} />);
    expect(screen.queryByTestId('editor-mode-toggle-wysiwyg')).not.toBeInTheDocument();
    expect(screen.getByTestId('editor-mode-toggle-markdown')).toBeInTheDocument();
    expect(screen.getByTestId('editor-mode-toggle-preview')).toBeInTheDocument();
  });

  it('shows Editor label', () => {
    render(<EditorModeToggle {...defaultProps} />);
    expect(screen.getByText('Editor:')).toBeInTheDocument();
  });

  describe('mode labels', () => {
    it('shows WYSIWYG label', () => {
      render(<EditorModeToggle {...defaultProps} modes={['wysiwyg']} />);
      expect(screen.getByText('WYSIWYG')).toBeInTheDocument();
    });

    it('shows Markdown label', () => {
      render(<EditorModeToggle {...defaultProps} modes={['markdown']} />);
      expect(screen.getByText('Markdown')).toBeInTheDocument();
    });

    it('shows Preview label', () => {
      render(<EditorModeToggle {...defaultProps} modes={['preview']} />);
      expect(screen.getByText('Preview')).toBeInTheDocument();
    });
  });

  describe('mode selection', () => {
    it('highlights active mode', () => {
      render(<EditorModeToggle {...defaultProps} mode="wysiwyg" />);
      expect(screen.getByTestId('editor-mode-toggle-wysiwyg')).toHaveClass('bg-cfg-primary', 'text-white');
      expect(screen.getByTestId('editor-mode-toggle-markdown')).not.toHaveClass('bg-cfg-primary');
    });

    it('calls onChange when mode button clicked', () => {
      const onChange = jest.fn();
      render(<EditorModeToggle mode="wysiwyg" onChange={onChange} />);
      fireEvent.click(screen.getByTestId('editor-mode-toggle-markdown'));
      expect(onChange).toHaveBeenCalledWith('markdown');
    });

    it('calls onChange with clicked mode', () => {
      const onChange = jest.fn();
      render(<EditorModeToggle mode="markdown" onChange={onChange} modes={['wysiwyg', 'markdown', 'preview']} />);
      fireEvent.click(screen.getByTestId('editor-mode-toggle-preview'));
      expect(onChange).toHaveBeenCalledWith('preview');
    });
  });

  describe('disabled state', () => {
    it('disables all buttons when disabled', () => {
      render(<EditorModeToggle {...defaultProps} disabled />);
      expect(screen.getByTestId('editor-mode-toggle-wysiwyg')).toBeDisabled();
      expect(screen.getByTestId('editor-mode-toggle-markdown')).toBeDisabled();
    });

    it('has disabled styling when disabled', () => {
      render(<EditorModeToggle {...defaultProps} disabled />);
      expect(screen.getByTestId('editor-mode-toggle-wysiwyg')).toHaveClass('opacity-50', 'cursor-not-allowed');
    });

    it('does not call onChange when disabled', () => {
      const onChange = jest.fn();
      render(<EditorModeToggle mode="wysiwyg" onChange={onChange} disabled />);
      fireEvent.click(screen.getByTestId('editor-mode-toggle-markdown'));
      expect(onChange).not.toHaveBeenCalled();
    });
  });
});
