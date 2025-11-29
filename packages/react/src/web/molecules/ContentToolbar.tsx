import { Button } from '../../shared/atoms';

export interface ContentToolbarProps {
  title: string;
  subtitle?: string;
  metadata?: string;
  isEditing?: boolean;
  editTitle?: string;
  onTitleChange?: (title: string) => void;
  onSave?: () => void;
  onCancel?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  canEdit?: boolean;
  canDelete?: boolean;
  saving?: boolean;
  deleting?: boolean;
  testId?: string;
}

export function ContentToolbar({
  title,
  subtitle,
  metadata,
  isEditing = false,
  editTitle = '',
  onTitleChange,
  onSave,
  onCancel,
  onEdit,
  onDelete,
  canEdit = true,
  canDelete = false,
  saving = false,
  deleting = false,
  testId = 'content-toolbar',
}: ContentToolbarProps) {
  return (
    <div
      className="flex items-center justify-between px-6 py-3 border-b border-cfg-border"
      data-testid={testId}
    >
      <div>
        {isEditing ? (
          <input
            type="text"
            value={editTitle}
            onChange={(e) => onTitleChange?.(e.target.value)}
            className="bg-cfg-background-tertiary border border-cfg-border rounded px-2 py-1 text-cfg-text-normal text-lg font-semibold focus:outline-none focus:border-cfg-primary"
            data-testid={`${testId}-title-input`}
          />
        ) : (
          <h1
            className="text-lg font-semibold text-cfg-text-normal"
            data-testid={`${testId}-title`}
          >
            {title}
          </h1>
        )}
        {subtitle && (
          <div
            className="text-sm text-cfg-text-muted"
            data-testid={`${testId}-subtitle`}
          >
            {subtitle}
          </div>
        )}
        {metadata && (
          <div
            className="text-xs text-cfg-text-muted mt-1"
            data-testid={`${testId}-metadata`}
          >
            {metadata}
          </div>
        )}
      </div>

      <div className="flex gap-2" data-testid={`${testId}-actions`}>
        {isEditing ? (
          <>
            <Button
              variant="secondary"
              size="sm"
              onClick={onCancel}
              testId={`${testId}-cancel-btn`}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={onSave}
              disabled={saving}
              testId={`${testId}-save-btn`}
            >
              {saving ? 'Saving...' : 'Save'}
            </Button>
          </>
        ) : (
          <>
            {canEdit && onEdit && (
              <Button
                variant="secondary"
                size="sm"
                onClick={onEdit}
                testId={`${testId}-edit-btn`}
              >
                Edit
              </Button>
            )}
            {canDelete && onDelete && (
              <Button
                variant="danger"
                size="sm"
                onClick={onDelete}
                disabled={deleting}
                testId={`${testId}-delete-btn`}
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </Button>
            )}
            {!canEdit && !canDelete && (
              <span className="text-sm text-cfg-text-muted">Read-only</span>
            )}
          </>
        )}
      </div>
    </div>
  );
}
