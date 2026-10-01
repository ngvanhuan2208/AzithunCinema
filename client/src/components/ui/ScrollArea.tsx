'use client';
import { ScrollArea as Primitive } from 'radix-ui';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
export function ScrollArea({
  children,
  className,
  label,
}: {
  children: ReactNode;
  className?: string;
  label: string;
}) {
  return (
    <Primitive.Root className={cn('scroll-root', className)}>
      <Primitive.Viewport
        tabIndex={0}
        aria-label={label}
        className="scroll-viewport"
      >
        {children}
      </Primitive.Viewport>
      <Primitive.Scrollbar className="scrollbar" orientation="vertical">
        <Primitive.Thumb className="scroll-thumb" />
      </Primitive.Scrollbar>
    </Primitive.Root>
  );
}
