import { clsx } from 'clsx';

export interface PageListItemProps {
  title: string;
  slug: string;
  selected?: boolean;
  onClick?: () => void;
  testId?: string;
}

export function PageListItem({
  title,
  slug,
  selected = false,
  onClick,
  testId,
}: PageListItemProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'w-full text-left px-2 py-1.5 rounded text-sm transition-colors',
        selected
          ? 'bg-cfg-primary text-white'
          : 'text-cfg-text-muted hover:bg-cfg-background-tertiary hover:text-cfg-text-normal'
      )}
      data-testid={testId}
    >
      <div className="truncate font-medium">{title}</div>
      <div className="text-xs opacity-60">/{slug}</div>
    </button>
  );
}
