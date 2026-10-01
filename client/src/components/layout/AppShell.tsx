import type { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
export function AppShell({
  children,
  header,
  footer,
  bottomNav,
}: {
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  bottomNav?: ReactNode;
}) {
  return (
    <div className="app-shell" data-bottom-nav={Boolean(bottomNav)}>
      <a href="#main-content" className="skip-link">
        Đến nội dung chính
      </a>
      <Header>{header}</Header>
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer>{footer}</Footer>
      {bottomNav}
    </div>
  );
}
