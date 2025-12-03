import { useState, useEffect, useCallback } from 'react';
import { clsx } from 'clsx';
import { Modal } from '../../shared/molecules/Modal';
import { ChannelKBSourceList } from './ChannelKBSourceList';
import { ChannelKBSourceEditor, type ChannelKBSourceFormData } from './ChannelKBSourceEditor';
import type { ChannelKBSource, ChannelKBChannel } from '../types';

export interface ChannelKBPanelProps {
  /** Guild ID */
  guildId: string;
  /** API base URL (defaults to /.proxy) */
  apiBaseUrl?: string;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

export function ChannelKBPanel({
  guildId,
  apiBaseUrl = '',
  className,
  testId = 'channel-kb-panel',
}: ChannelKBPanelProps) {
  const [sources, setSources] = useState<ChannelKBSource[]>([]);
  const [channels, setChannels] = useState<ChannelKBChannel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingChannels, setIsLoadingChannels] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingSource, setEditingSource] = useState<ChannelKBSource | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [syncingIds, setSyncingIds] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);

  // Fetch sources
  const fetchSources = useCallback(async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/api/admin/guilds/${guildId}/channel-kb`, {
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to fetch sources');
      const data = await response.json();
      setSources(data.sources || []);
    } catch (err) {
      console.error('Failed to fetch channel KB sources:', err);
      setError('Failed to load channel KB sources');
    }
  }, [apiBaseUrl, guildId]);

  // Fetch available channels
  const fetchChannels = useCallback(async () => {
    setIsLoadingChannels(true);
    try {
      const response = await fetch(`${apiBaseUrl}/api/admin/guilds/${guildId}/channels`, {
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to fetch channels');
      const data = await response.json();
      setChannels(data.channels || []);
    } catch (err) {
      console.error('Failed to fetch channels:', err);
    } finally {
      setIsLoadingChannels(false);
    }
  }, [apiBaseUrl, guildId]);

  // Initial load
  useEffect(() => {
    async function load() {
      setIsLoading(true);
      await fetchSources();
      setIsLoading(false);
    }
    load();
  }, [fetchSources]);

  // Load channels when editor opens
  useEffect(() => {
    if (isEditorOpen && channels.length === 0) {
      fetchChannels();
    }
  }, [isEditorOpen, channels.length, fetchChannels]);

  // Create source
  const handleCreate = async (data: ChannelKBSourceFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`${apiBaseUrl}/api/admin/guilds/${guildId}/channel-kb`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create source');
      }

      await fetchSources();
      setIsEditorOpen(false);
      setEditingSource(undefined);
    } catch (err: any) {
      console.error('Failed to create source:', err);
      setError(err.message || 'Failed to create source');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Update source
  const handleUpdate = async (data: ChannelKBSourceFormData) => {
    if (!editingSource) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(
        `${apiBaseUrl}/api/admin/guilds/${guildId}/channel-kb/${editingSource.id}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update source');
      }

      await fetchSources();
      setIsEditorOpen(false);
      setEditingSource(undefined);
    } catch (err: any) {
      console.error('Failed to update source:', err);
      setError(err.message || 'Failed to update source');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Toggle enabled
  const handleToggleEnabled = async (source: ChannelKBSource, enabled: boolean) => {
    try {
      const response = await fetch(
        `${apiBaseUrl}/api/admin/guilds/${guildId}/channel-kb/${source.id}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ syncEnabled: enabled }),
        }
      );

      if (!response.ok) throw new Error('Failed to update');

      setSources((prev) =>
        prev.map((s) => (s.id === source.id ? { ...s, syncEnabled: enabled } : s))
      );
    } catch (err) {
      console.error('Failed to toggle enabled:', err);
      setError('Failed to update source');
    }
  };

  // Sync source
  const handleSync = async (source: ChannelKBSource) => {
    setSyncingIds((prev) => new Set([...prev, source.id]));
    try {
      const response = await fetch(
        `${apiBaseUrl}/api/admin/guilds/${guildId}/channel-kb/${source.id}/sync`,
        {
          method: 'POST',
          credentials: 'include',
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to sync');
      }

      await fetchSources();
    } catch (err: any) {
      console.error('Failed to sync source:', err);
      setError(err.message || 'Failed to sync source');
    } finally {
      setSyncingIds((prev) => {
        const next = new Set(prev);
        next.delete(source.id);
        return next;
      });
    }
  };

  // Delete source
  const handleDelete = async (source: ChannelKBSource) => {
    if (!confirm(`Delete "${source.name}"? This cannot be undone.`)) return;

    try {
      const response = await fetch(
        `${apiBaseUrl}/api/admin/guilds/${guildId}/channel-kb/${source.id}`,
        {
          method: 'DELETE',
          credentials: 'include',
        }
      );

      if (!response.ok) throw new Error('Failed to delete');

      setSources((prev) => prev.filter((s) => s.id !== source.id));
    } catch (err) {
      console.error('Failed to delete source:', err);
      setError('Failed to delete source');
    }
  };

  // Open editor for editing
  const handleSelect = (source: ChannelKBSource) => {
    setEditingSource(source);
    setIsEditorOpen(true);
  };

  // Open editor for creating
  const handleOpenCreate = () => {
    setEditingSource(undefined);
    setIsEditorOpen(true);
  };

  return (
    <div data-testid={testId} className={clsx('space-y-4', className)}>
      {/* Error Banner */}
      {error && (
        <div className="bg-discord-red/20 border border-discord-red rounded-lg p-3 flex items-center justify-between">
          <span className="text-discord-red text-sm">{error}</span>
          <button
            onClick={() => setError(null)}
            className="text-discord-red hover:text-discord-red/80"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Source List */}
      <ChannelKBSourceList
        sources={sources}
        onSelect={handleSelect}
        onToggleEnabled={handleToggleEnabled}
        onSync={handleSync}
        onDelete={handleDelete}
        onCreate={handleOpenCreate}
        isLoading={isLoading}
        syncingIds={syncingIds}
        testId={`${testId}-list`}
      />

      {/* Editor Modal */}
      <Modal
        isOpen={isEditorOpen}
        onClose={() => {
          setIsEditorOpen(false);
          setEditingSource(undefined);
        }}
        title={editingSource ? 'Edit KB Source' : 'Add Channel as KB Source'}
        testId={`${testId}-modal`}
      >
        <ChannelKBSourceEditor
          source={editingSource}
          channels={channels}
          isLoadingChannels={isLoadingChannels}
          onSubmit={editingSource ? handleUpdate : handleCreate}
          onCancel={() => {
            setIsEditorOpen(false);
            setEditingSource(undefined);
          }}
          isSubmitting={isSubmitting}
          testId={`${testId}-editor`}
        />
      </Modal>
    </div>
  );
}
