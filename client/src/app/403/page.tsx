import Link from 'next/link';
import { ErrorState } from '@/components/shared/ErrorState';
export default function ForbiddenPage() {
  return (
    <main className="container page-stack">
      <h1>403 · Không đủ quyền truy cập</h1>
      <ErrorState
        message="Bạn không có quyền mở nội dung này."
        action={
          <Link href="/" className="button" data-variant="primary">
            Về trang chủ
          </Link>
        }
      />
    </main>
  );
}
