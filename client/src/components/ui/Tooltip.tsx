'use client';
import { useCssToken } from '@/hooks/useCssToken';
import { Tooltip as Primitive } from 'radix-ui';
import type { ReactNode } from 'react';
export function Tooltip({
  children,
  content,
}: {
  children: ReactNode;
  content: ReactNode;
}) {
  return (
    <Primitive.Provider>
      <Primitive.Root>
        <Primitive.Trigger asChild>{children}</Primitive.Trigger>
        <Primitive.Portal>
          <Primitive.Content
            className="floating"
            sideOffset={parseFloat(useCssToken('--space-1')) || 0}
          >
            {content}
          </Primitive.Content>
        </Primitive.Portal>
      </Primitive.Root>
    </Primitive.Provider>
  );
}
