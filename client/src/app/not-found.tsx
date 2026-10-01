import Link from 'next/link';
import { ErrorState } from '@/components/shared/ErrorState';
export default function NotFound() {
  return (
    <main className="container page-stack">
      <h1>404 · Không tìm thấy trang</h1>
      <ErrorState
        message="Đường dẫn không tồn tại hoặc đã được thay đổi."
        action={
          <Link href="/" className="button" data-variant="primary">
            Về trang chủ
          </Link>
        }
      />
    </main>
  );
}
