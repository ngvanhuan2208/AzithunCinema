import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { Spinner } from './Spinner';
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}
export function Button({
  variant = 'primary',
  size = 'md',
  loading,
  disabled,
  className,
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      data-variant={variant}
      data-size={size}
      aria-busy={loading || undefined}
      disabled={disabled || loading}
      className={cn('button', className)}
      {...props}
    >
      <span className="button-content" aria-hidden={loading || undefined}>
        {children}
      </span>
      {loading && (
        <>
          <span className="sr-only">{children}</span>
          <span className="button-spinner" aria-hidden="true">
            <Spinner />
          </span>
        </>
      )}
    </button>
  );
}
