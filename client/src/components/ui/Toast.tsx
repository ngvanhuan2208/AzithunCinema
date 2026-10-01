'use client';
import { Toaster } from 'sonner';
export { toast } from 'sonner';
export function ToastProvider() {
  return (
    <Toaster
      theme="dark"
      duration={5000}
      closeButton
      toastOptions={{
        unstyled: true,
        className: 'toast-card',
        classNames: {
          title: 'font-semibold',
          description: 'muted-copy',
          closeButton: 'toast-close',
          success: 'toast-success',
          error: 'toast-danger',
          warning: 'toast-warning',
          info: 'toast-info',
        },
      }}
    />
  );
}
