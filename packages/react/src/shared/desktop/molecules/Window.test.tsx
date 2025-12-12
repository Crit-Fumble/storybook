import { render, screen, fireEvent } from '@testing-library/react';
import { Window } from './Window';
import { RpgIcon } from '../../atoms/RpgIcon';

// Mock react-rnd to simplify testing
jest.mock('react-rnd', () => ({
  Rnd: ({ children, onDragStop, onResizeStop, onMouseDown, ...props }: any) => (
    <div
      data-testid="rnd-wrapper"
      data-position={JSON.stringify(props.position)}
      data-size={JSON.stringify(props.size)}
      data-default={JSON.stringify(props.default)}
      onClick={onMouseDown}
    >
      {children}
      {/* Hidden buttons to trigger drag/resize callbacks in tests */}
      <button
        data-testid="rnd-trigger-drag"
        style={{ display: 'none' }}
        onClick={() => onDragStop && onDragStop({}, { x: 100, y: 200 })}
      />
      <button
        data-testid="rnd-trigger-resize"
        style={{ display: 'none' }}
        onClick={() => onResizeStop && onResizeStop(
          {},
          'bottomRight',
          { style: { width: '400px', height: '300px' } },
          {},
          { x: 150, y: 250 }
        )}
      />
    </div>
  ),
}));

