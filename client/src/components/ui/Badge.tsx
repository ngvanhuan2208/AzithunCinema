import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
export type Tone = 'neutral' | 'info' | 'success' | 'warning' | 'danger';
export function Badge({
  tone = 'neutral',
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement> & { tone?: Tone }) {
  return <span className={cn('badge', `tone-${tone}`, className)} {...props} />;
}
