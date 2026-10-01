import type { ReactNode } from 'react';
export function MobileBottomNav({
  children,
  preview = false,
}: {
  children: ReactNode;
  preview?: boolean;
}) {
  return (
    <nav
      className="mobile-bottom-nav"
      data-preview={preview}
      aria-label="Điều hướng chính trên di động"
    >
      {children}
    </nav>
  );
}
