'use client';
import { useRef } from 'react';
import type { ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
export function Rail({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  function scroll(direction: number) {
    const node = ref.current;
    if (!node) return;
    node.scrollBy({
      left: direction * node.clientWidth,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'instant'
        : 'smooth',
    });
  }
  return (
    <div className="rail-wrap">
      <div
        ref={ref}
        className="rail"
        role="region"
        aria-label={label}
        tabIndex={0}
      >
        {children}
      </div>
      <div className="rail-controls">
        <Button
          variant="icon"
          aria-label="Cuộn sang trái"
          onClick={() => scroll(-1)}
        >
          <ChevronLeft />
        </Button>
        <Button
          variant="icon"
          aria-label="Cuộn sang phải"
          onClick={() => scroll(1)}
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
