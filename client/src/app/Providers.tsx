'use client';
import { useEffect, useState, type ReactNode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { createQueryClient } from '@/lib/query-client';
import { startMocks } from '@/mocks';
import { ToastProvider } from '@/components/ui/Toast';
import { OfflineNotice } from '@/components/shared/OfflineNotice';
import { ErrorState } from '@/components/shared/ErrorState';
export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(createQueryClient);
  const [ready, setReady] = useState(
    process.env.NODE_ENV !== 'development' ||
      process.env.NEXT_PUBLIC_MSW_ENABLED !== 'true',
  );
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let active = true;
    startMocks()
      .then(() => {
        if (active) setReady(true);
      })
      .catch(() => {
        if (active) setFailed(true);
      });
    return () => {
      active = false;
    };
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <OfflineNotice />
      {failed ? (
        <ErrorState message="Không khởi động được MSW. Kiểm tra service worker rồi tải lại trang." />
      ) : ready ? (
        children
      ) : (
        <p role="status" className="container page-stack">
          Đang chuẩn bị giao diện…
        </p>
      )}
      <ToastProvider />
    </QueryClientProvider>
  );
}
