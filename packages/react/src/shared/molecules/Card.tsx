import { type ReactNode, type HTMLAttributes } from 'react';
import { clsx } from 'clsx';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  testId?: string;
  variant?: 'default' | 'elevated' | 'interactive';
}

export function Card({ children, className, testId, variant = 'default', ...props }: CardProps) {
  return (
    <div
      data-testid={testId}
      className={clsx(
        'card',
        {
          'shadow-lg bg-cfg-background-floating': variant === 'elevated',
          'cursor-pointer hover:border-cfg-primary transition-colors': variant === 'interactive',
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  testId?: string;
}

export function CardHeader({ children, className, testId, ...props }: CardHeaderProps) {
  return (
    <div
      data-testid={testId}
      className={clsx('pb-3 border-b border-cfg-border mb-3', className)}
      {...props}
    >
      {children}
    </div>
  );
}

export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  testId?: string;
}

export function CardTitle({ children, className, testId, ...props }: CardTitleProps) {
  return (
    <h3
      data-testid={testId}
      className={clsx('text-lg font-semibold text-cfg-text-normal', className)}
      {...props}
    >
      {children}
    </h3>
  );
}

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  testId?: string;
}

export function CardContent({ children, className, testId, ...props }: CardContentProps) {
  return (
    <div
      data-testid={testId}
      className={clsx('text-cfg-text-normal', className)}
      {...props}
    >
      {children}
    </div>
  );
}

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  testId?: string;
}

export function CardFooter({ children, className, testId, ...props }: CardFooterProps) {
  return (
    <div
      data-testid={testId}
      className={clsx('pt-3 border-t border-cfg-border mt-3 flex items-center justify-between', className)}
      {...props}
    >
      {children}
    </div>
  );
}
