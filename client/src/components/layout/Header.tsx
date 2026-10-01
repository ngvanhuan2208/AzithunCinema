'use client';
import { useEffect, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { Container } from './Container';
export function Header({ children }: { children?: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 0);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return (
    <header className="header-shell" data-scrolled={scrolled}>
      <Container className="row justify-between h-full">
        <Link
          href="/"
          className="brand-wordmark"
          aria-label="Azithun — Trang chủ"
        >
          Azithun<span aria-hidden="true">.</span>
        </Link>
        {children}
      </Container>
    </header>
  );
}
