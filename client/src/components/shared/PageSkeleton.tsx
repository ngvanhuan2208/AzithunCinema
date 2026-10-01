import { Skeleton } from '@/components/ui/Skeleton';
export function PageSkeleton() {
  return (
    <div className="stack" role="status" aria-label="Đang tải nội dung">
      <Skeleton className="w-1/2" />
      <Skeleton />
      <Skeleton className="w-3/4" />
      <span className="sr-only">Đang tải nội dung</span>
    </div>
  );
}
