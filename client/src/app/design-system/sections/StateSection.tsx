'use client';
import Link from 'next/link';
import { EmptyState } from '@/components/shared/EmptyState';
import { ErrorState } from '@/components/shared/ErrorState';
import { OfflineNotice } from '@/components/shared/OfflineNotice';
import { PageSkeleton } from '@/components/shared/PageSkeleton';
import { TableSkeleton } from '@/components/shared/TableSkeleton';
import { Button } from '@/components/ui/Button';
import { toast } from '@/components/ui/Toast';
import { Section } from './Section';
export function StateSection() {
  return (
    <Section
      id="states"
      number="10"
      title="Trạng thái hệ thống"
      description="Nội dung rỗng, lỗi, mất mạng và đang tải. Không dùng dữ liệu phim, audio hay tài khoản mẫu."
    >
      <div className="ds-grid">
        <div className="panel">
          <EmptyState
            message="Chưa có dữ liệu. Bạn có thể tải lại để kiểm tra."
            action={
              <Button
                variant="secondary"
                onClick={() => toast.info('Danh sách vẫn đang trống')}
              >
                Tải lại
              </Button>
            }
          />
        </div>
        <div className="panel">
          <ErrorState
            message="Không tải được dữ liệu. Kiểm tra kết nối rồi thử lại."
            action={
              <Button onClick={() => toast.info('Đã thử lại giao diện mẫu')}>
                Thử lại
              </Button>
            }
          />
        </div>
        <div className="panel stack">
          <h3>Skeleton nội dung</h3>
          <PageSkeleton />
        </div>
        <div className="panel stack">
          <h3>Skeleton bảng</h3>
          <TableSkeleton />
        </div>
      </div>
      <OfflineNotice preview />
      <div className="row">
        <Link
          className="button"
          data-variant="outline"
          href="/design-system/missing"
        >
          Xem trang 404
        </Link>
        <Link className="button" data-variant="outline" href="/403">
          Xem trang 403
        </Link>
        <Link className="button" data-variant="outline" href="/500">
          Xem trang 500
        </Link>
      </div>
    </Section>
  );
}
