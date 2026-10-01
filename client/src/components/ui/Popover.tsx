'use client';
import { useCssToken } from '@/hooks/useCssToken';
import { Popover as Primitive } from 'radix-ui';
import type { ReactNode } from 'react';
export function Popover({
  trigger,
  children,
}: {
  trigger: ReactNode;
  children: ReactNode;
}) {
  return (
    <Primitive.Root>
      <Primitive.Trigger asChild>{trigger}</Primitive.Trigger>
      <Primitive.Portal>
        <Primitive.Content
          className="floating popover stack"
          sideOffset={parseFloat(useCssToken('--space-1')) || 0}
          collisionPadding={parseFloat(useCssToken('--space-4')) || 0}
        >
          {children}
        </Primitive.Content>
      </Primitive.Portal>
    </Primitive.Root>
  );
}
