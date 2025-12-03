import { useState, useEffect } from 'react';
import { clsx } from 'clsx';
import { Button, Input, Textarea, Select, Label, type SelectOption } from '../../shared/atoms';
import { SettingToggleRow } from '../../shared/molecules';
import type { ChannelKBSource, ChannelKBChannel, ChannelKBType } from '../types';

export interface ChannelKBSourceEditorProps {
  /** Source to edit (undefined for create mode) */
  source?: ChannelKBSource;
  /** Available channels to choose from */
  channels: ChannelKBChannel[];
  /** Loading channels state */
  isLoadingChannels?: boolean;
  /** Submit handler */
  onSubmit: (data: ChannelKBSourceFormData) => void;
  /** Cancel handler */
  onCancel: () => void;
  /** Whether form is submitting */
  isSubmitting?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

export interface ChannelKBSourceFormData {
  channelId: string;
  channelName?: string;
  channelType: ChannelKBType;
  name: string;
  description?: string;
  category: string;
  syncEnabled: boolean;
  syncThreads: boolean;
  syncPinned: boolean;
  maxMessages: number;
}

const categoryOptions: SelectOption[] = [
  { value: 'general', label: 'General' },
  { value: 'rules', label: 'House Rules' },
  { value: 'lore', label: 'Lore & World' },
  { value: 'characters', label: 'Characters' },
  { value: 'session-notes', label: 'Session Notes' },
  { value: 'resources', label: 'Resources' },
];

const maxMessagesOptions: SelectOption[] = [
  { value: '50', label: '50 messages' },
  { value: '100', label: '100 messages' },
  { value: '200', label: '200 messages' },
  { value: '500', label: '500 messages' },
  { value: '1000', label: '1000 messages' },
];

export function ChannelKBSourceEditor({
  source,
  channels,
  isLoadingChannels = false,
  onSubmit,
  onCancel,
  isSubmitting = false,
  className,
  testId = 'channel-kb-source-editor',
}: ChannelKBSourceEditorProps) {
  const isEditing = !!source;

  const [formData, setFormData] = useState<ChannelKBSourceFormData>({
    channelId: source?.channelId || '',
    channelName: source?.channelName || undefined,
    channelType: source?.channelType || 'text',
    name: source?.name || '',
    description: source?.description || '',
    category: source?.category || 'general',
    syncEnabled: source?.syncEnabled ?? true,
    syncThreads: source?.syncThreads ?? true,
    syncPinned: source?.syncPinned ?? true,
    maxMessages: source?.maxMessages ?? 100,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Update form when source changes
  useEffect(() => {
    if (source) {
      setFormData({
        channelId: source.channelId,
        channelName: source.channelName || undefined,
        channelType: source.channelType,
        name: source.name,
        description: source.description || '',
        category: source.category,
        syncEnabled: source.syncEnabled,
        syncThreads: source.syncThreads,
        syncPinned: source.syncPinned,
        maxMessages: source.maxMessages,
      });
    }
  }, [source]);

  // Auto-fill name when channel is selected
  const handleChannelChange = (channelId: string) => {
    const channel = channels.find((c) => c.id === channelId);
    setFormData((prev) => ({
      ...prev,
      channelId,
      channelName: channel?.name,
      channelType: channel?.type || 'text',
      name: prev.name || channel?.name || '',
    }));
    setErrors((prev) => ({ ...prev, channelId: '' }));
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.channelId) {
      newErrors.channelId = 'Please select a channel';
    }
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length > 100) {
      newErrors.name = 'Name must be 100 characters or less';
    }
    if (formData.description && formData.description.length > 500) {
      newErrors.description = 'Description must be 500 characters or less';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  // Build channel options, grouping by category
  const channelOptions: SelectOption[] = [
    { value: '', label: 'Select a channel...' },
    ...channels
      .filter((c) => !c.isConfigured || c.id === source?.channelId)
      .map((c) => ({
        value: c.id,
        label: `${c.type === 'forum' ? '📋' : '#'} ${c.name}${c.category ? ` (${c.category})` : ''}${c.isConfigured ? ' ✓' : ''}`,
      })),
  ];

  return (
    <form
      onSubmit={handleSubmit}
      data-testid={testId}
      className={clsx('space-y-6', className)}
    >
      <div className="space-y-4">
        <h2 className="text-discord-text-normal text-lg font-display font-semibold">
          {isEditing ? 'Edit KB Source' : 'Add Channel as KB Source'}
        </h2>

        {/* Channel Selection */}
        <div className="w-full">
          <Label htmlFor="channelId" required>Discord Channel</Label>
          {isLoadingChannels ? (
            <div className="h-10 bg-discord-background-tertiary rounded animate-pulse" />
          ) : (
            <Select
              id="channelId"
              value={formData.channelId}
              onChange={(e) => handleChannelChange(e.target.value)}
              options={channelOptions}
              disabled={isEditing}
              testId={`${testId}-channel-select`}
            />
          )}
          {errors.channelId && (
            <p className="mt-1 text-sm text-cfg-red">{errors.channelId}</p>
          )}
        </div>

        {/* Name */}
        <div className="w-full">
          <Label htmlFor="name" required>Display Name</Label>
          <p className="text-xs text-cfg-text-muted mb-1">A friendly name for this knowledge source</p>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, name: e.target.value }));
              setErrors((prev) => ({ ...prev, name: '' }));
            }}
            placeholder="e.g., House Rules, Session Notes"
            testId={`${testId}-name-input`}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-cfg-red">{errors.name}</p>
          )}
        </div>

        {/* Description */}
        <div className="w-full">
          <Label htmlFor="description">Description</Label>
          <p className="text-xs text-cfg-text-muted mb-1">Optional description of what this channel contains</p>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
            placeholder="What kind of content is in this channel?"
            rows={2}
            testId={`${testId}-description-input`}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-cfg-red">{errors.description}</p>
          )}
        </div>

        {/* Category */}
        <div className="w-full">
          <Label htmlFor="category">KB Category</Label>
          <p className="text-xs text-cfg-text-muted mb-1">Helps organize and search knowledge</p>
          <Select
            id="category"
            value={formData.category}
            onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
            options={categoryOptions}
            testId={`${testId}-category-select`}
          />
        </div>

        {/* Max Messages */}
        <div className="w-full">
          <Label htmlFor="maxMessages">Message Limit</Label>
          <p className="text-xs text-cfg-text-muted mb-1">Maximum messages to sync per channel/thread</p>
          <Select
            id="maxMessages"
            value={String(formData.maxMessages)}
            onChange={(e) => setFormData((prev) => ({ ...prev, maxMessages: parseInt(e.target.value, 10) }))}
            options={maxMessagesOptions}
            testId={`${testId}-max-messages-select`}
          />
        </div>
      </div>

      {/* Sync Settings */}
      <div className="space-y-2">
        <h3 className="text-discord-text-muted text-sm font-medium mb-3">
          Sync Settings
        </h3>

        <SettingToggleRow
          label="Sync Enabled"
          description="Enable automatic syncing of this channel"
          checked={formData.syncEnabled}
          onChange={(checked) => setFormData((prev) => ({ ...prev, syncEnabled: checked }))}
          testId={`${testId}-sync-enabled`}
        />

        <SettingToggleRow
          label="Include Threads"
          description="For forums, sync all threads; for channels, sync thread messages"
          checked={formData.syncThreads}
          onChange={(checked) => setFormData((prev) => ({ ...prev, syncThreads: checked }))}
          testId={`${testId}-sync-threads`}
        />

        <SettingToggleRow
          label="Prioritize Pinned"
          description="Always include pinned messages in the knowledge base"
          checked={formData.syncPinned}
          onChange={(checked) => setFormData((prev) => ({ ...prev, syncPinned: checked }))}
          testId={`${testId}-sync-pinned`}
        />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-discord-border">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isSubmitting}
          testId={`${testId}-cancel-btn`}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          testId={`${testId}-submit-btn`}
        >
          {isSubmitting ? 'Saving...' : isEditing ? 'Save Changes' : 'Add Source'}
        </Button>
      </div>
    </form>
  );
}
