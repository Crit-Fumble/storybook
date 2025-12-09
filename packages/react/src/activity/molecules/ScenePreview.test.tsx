import { render, screen, fireEvent } from '@testing-library/react';
import { ScenePreview, FoundrySceneInfo } from './ScenePreview';

describe('ScenePreview', () => {
  const defaultScene: FoundrySceneInfo = {
    id: 'scene-123',
    name: 'Test Scene',
    active: false,
    width: 1920,
    height: 1080,
  };

  it('renders with default testId from scene id', () => {
    render(<ScenePreview scene={defaultScene} />);
    expect(screen.getByTestId('scene-preview-scene-123')).toBeInTheDocument();
  });

  it('renders with custom testId', () => {
    render(<ScenePreview scene={defaultScene} testId="custom-scene" />);
    expect(screen.getByTestId('custom-scene')).toBeInTheDocument();
  });

  describe('scene info', () => {
    it('displays scene name', () => {
      render(<ScenePreview scene={defaultScene} />);
      expect(screen.getByTestId('scene-preview-scene-123-name')).toHaveTextContent('Test Scene');
    });

    it('displays dimensions by default', () => {
      render(<ScenePreview scene={defaultScene} />);
      expect(screen.getByTestId('scene-preview-scene-123-dimensions')).toHaveTextContent('1920 × 1080 px');
    });

    it('hides dimensions when showDimensions is false', () => {
      render(<ScenePreview scene={defaultScene} showDimensions={false} />);
      expect(screen.queryByTestId('scene-preview-scene-123-dimensions')).not.toBeInTheDocument();
    });
  });

  describe('thumbnail', () => {
    it('renders thumbnail container', () => {
      render(<ScenePreview scene={defaultScene} />);
      expect(screen.getByTestId('scene-preview-scene-123-thumbnail')).toBeInTheDocument();
    });

    it('shows map emoji when no background', () => {
      render(<ScenePreview scene={defaultScene} />);
      expect(screen.getByText('🗺️')).toBeInTheDocument();
    });

    it('shows background image when provided', () => {
      const sceneWithBg: FoundrySceneInfo = {
        ...defaultScene,
        background: '/path/to/image.jpg',
      };
      render(<ScenePreview scene={sceneWithBg} />);
      const img = screen.getByAltText('Test Scene');
      expect(img).toHaveAttribute('src', '/path/to/image.jpg');
    });
  });

  describe('active badge', () => {
    it('does not show active badge when scene is not active', () => {
      render(<ScenePreview scene={defaultScene} />);
      expect(screen.queryByTestId('scene-preview-scene-123-active-badge')).not.toBeInTheDocument();
    });

    it('shows active badge when scene is active', () => {
      const activeScene: FoundrySceneInfo = {
        ...defaultScene,
        active: true,
      };
      render(<ScenePreview scene={activeScene} />);
      expect(screen.getByTestId('scene-preview-scene-123-active-badge')).toBeInTheDocument();
      expect(screen.getByText('Active')).toBeInTheDocument();
    });
  });

  describe('click handling', () => {
    it('calls onClick when clicked', () => {
      const onClick = jest.fn();
      render(<ScenePreview scene={defaultScene} onClick={onClick} />);
      fireEvent.click(screen.getByTestId('scene-preview-scene-123'));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('is not interactive when onClick is not provided', () => {
      render(<ScenePreview scene={defaultScene} />);
      // Card should exist but not be interactive variant
      expect(screen.getByTestId('scene-preview-scene-123')).toBeInTheDocument();
    });
  });

  it('displays different scene data correctly', () => {
    const scene: FoundrySceneInfo = {
      id: 'scene-456',
      name: 'Another Scene',
      active: true,
      width: 3840,
      height: 2160,
      background: '/bg.png',
    };
    render(<ScenePreview scene={scene} testId="another-scene" />);
    expect(screen.getByTestId('another-scene-name')).toHaveTextContent('Another Scene');
    expect(screen.getByTestId('another-scene-dimensions')).toHaveTextContent('3840 × 2160 px');
    expect(screen.getByTestId('another-scene-active-badge')).toBeInTheDocument();
  });
});
