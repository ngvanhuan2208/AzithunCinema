'use client';
import { useSyncExternalStore } from 'react';
import { Banner } from '@/components/ui/Banner';
const subscribe = (callback: () => void) => {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
};
export function OfflineNotice({ preview = false }: { preview?: boolean }) {
  const online = useSyncExternalStore(
    subscribe,
    () => navigator.onLine,
    () => true,
  );
  return !online || preview ? (
    <Banner tone="warning" title="Bạn đang ngoại tuyến">
      Kiểm tra kết nối mạng để tiếp tục.
    </Banner>
  ) : null;
}
