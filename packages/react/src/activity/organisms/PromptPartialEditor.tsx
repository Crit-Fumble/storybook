import { useState, useEffect } from 'react';
import { clsx } from 'clsx';
import { Button } from '../../shared/atoms/Button';
import type { PromptPartial, PromptTargetType } from '../molecules/PromptPartialCard';

export interface TargetOption {
  id: string;
  name: string;
}

export interface PromptPartialEditorProps {
  /** Existing partial to edit, or undefined for new */
  partial?: Partial<PromptPartial>;
  /** Available channels for targeting */
  channels?: TargetOption[];
  /** Available categories for targeting */
  categories?: TargetOption[];
  /** Available roles for targeting */
  roles?: TargetOption[];
  /** Save handler */
  onSave: (data: Omit<PromptPartial, 'id' | 'createdAt' | 'updatedAt'>) => void;
  /** Cancel handler */
  onCancel: () => void;
  /** Whether saving is in progress */
  isSaving?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

export function PromptPartialEditor({
  partial,
  channels = [],
  categories = [],
  roles = [],
  onSave,
  onCancel,
  isSaving = false,
  className,
  testId = 'prompt-partial-editor',
}: PromptPartialEditorProps) {
  const [name, setName] = useState(partial?.name || '');
  const [targetType, setTargetType] = useState<PromptTargetType>(
    partial?.targetType || 'channel'
  );
  const [targetId, setTargetId] = useState(partial?.targetId || '');
  const [content, setContent] = useState(partial?.content || '');
  const [priority, setPriority] = useState(partial?.priority ?? 0);
  const [isEnabled, setIsEnabled] = useState(partial?.isEnabled ?? true);

  // Reset form when partial changes
  useEffect(() => {
    setName(partial?.name || '');
    setTargetType(partial?.targetType || 'channel');
    setTargetId(partial?.targetId || '');
    setContent(partial?.content || '');
    setPriority(partial?.priority ?? 0);
    setIsEnabled(partial?.isEnabled ?? true);
  }, [partial]);

  const getTargetOptions = (): TargetOption[] => {
    switch (targetType) {
      case 'channel':
      case 'thread':
        return channels;
      case 'category':
        return categories;
      case 'role':
        return roles;
      default:
        return [];
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const targetOption = getTargetOptions().find((opt) => opt.id === targetId);

    onSave({
      name,
      targetType,
      targetId,
      targetName: targetOption?.name,
      content,
      priority,
      isEnabled,
    });
  };

  const isValid = name.trim() && targetId && content.trim();

  return (
    <form
      onSubmit={handleSubmit}
      data-testid={testId}
      className={clsx('space-y-4', className)}
    >
      {/* Name */}
      <div>
        <label
          htmlFor="partial-name"
          className="block text-sm font-medium text-discord-text-normal mb-1"
        >
          Name
        </label>
        <input
          id="partial-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Fantasy RPG Style"
          className="w-full px-3 py-2 bg-discord-background-tertiary text-discord-text-normal rounded border border-discord-background-floating focus:border-discord-primary focus:outline-none focus:ring-1 focus:ring-discord-primary"
        />
      </div>

      {/* Target Type */}
      <div>
        <label
          htmlFor="target-type"
          className="block text-sm font-medium text-discord-text-normal mb-1"
        >
          Target Type
        </label>
        <select
          id="target-type"
          value={targetType}
          onChange={(e) => {
            setTargetType(e.target.value as PromptTargetType);
            setTargetId('');
          }}
          className="w-full px-3 py-2 bg-discord-background-tertiary text-discord-text-normal rounded border border-discord-background-floating focus:border-discord-primary focus:outline-none focus:ring-1 focus:ring-discord-primary"
        >
          <option value="channel">Channel</option>
          <option value="category">Category</option>
          <option value="thread">Thread</option>
          <option value="role">Role</option>
        </select>
      </div>

      {/* Target ID */}
      <div>
        <label
          htmlFor="target-id"
          className="block text-sm font-medium text-discord-text-normal mb-1"
        >
          Target
        </label>
        <select
          id="target-id"
          value={targetId}
          onChange={(e) => setTargetId(e.target.value)}
          className="w-full px-3 py-2 bg-discord-background-tertiary text-discord-text-normal rounded border border-discord-background-floating focus:border-discord-primary focus:outline-none focus:ring-1 focus:ring-discord-primary"
        >
          <option value="">Select a {targetType}...</option>
          {getTargetOptions().map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.name}
            </option>
          ))}
        </select>
      </div>

      {/* Priority */}
      <div>
        <label
          htmlFor="priority"
          className="block text-sm font-medium text-discord-text-normal mb-1"
        >
          Priority
          <span className="text-discord-text-muted font-normal ml-2">
            (higher = applied later)
          </span>
        </label>
        <input
          id="priority"
          type="number"
          value={priority}
          onChange={(e) => setPriority(parseInt(e.target.value, 10) || 0)}
          min={0}
          max={100}
          className="w-32 px-3 py-2 bg-discord-background-tertiary text-discord-text-normal rounded border border-discord-background-floating focus:border-discord-primary focus:outline-none focus:ring-1 focus:ring-discord-primary"
        />
      </div>

      {/* Content */}
      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-discord-text-normal mb-1"
        >
          Prompt Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter the prompt instructions for this context..."
          rows={8}
          className="w-full px-3 py-2 bg-discord-background-tertiary text-discord-text-normal rounded border border-discord-background-floating focus:border-discord-primary focus:outline-none focus:ring-1 focus:ring-discord-primary font-mono text-sm resize-y"
        />
        <p className="mt-1 text-xs text-discord-text-muted">
          This content will be included in the AI prompt when messages are sent in the targeted {targetType}.
        </p>
      </div>

      {/* Enabled Toggle */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setIsEnabled(!isEnabled)}
          className={clsx(
            'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
            isEnabled ? 'bg-discord-green' : 'bg-discord-background-tertiary'
          )}
        >
          <span
            className={clsx(
              'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
              isEnabled ? 'translate-x-6' : 'translate-x-1'
            )}
          />
        </button>
        <span className="text-sm text-discord-text-normal">
          {isEnabled ? 'Enabled' : 'Disabled'}
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-4 border-t border-discord-background-tertiary">
        <Button
          type="submit"
          variant="primary"
          disabled={!isValid || isSaving}
        >
          {isSaving ? 'Saving...' : partial?.id ? 'Update' : 'Create'}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isSaving}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
