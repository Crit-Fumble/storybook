import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { clsx } from 'clsx';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  testId?: string;
  error?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, testId, error, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        data-testid={testId}
        className={clsx(
          'input resize-none min-h-[80px]',
          error && 'border-cfg-red focus:border-cfg-red',
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';
