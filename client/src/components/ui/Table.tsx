import type { TableHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
export function Table({
  className,
  ...props
}: TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="table-wrap">
      <table className={cn('table', className)} {...props} />
    </div>
  );
}
