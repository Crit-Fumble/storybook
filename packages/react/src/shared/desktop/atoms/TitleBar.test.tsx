import { render, screen, fireEvent } from '@testing-library/react';
import { TitleBar } from './TitleBar';
import { RpgIcon } from '../../atoms/RpgIcon';

describe('TitleBar', () => {
  it('renders title text', () => {
    render(<TitleBar title="Test Window" testId="titlebar" />);

    expect(screen.getByTestId('titlebar-title')).toHaveTextContent('Test Window');
  });

  it('renders with icon when provided', () => {
    render(<TitleBar title="Test" icon={<RpgIcon icon="tower" />} testId="titlebar" />);

    expect(screen.getByTestId('titlebar-icon')).toBeInTheDocument();
  });

  it('calls onDoubleClick when double-clicked', () => {
    const onDoubleClick = jest.fn();
    render(<TitleBar title="Test" onDoubleClick={onDoubleClick} testId="titlebar" />);

    fireEvent.doubleClick(screen.getByTestId('titlebar'));
    expect(onDoubleClick).toHaveBeenCalledTimes(1);
  });

  it('truncates long titles with CSS', () => {
    render(<TitleBar title="Very Long Title That Should Truncate" testId="titlebar" />);

    const titleElement = screen.getByTestId('titlebar-title');
    expect(titleElement).toHaveClass('truncate');
  });

  it('applies custom className', () => {
    render(<TitleBar title="Test" className="custom-class" testId="titlebar" />);

    expect(screen.getByTestId('titlebar')).toHaveClass('custom-class');
  });

  it('has select-none class to prevent text selection', () => {
    render(<TitleBar title="Test" testId="titlebar" />);

    expect(screen.getByTestId('titlebar')).toHaveClass('select-none');
  });
});
