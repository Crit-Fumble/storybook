import { useState } from 'react';
import { clsx } from 'clsx';
import { Button } from '../../shared/atoms/Button';

export interface AdminSettings {
  botEnabled: boolean;
  aiEnabled: boolean;
  diceEnabled: boolean;
  defaultSystemPrompt: string;
  maxMessageLength: number;
  cooldownSeconds: number;
  allowedChannelIds: string[];
  blockedUserIds: string[];
}

export interface ChannelOption {
  id: string;
  name: string;
}

export interface AdminSettingsPanelProps {
  /** Current settings */
  settings: AdminSettings;
  /** Available channels for selection */
  channels?: ChannelOption[];
  /** Save handler */
  onSave: (settings: AdminSettings) => void;
  /** Whether saving is in progress */
  isSaving?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

export function AdminSettingsPanel({
  settings: initialSettings,
  channels = [],
  onSave,
  isSaving = false,
  className,
  testId = 'admin-settings-panel',
}: AdminSettingsPanelProps) {
  const [settings, setSettings] = useState<AdminSettings>(initialSettings);
  const [hasChanges, setHasChanges] = useState(false);

  const updateSetting = <K extends keyof AdminSettings>(
    key: K,
    value: AdminSettings[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSave = () => {
    onSave(settings);
    setHasChanges(false);
  };

  const handleReset = () => {
    setSettings(initialSettings);
    setHasChanges(false);
  };

  return (
    <div data-testid={testId} className={clsx('space-y-6', className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-discord-text-normal text-lg font-display font-semibold">
          Settings
        </h2>
        {hasChanges && (
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" onClick={handleReset} disabled={isSaving}>
              Reset
            </Button>
            <Button variant="primary" size="sm" onClick={handleSave} disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        )}
      </div>

      {/* Feature Toggles */}
      <div className="bg-discord-background-secondary rounded-lg p-4 space-y-4">
        <h3 className="text-discord-text-normal font-semibold text-sm uppercase tracking-wide">
          Features
        </h3>

        <ToggleSetting
          label="Bot Enabled"
          description="Enable or disable the bot entirely for this server"
          checked={settings.botEnabled}
          onChange={(checked) => updateSetting('botEnabled', checked)}
        />

        <ToggleSetting
          label="AI Responses"
          description="Enable AI-powered responses and chat features"
          checked={settings.aiEnabled}
          onChange={(checked) => updateSetting('aiEnabled', checked)}
        />

        <ToggleSetting
          label="Dice Rolling"
          description="Enable dice rolling commands"
          checked={settings.diceEnabled}
          onChange={(checked) => updateSetting('diceEnabled', checked)}
        />
      </div>

      {/* Rate Limiting */}
      <div className="bg-discord-background-secondary rounded-lg p-4 space-y-4">
        <h3 className="text-discord-text-normal font-semibold text-sm uppercase tracking-wide">
          Rate Limiting
        </h3>

        <div>
          <label className="block text-sm text-discord-text-normal mb-1">
            Command Cooldown (seconds)
          </label>
          <input
            type="number"
            value={settings.cooldownSeconds}
            onChange={(e) =>
              updateSetting('cooldownSeconds', parseInt(e.target.value, 10) || 0)
            }
            min={0}
            max={300}
            className="w-32 px-3 py-2 bg-discord-background-tertiary text-discord-text-normal rounded border border-discord-background-floating focus:border-discord-primary focus:outline-none"
          />
          <p className="text-xs text-discord-text-muted mt-1">
            Minimum seconds between commands per user (0 = no limit)
          </p>
        </div>

        <div>
          <label className="block text-sm text-discord-text-normal mb-1">
            Max Message Length
          </label>
          <input
            type="number"
            value={settings.maxMessageLength}
            onChange={(e) =>
              updateSetting('maxMessageLength', parseInt(e.target.value, 10) || 0)
            }
            min={100}
            max={4000}
            className="w-32 px-3 py-2 bg-discord-background-tertiary text-discord-text-normal rounded border border-discord-background-floating focus:border-discord-primary focus:outline-none"
          />
          <p className="text-xs text-discord-text-muted mt-1">
            Maximum characters for AI responses (100-4000)
          </p>
        </div>
      </div>

      {/* Default System Prompt */}
      <div className="bg-discord-background-secondary rounded-lg p-4 space-y-3">
        <h3 className="text-discord-text-normal font-semibold text-sm uppercase tracking-wide">
          Default System Prompt
        </h3>
        <p className="text-xs text-discord-text-muted">
          This prompt is used for all AI interactions unless overridden by a Prompt Partial.
        </p>
        <textarea
          value={settings.defaultSystemPrompt}
          onChange={(e) => updateSetting('defaultSystemPrompt', e.target.value)}
          rows={6}
          className="w-full px-3 py-2 bg-discord-background-tertiary text-discord-text-normal rounded border border-discord-background-floating focus:border-discord-primary focus:outline-none font-mono text-sm resize-y"
          placeholder="Enter default system prompt..."
        />
      </div>

      {/* Channel Restrictions */}
      <div className="bg-discord-background-secondary rounded-lg p-4 space-y-3">
        <h3 className="text-discord-text-normal font-semibold text-sm uppercase tracking-wide">
          Allowed Channels
        </h3>
        <p className="text-xs text-discord-text-muted">
          If specified, the bot will only respond in these channels. Leave empty to allow all channels.
        </p>
        <div className="flex flex-wrap gap-2">
          {channels.map((channel) => {
            const isSelected = settings.allowedChannelIds.includes(channel.id);
            return (
              <button
                key={channel.id}
                onClick={() => {
                  const newIds = isSelected
                    ? settings.allowedChannelIds.filter((id) => id !== channel.id)
                    : [...settings.allowedChannelIds, channel.id];
                  updateSetting('allowedChannelIds', newIds);
                }}
                className={clsx(
                  'px-3 py-1.5 text-sm rounded-full transition-colors',
                  isSelected
                    ? 'bg-discord-primary text-white'
                    : 'bg-discord-background-tertiary text-discord-text-muted hover:text-discord-text-normal'
                )}
              >
                #{channel.name}
              </button>
            );
          })}
        </div>
        {settings.allowedChannelIds.length > 0 && (
          <p className="text-xs text-discord-text-muted">
            {settings.allowedChannelIds.length} channel(s) selected
          </p>
        )}
      </div>

      {/* Danger Zone */}
      <div className="bg-discord-background-secondary rounded-lg p-4 border border-discord-red/30">
        <h3 className="text-discord-red font-semibold text-sm uppercase tracking-wide mb-3">
          Danger Zone
        </h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-discord-text-normal text-sm font-medium">
              Reset All Settings
            </p>
            <p className="text-discord-text-muted text-xs">
              This will reset all settings to their default values.
            </p>
          </div>
          <Button variant="danger" size="sm">
            Reset to Defaults
          </Button>
        </div>
      </div>
    </div>
  );
}

interface ToggleSettingProps {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function ToggleSetting({ label, description, checked, onChange }: ToggleSettingProps) {
  return (
    <div className="flex items-center justify-between py-2">
      <div>
        <p className="text-discord-text-normal text-sm font-medium">{label}</p>
        <p className="text-discord-text-muted text-xs">{description}</p>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={clsx(
          'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
          checked ? 'bg-discord-green' : 'bg-discord-background-tertiary'
        )}
      >
        <span
          className={clsx(
            'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
            checked ? 'translate-x-6' : 'translate-x-1'
          )}
        />
      </button>
    </div>
  );
}
