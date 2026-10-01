import Link from 'next/link';
import { ErrorState } from '@/components/shared/ErrorState';
export default function ServerErrorPage() {
  return (
    <main className="container page-stack">
      <h1>500 · Không tải được trang</h1>
      <ErrorState
        message="Hệ thống gặp lỗi. Vui lòng thử lại sau."
        action={
          <Link href="/" className="button" data-variant="primary">
            Về trang chủ
          </Link>
        }
      />
    </main>
  );
}
