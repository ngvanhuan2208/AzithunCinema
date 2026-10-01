import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
export function ContentGrid({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('content-grid', className)} {...props} />;
}
