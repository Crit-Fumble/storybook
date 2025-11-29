import { Card } from '../../shared/molecules';
import { Badge } from '../../shared/atoms';

export interface FoundrySceneInfo {
  id: string;
  name: string;
  active: boolean;
  background?: string;
  width: number;
  height: number;
}

export interface ScenePreviewProps {
  scene: FoundrySceneInfo;
  onClick?: () => void;
  showDimensions?: boolean;
  testId?: string;
}

export function ScenePreview({
  scene,
  onClick,
  showDimensions = true,
  testId,
}: ScenePreviewProps) {
  const cardTestId = testId || `scene-preview-${scene.id}`;

  return (
    <Card
      variant={onClick ? 'interactive' : 'default'}
      onClick={onClick}
      testId={cardTestId}
      className="overflow-hidden"
    >
      {/* Scene background/thumbnail */}
      <div
        className="relative h-32 bg-discord-background-tertiary"
        data-testid={`${cardTestId}-thumbnail`}
      >
        {scene.background ? (
          <img
            src={scene.background}
            alt={scene.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-4xl">🗺️</span>
          </div>
        )}
        {scene.active && (
          <div className="absolute top-2 right-2">
            <Badge variant="success" size="sm" testId={`${cardTestId}-active-badge`}>
              Active
            </Badge>
          </div>
        )}
      </div>

      {/* Scene info */}
      <div className="p-3">
        <div
          className="font-semibold text-discord-text-normal truncate"
          data-testid={`${cardTestId}-name`}
        >
          {scene.name}
        </div>
        {showDimensions && (
          <div
            className="text-sm text-discord-text-muted mt-1"
            data-testid={`${cardTestId}-dimensions`}
          >
            {scene.width} × {scene.height} px
          </div>
        )}
      </div>
    </Card>
  );
}