describe('Window', () => {
  it('renders window with title', () => {
    render(
      <Window id="test-1" title="Test Window" testId="window">
        <div>Content</div>
      </Window>
    );

    expect(screen.getByText('Test Window')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('renders with icon', () => {
    const { container } = render(
      <Window id="test-2" title="Test" icon={<RpgIcon icon="gear" />} testId="window">
        <div>Content</div>
      </Window>
    );

    expect(container.querySelector('.ra-gear')).toBeInTheDocument();
  });

  it('does not render when minimized', () => {
    render(
      <Window id="test-3" title="Test" isMinimized testId="window">
        <div>Content</div>
      </Window>
    );

    expect(screen.queryByTestId('window')).not.toBeInTheDocument();
  });

  it('renders maximized without Rnd wrapper', () => {
    render(
      <Window id="test-4" title="Test" isMaximized testId="window">
        <div>Content</div>
      </Window>
    );

    expect(screen.getByTestId('window-maximized')).toBeInTheDocument();
    expect(screen.queryByTestId('rnd-wrapper')).not.toBeInTheDocument();
  });

  it('renders with Rnd wrapper when not maximized', () => {
    render(
      <Window id="test-5" title="Test" testId="window">
        <div>Content</div>
      </Window>
    );

    expect(screen.getByTestId('rnd-wrapper')).toBeInTheDocument();
  });

  it('applies focused styling when isFocused is true', () => {
    render(
      <Window id="test-6" title="Test" isFocused testId="window">
        <div>Content</div>
      </Window>
    );

    expect(screen.getByTestId('window')).toHaveClass('desktop-window-focused');
  });

  it('does not apply focused styling when isFocused is false', () => {
    render(
      <Window id="test-7" title="Test" isFocused={false} testId="window">
        <div>Content</div>
      </Window>
    );

    expect(screen.getByTestId('window')).not.toHaveClass('desktop-window-focused');
  });

  it('calls onFocus when window is clicked', () => {
    const onFocus = jest.fn();
    render(
      <Window id="test-8" title="Test" onFocus={onFocus} testId="window">
        <div>Content</div>
      </Window>
    );

    fireEvent.click(screen.getByTestId('window'));
    expect(onFocus).toHaveBeenCalled();
  });

  it('calls onMinimize when minimize is clicked', () => {
    const onMinimize = jest.fn();
    render(
      <Window id="test-9" title="Test" onMinimize={onMinimize} testId="window">
        <div>Content</div>
      </Window>
    );

    fireEvent.click(screen.getByTestId('window-header-controls-minimize'));
    expect(onMinimize).toHaveBeenCalledTimes(1);
  });

  it('calls onMaximize when maximize is clicked', () => {
    const onMaximize = jest.fn();
    render(
      <Window id="test-10" title="Test" onMaximize={onMaximize} testId="window">
        <div>Content</div>
      </Window>
    );

    fireEvent.click(screen.getByTestId('window-header-controls-maximize'));
    expect(onMaximize).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when close is clicked', () => {
    const onClose = jest.fn();
    render(
      <Window id="test-11" title="Test" onClose={onClose} testId="window">
        <div>Content</div>
      </Window>
    );

    fireEvent.click(screen.getByTestId('window-header-controls-close'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onMaximize when title is double-clicked', () => {
    const onMaximize = jest.fn();
    render(
      <Window id="test-12" title="Test" onMaximize={onMaximize} testId="window">
        <div>Content</div>
      </Window>
    );

    fireEvent.doubleClick(screen.getByTestId('window-header-titlebar'));
    expect(onMaximize).toHaveBeenCalledTimes(1);
  });

  it('applies modern theme by default', () => {
    render(
      <Window id="test-13" title="Test" testId="window">
        <div>Content</div>
      </Window>
    );

    expect(screen.getByTestId('window')).toHaveClass('theme-modern');
  });

  it('applies specified theme name', () => {
    render(
      <Window id="test-14" title="Test" theme="fantasy" testId="window">
        <div>Content</div>
      </Window>
    );

    expect(screen.getByTestId('window')).toHaveClass('theme-fantasy');
  });

  it('sets z-index from prop', () => {
    render(
      <Window id="test-15" title="Test" zIndex={2000} testId="window">
        <div>Content</div>
      </Window>
    );

    const window = screen.getByTestId('window');
    expect(window).toHaveStyle({ zIndex: 2000 });
  });

  it('applies custom className', () => {
    render(
      <Window id="test-16" title="Test" className="custom-class" testId="window">
        <div>Content</div>
      </Window>
    );

    expect(screen.getByTestId('window')).toHaveClass('custom-class');
  });

  it('renders content in correct container', () => {
    render(
      <Window id="test-17" title="Test" testId="window">
        <div>Window Content</div>
      </Window>
    );

    expect(screen.getByTestId('window-content')).toHaveTextContent('Window Content');
  });

  it('has desktop-window class', () => {
    render(
      <Window id="test-18" title="Test" testId="window">
        <div>Content</div>
      </Window>
    );

    expect(screen.getByTestId('window')).toHaveClass('desktop-window');
  });

  it('sets data-window-id attribute', () => {
    render(
      <Window id="unique-window-id" title="Test" testId="window">
        <div>Content</div>
      </Window>
    );

    expect(screen.getByTestId('window')).toHaveAttribute('data-window-id', 'unique-window-id');
  });

  describe('drag and resize callbacks', () => {
    it('calls onPositionChange when window is dragged', () => {
      const onPositionChange = jest.fn();
      render(
        <Window id="drag-test" title="Test" onPositionChange={onPositionChange} testId="window">
          <div>Content</div>
        </Window>
      );

      // Trigger the drag callback via our mock button
      fireEvent.click(screen.getByTestId('rnd-trigger-drag'));

      expect(onPositionChange).toHaveBeenCalledWith({ x: 100, y: 200 });
    });

    it('does not call onPositionChange when not provided (drag)', () => {
      // This test ensures no error is thrown when onPositionChange is not provided
      render(
        <Window id="drag-test-2" title="Test" testId="window">
          <div>Content</div>
        </Window>
      );

      // Should not throw
      expect(() => {
        fireEvent.click(screen.getByTestId('rnd-trigger-drag'));
      }).not.toThrow();
    });

    it('calls onSizeChange when window is resized', () => {
      const onSizeChange = jest.fn();
      render(
        <Window id="resize-test" title="Test" onSizeChange={onSizeChange} testId="window">
          <div>Content</div>
        </Window>
      );

      // Trigger the resize callback via our mock button
      fireEvent.click(screen.getByTestId('rnd-trigger-resize'));

      expect(onSizeChange).toHaveBeenCalledWith({ width: 400, height: 300 });
    });

    it('calls onPositionChange when window is resized (position adjustment)', () => {
      const onPositionChange = jest.fn();
      render(
        <Window id="resize-pos-test" title="Test" onPositionChange={onPositionChange} testId="window">
          <div>Content</div>
        </Window>
      );

      // Trigger the resize callback which also updates position
      fireEvent.click(screen.getByTestId('rnd-trigger-resize'));

      expect(onPositionChange).toHaveBeenCalledWith({ x: 150, y: 250 });
    });

    it('calls both onSizeChange and onPositionChange on resize', () => {
      const onSizeChange = jest.fn();
      const onPositionChange = jest.fn();
      render(
        <Window
          id="resize-both-test"
          title="Test"
          onSizeChange={onSizeChange}
          onPositionChange={onPositionChange}
          testId="window"
        >
          <div>Content</div>
        </Window>
      );

      fireEvent.click(screen.getByTestId('rnd-trigger-resize'));

      expect(onSizeChange).toHaveBeenCalledWith({ width: 400, height: 300 });
      expect(onPositionChange).toHaveBeenCalledWith({ x: 150, y: 250 });
    });

    it('does not call callbacks when not provided (resize)', () => {
      // This test ensures no error is thrown when callbacks are not provided
      render(
        <Window id="resize-test-2" title="Test" testId="window">
          <div>Content</div>
        </Window>
      );

      // Should not throw
      expect(() => {
        fireEvent.click(screen.getByTestId('rnd-trigger-resize'));
      }).not.toThrow();
    });
  });
});
