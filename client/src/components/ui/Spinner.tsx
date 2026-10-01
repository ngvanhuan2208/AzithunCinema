import { LoaderCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
export function Spinner({ className }: { className?: string }) {
  return (
    <LoaderCircle
      role="status"
      aria-label="Đang tải"
      className={cn('spinner', className)}
    />
  );
}
