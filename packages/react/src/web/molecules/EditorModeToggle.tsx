import { clsx } from 'clsx';

export type EditorMode = 'wysiwyg' | 'markdown' | 'preview';

export interface EditorModeToggleProps {
  mode: EditorMode;
  onChange: (mode: EditorMode) => void;
  modes?: EditorMode[];
  disabled?: boolean;
  testId?: string;
}

const modeLabels: Record<EditorMode, string> = {
  wysiwyg: 'WYSIWYG',
  markdown: 'Markdown',
  preview: 'Preview',
};

export function EditorModeToggle({
  mode,
  onChange,
  modes = ['wysiwyg', 'markdown'],
  disabled = false,
  testId = 'editor-mode-toggle',
}: EditorModeToggleProps) {
  return (
    <div className="flex items-center gap-2" data-testid={testId}>
      <span className="text-xs text-cfg-text-muted">Editor:</span>
      {modes.map((m) => (
        <button
          key={m}
          onClick={() => onChange(m)}
          disabled={disabled}
          className={clsx(
            'px-2 py-1 text-xs rounded transition-colors',
            mode === m
              ? 'bg-cfg-primary text-white'
              : 'bg-cfg-background-tertiary text-cfg-text-muted hover:text-cfg-text-normal',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
          data-testid={`${testId}-${m}`}
        >
          {modeLabels[m]}
        </button>
      ))}
    </div>
  );
}
