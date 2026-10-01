import type { ReactNode } from 'react';
import { Container } from './Container';
export function Footer({ children }: { children?: ReactNode }) {
  return (
    <footer className="footer-shell">
      <Container className="row justify-between">
        <span className="font-semibold">Azithun</span>
        {children}
      </Container>
    </footer>
  );
}
