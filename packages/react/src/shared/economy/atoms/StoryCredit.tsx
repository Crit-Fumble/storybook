import { clsx } from 'clsx';
import { RpgIcon } from '../../atoms/RpgIcon';

export interface StoryCreditProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  testId?: string;
}

const iconSizes = {
  xs: 'sm' as const,
  sm: 'md' as const,
  md: '2x' as const,
  lg: '3x' as const,
  xl: '4x' as const,
};

export function StoryCredit({ size = 'md', className, testId }: StoryCreditProps) {
  return (
    <span className={clsx('inline-flex items-center justify-center', className)} data-testid={testId}>
      <RpgIcon icon="scroll-unfurled" size={iconSizes[size]} className="text-cfg-accent" />
    </span>
  );
}
