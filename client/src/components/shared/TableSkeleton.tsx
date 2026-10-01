import { Skeleton } from '@/components/ui/Skeleton';
export function TableSkeleton() {
  return (
    <div className="stack" role="status" aria-label="Đang tải bảng">
      {Array.from({ length: 3 }, (_, index) => (
        <Skeleton key={index} className="h-12" />
      ))}
    </div>
  );
}
