'use client';
import { ErrorState } from '@/components/shared/ErrorState';
import { Button } from '@/components/ui/Button';
export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="container page-stack">
      <h1>Không tải được trang</h1>
      <ErrorState
        message="Trang gặp lỗi khi tải. Thử lại để tiếp tục."
        action={<Button onClick={reset}>Thử lại</Button>}
      />
    </main>
  );
}
