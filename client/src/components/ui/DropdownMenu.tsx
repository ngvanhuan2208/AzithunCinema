'use client';
import { useCssToken } from '@/hooks/useCssToken';
import { DropdownMenu as Primitive } from 'radix-ui';
import type { ReactNode } from 'react';
export function DropdownMenu({
  trigger,
  items,
}: {
  trigger: ReactNode;
  items: { label: string; disabled?: boolean; onSelect?: () => void }[];
}) {
  return (
    <Primitive.Root>
      <Primitive.Trigger asChild>{trigger}</Primitive.Trigger>
      <Primitive.Portal>
        <Primitive.Content
          className="floating"
          sideOffset={parseFloat(useCssToken('--space-1')) || 0}
        >
          {items.map((item) => (
            <Primitive.Item
              className="menu-item"
              key={item.label}
              disabled={item.disabled}
              onSelect={item.onSelect}
            >
              {item.label}
            </Primitive.Item>
          ))}
        </Primitive.Content>
      </Primitive.Portal>
    </Primitive.Root>
  );
}
